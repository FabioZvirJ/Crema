import type {
  EventFaqCard,
  HeroSlide,
  InstagramItem,
  ValueProposition,
} from './types';

export const HERO_SLIDES: ReadonlyArray<HeroSlide> = Object.freeze([
  {
    indexLabel: '01 / 04',
    eyebrow: 'GELATO ARTESANAL',
    titleLine1: 'Tradição italiana,',
    titleLine2: 'com alma brasileira.',
    description:
      'No nosso laboratório, criamos gelatos autorais com ingredientes selecionados, técnica italiana e muito afeto em cada detalhe.',
    ctaLabel: 'CONHEÇA NOSSOS SABORES',
    ctaRoute: '/sabores',
  },
  {
    indexLabel: '02 / 04',
    eyebrow: 'LABORATÓRIO DE SABORES',
    titleLine1: 'Pequenos lotes,',
    titleLine2: 'frescor absoluto.',
    description:
      'Produzimos diariamente sem conservantes ou pastas artificiais, respeitando o tempo natural de cada fruta, castanha e cacau.',
    ctaLabel: 'EXPLORAR CARDÁPIO',
    ctaRoute: '/sabores',
  },
  {
    indexLabel: '03 / 04',
    eyebrow: 'TRÊS ENDEREÇOS EM CURITIBA',
    titleLine1: 'Um refúgio de pausa,',
    titleLine2: 'café e aconchego.',
    description:
      'Visite nossas lojas no Batel, ParkShoppingBarigui e Shopping Mueller para viver a experiência completa de gelato e cafeteria.',
    ctaLabel: 'VER NOSSAS UNIDADES',
    ctaRoute: '/unidades',
  },
  {
    indexLabel: '04 / 04',
    eyebrow: 'CREMA LAB EM EVENTOS',
    titleLine1: 'Leve nosso carrinho',
    titleLine2: 'para sua celebração.',
    description:
      'Casamentos, eventos corporativos e comemorações íntimas com serviço completo e sabores personalizados pela nossa chef.',
    ctaLabel: 'SOLICITAR ORÇAMENTO',
    ctaRoute: '/contato',
  },
]);

export const VALUE_PROPOSITIONS: ReadonlyArray<ValueProposition> = Object.freeze([
  {
    id: 'ingredientes-reais',
    icon: 'leaf',
    title: 'INGREDIENTES REAIS',
    description: 'Selecionados com cuidado.',
  },
  {
    id: 'processo-artesanal',
    icon: 'flask',
    title: 'PROCESSO ARTESANAL',
    description: 'Feito em pequenos lotes.',
  },
  {
    id: 'sabores-autorais',
    icon: 'heart',
    title: 'SABORES AUTORAIS',
    description: 'Criações que surpreendem.',
  },
  {
    id: 'experiencias-unicas',
    icon: 'star',
    title: 'EXPERIÊNCIAS ÚNICAS',
    description: 'Gelato, café e muito mais.',
  },
]);

export const INSTAGRAM_FEED: ReadonlyArray<InstagramItem> = Object.freeze([
  {
    id: 'ig-1',
    image: '/assets/images/real/carreto-eventos-1.webp',
    alt: 'Carretino Crema Lab e fachada em micélio desenvolvidos com o Furf Design Studio',
    caption: 'Carretino e arquitetura em micélio no Batel: design e gelato artesanal.',
  },
  {
    id: 'ig-2',
    image: '/assets/images/real/salao-juan.webp',
    alt: 'Ambiente interno da Crema Lab em Curitiba com identidade visual na parede',
    caption: 'Gelato é pausa, é encontro, é vida.',
  },
  {
    id: 'ig-3',
    image: '/assets/images/real/cremalab-outubro.webp',
    alt: 'Copinho artesanal Crema Lab com gelato sazonal de Zucca Caramellata',
    caption: 'Edições sazonais em pequenos lotes no nosso laboratório.',
  },
  {
    id: 'ig-4',
    image: '/assets/images/real/interna-mahani.webp',
    alt: 'Ambiente interno e vitrine de pozzetti italianos da Crema Lab em Curitiba',
    caption: 'Três endereços em Curitiba: Batel, Barigui e Mueller.',
  },
  {
    id: 'ig-5',
    image: '/assets/images/real/cafe-juan.webp',
    alt: 'Café especial com arte na espuma servido na Crema Lab em Curitiba',
    caption: 'Gelato artesanal, cafés especiais e experiências no coração de Curitiba.',
  },
]);

export const EVENT_FAQ_CARDS: ReadonlyArray<EventFaqCard> = Object.freeze([
  {
    id: 'carrinho-eventos',
    title: 'Como funciona o carrinho para eventos?',
    description:
      'Como funciona o carrinho para eventos? Conheça nosso orçamento personalizado com serviço completo, casquinhas e copinhos para eventos!',
  },
  {
    id: 'encomendas-viagem',
    title: 'Encomendas para viagem e potes térmicos',
    description:
      'Encomendas para viagem e potes térmicos, com estrutura completa para celebrações em família e eventos corporativos.',
  },
  {
    id: 'opcoes-sem-lactose',
    title: 'Opções sem lactose / veganas',
    description:
      'Opções sem lactose / veganas. Nossos sorbets de frutas e chocolate 70% são livres de laticínios e feitos com fruta pura.',
  },
]);

