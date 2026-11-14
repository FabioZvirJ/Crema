import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { CatalystId, VesselId } from '../LabPage';
import { getCatalystLook, getFlavorLook } from './flavorLook';
import {
  CONE_H,
  CONE_R,
  VESSEL_TOP,
  buildCapsuleGeometry,
  buildConeDipGeometry,
  buildConeGeometry,
  buildCupGeometry,
  buildSauceCap,
  buildScoopGeometry,
  coneDipPoint,
  scoopRestY,
} from './geometry';
import {
  PLACE_TOTAL,
  REST_SQUASH,
  SIDE_TOTAL,
  TAKE_TOTAL,
  T_SIDE_APPROACH,
  easeInCubic,
  easeOutCubic,
  placePose,
  takePose,
  takeSidePose,
  type ScooperPose,
} from './scooperMotion';
import {
  createCapsuleTexture,
  createCupTexture,
  createGelatoSurface,
  createScoopTexture,
  createShadowTexture,
  createTurntableTexture,
  createWaffleTextures,
  hashString,
  mulberry32,
  type GelatoSurface,
} from './textures';

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

interface SceneScoop {
  readonly id: string;
}

interface SceneState {
  readonly vesselId: VesselId;
  readonly catalystId: CatalystId;
  readonly scoops: ReadonlyArray<SceneScoop>;
}

/** Where a scoop's right edge lands on the canvas, in % of its width/height. */
export interface LayoutPoint {
  readonly x: number;
  readonly y: number;
}

interface GelatoSceneOptions {
  readonly reducedMotion: boolean;
  readonly onLayout: (points: ReadonlyArray<LayoutPoint>) => void;
  readonly onContextLost?: () => void;
}

/* ------------------------------------------------------------------ */
/* Tuning                                                              */
/* ------------------------------------------------------------------ */

const FLOOR_Y = -0.62;
const CAMERA_TARGET_Y = 2.85;
const CAMERA_DISTANCE = 18.4;
/** Fraction of the canvas width the scene is pushed left, leaving room for the callouts. */
const VIEW_SHIFT = 0.075;
const CAMERA_ELEVATION = (16 * Math.PI) / 180;
const SCOOP_BASE = 0.4;
/** The vessel rises from (and sinks back to) this far below its resting height. */
const RISE_DIST = 7;
/** Upper scoops sink into the gap once the removed ball is out from under them. */
const SINK_DELAY = T_SIDE_APPROACH + 0.1;

interface Spring {
  x: number;
  v: number;
}

/** Semi-implicit spring. All springs here are (over)damped: gelato is viscous, it never wobbles. */
function stepSpring(s: Spring, target: number, k: number, c: number, dt: number): void {
  const sub = 2;
  const h = dt / sub;
  for (let i = 0; i < sub; i += 1) {
    s.v += (-k * (s.x - target) - c * s.v) * h;
    s.x += s.v * h;
  }
}

/* ------------------------------------------------------------------ */
/* Entities                                                            */
/* ------------------------------------------------------------------ */

type ScoopPhase = 'waiting' | 'scooping' | 'resting' | 'taking';

interface Topping {
  readonly object: THREE.Object3D;
  /** Returns false once the animation has finished. */
  update(dt: number): boolean;
  dispose(): void;
}

interface ScoopEntity {
  readonly id: string;
  readonly group: THREE.Group;
  index: number;
  /** Resting height of the ball centre (spring-driven when the stack changes). */
  y: number;
  vy: number;
  targetY: number;
  pendingTargetY: number;
  targetDelay: number;
  squash: Spring;
  squashTarget: number;
  /** The scoop mesh, whose "drape" morph target is driven by `drape`. */
  mesh: THREE.Mesh;
  /** 0 = plain ball, 1 = collar drooped over the ball underneath. */
  drape: Spring;
  phase: ScoopPhase;
  wait: number;
  /** Timeline of the current scooping / taking animation. */
  t: number;
  /** Vertical offset from the resting height during scooping/taking. */
  yRel: number;
  /** Which side the tool comes from: +1 right, -1 left. */
  side: 1 | -1;
  /** 'lift' = taken from above (top ball); 'side' = pulled out from under the balls above it. */
  takeKind: 'lift' | 'side';
  rig: THREE.Group | null;
  landed: boolean;
  pressed: boolean;
  topping: Topping | null;
  toppingKey: string;
}

interface Assembly {
  readonly vesselId: VesselId;
  readonly root: THREE.Group;
  readonly scoops: ScoopEntity[];
  /** 0 → below the floor, 1 → in place. */
  rise: number;
  riseWait: number;
  bump: Spring;
  leaving: boolean;
  leaveT: number;
}

/* ------------------------------------------------------------------ */
/* Scene                                                               */
/* ------------------------------------------------------------------ */

export class GelatoScene {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera: THREE.PerspectiveCamera;
  private readonly turntable = new THREE.Group();
  /** Tools live in world space (they do not spin with the turntable). */
  private readonly tools = new THREE.Group();
  private readonly shadow: THREE.Mesh;
  private readonly clock = { last: 0 };
  private readonly options: GelatoSceneOptions;
  private readonly canvas: HTMLCanvasElement;

  // shared, cached resources (disposed with the scene)
  private readonly disposables: Array<{ dispose(): void }> = [];
  private readonly waffle = createWaffleTextures();
  private readonly surface: GelatoSurface = createGelatoSurface();
  private readonly scoopGeometries: Array<THREE.BufferGeometry | undefined> = [undefined, undefined, undefined];
  private readonly scoopMaterials = new Map<string, THREE.MeshPhysicalMaterial>();
  private readonly coneGeometry = buildConeGeometry();
  private readonly dipGeometry = buildConeDipGeometry();
  private cupGeometry: THREE.LatheGeometry | null = null;
  private capsuleGeometry: THREE.LatheGeometry | null = null;
  private readonly coneMaterial: THREE.MeshStandardMaterial;
  private readonly lipMaterial: THREE.MeshStandardMaterial;
  private readonly dipMaterial: THREE.MeshPhysicalMaterial;
  private cupMaterial: THREE.MeshStandardMaterial | null = null;
  private capsuleMaterial: THREE.MeshStandardMaterial | null = null;

  // scooper tool
  private readonly steelMaterial: THREE.MeshStandardMaterial;
  private readonly gripMaterial: THREE.MeshStandardMaterial;
  private readonly bowlGeometry = new THREE.SphereGeometry(1.06, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2);
  private readonly rimGeometry = new THREE.TorusGeometry(1.06, 0.032, 8, 48);
  private readonly neckGeometry = new THREE.CylinderGeometry(0.06, 0.075, 1.3, 12);
  private readonly gripGeometry = new THREE.CylinderGeometry(0.17, 0.14, 2.5, 16);
  private readonly capGeometry = new THREE.SphereGeometry(0.17, 16, 10);
  private readonly collarGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.12, 12);

  private assembly: Assembly | null = null;
  private readonly leavingAssemblies: Assembly[] = [];
  private state: SceneState | null = null;
  private raf = 0;
  private running = false;
  private visible = true;
  private time = 0;
  private reducedMotion: boolean;
  private dirty = true;
  private wasAnimating = true;
  private lastRenderMs = 0;

  // turntable interaction
  private yaw = -0.4;
  private spinVel = 0;
  private dragging = false;
  private lastInteraction = -10;
  private dragX = 0;
  private dragVel = 0;

  private pointerDown = (e: PointerEvent) => {
    this.dragging = true;
    this.dirty = true;
    this.dragX = e.clientX;
    this.dragVel = 0;
    this.spinVel = 0;
    this.lastInteraction = this.time;
    this.canvas.setPointerCapture(e.pointerId);
  };

  private pointerMove = (e: PointerEvent) => {
    if (!this.dragging) return;
    this.dirty = true;
    const dx = e.clientX - this.dragX;
    this.dragX = e.clientX;
    this.yaw += dx * 0.012;
    this.dragVel = this.dragVel * 0.6 + dx * 0.012 * 60 * 0.4;
    this.lastInteraction = this.time;
  };

  private pointerUp = (e: PointerEvent) => {
    if (!this.dragging) return;
    this.dragging = false;
    this.dirty = true;
    this.spinVel = Math.max(-7, Math.min(7, this.dragVel));
    this.lastInteraction = this.time;
    if (this.canvas.hasPointerCapture(e.pointerId)) this.canvas.releasePointerCapture(e.pointerId);
  };

  private contextLost = (e: Event) => {
    e.preventDefault();
    this.stop();
    this.options.onContextLost?.();
  };

  private tick = (now: number) => {
    if (!this.running) return;
    if (!this.wasAnimating && !this.dirty && !this.dragging && !this.reducedMotion && now - this.lastRenderMs < 33) {
      this.raf = requestAnimationFrame(this.tick);
      return;
    }
    const dt = Math.min(0.05, this.clock.last ? (now - this.clock.last) / 1000 : 0.016);
    this.clock.last = now;
    const animating = this.update(dt);
    this.wasAnimating = animating;
    if (!this.reducedMotion || animating || this.dirty) {
      this.renderer.render(this.scene, this.camera);
      this.lastRenderMs = now;
    }
    this.dirty = false;
    this.raf = requestAnimationFrame(this.tick);
  };

  constructor(canvas: HTMLCanvasElement, options: GelatoSceneOptions) {
    this.canvas = canvas;
    this.options = options;
    this.reducedMotion = options.reducedMotion;

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;

    // --- camera: fixed, slightly above, so scoop tops and toppings read well
    this.camera = new THREE.PerspectiveCamera(28, 1, 0.5, 80);
    this.camera.position.set(
      0,
      CAMERA_TARGET_Y + CAMERA_DISTANCE * Math.sin(CAMERA_ELEVATION),
      CAMERA_DISTANCE * Math.cos(CAMERA_ELEVATION)
    );
    this.camera.lookAt(0, CAMERA_TARGET_Y, 0);

    // --- light: soft studio env + warm key + rim
    const pmrem = new THREE.PMREMGenerator(this.renderer);
    const room = new RoomEnvironment();
    this.scene.environment = pmrem.fromScene(room, 0.04).texture;
    this.scene.environmentIntensity = 0.62;
    pmrem.dispose();

    const key = new THREE.DirectionalLight(0xfff0dc, 2.5);
    key.position.set(4.5, 9, 7);
    key.target.position.set(0, 3, 0);
    key.castShadow = true;
    key.shadow.mapSize.set(512, 512);
    key.shadow.camera.left = -4;
    key.shadow.camera.right = 4;
    key.shadow.camera.top = 8;
    key.shadow.camera.bottom = -2;
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 30;
    key.shadow.bias = -0.0004;
    key.shadow.normalBias = 0.025;
    key.shadow.radius = 2;
    const rim = new THREE.DirectionalLight(0xffe0cc, 1.1);
    rim.position.set(-6, 5, -5);
    this.scene.add(key, key.target, rim);

    // --- floor: static soft shadow + rotating lab turntable
    const shadowTex = createShadowTexture();
    const turnTex = createTurntableTexture();
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false });
    this.shadow = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 4.2), shadowMat);
    this.shadow.rotation.x = -Math.PI / 2;
    this.shadow.position.y = FLOOR_Y + 0.005;
    this.shadow.renderOrder = -2;
    this.scene.add(this.shadow);

    const ringMat = new THREE.MeshBasicMaterial({ map: turnTex, transparent: true, depthWrite: false });
    const rings = new THREE.Mesh(new THREE.PlaneGeometry(5.8, 5.8), ringMat);
    rings.rotation.x = -Math.PI / 2;
    rings.position.y = FLOOR_Y;
    rings.renderOrder = -3;
    this.turntable.add(rings);
    this.scene.add(this.turntable, this.tools);

    // --- shared materials
    this.coneMaterial = new THREE.MeshStandardMaterial({
      map: this.waffle.map,
      bumpMap: this.waffle.bump,
      bumpScale: 3,
      roughness: 0.82,
      side: THREE.DoubleSide,
    });
    this.lipMaterial = new THREE.MeshStandardMaterial({ color: '#e0b073', roughness: 0.75 });
    this.dipMaterial = new THREE.MeshPhysicalMaterial({
      color: '#3a1b10',
      roughness: 0.3,
      clearcoat: 0.7,
      clearcoatRoughness: 0.25,
    });
    this.steelMaterial = new THREE.MeshStandardMaterial({
      color: '#e6e9ee',
      metalness: 1,
      roughness: 0.2,
      side: THREE.DoubleSide,
    });
    this.gripMaterial = new THREE.MeshStandardMaterial({ color: '#5c0a1e', roughness: 0.42 });

    this.disposables.push(
      shadowTex,
      turnTex,
      shadowMat,
      ringMat,
      rings.geometry,
      this.shadow.geometry,
      this.waffle.map,
      this.waffle.bump,
      this.surface.normal,
      this.surface.roughness,
      this.coneGeometry,
      this.dipGeometry,
      this.coneMaterial,
      this.lipMaterial,
      this.dipMaterial,
      this.steelMaterial,
      this.gripMaterial,
      this.bowlGeometry,
      this.rimGeometry,
      this.neckGeometry,
      this.gripGeometry,
      this.capGeometry,
      this.collarGeometry,
      ...(this.scene.environment ? [this.scene.environment] : [])
    );

    canvas.addEventListener('pointerdown', this.pointerDown);
    canvas.addEventListener('pointermove', this.pointerMove);
    canvas.addEventListener('pointerup', this.pointerUp);
    canvas.addEventListener('pointercancel', this.pointerUp);
    canvas.addEventListener('webglcontextlost', this.contextLost);
  }

  /* ---------------------------------------------------------------- */
  /* Lifecycle                                                         */
  /* ---------------------------------------------------------------- */

  start(): void {
    if (this.running || !this.visible) return;
    this.running = true;
    this.clock.last = 0;
    this.raf = requestAnimationFrame(this.tick);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.raf);
  }

  setVisible(visible: boolean): void {
    this.visible = visible;
    if (visible) this.start();
    else this.stop();
  }

  setReducedMotion(value: boolean): void {
    this.reducedMotion = value;
  }

  resize(width: number, height: number): void {
    if (width < 2 || height < 2) return;
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.setViewOffset(width, height, width * VIEW_SHIFT, 0, width, height);
    this.camera.updateProjectionMatrix();
    this.emitLayout();
    this.renderer.render(this.scene, this.camera);
  }

  dispose(): void {
    this.stop();
    const c = this.canvas;
    c.removeEventListener('pointerdown', this.pointerDown);
    c.removeEventListener('pointermove', this.pointerMove);
    c.removeEventListener('pointerup', this.pointerUp);
    c.removeEventListener('pointercancel', this.pointerUp);
    c.removeEventListener('webglcontextlost', this.contextLost);

    if (this.assembly) this.removeAssembly(this.assembly);
    for (const old of this.leavingAssemblies) this.removeAssembly(old);
    this.leavingAssemblies.length = 0;
    for (const material of this.scoopMaterials.values()) {
      material.map?.dispose();
      material.dispose();
    }
    this.scoopMaterials.clear();
    for (const item of this.disposables) item.dispose();
    this.disposables.length = 0;
    this.renderer.dispose();
    // Release the GPU context right away instead of waiting for GC (browsers cap live contexts).
    this.renderer.forceContextLoss();
  }

  /* ---------------------------------------------------------------- */
  /* State → scene diff                                                */
  /* ---------------------------------------------------------------- */

  setState(next: SceneState): void {
    const prev = this.state;
    this.state = next;
    this.dirty = true;

    const current = this.assembly;
    if (!current || current.vesselId !== next.vesselId) {
      this.rebuild(next, prev !== null);
    } else {
      this.reconcile(current, next);
    }
    this.emitLayout();
  }

  private rebuild(next: SceneState, animateOut: boolean): void {
    const old = this.assembly;
    if (old) {
      // Any tool still working on the old stack leaves with it.
      for (const e of old.scoops) this.dropRig(e);
      if (animateOut && !this.reducedMotion) {
        old.leaving = true;
        old.leaveT = 0;
        this.leavingAssemblies.push(old);
        this.spinVel += 3;
      } else {
        this.removeAssembly(old);
      }
    }

    const assembly = this.createAssembly(next.vesselId);
    this.assembly = assembly;
    this.turntable.add(assembly.root);
    const top = VESSEL_TOP[next.vesselId];
    const instant = this.reducedMotion;

    next.scoops.forEach((scoop, index) => {
      const entity = this.createScoop(scoop.id, index, top);
      // The tool starts working on a ball every ~1.4 s, alternating hands so they never collide.
      entity.wait = instant ? 0 : 0.2 + index * 1.4;
      if (instant) this.settleInstantly(entity);
      assembly.root.add(entity.group);
      assembly.scoops.push(entity);
    });
    if (instant) {
      assembly.rise = 1;
      assembly.riseWait = 0;
    }
  }

  private reconcile(assembly: Assembly, next: SceneState): void {
    const top = VESSEL_TOP[next.vesselId];
    const nextIds = next.scoops.map((s) => s.id);
    let removedSide: 1 | -1 | null = null;
    let removedFromBelow = false;

    // Decide how each ball leaves *before* anything changes state: a ball with another ball
    // resting on it has to be pulled out sideways.
    const buried = new Set(
      assembly.scoops
        .filter((e) =>
          assembly.scoops.some(
            (o) => o !== e && o.index > e.index && (o.phase === 'resting' || o.phase === 'scooping')
          )
        )
        .map((e) => e.id)
    );

    for (const entity of [...assembly.scoops]) {
      if (entity.phase === 'taking' || nextIds.includes(entity.id)) continue;
      if (entity.phase === 'waiting' || entity.phase === 'scooping' || this.reducedMotion) {
        // Never fully on the stack (or no motion wanted): just remove it.
        this.removeScoop(assembly, entity);
        continue;
      }
      removedSide = entity.side;
      entity.takeKind = buried.has(entity.id) ? 'side' : 'lift';
      removedFromBelow = removedFromBelow || entity.takeKind === 'side';
      entity.phase = 'taking';
      entity.t = 0;
      entity.rig = this.createRig(entity.side);
      this.applyPose(assembly, entity, this.takePoseFor(entity));
    }

    nextIds.forEach((id, index) => {
      let entity = assembly.scoops.find((e) => e.phase !== 'taking' && e.id === id);
      if (!entity) {
        entity = this.createScoop(id, index, top);
        if (removedSide !== null) {
          // replacing: wait until the old ball is on its way out, and come from the other hand
          entity.wait = 1.3;
          entity.side = removedSide === 1 ? -1 : 1;
        }
        if (this.reducedMotion) this.settleInstantly(entity);
        assembly.root.add(entity.group);
        assembly.scoops.push(entity);
      }
      entity.index = index;
      entity.pendingTargetY = scoopRestY(top, index);
      if (this.reducedMotion || entity.phase === 'waiting') {
        entity.targetY = entity.pendingTargetY;
        entity.y = entity.targetY;
        entity.targetDelay = 0;
      } else {
        // Scoops above a removed one sink only once the removed ball has been lifted clear.
        const sinking = entity.targetY > entity.pendingTargetY + 1e-6;
        entity.targetDelay = sinking && removedFromBelow ? SINK_DELAY : 0;
      }
    });
  }

  private settleInstantly(entity: ScoopEntity): void {
    entity.y = entity.targetY;
    entity.phase = 'resting';
    entity.landed = true;
    entity.squash.x = REST_SQUASH;
    entity.drape.x = entity.index > 0 ? 1 : 0;
    entity.group.visible = true;
  }

  /* ---------------------------------------------------------------- */
  /* Builders                                                          */
  /* ---------------------------------------------------------------- */

  private createAssembly(vesselId: VesselId): Assembly {
    const root = new THREE.Group();
    root.add(this.createVessel(vesselId));
    root.position.y = -RISE_DIST;
    return {
      vesselId,
      root,
      scoops: [],
      rise: 0,
      riseWait: this.leavingAssemblies.length > 0 ? 0.3 : 0.1,
      bump: { x: 0, v: 0 },
      leaving: false,
      leaveT: 0,
    };
  }

  private createVessel(vesselId: VesselId): THREE.Group {
    const group = new THREE.Group();
    const shadowed = (mesh: THREE.Mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      return mesh;
    };

    if (vesselId === 'casquinha-artesanal' || vesselId === 'casquinha-premium') {
      const premium = vesselId === 'casquinha-premium';
      group.add(shadowed(new THREE.Mesh(this.coneGeometry, this.coneMaterial)));

      const lipGeo = new THREE.TorusGeometry(CONE_R + 0.005, 0.07, 12, 60);
      const lip = shadowed(new THREE.Mesh(lipGeo, premium ? this.dipMaterial : this.lipMaterial));
      lip.rotation.x = Math.PI / 2;
      lip.position.y = CONE_H;
      group.add(lip);
      this.pendingDispose(group, lipGeo);

      if (premium) {
        group.add(shadowed(new THREE.Mesh(this.dipGeometry, this.dipMaterial)));
        group.add(this.createGranella());
      }
    } else if (vesselId === 'copinho-lab') {
      if (!this.cupGeometry) {
        this.cupGeometry = buildCupGeometry();
        this.disposables.push(this.cupGeometry);
      }
      if (!this.cupMaterial) {
        const cupMap = createCupTexture();
        this.cupMaterial = new THREE.MeshStandardMaterial({ map: cupMap, roughness: 0.6 });
        this.disposables.push(cupMap, this.cupMaterial);
      }
      group.add(shadowed(new THREE.Mesh(this.cupGeometry, this.cupMaterial)));
    } else {
      if (!this.capsuleGeometry) {
        this.capsuleGeometry = buildCapsuleGeometry();
        this.disposables.push(this.capsuleGeometry);
      }
      if (!this.capsuleMaterial) {
        const capMap = createCapsuleTexture();
        this.capsuleMaterial = new THREE.MeshStandardMaterial({
          map: capMap,
          roughness: 0.42,
          metalness: 0.05,
        });
        this.disposables.push(capMap, this.capsuleMaterial);
      }
      group.add(shadowed(new THREE.Mesh(this.capsuleGeometry, this.capsuleMaterial)));
    }
    return group;
  }

  /** Geometries created per vessel instance are disposed with it. */
  private pendingDispose(owner: THREE.Object3D, item: { dispose(): void }): void {
    owner.userData.ownDisposables = [
      ...((owner.userData.ownDisposables as Array<{ dispose(): void }>) ?? []),
      item,
    ];
  }

  /** Roasted pistachio & hazelnut granella scattered over the chocolate dip. */
  private createGranella(): THREE.InstancedMesh {
    const count = 70;
    const geo = new THREE.IcosahedronGeometry(1, 0);
    const mat = new THREE.MeshStandardMaterial({ roughness: 0.7, flatShading: true });
    const mesh = new THREE.InstancedMesh(geo, mat, count);
    const rand = mulberry32(2026);
    const dummy = new THREE.Object3D();
    const palette = ['#9db876', '#7f9d57', '#dfb57b', '#c99a5c'].map((c) => new THREE.Color(c));
    for (let k = 0; k < count; k += 1) {
      const p = coneDipPoint(rand() * Math.PI * 2, Math.pow(rand(), 0.8));
      dummy.position.copy(p);
      dummy.rotation.set(rand() * 6, rand() * 6, rand() * 6);
      dummy.scale.setScalar(0.035 + rand() * 0.04);
      dummy.updateMatrix();
      mesh.setMatrixAt(k, dummy.matrix);
      mesh.setColorAt(k, palette[Math.floor(rand() * palette.length)]!);
    }
    mesh.castShadow = true;
    mesh.frustumCulled = false;
    this.pendingDispose(mesh, geo);
    this.pendingDispose(mesh, mat);
    return mesh;
  }

  /**
   * Gelato material: pale-ish colour from the flavour texture, micro relief + broken-up
   * roughness from the shared surface maps, and a faint self-lighting of the same colour that
   * stands in for the light scattering through real, slightly translucent ice cream.
   */
  private scoopMaterial(flavorId: string): THREE.MeshPhysicalMaterial {
    let material = this.scoopMaterials.get(flavorId);
    if (!material) {
      const look = getFlavorLook(flavorId);
      const map = createScoopTexture(look, hashString(flavorId));
      material = new THREE.MeshPhysicalMaterial({
        map,
        normalMap: this.surface.normal,
        normalScale: new THREE.Vector2(0.9, 0.9),
        roughnessMap: this.surface.roughness,
        roughness: 1,
        sheen: 0.35,
        sheenRoughness: 0.6,
        sheenColor: new THREE.Color(look.light),
        clearcoat: 0.16,
        clearcoatRoughness: 0.55,
        specularIntensity: 0.65,
        emissive: new THREE.Color('#ffffff'),
        emissiveMap: map,
        emissiveIntensity: 0.14,
      });
      this.scoopMaterials.set(flavorId, material);
    }
    return material;
  }

  private getScoopGeometry(flavorId: string): THREE.BufferGeometry {
    const seeds = [11, 47, 83] as const;
    const slot = hashString(flavorId) % seeds.length;
    let geometry = this.scoopGeometries[slot];
    if (!geometry) {
      geometry = buildScoopGeometry(seeds[slot]!);
      this.scoopGeometries[slot] = geometry;
      this.disposables.push(geometry);
    }
    return geometry;
  }

  private createScoop(flavorId: string, index: number, vesselTop: number): ScoopEntity {
    const geometry = this.getScoopGeometry(flavorId);
    const mesh = new THREE.Mesh(geometry, this.scoopMaterial(flavorId));
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.rotation.y = (hashString(flavorId) % 628) / 100;

    const group = new THREE.Group();
    group.add(mesh);
    group.visible = false;

    const targetY = scoopRestY(vesselTop, index);
    const entity: ScoopEntity = {
      id: flavorId,
      group,
      index,
      y: targetY,
      vy: 0,
      targetY,
      pendingTargetY: targetY,
      targetDelay: 0,
      squash: { x: REST_SQUASH, v: 0 },
      squashTarget: REST_SQUASH,
      mesh,
      drape: { x: 0, v: 0 },
      phase: 'waiting',
      wait: 0,
      t: 0,
      yRel: 0,
      side: index % 2 === 0 ? 1 : -1,
      takeKind: 'lift',
      rig: null,
      landed: false,
      pressed: false,
      topping: null,
      toppingKey: '',
    };
    group.position.y = targetY;
    return entity;
  }

  /* ---------------------------------------------------------------- */
  /* The scooper tool                                                  */
  /* ---------------------------------------------------------------- */

  /**
   * Bowl (open hemisphere that cups the top of the ball) + rim + handle. Local origin is the
   * bowl centre, which coincides with the ball centre while it carries a ball.
   */
  private createScooperMesh(): THREE.Group {
    const tool = new THREE.Group();
    const part = (geometry: THREE.BufferGeometry, material: THREE.Material) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      return mesh;
    };

    const bowl = part(this.bowlGeometry, this.steelMaterial);
    const rim = part(this.rimGeometry, this.steelMaterial);
    rim.rotation.x = Math.PI / 2;

    // handle leaves the rim on the right and points up and away
    const handle = new THREE.Group();
    handle.position.set(1.04, 0.14, 0);
    handle.rotation.z = (38 * Math.PI) / 180 - Math.PI / 2;
    const neck = part(this.neckGeometry, this.steelMaterial);
    neck.position.y = 0.65;
    const collar = part(this.collarGeometry, this.steelMaterial);
    collar.position.y = 1.32;
    const grip = part(this.gripGeometry, this.gripMaterial);
    grip.position.y = 2.6;
    const cap = part(this.capGeometry, this.gripMaterial);
    cap.position.y = 3.85;
    handle.add(neck, collar, grip, cap);

    tool.add(bowl, rim, handle);
    return tool;
  }

  private createRig(side: 1 | -1): THREE.Group {
    const rig = new THREE.Group();
    rig.scale.x = side; // mirrors the whole tool for a left-handed approach
    rig.add(this.createScooperMesh());
    this.tools.add(rig);
    return rig;
  }

  private dropRig(entity: ScoopEntity): void {
    if (!entity.rig) return;
    this.tools.remove(entity.rig);
    entity.rig = null;
  }

  private takePoseFor(e: ScoopEntity): ScooperPose {
    return e.takeKind === 'side' ? takeSidePose(e.t) : takePose(e.t);
  }

  /** Apply a choreography pose to the ball (turntable space) and the tool (world space). */
  private applyPose(assembly: Assembly, e: ScoopEntity, pose: ScooperPose): void {
    e.squashTarget = pose.squashTarget + (this.restSquash(assembly, e) - REST_SQUASH);
    e.yRel = pose.ballY;

    // The tool works in world space; the ball lives on the turntable, so undo the yaw.
    const worldX = e.side * pose.ballX;
    e.group.position.x = worldX * Math.cos(this.yaw);
    e.group.position.z = worldX * Math.sin(this.yaw);

    if (e.rig) {
      e.rig.position.y = assembly.root.position.y;
      const tool = e.rig.children[0]!;
      tool.position.set(pose.bowlX, e.y + pose.bowlY, 0);
      tool.rotation.z = pose.alpha;
    }
  }

  /* ---------------------------------------------------------------- */
  /* Toppings                                                          */
  /* ---------------------------------------------------------------- */

  private createTopping(
    scoop: ScoopEntity,
    catalystId: CatalystId,
    vesselId: VesselId
  ): Topping | null {
    const look = getCatalystLook(catalystId);
    const parts: Topping[] = [];
    const container = new THREE.Group();
    const seed = hashString(`${scoop.id}${catalystId}`);

    if (look.kind === 'crumbs' || look.kind === 'flakes') {
      parts.push(this.createSprinkles(container, catalystId, look.colors, look.kind === 'flakes', seed));
    } else if (look.kind === 'sauce') {
      parts.push(this.createSauce(container, look.colors[0] ?? '#3a1b10', Boolean(look.cherry), seed));
    }
    if (vesselId === 'copinho-lab') {
      parts.push(this.createWafer(container));
    }
    if (parts.length === 0) return null;

    scoop.group.add(container);
    return {
      object: container,
      update: (dt) => {
        let active = false;
        for (const part of parts) active = part.update(dt) || active;
        return active;
      },
      dispose: () => {
        scoop.group.remove(container);
        for (const part of parts) part.dispose();
      },
    };
  }

  private createSprinkles(
    container: THREE.Group,
    catalystId: CatalystId,
    palette: ReadonlyArray<string>,
    flakes: boolean,
    seed: number
  ): Topping {
    const rand = mulberry32(seed);
    const boxy = catalystId === 'crumble-speculoos';
    const count = flakes ? 80 : boxy ? 42 : 52;
    const geometry = boxy
      ? new THREE.BoxGeometry(1, 0.55, 0.8)
      : flakes
        ? new THREE.OctahedronGeometry(1, 0)
        : new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshStandardMaterial({
      roughness: flakes ? 0.22 : 0.85,
      flatShading: true,
      emissive: flakes ? new THREE.Color('#ffffff') : new THREE.Color('#000000'),
      emissiveIntensity: flakes ? 0.12 : 0,
    });
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.castShadow = false;
    mesh.frustumCulled = false;

    const colors = palette.map((c) => new THREE.Color(c));
    const dummy = new THREE.Object3D();
    interface Piece {
      theta: number;
      phi: number;
      lift: number;
      vy: number;
      delay: number;
      scale: number;
      rx: number;
      ry: number;
      rz: number;
      sx: number;
      sy: number;
      sz: number;
      landed: boolean;
    }
    const pieces: Piece[] = [];
    const phiMax = 1.08;
    for (let k = 0; k < count; k += 1) {
      pieces.push({
        theta: rand() * Math.PI * 2,
        phi: Math.acos(1 - rand() * (1 - Math.cos(phiMax))),
        // sprinkled from a hand just above the scoop, not dropped from the sky
        lift: this.reducedMotion ? 0 : 1.4 + rand() * 2,
        vy: 0,
        delay: this.reducedMotion ? 0 : rand() * 0.6,
        scale: (flakes ? 0.03 : boxy ? 0.05 : 0.045) + rand() * (flakes ? 0.026 : 0.045),
        rx: rand() * 6,
        ry: rand() * 6,
        rz: rand() * 6,
        sx: (rand() - 0.5) * 10,
        sy: (rand() - 0.5) * 10,
        sz: (rand() - 0.5) * 10,
        landed: this.reducedMotion,
      });
      const color = colors[Math.floor(rand() * colors.length)] ?? new THREE.Color('#ffffff');
      mesh.setColorAt(k, color.clone().offsetHSL(0, 0, (rand() - 0.5) * 0.06));
    }
    container.add(mesh);

    const writeMatrix = (k: number, p: Piece, hidden: boolean) => {
      const R = 1.006;
      const x = R * Math.sin(p.phi) * Math.sin(p.theta);
      const z = R * Math.sin(p.phi) * Math.cos(p.theta);
      const y = 0.95 * R * Math.cos(p.phi) + p.lift;
      dummy.position.set(x, y, z);
      dummy.rotation.set(p.rx, p.ry, p.rz);
      dummy.scale.setScalar(hidden ? 0 : p.scale);
      if (flakes) dummy.scale.y *= 0.55;
      dummy.updateMatrix();
      mesh.setMatrixAt(k, dummy.matrix);
    };

    pieces.forEach((p, k) => writeMatrix(k, p, !this.reducedMotion));
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    return {
      object: mesh,
      update: (dt) => {
        let active = false;
        pieces.forEach((p, k) => {
          if (p.landed) return;
          if (p.delay > 0) {
            p.delay -= dt;
            active = true;
            return;
          }
          // light things fall slowly and tumble; they stick on contact (no bounce)
          p.vy -= 14 * dt;
          p.vy = Math.max(p.vy, -4.5);
          p.lift += p.vy * dt;
          p.rx += p.sx * dt;
          p.ry += p.sy * dt;
          p.rz += p.sz * dt;
          if (p.lift <= 0) {
            p.lift = 0;
            p.landed = true;
          } else {
            active = true;
          }
          writeMatrix(k, p, false);
        });
        mesh.instanceMatrix.needsUpdate = true;
        return active;
      },
      dispose: () => {
        container.remove(mesh);
        geometry.dispose();
        material.dispose();
        mesh.dispose();
      },
    };
  }

  private createSauce(container: THREE.Group, color: string, cherry: boolean, seed: number): Topping {
    const cap = buildSauceCap(seed);
    const material = new THREE.MeshPhysicalMaterial({
      color,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });
    const mesh = new THREE.Mesh(cap.geometry, material);
    mesh.castShadow = false;
    mesh.frustumCulled = false;
    container.add(mesh);

    let t = this.reducedMotion ? 10 : 0;
    cap.setGrow(this.reducedMotion ? 1 : 0.01);

    let cherryGroup: THREE.Group | null = null;
    const cherryParts: Array<{ dispose(): void }> = [];
    const CHERRY_REST_Y = 1.02;
    if (cherry) {
      cherryGroup = new THREE.Group();
      const ballGeo = new THREE.SphereGeometry(0.2, 28, 20);
      const ballMat = new THREE.MeshPhysicalMaterial({
        color: '#560d1d',
        roughness: 0.22,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
      });
      const ball = new THREE.Mesh(ballGeo, ballMat);
      ball.scale.set(1, 0.92, 1);
      ball.castShadow = true;
      const stemGeo = new THREE.CylinderGeometry(0.012, 0.016, 0.36, 8);
      const stemMat = new THREE.MeshStandardMaterial({ color: '#5a3d1e', roughness: 0.8 });
      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.set(0.05, 0.3, 0);
      stem.rotation.z = -0.35;
      cherryGroup.add(ball, stem);
      cherryGroup.position.set(0.04, this.reducedMotion ? CHERRY_REST_Y : CHERRY_REST_Y + 1.1, 0.02);
      cherryGroup.visible = this.reducedMotion;
      container.add(cherryGroup);
      cherryParts.push(ballGeo, ballMat, stemGeo, stemMat);
    }

    return {
      object: mesh,
      update: (dt) => {
        t += dt;
        // the sauce flows down the scoop and sets
        const g = easeOutCubic(Math.min(1, t / 1.4));
        let active = g < 1;
        if (g < 1 || t < 1.5) cap.setGrow(Math.max(0.01, g));
        if (cherryGroup && t > 0.9) {
          // the cherry is set down gently on the sauce
          const q = Math.min(1, (t - 0.9) / 0.45);
          cherryGroup.visible = true;
          cherryGroup.position.y = CHERRY_REST_Y + 1.1 * (1 - easeOutCubic(q));
          if (q < 1) active = true;
        } else if (cherryGroup) {
          active = true;
        }
        return active;
      },
      dispose: () => {
        container.remove(mesh);
        cap.geometry.dispose();
        material.dispose();
        if (cherryGroup) container.remove(cherryGroup);
        for (const item of cherryParts) item.dispose();
      },
    };
  }

  /** "Biscoito da casa" slid into the top scoop of the Copinho de Ensaio. */
  private createWafer(container: THREE.Group): Topping {
    const geometry = new THREE.BoxGeometry(0.95, 0.07, 0.55);
    const material = new THREE.MeshStandardMaterial({
      map: this.waffle.map,
      bumpMap: this.waffle.bump,
      bumpScale: 1.5,
      roughness: 0.8,
    });
    const wafer = new THREE.Mesh(geometry, material);
    wafer.rotation.set(0.18, 0.5, -0.6);
    wafer.castShadow = true;
    const holder = new THREE.Group();
    holder.add(wafer);
    const rest = new THREE.Vector3(0.42, 0.86, 0.12);
    const from = new THREE.Vector3(1.5, 1.9, 0.3);
    holder.position.copy(this.reducedMotion ? rest : from);
    holder.visible = this.reducedMotion;
    container.add(holder);

    let t = this.reducedMotion ? 10 : 0;
    return {
      object: holder,
      update: (dt) => {
        t += dt;
        if (t < 0.25) return true;
        const q = Math.min(1, (t - 0.25) / 0.55);
        holder.visible = true;
        holder.position.lerpVectors(from, rest, easeOutCubic(q));
        return q < 1;
      },
      dispose: () => {
        container.remove(holder);
        geometry.dispose();
        material.dispose();
      },
    };
  }

  /* ---------------------------------------------------------------- */
  /* Frame update                                                      */
  /* ---------------------------------------------------------------- */

  /** Returns true while anything is moving (used to idle when reduced-motion). */
  private update(dt: number): boolean {
    this.time += dt;
    let animating = false;

    // --- turntable
    if (this.dragging) {
      animating = true;
    } else {
      this.yaw += this.spinVel * dt;
      this.spinVel *= Math.exp(-2.2 * dt);
      if (Math.abs(this.spinVel) < 0.02) this.spinVel = 0;
      const idle = this.time - this.lastInteraction > 1.4;
      if (idle && !this.reducedMotion) this.yaw += 0.3 * dt;
      if (this.spinVel !== 0) animating = true;
    }
    this.turntable.rotation.y = this.yaw;

    // --- assemblies
    const bob = this.reducedMotion ? 0 : Math.sin(this.time * 1.5) * 0.06;
    this.shadow.scale.setScalar(1 - bob * 0.9);

    for (let i = this.leavingAssemblies.length - 1; i >= 0; i -= 1) {
      const old = this.leavingAssemblies[i]!;
      old.leaveT += dt;
      const p = Math.min(1, old.leaveT / 0.55);
      old.root.position.y = -easeInCubic(p) * RISE_DIST + bob;
      animating = true;
      if (p >= 1) {
        this.removeAssembly(old);
        this.leavingAssemblies.splice(i, 1);
      }
    }

    if (this.assembly && this.updateAssembly(this.assembly, dt, bob)) animating = true;
    return animating;
  }

  private updateAssembly(assembly: Assembly, dt: number, bob: number): boolean {
    let animating = false;

    // vessel glides up into place (no overshoot)
    if (assembly.riseWait > 0) {
      assembly.riseWait -= dt;
      animating = true;
    } else if (assembly.rise < 1) {
      assembly.rise = Math.min(1, assembly.rise + dt / 0.85);
      animating = true;
    }
    stepSpring(assembly.bump, 0, 180, 30, dt);
    if (Math.abs(assembly.bump.x) > 0.001 || Math.abs(assembly.bump.v) > 0.01) animating = true;
    assembly.root.position.y =
      bob + assembly.bump.x - (1 - easeOutCubic(assembly.rise)) * RISE_DIST;

    for (let i = assembly.scoops.length - 1; i >= 0; i -= 1) {
      const e = assembly.scoops[i]!;

      if (e.phase !== 'taking' && e.targetDelay > 0) {
        e.targetDelay -= dt;
        if (e.targetDelay <= 0) e.targetY = e.pendingTargetY;
      } else if (e.phase !== 'taking' && e.targetY !== e.pendingTargetY) {
        e.targetY = e.pendingTargetY;
      }

      if (e.phase === 'waiting') {
        animating = true;
        if (assembly.rise > 0.88) e.wait -= dt;
        if (e.wait <= 0 && assembly.rise > 0.88) {
          e.phase = 'scooping';
          e.t = 0;
          e.rig = this.createRig(e.side);
          // Fall through to the 'scooping' case below so the very first frame already has the
          // ball and tool in their starting pose (nothing flashes at the origin).
          e.group.visible = true;
        }
      }

      switch (e.phase) {
        case 'scooping': {
          animating = true;
          e.t += dt;
          const pose = placePose(Math.min(e.t, PLACE_TOTAL));
          if (pose.pressed && !e.pressed) {
            e.pressed = true;
            this.onPress(assembly, e);
          }
          if (pose.released) e.landed = true;
          this.applyPose(assembly, e, pose);
          if (e.t >= PLACE_TOTAL) {
            e.phase = 'resting';
            e.landed = true;
            this.dropRig(e);
          }
          break;
        }

        case 'resting':
          // Viscous settling: critically damped, never overshoots.
          if (Math.abs(e.y - e.targetY) > 1e-4 || Math.abs(e.vy) > 1e-3) {
            e.vy += (-70 * (e.y - e.targetY) - 17 * e.vy) * dt;
            e.y += e.vy * dt;
            animating = true;
          } else {
            e.y = e.targetY;
            e.vy = 0;
          }
          e.squashTarget = this.restSquash(assembly, e);
          e.yRel = 0;
          e.group.position.x = 0;
          e.group.position.z = 0;
          break;

        case 'taking': {
          animating = true;
          e.t += dt;
          if (e.t >= (e.takeKind === 'side' ? SIDE_TOTAL : TAKE_TOTAL)) {
            this.removeScoop(assembly, e);
            continue;
          }
          this.applyPose(assembly, e, this.takePoseFor(e));
          break;
        }
      }

      // The collar droops over the ball below once this ball is pressed onto it.
      const drapeTarget =
        e.index > 0 && (e.phase === 'resting' || (e.phase === 'scooping' && e.pressed)) ? 1 : 0;
      if (this.reducedMotion) {
        e.squash.x = e.squashTarget;
        e.squash.v = 0;
        e.drape.x = drapeTarget;
        e.drape.v = 0;
      }
      stepSpring(e.squash, e.squashTarget, 130, 26, dt);
      stepSpring(e.drape, drapeTarget, 45, 14, dt);
      if (Math.abs(e.squash.x - e.squashTarget) > 0.002 || Math.abs(e.squash.v) > 0.02) animating = true;
      if (Math.abs(e.drape.x - drapeTarget) > 0.004 || Math.abs(e.drape.v) > 0.02) animating = true;
      if (e.mesh.morphTargetInfluences) {
        e.mesh.morphTargetInfluences[0] = Math.min(1, Math.max(0, e.drape.x));
      }

      // squash about the base so the ball presses into what is under it
      const sy = 1 + e.squash.x;
      const sxz = 1 - 0.55 * e.squash.x;
      e.group.scale.set(sxz, sy, sxz);
      e.group.position.y = e.y + e.yRel + SCOOP_BASE * (sy - 1);
    }

    this.syncToppings(assembly);
    for (const e of assembly.scoops) {
      if (e.topping && e.topping.update(dt)) animating = true;
    }
    return animating;
  }

  /**
   * Toppings live on the top scoop. They are (re)built once that scoop has been released by the
   * tool, and dropped as soon as a new scoop is added on top or the catalyst changes. A ball that
   * is being taken away keeps its topping with it.
   */
  private syncToppings(assembly: Assembly): void {
    if (!this.state) return;
    let top: ScoopEntity | null = null;
    for (const e of assembly.scoops) {
      if (e.phase === 'taking') continue;
      if (!top || e.index > top.index) top = e;
    }

    for (const e of assembly.scoops) {
      if (e.phase === 'taking') continue;
      const key = e === top && e.landed ? `${e.id}|${this.state.catalystId}` : '';
      if (key === e.toppingKey) continue;
      e.topping?.dispose();
      e.topping = null;
      e.toppingKey = key;
      if (key) e.topping = this.createTopping(e, this.state.catalystId, assembly.vesselId);
    }
  }

  /**
   * Resting squash of a ball: pressed gelato slumps a little, and a ball carrying others on top
   * is flatter and wider than the one on the very top.
   */
  private restSquash(assembly: Assembly, e: ScoopEntity): number {
    let above = 0;
    for (const o of assembly.scoops) {
      if (o === e || o.index <= e.index) continue;
      if (o.phase === 'resting' || (o.phase === 'scooping' && o.pressed)) above += 1;
    }
    return REST_SQUASH - 0.025 * above - (e.index > 0 ? 0.025 : 0);
  }

  /** The ball being pressed on makes everything under it (and the vessel) sink a hair. */
  private onPress(assembly: Assembly, pressed: ScoopEntity): void {
    for (const other of assembly.scoops) {
      if (other.phase === 'taking' || other.index >= pressed.index) continue;
      other.squash.v -= 0.35;
    }
    assembly.bump.v -= 1.6;
  }

  private removeScoop(assembly: Assembly, e: ScoopEntity): void {
    e.topping?.dispose();
    e.topping = null;
    this.dropRig(e);
    assembly.root.remove(e.group);
    const at = assembly.scoops.indexOf(e);
    if (at >= 0) assembly.scoops.splice(at, 1);
  }

  private removeAssembly(assembly: Assembly): void {
    for (const e of [...assembly.scoops]) {
      e.topping?.dispose();
      e.topping = null;
      this.dropRig(e);
    }
    this.turntable.remove(assembly.root);
    assembly.root.traverse((obj) => {
      const own = obj.userData.ownDisposables as Array<{ dispose(): void }> | undefined;
      if (own) for (const item of own) item.dispose();
      if (obj instanceof THREE.InstancedMesh) obj.dispose();
    });
    if (this.assembly === assembly) this.assembly = null;
  }

  /* ---------------------------------------------------------------- */
  /* Layout for HTML callouts                                          */
  /* ---------------------------------------------------------------- */

  private emitLayout(): void {
    if (!this.state) return;
    this.camera.updateMatrixWorld();
    const top = VESSEL_TOP[this.state.vesselId];
    const v = new THREE.Vector3();
    const points: LayoutPoint[] = this.state.scoops.map((_, index) => {
      v.set(1.18, scoopRestY(top, index) + 0.12, 0).project(this.camera);
      return { x: (v.x * 0.5 + 0.5) * 100, y: (-v.y * 0.5 + 0.5) * 100 };
    });
    this.options.onLayout(points);
  }
}
