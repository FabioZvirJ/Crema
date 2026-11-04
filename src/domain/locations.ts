import type { LocationUnit } from './types';

export const CURITIBA_UNITS: ReadonlyArray<LocationUnit> = Object.freeze([
  {
    id: 'batel',
    headerLabel: 'BATEL',
    name: 'Unidade Batel',
    address: 'Rua Deputado Antônio Baby, 18 - Batel, Curitiba - PR',
    hoursPrimary: 'Terça a Sábado das 11h às 22h |',
    image: '/assets/images/real/fachada-batel-juan.png',
    imagePosition: '50% 40%',
    tags: [
      { icon: 'store', label: 'Loja de Rua' },
      { icon: 'home', label: 'Espaço Acolhedor' },
      { icon: 'paw', label: 'Pet Friendly' },
    ],
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Rua+Deputado+Antonio+Baby+18+Batel+Curitiba+PR',
    mapPinCode: 'B',
    mapCoords: { x: 43, y: 27 },
  },
  {
    id: 'barigui',
    headerLabel: 'PARKSHOPPINGBARIGUI',
    name: 'ParkShoppingBarigui',
    address: 'Rua Prof. Pedro Viriato Parigot de Souza, 600 - Mossunguê, Curitiba - PR',
    hoursPrimary: 'Segunda a Sábado das 10h às 22h |',
    hoursSecondary: 'Domingo das 12h às 20h',
    tags: [
      { icon: 'bag', label: 'Shopping L3' },
      { icon: 'gelato', label: 'Gelatos e Cafés' },
    ],
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=ParkShoppingBarigui+Curitiba+PR',
    mapPinCode: 'C',
    mapCoords: { x: 56, y: 39 },
  },
  {
    id: 'mueller',
    headerLabel: 'SHOPPING MUELLER',
    name: 'Shopping Mueller',
    address: 'Av. Cândido de Abreu, 127 - Centro Cívico (Piso L2), Curitiba - PR',
    hoursPrimary: 'Diariamente, das 10h às 22h',
    image: '/assets/images/real/loja-mueller.jpg',
    imagePosition: '50% 50%',
    tags: [
      { icon: 'pin', label: 'Novo Endereço' },
      { icon: 'building', label: 'Piso L2' },
      { icon: 'coffee', label: 'Cafés Especiais' },
    ],
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Shopping+Mueller+Curitiba+PR',
    mapPinCode: 'M',
    mapCoords: { x: 45, y: 63 },
  },
]);

export const EXPERIENCE_GALLERY = Object.freeze([
  {
    id: 'exp-1',
    image: '/assets/images/real/salao-juan.png',
    title: 'Arquitetura & Aconchego',
    alt: 'Ambiente interno acolhedor da Crema Lab com piso em mosaico e parede assinada pela chef Harlen Brandão',
  },
  {
    id: 'exp-2',
    image: '/assets/images/real/interna-mahani.png',
    title: 'Fresco Todos os Dias',
    alt: 'Vitrine pozzetti italiana e arquitetura em arcos da Crema Lab em Curitiba',
  },
  {
    id: 'exp-3',
    image: '/assets/images/real/cafe-juan.png',
    title: 'Cafeteria Especial',
    alt: 'Café especial servido na cerâmica artesanal da Crema Lab',
  },
] as const);

