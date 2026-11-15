export type SeoAppRoute = '/' | '/sabores' | '/lab' | '/unidades' | '/contato' | '/sobre';

export interface RouteSeoMetadata {
  readonly title: string;
  readonly description: string;
  readonly keywords: string;
  readonly ogTitle: string;
  readonly ogDescription: string;
}

export const DEFAULT_SITE_URL = 'https://cremalab.com';

export const ROUTE_SEO: Readonly<Record<SeoAppRoute, RouteSeoMetadata>> = Object.freeze({
  '/': {
    title: 'crema lab | Gelato Artesanal, Café & Experiências em Curitiba',
    description:
      'Gelateria artesanal em Curitiba com tradição italiana e alma brasileira. Gelatos em pequenos lotes, sorbets e cafés especiais no Batel, ParkShoppingBarigui e Shopping Mueller.',
    keywords:
      'gelato artesanal curitiba, gelateria curitiba, crema lab, sorvete artesanal batel, gelato italiano curitiba, cafe especial curitiba',
    ogTitle: 'crema lab — Gelato Artesanal & Café em Curitiba',
    ogDescription:
      'Tradição italiana com alma brasileira. Conheça nossos gelatos feitos em pequenos lotes no Batel, ParkShoppingBarigui e Shopping Mueller.',
  },
  '/sabores': {
    title: 'Nossos Sabores de Gelato | crema lab Curitiba',
    description:
      'Explore os sabores autorais da Crema Lab em Curitiba: gelatos à base de leite, sorbets veganos de frutas frescas, edições especiais do laboratório e cafés.',
    keywords:
      'sabores de gelato curitiba, pistacchio gelato, sorbet vegano curitiba, cardapio crema lab, gelato de doce de leite',
    ogTitle: 'Nossos Sabores | crema lab Curitiba',
    ogDescription:
      'Gelatos autorais feitos todos os dias em pequenos lotes, sorbets sem laticínios e cafés especiais em Curitiba.',
  },
  '/lab': {
    title: 'Laboratório de Criação de Gelato | crema lab Curitiba',
    description:
      'Monte seu gelato personalizado no Laboratório Crema Lab: escolha casquinha artesanal ou copinho, combine até 3 sabores e gere sua fórmula de bancada.',
    keywords:
      'montar gelato curitiba, laboratorio de gelato, casquinha artesanal curitiba, crema lab experiencia',
    ogTitle: 'Laboratório de Criação | crema lab',
    ogDescription:
      'Combine bases, camadas de gelato artesanal e finalizações na bancada interativa da Crema Lab.',
  },
  '/unidades': {
    title: 'Nossas Lojas em Curitiba | Batel, Barigui e Mueller — crema lab',
    description:
      'Visite a Crema Lab em Curitiba: loja de rua pet friendly no Batel, ParkShoppingBarigui (Piso L3) e Shopping Mueller (Piso L2). Veja endereços, horários e mapa.',
    keywords:
      'crema lab batel, crema lab barigui, crema lab shopping mueller, gelateria batel curitiba, horario crema lab',
    ogTitle: 'Unidades em Curitiba | crema lab',
    ogDescription:
      'Encontre a Crema Lab no Batel, ParkShoppingBarigui e Shopping Mueller. Horários de funcionamento e mapa interativo.',
  },
  '/contato': {
    title: 'Eventos, Carrinho de Gelato & Contato | crema lab Curitiba',
    description:
      'Leve o carrinho de gelato artesanal da Crema Lab para casamentos, festas e eventos corporativos em Curitiba, ou envie sua mensagem para nossa equipe.',
    keywords:
      'carrinho de gelato para eventos curitiba, gelato casamento curitiba, eventos corporativos curitiba, contato crema lab',
    ogTitle: 'Eventos & Contato | crema lab Curitiba',
    ogDescription:
      'Carrinho de gelato artesanal e potes de 100g personalizados para casamentos e eventos em Curitiba.',
  },
  '/sobre': {
    title: 'Nossa História & Chef Harlen Brandão | crema lab Curitiba',
    description:
      'Conheça a história da Crema Lab, a jornada italiana da chef gelatière Harlen Brandão e nossa filosofia artesanal com ingredientes naturais e zero conservantes.',
    keywords:
      'harlen brandao crema lab, historia crema lab, gelateria artesanal curitiba, mestre gelatiere curitiba',
    ogTitle: 'Sobre a crema lab — História & Filosofia',
    ogDescription:
      'Da formação italiana em Bolonha e Carpigiani às lojas de Curitiba: conheça a filosofia artesanal da Crema Lab.',
  },
});
