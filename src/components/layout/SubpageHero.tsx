import { ChevronDown } from 'lucide-react';
import {
  BerrySprig,
  BotanicalSprigLeft,
  LabGlasswareIllustration,
  OvalSeal,
  ScriptSwoosh,
  LeafSprig,
  ScallopSeal,
  SubpageBackdrop,
} from '@/components/visuals/BotanicalVectors';

interface SubpageHeroProps {
  readonly title: string;
  readonly subtitle: string;
  readonly variant?: 'seal-right' | 'sabores-waves' | 'sobre' | 'contato' | 'lab';
}

export function SubpageHero({
  title,
  subtitle,
  variant = 'seal-right',
}: SubpageHeroProps) {
  if (variant === 'lab') {
    return (
      <section className="sabores-hero lab-hero">
        <SubpageBackdrop variant="lab" className="sabores-hero-bg-img" />
        <LeafSprig className="sabores-hero-sprig sabores-hero-sprig-left" />
        <LabGlasswareIllustration className="lab-hero-flask lab-hero-flask-left" />
        <LabGlasswareIllustration className="lab-hero-flask lab-hero-flask-right" />
        <LeafSprig className="sabores-hero-sprig sabores-hero-sprig-right" />
        <svg className="sabores-hero-spark sabores-hero-spark-1" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" /></svg>
        <svg className="sabores-hero-spark sabores-hero-spark-2" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" /></svg>
        <ScallopSeal className="sabores-hero-seal" />
        <p className="hero-script sabores-hero-script" aria-hidden="true">
          Ciência &
          <br />
          afeto no pote.
        </p>

        <div className="site-container sabores-hero-inner">
          <div className="sabores-hero-copy">
            <span className="subpage-seal-eyebrow">BANCADA EXPERIMENTAL · ALQUIMIA DO GELATO</span>
            <h1 className="sabores-hero-title">{title}</h1>
            <p className="sabores-hero-subtitle">{subtitle}</p>
            <div className="lab-hero-telemetry" aria-label="Parâmetros do laboratório">
              <span className="lab-hero-telemetry-pill">
                <span className="lab-telemetry-dot" />
                TEMP: -14.2°C
              </span>
              <span className="lab-hero-telemetry-pill">OVERRUN: 22%</span>
              <span className="lab-hero-telemetry-pill">BASE: 100% NATURAL</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'sabores-waves') {
    const handleScrollToCatalog = () => {
      document.getElementById('sabores-catalogo')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <section className="sabores-hero">
        <SubpageBackdrop variant="sabores" className="sabores-hero-bg-img" />
        <LeafSprig className="sabores-hero-sprig sabores-hero-sprig-left" />
        <BerrySprig className="sabores-hero-sprig sabores-hero-sprig-left-2" />
        <LeafSprig className="sabores-hero-sprig sabores-hero-sprig-right" />
        <BerrySprig className="sabores-hero-sprig sabores-hero-sprig-right-2" />
        <svg className="sabores-hero-spark sabores-hero-spark-1" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" /></svg>
        <svg className="sabores-hero-spark sabores-hero-spark-2" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" /></svg>
        <ScallopSeal className="sabores-hero-seal" />
        <p className="hero-script sabores-hero-script" aria-hidden="true">
          Gelato é
          <br />
          pausa, é vida.
        </p>

        <div className="site-container sabores-hero-inner">
          <div className="sabores-hero-copy">
            <span className="subpage-seal-eyebrow">LABORATÓRIO DE SABORES</span>
            <h1 className="sabores-hero-title">{title}</h1>
            <p className="sabores-hero-subtitle">{subtitle}</p>
            <svg className="sabores-hero-ornament" viewBox="0 0 220 16" aria-hidden="true">
              <path d="M0 8H92M128 8H220" stroke="currentColor" strokeWidth="1" />
              <path d="M110 1L117 8L110 15L103 8Z" fill="currentColor" />
              <circle cx="97" cy="8" r="1.6" fill="currentColor" />
              <circle cx="123" cy="8" r="1.6" fill="currentColor" />
            </svg>
          </div>

          <button
            type="button"
            onClick={handleScrollToCatalog}
            className="sabores-hero-scroll-btn"
            aria-label="Ver catálogo de sabores"
          >
            <ChevronDown size={22} strokeWidth={1.8} />
          </button>
        </div>
      </section>
    );
  }

  if (variant === 'sobre') {
    return (
      <section className="sobre-hero">
        <SubpageBackdrop variant="sobre" className="sobre-hero-bg-img" />
        <BotanicalSprigLeft className="subpage-seal-sprig-left" />
        <LeafSprig className="sobre-hero-sprig" />
        <div className="sobre-hero-portrait-wrap" aria-hidden="true">
          <img
            src="/assets/images/real/pistacchio-creminio.webp"
            alt=""
            width={801}
            height={1200}
            fetchPriority="high"
            decoding="async"
            className="sobre-hero-portrait-img"
          />
          <OvalSeal className="sobre-hero-seal" />
        </div>
        <p className="hero-script sobre-hero-script" aria-hidden="true">
          Gelato é
          <br />
          pausa, é
          <br />
          vida.
          <ScriptSwoosh className="subpage-seal-swoosh" />
        </p>

        <div className="site-container sobre-hero-inner">
          <div className="sobre-hero-copy">
            <span className="subpage-seal-eyebrow">CHEF HARLEN BRANDÃO · CURITIBA</span>
            <h1 className="sobre-hero-title">{title}</h1>
            <p className="sobre-hero-subtitle">{subtitle}</p>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'contato') {
    return (
      <section className="contato-hero">
        <SubpageBackdrop variant="contato" className="contato-hero-bg-img" />
        <BotanicalSprigLeft className="subpage-seal-sprig-left" />
        <div className="contato-hero-arch" aria-hidden="true">
          <img
            src="/assets/images/real/salao-juan.webp"
            alt=""
            width={801}
            height={1199}
            fetchPriority="high"
            decoding="async"
            className="contato-hero-arch-img"
          />
        </div>
        <OvalSeal className="contato-hero-seal" />
        <LeafSprig className="contato-hero-sprig" />
        <p className="hero-script contato-hero-script" aria-hidden="true">
          Gelato é
          <br />
          pausa, é
          <br />
          vida.
          <ScriptSwoosh className="subpage-seal-swoosh" />
        </p>

        <div className="site-container contato-hero-inner">
          <div className="contato-hero-copy">
            <span className="subpage-seal-eyebrow">EVENTOS & ATENDIMENTO</span>
            <h1 className="subpage-seal-title">{title}</h1>
            <p className="subpage-seal-subtitle">{subtitle}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="subpage-seal-hero">
      <SubpageBackdrop variant="seal" className="subpage-seal-bg-img" />
      <BotanicalSprigLeft className="subpage-seal-sprig-left" />
      <div className="subpage-seal-photo-arch" aria-hidden="true">
        <img
          src="/assets/images/real/cafe-juan.webp"
          alt=""
          width={799}
          height={1199}
          fetchPriority="high"
          decoding="async"
          className="subpage-seal-photo-arch-img"
        />
      </div>
      <LeafSprig className="subpage-seal-leaf" />
      <BerrySprig className="subpage-seal-leaf-2" />
      <svg className="subpage-seal-spark subpage-seal-spark-1" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" />
      </svg>
      <svg className="subpage-seal-spark subpage-seal-spark-2" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 0L12 8L20 10L12 12L10 20L8 12L0 10L8 8Z" />
      </svg>
      <OvalSeal className="subpage-seal-brand" />
      <p className="hero-script subpage-seal-script" aria-hidden="true">
        Gelato é
        <br />
        pausa, é
        <br />
        vida.
        <ScriptSwoosh className="subpage-seal-swoosh" />
      </p>

      <div className="subpage-seal-inner">
        <div className="subpage-seal-copy">
          <span className="subpage-seal-eyebrow">CURITIBA · GELATERIA & CAFÉ</span>
          <h1 className="subpage-seal-title">{title}</h1>
          <p className="subpage-seal-subtitle">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
