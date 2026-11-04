import type {
  BlogArticle,
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
    image: '/assets/images/real/novos-sabores-1.png',
    alt: 'Colherada de gelato artesanal de chocolate com avelãs no laboratório da Crema Lab',
    caption: 'Bastidores do nosso laboratório: produção diária em pequenos lotes.',
  },
  {
    id: 'ig-2',
    image: '/assets/images/real/salao-juan.png',
    alt: 'Ambiente interno da Crema Lab em Curitiba com identidade visual na parede',
    caption: 'Gelato é pausa, é encontro, é vida.',
  },
  {
    id: 'ig-3',
    image: '/assets/images/real/loja-mueller.jpg',
    alt: 'Fachada iluminada da Crema Lab com letreiro neon e azulejos de terracota',
    caption: 'Nossa arquitetura em tons de terracota esperando por você.',
  },
  {
    id: 'ig-4',
    image: '/assets/images/real/fachada-batel-juan.png',
    alt: 'Fachada da matriz Crema Lab no Batel em Curitiba fotografada por Juan Azevedo',
    caption: 'Três endereços em Curitiba: Batel, Barigui e Mueller.',
  },
  {
    id: 'ig-5',
    image: '/assets/images/real/pistacchio-creminio.jpg',
    alt: 'Casquinha artesanal Crema Lab de Pistacchio segurada na mão',
    caption: 'Pistacchio tostado autoral: o grande clássico do nosso laboratório.',
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

export const BLOG_ARTICLES: ReadonlyArray<BlogArticle> = Object.freeze([
  {
    id: 'brescia-curitiba',
    category: 'TRAJETÓRIA & TÉCNICA',
    title: 'De Brescia a Curitiba: a ciência e a poesia do verdadeiro gelato italiano',
    excerpt:
      'Descubra como o balanceamento rigoroso de açúcares, fibras e gorduras naturais cria uma textura aveludada e menos congelada que o sorvete tradicional.',
    readTime: '4 min de leitura',
    date: 'Outubro 2025',
    image: '/assets/images/real/novos-sabores-1.png',
  },
  {
    id: 'pistache-tostado',
    category: 'INGREDIENTES REAIS',
    title: 'Por que tostamos e moemos ingredientes reais em pequenos lotes?',
    excerpt:
      'Sem corantes nem aromatizantes sintéticos: a cor suave e o sabor profundo do nosso Pistacchio vêm exclusivamente da semente nobre.',
    readTime: '3 min de leitura',
    date: 'Outubro 2025',
    image: '/assets/images/real/pistacchio-creminio.jpg',
  },
  {
    id: 'gelato-e-cafe',
    category: 'EXPERIÊNCIAS',
    title: 'A arte do Affogato: quando o café especial encontra o gelato artesanal',
    excerpt:
      'O contraste térmico entre um espresso extraído na hora e uma bola de Fior di Latte ou Doce de Leite transforma a pausa da tarde.',
    readTime: '3 min de leitura',
    date: 'Setembro 2025',
    image: '/assets/images/real/cafe-juan.png',
  },
]);

