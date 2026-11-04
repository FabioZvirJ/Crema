export type FlavorCategory =
  | 'todos'
  | 'gelatos'
  | 'sorbets'
  | 'especiais'
  | 'cafes';

export type BotanicalMotif =
  | 'pistachio'
  | 'cacao'
  | 'berries'
  | 'lemon'
  | 'caramel'
  | 'amarena';

export interface FlavorItem {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly ingredientsText: string;
  readonly category: Exclude<FlavorCategory, 'todos'>;
  readonly secondaryCategories?: ReadonlyArray<Exclude<FlavorCategory, 'todos'>>;
  readonly image: string;
  readonly homeImage?: string;
  readonly motif: BotanicalMotif;
  readonly featuredOnHome?: boolean;
  readonly dietaryBadges: ReadonlyArray<string>;
  readonly pairingNote: string;
  readonly story: string;
}

export interface UnitFeatureTag {
  readonly icon: 'store' | 'home' | 'paw' | 'bag' | 'gelato' | 'pin' | 'building' | 'coffee';
  readonly label: string;
}

export interface LocationUnit {
  readonly id: 'batel' | 'barigui' | 'mueller';
  readonly headerLabel: string;
  readonly name: string;
  readonly address: string;
  readonly hoursPrimary: string;
  readonly hoursSecondary?: string;
  readonly image: string;
  readonly tags: ReadonlyArray<UnitFeatureTag>;
  readonly mapsUrl: string;
  readonly mapPinCode: 'B' | 'C' | 'M';
  readonly mapCoords: { readonly x: number; readonly y: number };
}

export interface HeroSlide {
  readonly indexLabel: string;
  readonly eyebrow: string;
  readonly titleLine1: string;
  readonly titleLine2: string;
  readonly description: string;
  readonly ctaLabel: string;
  readonly ctaRoute: '/sabores' | '/unidades' | '/contato' | '/sobre';
}

export interface ValueProposition {
  readonly id: string;
  readonly icon: 'leaf' | 'flask' | 'heart' | 'star';
  readonly title: string;
  readonly description: string;
}

export interface InstagramItem {
  readonly id: string;
  readonly image: string;
  readonly alt: string;
  readonly caption: string;
}

export interface EventFaqCard {
  readonly id: string;
  readonly title: string;
  readonly description: string;
}

export interface BlogArticle {
  readonly id: string;
  readonly category: string;
  readonly title: string;
  readonly excerpt: string;
  readonly readTime: string;
  readonly date: string;
  readonly image: string;
}

