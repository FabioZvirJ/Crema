/**
 * Visual identity of every scoop and topping in the Lab, in one place, so the 3D scene,
 * the mini scoops on the reagent cards and the flat fallback all share the same palette
 * (one illustrated style instead of mixing photos with vector art).
 *
 * This file is data-only (no three.js) so it can be imported eagerly without pulling the
 * 3D chunk into the main bundle.
 */

type BitShape = 'dot' | 'chunk';

export interface FlavorBit {
  readonly color: string;
  /** Rough number of inclusions painted over the 512×256 scoop texture. */
  readonly count: number;
  /** Min / max size in texture pixels. */
  readonly size: readonly [number, number];
  readonly shape: BitShape;
}

export interface FlavorLook {
  readonly base: string;
  /** Lighter tone used for scooper streaks and the highlight of the mini scoop. */
  readonly light: string;
  /** Darker tone used for streaks and the shadow side of the mini scoop. */
  readonly dark: string;
  readonly bits?: ReadonlyArray<FlavorBit>;
  /** Optional ribbon (caramel, coffee cream, amarena syrup…) swirled through the scoop. */
  readonly swirl?: string;
}

const DEFAULT_LOOK: FlavorLook = {
  base: '#e9d7b8',
  light: '#f4e8d0',
  dark: '#cdb88f',
};

const FLAVOR_LOOKS: Readonly<Record<string, FlavorLook>> = Object.freeze({
  pistacchio: {
    base: '#a5b878',
    light: '#bccb92',
    dark: '#8a9d5e',
    bits: [
      { color: '#6f8a45', count: 90, size: [1.5, 3.2], shape: 'dot' },
      { color: '#d8c48a', count: 38, size: [2.5, 4.5], shape: 'chunk' },
      { color: '#4f6a2d', count: 34, size: [1.5, 3], shape: 'dot' },
    ],
  },
  cioccolato: {
    base: '#6b3d26',
    light: '#835033',
    dark: '#4d2a19',
    bits: [
      { color: '#3a1d10', count: 70, size: [1.5, 3.2], shape: 'dot' },
      { color: '#8f5b3b', count: 40, size: [1.5, 3], shape: 'dot' },
    ],
  },
  'frutas-vermelhas': {
    base: '#c23a62',
    light: '#d65a80',
    dark: '#a52a4f',
    bits: [
      { color: '#6b1a3a', count: 120, size: [1, 2.2], shape: 'dot' },
      { color: '#ee7a96', count: 30, size: [3, 5], shape: 'chunk' },
    ],
  },
  avocado: {
    base: '#b6c778',
    light: '#c9d78f',
    dark: '#9bae5f',
    bits: [{ color: '#8ea34e', count: 50, size: [1.5, 3], shape: 'dot' }],
  },
  nocciolotto: {
    base: '#bf9468',
    light: '#d1a87c',
    dark: '#a67b52',
    bits: [
      { color: '#e6cea6', count: 58, size: [2.5, 4.6], shape: 'chunk' },
      { color: '#7a4f2c', count: 60, size: [1.5, 3], shape: 'dot' },
    ],
  },
  'cuca-doce-de-leite': {
    base: '#e0a85c',
    light: '#edbf7a',
    dark: '#c88d41',
    swirl: '#b86f2a',
    bits: [{ color: '#f5dfa6', count: 55, size: [3, 5.5], shape: 'chunk' }],
  },
  'fior-di-menta-cioccolato': {
    base: '#a8e0c4',
    light: '#c0efd6',
    dark: '#8ccbab',
    bits: [{ color: '#3a2216', count: 70, size: [2, 4.2], shape: 'chunk' }],
  },
  mandarino: {
    base: '#f6a640',
    light: '#ffbd60',
    dark: '#e48c27',
    bits: [{ color: '#ffd38c', count: 60, size: [1, 2.4], shape: 'dot' }],
  },
  'manha-viva': {
    base: '#f4a233',
    light: '#fdb957',
    dark: '#e08a24',
    swirl: '#e9742a',
    bits: [{ color: '#ffd76e', count: 46, size: [1, 2.4], shape: 'dot' }],
  },
  limonello: {
    base: '#f3e472',
    light: '#faef96',
    dark: '#dccd54',
    bits: [{ color: '#fff7bd', count: 50, size: [1, 2.4], shape: 'dot' }],
  },
  'batidinha-maracuja': {
    base: '#f8cb4a',
    light: '#fcdb71',
    dark: '#e3b534',
    bits: [{ color: '#3b2b1a', count: 90, size: [1.2, 2.2], shape: 'dot' }],
  },
  'uva-terci': {
    base: '#8b5fa6',
    light: '#a279bd',
    dark: '#744a8d',
    bits: [{ color: '#5a3472', count: 40, size: [1.5, 3], shape: 'dot' }],
  },
  'mango-lab': {
    base: '#f7b53e',
    light: '#fcc861',
    dark: '#e69f29',
    bits: [{ color: '#6f9a4a', count: 36, size: [2, 3.6], shape: 'chunk' }],
  },
  'acerola-lemongrass': {
    base: '#ee5a4a',
    light: '#f87b6a',
    dark: '#d3443a',
    bits: [{ color: '#bcd672', count: 40, size: [1.5, 3], shape: 'dot' }],
  },
  'caffe-della-casa': {
    base: '#9b7355',
    light: '#b28b68',
    dark: '#7e5a3f',
    swirl: '#dcc3a4',
    bits: [{ color: '#4a2e1c', count: 50, size: [1.5, 3], shape: 'dot' }],
  },
  'zucca-caramellata': {
    base: '#e2873a',
    light: '#f0a257',
    dark: '#c96f29',
    bits: [{ color: '#7b4a22', count: 45, size: [3, 5], shape: 'chunk' }],
  },
  'foresta-nera': {
    base: '#efe0cb',
    light: '#f7ecdb',
    dark: '#d6c3a7',
    swirl: '#8e1c34',
    bits: [{ color: '#3b2016', count: 70, size: [2.5, 5], shape: 'chunk' }],
  },
});

export function getFlavorLook(flavorId: string): FlavorLook {
  return FLAVOR_LOOKS[flavorId] ?? DEFAULT_LOOK;
}

type ToppingKind = 'none' | 'crumbs' | 'sauce' | 'flakes';

interface CatalystLook {
  readonly kind: ToppingKind;
  /** Palette: crumbs/flakes pick randomly from it, sauce uses the first colour. */
  readonly colors: ReadonlyArray<string>;
  /** Amarena gets a cherry on top. */
  readonly cherry?: boolean;
}

const CATALYST_LOOKS: Readonly<Record<string, CatalystLook>> = Object.freeze({
  'farofinha-pistache': { kind: 'crumbs', colors: ['#8ba870', '#6f8a45', '#d8c48a', '#a4bd7e'] },
  'gianduia-quente': { kind: 'sauce', colors: ['#3a1b10'] },
  'reducao-amarena': { kind: 'sauce', colors: ['#7a1228'], cherry: true },
  'crumble-speculoos': { kind: 'crumbs', colors: ['#b8733e', '#9a5a2a', '#cf9158', '#7d4521'] },
  'flor-de-sal': { kind: 'flakes', colors: ['#fffaf0', '#ece4d6', '#ffffff'] },
  puro: { kind: 'none', colors: [] },
});

export function getCatalystLook(catalystId: string): CatalystLook {
  return CATALYST_LOOKS[catalystId] ?? { kind: 'none', colors: [] };
}
