import type { FlavorCategory, FlavorItem } from './types';

export interface FlavorCategoryOption {
  readonly id: FlavorCategory;
  readonly label: string;
  readonly sublabel?: string;
}

export const FLAVOR_CATEGORIES: ReadonlyArray<FlavorCategoryOption> = Object.freeze([
  { id: 'todos', label: 'TODOS' },
  { id: 'gelatos', label: 'GELATOS', sublabel: '(Básicos de Leite)' },
  { id: 'sorbets', label: 'SORBETS', sublabel: '(Sem Laticínios)' },
  { id: 'especiais', label: 'ESPECIAIS DO LAB' },
  { id: 'cafes', label: 'CAFÉS & AFINS' },
]);

export const FLAVORS_CATALOG: ReadonlyArray<FlavorItem> = Object.freeze([
  {
    id: 'pistacchio',
    name: 'PISTACCHIO',
    description: 'Gelato de pistache italiano tostado, com pedaços.',
    ingredientsText: 'Ingredientes: pistache, pedaços de pistache',
    category: 'gelatos',
    secondaryCategories: ['especiais'],
    image: '/assets/images/flavor-pistacchio.png',
    homeImage: '/assets/images/scoop-pistacchio-home.png',
    motif: 'pistachio',
    featuredOnHome: true,
    dietaryBadges: ['Sem Glúten', 'Pistache Italiano'],
    pairingNote: 'Harmoniza perfeitamente com nosso Espresso Duplo ou Casquinha Artesanal.',
    story:
      'Produzido com pasta pura de pistaches italianos levemente tostados no nosso laboratório e finalizado com crocante de pistache selecionado.',
  },
  {
    id: 'cioccolato-fondente',
    name: 'CIOCCOLATO FONDENTE',
    description: 'Chocolate 70% intenso e cremoso.',
    ingredientsText: 'Ingredientes: cacau, chocolate 70%',
    category: 'sorbets',
    secondaryCategories: ['gelatos', 'especiais'],
    image: '/assets/images/flavor-cioccolato.png',
    homeImage: '/assets/images/scoop-cioccolato-home.png',
    motif: 'cacao',
    featuredOnHome: true,
    dietaryBadges: ['Vegano', 'Sem Lactose', 'Cacau 70%'],
    pairingNote: 'Intenso e aveludado, ideal acompanhado de Limone Siciliano ou Frutti di Bosco.',
    story:
      'Elaborado em base de água purificada com blend de cacau alcalino e chocolate 70% de origem, entregando textura cremosa sem adição de laticínios.',
  },
  {
    id: 'frutti-di-bosco',
    name: 'FRUTTI DI BOSCO',
    description: 'Sorvete de frutas vermelhas silvestres, fresco e vibrante.',
    ingredientsText: 'Ingredientes: amora, framboesa, mirtilo',
    category: 'sorbets',
    image: '/assets/images/flavor-frutti-di-bosco.png',
    homeImage: '/assets/images/scoop-frutti-home.png',
    motif: 'berries',
    featuredOnHome: true,
    dietaryBadges: ['Vegano', 'Sem Lactose', '100% Fruta Natural'],
    pairingNote: 'Contraste clássico com Fior di Latte ou Cioccolato Fondente.',
    story:
      'Feito diariamente com alta porcentagem de frutas vermelhas frescas — amoras, framboesas e mirtilos — preservando o frescor e a acidez equilibrada.',
  },
  {
    id: 'limone-siciliano',
    name: 'LIMONE SICILIANO',
    description: 'Sorbete de limão siciliano com toque de raspas.',
    ingredientsText: 'Ingredientes: limão siciliano, raspas de limão',
    category: 'sorbets',
    image: '/assets/images/flavor-limone.png',
    homeImage: '/assets/images/scoop-limone-home.png',
    motif: 'lemon',
    featuredOnHome: true,
    dietaryBadges: ['Vegano', 'Sem Lactose', 'Refrescante'],
    pairingNote: 'Excelente limpador de paladar ou combinado com Pistacchio.',
    story:
      'Suco fresco de limões sicilianos espremidos no dia e infusão a frio das raspas aromáticas para capturar os óleos essenciais cítricos.',
  },
  {
    id: 'doce-de-leite',
    name: 'DOCE DE LEITE',
    description: 'Gelato de doce de leite artesanal com mescla de caramelo.',
    ingredientsText: 'Ingredientes: doce de leite, caramelo artesanal',
    category: 'gelatos',
    secondaryCategories: ['especiais', 'cafes'],
    image: '/assets/images/flavor-doce-de-leite.png',
    motif: 'caramel',
    featuredOnHome: false,
    dietaryBadges: ['Receita Autoral', 'Sem Glúten'],
    pairingNote: 'Irresistível como Affogato no café especial ou com Cioccolato Fondente.',
    story:
      'A alma brasileira no nosso laboratório: doce de leite cozido lentamente no tacho e marmorizado com fios generosos de doce de leite puro.',
  },
  {
    id: 'fior-di-latte-amarena',
    name: 'FIOR DI LATTE COM AMARENA',
    description: 'Gelato de nata com calda de cerejas amarenas italianas.',
    ingredientsText: 'Ingredientes: nata, cerejas amarenas',
    category: 'especiais',
    secondaryCategories: ['gelatos', 'cafes'],
    image: '/assets/images/flavor-fior-di-latte.png',
    motif: 'amarena',
    featuredOnHome: false,
    dietaryBadges: ['Clássico Italiano', 'Cerejas Importadas'],
    pairingNote: 'Perfeito com Cappuccino Italiano ou em casquinha crocante feita na casa.',
    story:
      'A pureza do leite fresco e creme de leite batidos na técnica tradicional de Brescia, variegado com legítimas cerejas silvestres Amarena da Itália.',
  },
]);

