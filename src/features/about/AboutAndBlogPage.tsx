import { ArrowRight, FlaskConical, Leaf, Sparkles } from 'lucide-react';
import { AppLink } from '@/app/router';
import { SubpageHero } from '@/components/layout/SubpageHero';
import {
  ItalyMapOutline,
  LeafSprig,
  MosaicTileIllustration,
  ScallopSeal,
} from '@/components/visuals/BotanicalVectors';

export function AboutPage() {
  return (
    <div className="about-page">
      <SubpageHero
        variant="sobre"
        title="Nossa História"
        subtitle="Da paixão à ciência do gelato natural"
      />

      {/* CAPÍTULO 1 — A TRANSIÇÃO */}
      <section className="about-chapter-section" aria-labelledby="chapter-1-heading">
        <div className="site-container about-chapter-grid">
          <div className="about-chapter-copy">
            <span className="eyebrow-tag">CAPÍTULO 1 - A TRANSIÇÃO</span>
            <h2 id="chapter-1-heading" className="about-story-heading">
              Da Economia ao
              <br />
              Laboratório de Sabores
            </h2>
            <p className="about-story-p">
              A economista Harlen Brandão trocou o ambiente corporativo e os
              números pela alquimia dos sabores, movida pela busca por propósito
              e autenticidade.
            </p>
            <p className="about-story-p">
              Motivada pelo desejo de criar algo vivo e verdadeiro, levou o rigor
              analítico da economia para o balanceamento de receitas — cuidado
              presente em cada detalhe, até no icônico piso em mosaico da loja.
            </p>
          </div>

          <div className="about-collage-stage" aria-hidden="true">
            {/* Formulation sheet card */}
            <div className="about-collage-notebook">
              <div className="about-notebook-header">
                <span>BALANCIAMENTO TÉCNICO · LAB</span>
                <span>LOTE #01</span>
              </div>
              <div className="about-notebook-rows">
                <div className="about-notebook-row">
                  <span>Latte Fresco Integral</span>
                  <span>62.4%</span>
                </div>
                <div className="about-notebook-row">
                  <span>Pistacchio Puro Tostado</span>
                  <span>11.8%</span>
                </div>
                <div className="about-notebook-row">
                  <span>Zucchero &amp; Fibra Vegetal</span>
                  <span>16.2%</span>
                </div>
                <div className="about-notebook-row">
                  <span>Panna Fresca</span>
                  <span>9.6%</span>
                </div>
              </div>
            </div>

            {/* Terrazzo backdrop card */}
            <div className="about-collage-terrazzo">
              <img
                src="/assets/images/real/salao-juan.webp"
                alt=""
                width={801}
                height={1199}
                loading="lazy"
                decoding="async"
                className="about-collage-terrazzo-img"
              />
            </div>

            {/* Ornamental tile & leaf */}
            <LeafSprig className="about-collage-sprig" />
            <MosaicTileIllustration className="about-collage-tile" />

            {/* Featured gelato in lab photo */}
            <div className="about-collage-photo">
              <img
                src="/assets/images/real/gelato-juan.webp"
                alt="Copinho artesanal de gelato de Pistacchio da Crema Lab"
                width={800}
                height={1199}
                loading="lazy"
                decoding="async"
                className="about-collage-photo-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CAPÍTULO 2 — A IMERSÃO NA ITÁLIA */}
      <section className="about-chapter-section about-chapter-alt" aria-labelledby="chapter-2-heading">
        <div className="site-container about-chapter-grid about-chapter-grid-reverse">
          <div className="about-brescia-visual">
            <div className="about-brescia-photo-frame">
              <img
                src="/assets/images/real/carreto-eventos-1.webp"
                alt="Carretino e mobiliário assinados pelo Furf Design Studio diante da fachada em micélio da Crema Lab"
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
                className="about-brescia-photo-img"
              />
            </div>
            <ItalyMapOutline className="about-italy-map" />
          </div>

          <div className="about-chapter-copy">
            <span className="eyebrow-tag">CAPÍTULO 2 - A IMERSÃO NA ITÁLIA</span>
            <h2 id="chapter-2-heading" className="about-story-heading">
              A Jornada em Brescia
            </h2>
            <p className="about-story-p">
              Em sua viagem de especialização a Brescia, no norte da Itália,
              Harlen mergulhou na escola purista para aprender a arte do
              verdadeiro gelato artesanal formulado do zero.
            </p>
            <p className="about-story-p">
              Sem bases prontas, gorduras hidrogenadas ou aromatizantes
              sintéticos, cada receita nasce da matéria-prima viva — respeitando
              a textura cremosa, a temperatura ideal no paladar e o sabor real de
              cada ingrediente.
            </p>
          </div>
        </div>
      </section>

      {/* CAPÍTULO 3 — O NASCIMENTO DA CREMA LAB */}
      <section className="about-chapter-section" aria-labelledby="chapter-3-heading">
        <div className="site-container about-chapter-grid">
          <div className="about-chapter-copy">
            <span className="eyebrow-tag">CAPÍTULO 3 - O NASCIMENTO DA CREMA LAB</span>
            <h2 id="chapter-3-heading" className="about-story-heading">
              A Ciência e o Afeto
              <br />
              em Curitiba
            </h2>
            <p className="about-story-p">
              Assim nasceu a Crema Lab em Curitiba: um espaço que une rigor
              técnico italiano, hospitalidade e afeto para se tornar um refúgio
              acolhedor na cidade.
            </p>
            <p className="about-story-p">
              Hoje, em nossos três endereços em Curitiba, produzimos diariamente
              em pequenos lotes gelatos autorais, sorbets veganos e cafés
              especiais pensados para transformar cada pausa em memória.
            </p>
          </div>

          <div className="about-curitiba-arch-wrap">
            <div className="about-curitiba-arch">
              <img
                src="/assets/images/real/fachada-batel-juan.webp"
                alt="Fachada em terracota da matriz Crema Lab no Batel em Curitiba"
                width={800}
                height={1199}
                className="about-curitiba-arch-img"
                loading="lazy"
                decoding="async"
              />
            </div>
            <ScallopSeal className="about-curitiba-seal" />
          </div>
        </div>
      </section>

      {/* FILOSOFIA DO LAB & CTA BLOB */}
      <section className="about-philosophy-section" aria-labelledby="philosophy-heading">
        <div className="site-container about-philosophy-grid">
          <div className="about-philosophy-left">
            <span className="eyebrow-tag">FILOSOFIA DO LAB</span>
            <h2 id="philosophy-heading" className="about-story-heading">
              Gelato Purista Sem Atalhos
            </h2>

            <div className="about-philosophy-pillars">
              <div className="about-philosophy-item">
                <div className="about-philosophy-icon">
                  <Sparkles size={22} strokeWidth={1.5} />
                </div>
                <h3 className="about-philosophy-item-title">
                  0% Aditivos
                  <br />
                  Artificiais
                </h3>
                <p className="about-philosophy-item-desc">
                  Ingredientes 100% naturais e rótulo limpo.
                </p>
              </div>

              <div className="about-philosophy-item">
                <div className="about-philosophy-icon">
                  <FlaskConical size={22} strokeWidth={1.5} />
                </div>
                <h3 className="about-philosophy-item-title">
                  Processo
                  <br />
                  Lento
                </h3>
                <p className="about-philosophy-item-desc">
                  Feito diariamente em pequenos lotes no lab.
                </p>
              </div>

              <div className="about-philosophy-item">
                <div className="about-philosophy-icon">
                  <Leaf size={22} strokeWidth={1.5} />
                </div>
                <h3 className="about-philosophy-item-title">
                  Alma
                  <br />
                  Brasileira
                </h3>
                <p className="about-philosophy-item-desc">
                  Sabores autorais com ingredientes locais.
                </p>
              </div>
            </div>
          </div>

          <div className="about-cta-blob-card">
            <svg
              viewBox="0 0 520 300"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="about-cta-blob-bg"
            >
              <path
                d="M360 15C445 0 520 35 520 120V300H320C360 220 310 90 360 15Z"
                fill="#a94f3b"
              />
              <path
                d="M175 18C275 -12 375 38 455 82C510 112 520 165 520 230L465 300H75C15 245 -18 165 25 98C62 40 110 38 175 18Z"
                fill="#4f0917"
              />
              <path
                d="M385 300C415 245 468 215 520 205V300Z"
                fill="#a94f3b"
              />
            </svg>
            <div className="about-cta-blob-content">
              <h3 className="about-cta-blob-title">
                Quer viver essa
                <br />
                experiência de perto?
              </h3>
              <div className="mt-4">
                <AppLink to="/sabores" className="btn-coral">
                  <span>CONHEÇA NOSSOS SABORES</span>
                  <ArrowRight size={14} />
                </AppLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
