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
  'cocco-mango-cioccolato': {
    base: '#f3ece0',
    light: '#fbf6ee',
    dark: '#ddd2c0',
    swirl: '#f2a93b',
    bits: [{ color: '#3a1d10', count: 45, size: [2, 4], shape: 'chunk' }],
  },
  baunilha: {
    base: '#f1e3c2',
    light: '#f8eed8',
    dark: '#d9c69c',
    bits: [{ color: '#3b2a1e', count: 70, size: [0.8, 1.6], shape: 'dot' }],
  },
  'doppio-di-latte': {
    base: '#d9a56a',
    light: '#e6bd8a',
    dark: '#bd8650',
    swirl: '#a8692e',
  },
  'creme-de-la-crema': {
    base: '#f5e3a8',
    light: '#fbefc8',
    dark: '#dcc581',
  },
  'milho-doro': {
    base: '#f2d675',
    light: '#f8e59e',
    dark: '#d9b94f',
    bits: [{ color: '#e8bf3a', count: 30, size: [1.5, 3], shape: 'dot' }],
  },
  'brigadeiro-limao-siciliano': {
    base: '#f4f1dc',
    light: '#fbf9ee',
    dark: '#dcd7b5',
    bits: [{ color: '#e8c63a', count: 55, size: [1, 2.5], shape: 'dot' }],
  },
  'fior-di-canella': {
    base: '#e3c9a4',
    light: '#eedbbd',
    dark: '#c7a77d',
    bits: [{ color: '#8a5a35', count: 70, size: [1, 2.4], shape: 'dot' }],
  },
  'pina-colada': {
    base: '#f6e7a8',
    light: '#fbf1c8',
    dark: '#e0cc7c',
    bits: [
      { color: '#e9b93a', count: 25, size: [2.5, 4.5], shape: 'chunk' },
      { color: '#fffaf0', count: 30, size: [1.5, 3], shape: 'chunk' },
    ],
  },
  stracciatella: {
    base: '#f5efe3',
    light: '#fbf8f0',
    dark: '#e0d6c4',
    bits: [{ color: '#2e180d', count: 60, size: [2, 4.5], shape: 'chunk' }],
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
