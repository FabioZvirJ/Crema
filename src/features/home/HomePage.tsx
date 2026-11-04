import { useState } from 'react';
import {
  ArrowRight,
  Feather,
  FlaskConical,
  Heart,
  Star,
  Copy,
} from 'lucide-react';
import { AppLink } from '@/app/router';
import { BRAND_CONFIG } from '@/config/brand';
import { HERO_SLIDES, INSTAGRAM_FEED, VALUE_PROPOSITIONS } from '@/domain/content';
import { FLAVORS_CATALOG } from '@/domain/flavors';
import type { FlavorItem, ValueProposition } from '@/domain/types';
import { SafeExternalLink } from '@/components/ui/SafeExternalLink';

interface HomePageProps {
  readonly onSelectFlavor: (flavor: FlavorItem) => void;
}

function ValuePropIcon({ icon }: { readonly icon: ValueProposition['icon'] }) {
  switch (icon) {
    case 'leaf':
      return <Feather size={17} strokeWidth={1.4} />;
    case 'flask':
      return <FlaskConical size={17} strokeWidth={1.4} />;
    case 'heart':
      return <Heart size={17} strokeWidth={1.4} />;
    case 'star':
      return <Star size={17} strokeWidth={1.4} />;
  }
}

const HOME_SCOOP_HOTSPOTS = Object.freeze([
  { id: 'pistacchio', left: '13.5%', top: '63.5%' },
  { id: 'cioccolato-fondente', left: '38%', top: '36.5%' },
  { id: 'frutti-di-bosco', left: '59.5%', top: '69%' },
  { id: 'limone-siciliano', left: '81.5%', top: '39%' },
] as const);

export function HomePage({ onSelectFlavor }: HomePageProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const activeSlide = HERO_SLIDES[slideIndex] ?? HERO_SLIDES[0]!;

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="home-hero" aria-label="Destaque Principal">
        <img
          src="/assets/images/hero-bg-clean.png"
          alt="Casquinha artesanal Crema Lab com gelatos de Pistacchio e Stracciatella"
          className="home-hero-full-bg"
        />

        <div className="site-container home-hero-inner">
          <div className="home-hero-copy">
            <span className="eyebrow-tag">{activeSlide.eyebrow}</span>
            <h1 className="home-hero-title">
              {activeSlide.titleLine1}
              <br />
              {activeSlide.titleLine2}
            </h1>
            <p className="home-hero-description">{activeSlide.description}</p>

            <div className="home-hero-cta-wrap">
              <AppLink to={activeSlide.ctaRoute} className="btn-coral">
                <span>{activeSlide.ctaLabel}</span>
                <ArrowRight size={13} />
              </AppLink>
            </div>

            <div className="home-hero-slider-bar">
              <button
                type="button"
                onClick={handleNextSlide}
                className="slider-progress-btn"
                aria-label="Próximo slide de destaque"
              >
                <span className="slider-arrow-line" />
                <ArrowRight size={10} className="slider-arrow-head" />
                <span className="slider-index-text">{activeSlide.indexLabel}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS BAR */}
      <section className="value-props-section" aria-label="Nossos Pilares">
        <div className="site-container value-props-grid">
          {VALUE_PROPOSITIONS.map((item) => (
            <div key={item.id} className="value-prop-item">
              <div className="value-prop-icon">
                <ValuePropIcon icon={item.icon} />
              </div>
              <h2 className="value-prop-title">{item.title}</h2>
              <p className="value-prop-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SOBRE A CREMA LAB SECTION */}
      <section className="home-about-section" aria-labelledby="home-about-heading">
        <img
          src="/assets/images/home-about-bg-clean.png"
          alt="Chef e economista Harlen Brandão degustando gelato artesanal no laboratório da Crema Lab"
          className="home-about-full-bg"
        />

        <div className="site-container home-about-inner">
          <div className="home-about-spacer" aria-hidden="true" />

          <div className="home-about-copy-col">
            <span className="eyebrow-tag eyebrow-light">SOBRE A CREMA LAB</span>
            <h2 id="home-about-heading" className="home-about-title">
              Uma história de paixão,
              <br />
              arte e sabor
            </h2>
            <p className="home-about-kicker">
              DA ECONOMIA AO LABORATÓRIO DE SABORES.
            </p>
            <p className="home-about-paragraph">
              Após uma imersão em Brescia, na Itália, a economista e chef Harlen
              Brandão trouxe a Curitiba a essência da tradição purista do gelato.
            </p>
            <p className="home-about-paragraph">
              A Crema Lab nasceu com o propósito de transformar o gelato em
              arte, unindo técnica rigorosa, ingredientes naturais e afeto.
            </p>

            <div className="mt-4">
              <AppLink to="/sobre" className="btn-outline-cream">
                <span>NOSSA TRAJETÓRIA</span>
                <ArrowRight size={12} />
              </AppLink>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SABORES EM DESTAQUE SECTION */}
      <section
        className="home-featured-flavors"
        aria-labelledby="home-flavors-heading"
      >
        <div className="site-container home-flavors-inner">
          <div className="home-flavors-copy">
            <span className="eyebrow-tag">SABORES EM DESTAQUE</span>
            <h2 id="home-flavors-heading" className="home-flavors-title">
              Nossos gelatos
              <br />
              autorais.
            </h2>
            <div className="mt-5">
              <AppLink to="/sabores" className="btn-terracotta">
                <span>VER TODOS OS SABORES</span>
                <ArrowRight size={12} />
              </AppLink>
            </div>
          </div>

          <div className="home-scoops-stage">
            <img
              src="/assets/images/home-flavors-cluster.png"
              alt="Sabores em destaque da Crema Lab: Pistacchio, Cioccolato Fondente, Frutti di Bosco e Limone Siciliano"
              className="home-scoops-cluster-img"
            />

            {HOME_SCOOP_HOTSPOTS.map((spot) => {
              const flavor = FLAVORS_CATALOG.find((f) => f.id === spot.id);
              if (!flavor) return null;
              return (
                <button
                  key={spot.id}
                  type="button"
                  style={{ left: spot.left, top: spot.top }}
                  onClick={() => onSelectFlavor(flavor)}
                  className="home-scoop-hotspot"
                  aria-label={`Ver ingredientes e história do sabor ${flavor.name}`}
                  title={flavor.name}
                >
                  <span className="sr-only">{flavor.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. INSTAGRAM FEED SECTION */}
      <section className="home-instagram-section" aria-label="Galeria do Instagram">
        <div className="site-container">
          <div className="instagram-header-row">
            <h2 className="instagram-heading">
              SIGA A {BRAND_CONFIG.instagramHandle.toUpperCase()}
            </h2>
          </div>

          <div className="instagram-grid">
            {INSTAGRAM_FEED.map((post) => (
              <SafeExternalLink
                key={post.id}
                href={BRAND_CONFIG.instagramUrl}
                className="instagram-card"
                aria-label={post.caption}
              >
                <img
                  src={post.image}
                  alt={post.alt}
                  className="instagram-card-img"
                  loading="lazy"
                />
                <span className="instagram-multi-badge" aria-hidden="true">
                  <Copy size={11} />
                </span>
              </SafeExternalLink>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
