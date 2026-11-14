import {
  ArrowRight,
  Store,
  Home,
  PawPrint,
  ShoppingBag,
  IceCreamCone,
  MapPin,
  Building2,
  Coffee,
} from 'lucide-react';
import { AppLink } from '@/app/router';
import { CURITIBA_UNITS, EXPERIENCE_GALLERY } from '@/domain/locations';
import type { UnitFeatureTag } from '@/domain/types';
import { SubpageHero } from '@/components/layout/SubpageHero';
import { SafeExternalLink } from '@/components/ui/SafeExternalLink';
import {
  LeafSprig,
} from '@/components/visuals/BotanicalVectors';
import { CuritibaMap } from '@/components/visuals/CuritibaMap';

function UnitTagIcon({ icon }: { readonly icon: UnitFeatureTag['icon'] }) {
  switch (icon) {
    case 'store':
      return <Store size={11} />;
    case 'home':
      return <Home size={11} />;
    case 'paw':
      return <PawPrint size={11} />;
    case 'bag':
      return <ShoppingBag size={11} />;
    case 'gelato':
      return <IceCreamCone size={11} />;
    case 'pin':
      return <MapPin size={11} />;
    case 'building':
      return <Building2 size={11} />;
    case 'coffee':
      return <Coffee size={11} />;
  }
}

export function LocationsPage() {
  return (
    <div className="locations-page">
      <SubpageHero
        variant="seal-right"
        title="Nossas Unidades"
        subtitle="Onde a tradição italiana encontra o afeto."
      />

      {/* 3 UNITS IN CURITIBA */}
      <section
        className="units-showcase-section"
        aria-labelledby="units-section-heading"
      >
        <LeafSprig className="units-sprig-left" />
        <LeafSprig className="units-sprig-right" />

        <div className="site-container">
          <h2 id="units-section-heading" className="units-section-heading">
            Conheça nossos três endereços em Curitiba
          </h2>

          <div className="units-cards-grid">
            {CURITIBA_UNITS.map((unit) => (
              <article key={unit.id} className="unit-card">
                <span className="unit-top-kicker">{unit.headerLabel}</span>

                <div className="unit-arch-frame">
                  {unit.image ? (
                    <img
                      src={unit.image}
                      alt={`Fachada da ${unit.name} — Crema Lab Curitiba`}
                      className="unit-arch-img"
                      style={unit.imagePosition ? { objectPosition: unit.imagePosition } : undefined}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="unit-arch-placeholder">
                      <img
                        src="/assets/images/real/logo-crema-preto.png"
                        alt="Crema Lab"
                        width={200}
                        height={200}
                        loading="lazy"
                        decoding="async"
                        className="unit-arch-placeholder-logo"
                      />
                    </div>
                  )}
                </div>

                <div className="unit-card-body">
                  <h3 className="unit-card-title">{unit.name}</h3>
                  <p className="unit-card-address">{unit.address}</p>
                  <p className="unit-card-hours">
                    {unit.hoursPrimary}
                    {unit.hoursSecondary && (
                      <>
                        <br />
                        {unit.hoursSecondary}
                      </>
                    )}
                  </p>

                  <div className="unit-tags-wrap">
                    {unit.tags.map((tag) => (
                      <span key={tag.label} className="unit-tag-pill">
                        <UnitTagIcon icon={tag.icon} />
                        <span>{tag.label}</span>
                      </span>
                    ))}
                  </div>

                  <div className="unit-cta-wrap">
                    <SafeExternalLink href={unit.mapsUrl} className="btn-coral">
                      <span>COMO CHEGAR</span>
                      <ArrowRight size={13} />
                    </SafeExternalLink>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* A EXPERIÊNCIA 3-PHOTO STRIP */}
          <div className="experience-strip-block">
            <h2 className="experience-strip-heading">A EXPERIÊNCIA</h2>
            <div className="experience-photos-grid">
              {EXPERIENCE_GALLERY.map((item) => (
                <figure key={item.id} className="experience-photo-card">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="experience-photo-img"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EVENTOS & MAPA DARK BURGUNDY SECTION */}
      <section className="events-map-section" aria-labelledby="events-map-heading">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="events-map-top-wave"
        >
          <path
            d="M0,15 C180,82 420,88 680,45 C920,5 1190,10 1440,68 L1440,90 L0,90 Z"
            fill="#480914"
          />
        </svg>

        <div className="site-container events-map-inner">
          <div className="events-map-copy">
            <span className="eyebrow-tag eyebrow-coral">EVENTOS & MAPA</span>
            <h2 id="events-map-heading" className="events-map-title">
              Leve a Crema Lab
              <br />
              para o seu evento
            </h2>
            <div className="mt-6">
              <AppLink to="/contato" className="btn-coral">
                <span>SOLICITAR ORÇAMENTO</span>
                <ArrowRight size={14} />
              </AppLink>
            </div>
          </div>

          <div className="events-map-visual">
            <CuritibaMap />
          </div>
        </div>
      </section>
    </div>
  );
}
