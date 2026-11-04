import {
  BerrySprig,
  BrandSeal,
  LeafSprig,
  ScallopSeal,
  SubpageBackdrop,
} from '@/components/visuals/BotanicalVectors';

interface SubpageHeroProps {
  readonly title: string;
  readonly subtitle: string;
  readonly variant?: 'seal-right' | 'sabores-waves';
}

export function SubpageHero({
  title,
  subtitle,
  variant = 'seal-right',
}: SubpageHeroProps) {
  if (variant === 'sabores-waves') {
    return (
      <section className="sabores-hero">
        <SubpageBackdrop variant="sabores" className="sabores-hero-bg-img" />
        <LeafSprig className="sabores-hero-sprig sabores-hero-sprig-left" />
        <BerrySprig className="sabores-hero-sprig sabores-hero-sprig-left-2" />
        <LeafSprig className="sabores-hero-sprig sabores-hero-sprig-right" />
        <LeafSprig className="sabores-hero-sprig sabores-hero-sprig-left-3" />
        <BerrySprig className="sabores-hero-sprig sabores-hero-sprig-right-2" />
        <LeafSprig className="sabores-hero-sprig sabores-hero-sprig-right-3" />
        <LeafSprig className="sabores-hero-sprig sabores-hero-sprig-bottom-left" />
        <LeafSprig className="sabores-hero-sprig sabores-hero-sprig-bottom-right" />
        <svg className="sabores-hero-dots sabores-hero-dots-left" viewBox="0 0 60 40" aria-hidden="true">
          <circle cx="8" cy="30" r="4.5" /><circle cx="22" cy="20" r="3" /><circle cx="14" cy="10" r="2.2" /><circle cx="36" cy="32" r="2" />
        </svg>
        <svg className="sabores-hero-dots sabores-hero-dots-right" viewBox="0 0 60 40" aria-hidden="true">
          <circle cx="50" cy="30" r="4.5" /><circle cx="36" cy="20" r="3" /><circle cx="44" cy="10" r="2.2" /><circle cx="22" cy="32" r="2" />
        </svg>
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
            <h1 className="sabores-hero-title">{title}</h1>
            <p className="sabores-hero-subtitle">{subtitle}</p>
            <svg className="sabores-hero-ornament" viewBox="0 0 220 16" aria-hidden="true">
              <path d="M0 8H92M128 8H220" stroke="currentColor" strokeWidth="1" />
              <path d="M110 1L117 8L110 15L103 8Z" fill="currentColor" />
              <circle cx="97" cy="8" r="1.6" fill="currentColor" />
              <circle cx="123" cy="8" r="1.6" fill="currentColor" />
            </svg>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="subpage-seal-hero">
      <SubpageBackdrop variant="seal" className="subpage-seal-bg-img" />
      <LeafSprig className="subpage-seal-leaf" />
      <LeafSprig className="subpage-seal-leaf-2" />
      <BrandSeal className="subpage-seal-brand" />
      <p className="hero-script subpage-seal-script" aria-hidden="true">
        Gelato é
        <br />
        pausa, é vida.
      </p>

      <div className="site-container subpage-seal-inner">
        <div className="subpage-seal-copy">
          <h1 className="subpage-seal-title">{title}</h1>
          <p className="subpage-seal-subtitle">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
