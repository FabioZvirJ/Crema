import { useState } from 'react';
import {
  ArrowRight,
  Feather,
  FlaskConical,
  Heart,
  Star,
  Copy,
  Plus,
} from 'lucide-react';
import { AppLink } from '@/app/router';
import { BRAND_CONFIG } from '@/config/brand';
import { HERO_SLIDES, INSTAGRAM_FEED, VALUE_PROPOSITIONS } from '@/domain/content';
import { FLAVORS_CATALOG } from '@/domain/flavors';
import type { FlavorItem, ValueProposition } from '@/domain/types';
import { SafeExternalLink } from '@/components/ui/SafeExternalLink';
import {
  BotanicalSprigRight,
  BrandSeal,
  DiamondLatticePattern,
  FlavorMotifGarnish,
  HeroBackdrop,
  WaveBackdrop,
} from '@/components/visuals/BotanicalVectors';

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

const HOME_FEATURED_PHOTOS = Object.freeze([
  {
    image: '/assets/images/real/gelato-juan.webp',
    alt: 'Copinho de gelato de Pistacchio com crocante de pistache',
    flavorId: 'pistacchio',
    motif: 'pistachio',
    left: '12%',
    top: '62%',
    position: '50% 58%',
  },
  {
    image: '/assets/images/real/novos-sabores-1.webp',
    alt: 'Colherada de gelato de avelã com pedaços crocantes',
    flavorId: 'nocciolotto',
    motif: 'cacao',
    left: '36%',
    top: '32%',
    position: '45% 40%',
  },
  {
    image: '/assets/images/real/novos-sabores-2.webp',
    alt: 'Copinho de gelato cremoso com farofinha crocante',
    flavorId: 'cuca-doce-de-leite',
    motif: 'amarena',
    left: '60%',
    top: '70%',
    position: '50% 50%',
  },
  {
    image: '/assets/images/real/sobremesa-juan.webp',
    alt: 'Taça de sobremesa artesanal Crema Lab servida na mesa Cavalinho',
    motif: 'amarena',
    left: '84%',
    top: '36%',
    position: '50% 45%',
  },
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
        <HeroBackdrop className="home-hero-backdrop" />
        <img
          src="/assets/images/real/pistacchio-creminio.webp"
          alt="Casquinha artesanal Crema Lab de Pistacchio segurada na mão"
          width={801}
          height={1200}
          fetchPriority="high"
          decoding="async"
          className="home-hero-photo"
        />
        <p className="home-hero-script" aria-hidden="true">
          Gelato. é
          <br />
          pausa. é
          <br />
          vida.
        </p>
        <BrandSeal className="home-hero-seal" />
        <BotanicalSprigRight className="home-hero-sprig" />

        <div className="site-container home-hero-inner">
          <div className="home-hero-copy">
            <div key={slideIndex} className="home-hero-slide-content">
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
        <WaveBackdrop variant="about" className="home-about-full-bg" />

        <div className="site-container home-about-inner">
          <div className="home-about-photos">
            <div className="home-about-arch-frame">
              <img
                src="/assets/images/real/interna-mahani.webp"
                alt="Interior da Crema Lab, com o arco de vidro e a vitrine de gelatos"
                width={801}
                height={1200}
                loading="lazy"
                decoding="async"
                className="home-about-chef-img"
              />
            </div>
            <div className="home-about-inset-frame">
              <img
                src="/assets/images/real/fachada-batel-juan.webp"
                alt="Fachada da Crema Lab no Batel, em Curitiba"
                width={800}
                height={1199}
                className="home-about-inset-img"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

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
        <DiamondLatticePattern className="home-flavors-lattice" />
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
            {HOME_FEATURED_PHOTOS.map((photo) => {
              const flavor =
                'flavorId' in photo
                  ? FLAVORS_CATALOG.find((f) => f.id === photo.flavorId)
                  : undefined;
              const content = (
                <>
                  <img
                    src={photo.image}
                    alt={photo.alt}
                    className="home-scoop-photo"
                    style={{ objectPosition: photo.position }}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="home-scoop-plus" aria-hidden="true">
                    <Plus size={12} strokeWidth={2.2} />
                  </span>
                </>
              );

              return (
                <div
                  key={photo.image}
                  className="home-scoop-item"
                  style={{ left: photo.left, top: photo.top }}
                >
                  <div className="home-scoop-garnish" aria-hidden="true">
                    <FlavorMotifGarnish motif={photo.motif} />
                  </div>
                  {flavor ? (
                    <button
                      type="button"
                      onClick={() => onSelectFlavor(flavor)}
                      className="home-scoop-hotspot"
                      aria-label={`Ver ingredientes e história do sabor ${flavor.name}`}
                      title={flavor.name}
                    >
                      {content}
                    </button>
                  ) : (
                    <AppLink
                      to="/sabores"
                      className="home-scoop-hotspot"
                      aria-label="Ver todos os sabores da Crema Lab"
                    >
                      {content}
                    </AppLink>
                  )}
                </div>
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
                  decoding="async"
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
