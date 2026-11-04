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
        <img
          src="/assets/images/sabores-hero-bg-clean.png"
          alt=""
          aria-hidden="true"
          className="sabores-hero-bg-img"
        />

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
      <img
        src="/assets/images/subpage-hero-bg-clean.png"
        alt=""
        aria-hidden="true"
        className="subpage-seal-bg-img"
      />

      <div className="site-container subpage-seal-inner">
        <div className="subpage-seal-copy">
          <h1 className="subpage-seal-title">{title}</h1>
          <p className="subpage-seal-subtitle">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
