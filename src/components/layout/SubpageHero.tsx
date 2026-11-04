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
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="subpage-seal-hero">
      <SubpageBackdrop variant="seal" className="subpage-seal-bg-img" />
      <BrandSeal className="subpage-seal-brand" />
      <p className="hero-script subpage-seal-script" aria-hidden="true">
        Gelato. é
        <br />
        pausa. é
        <br />
        vida.
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
