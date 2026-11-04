import { useMemo, useState } from 'react';
import { ArrowRight, Plus } from 'lucide-react';
import { FLAVOR_CATEGORIES, FLAVORS_CATALOG } from '@/domain/flavors';
import type { FlavorCategory, FlavorItem } from '@/domain/types';
import { buildSafeWhatsAppUrl } from '@/security/safeUrl';
import { SubpageHero } from '@/components/layout/SubpageHero';
import { SafeExternalLink } from '@/components/ui/SafeExternalLink';
import {
  DiamondLatticePattern,
  FlavorMotifGarnish,
  GelatoBowlIllustration,
} from '@/components/visuals/BotanicalVectors';

interface FlavorsPageProps {
  readonly onSelectFlavor: (flavor: FlavorItem) => void;
}

export function FlavorsPage({ onSelectFlavor }: FlavorsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<FlavorCategory>('todos');

  const filteredFlavors = useMemo(() => {
    if (selectedCategory === 'todos') {
      return FLAVORS_CATALOG;
    }
    return FLAVORS_CATALOG.filter(
      (flavor) =>
        flavor.category === selectedCategory ||
        flavor.secondaryCategories?.includes(selectedCategory)
    );
  }, [selectedCategory]);

  const seasonalWhatsappHref = buildSafeWhatsAppUrl(
    'Olá, Crema Lab! Quais são as Criações Sazonais da Semana disponíveis hoje?'
  );

  return (
    <div className="flavors-page">
      <SubpageHero
        variant="sabores-waves"
        title="Nossos Sabores"
        subtitle="Gelato artesanal, fresco e autoral feito todos os dias em pequenos lotes."
      />

      <section className="flavors-catalog-section" aria-label="Catálogo de Sabores">
        <DiamondLatticePattern className="flavors-lattice-right" />
        <DiamondLatticePattern className="flavors-lattice-left" />

        <div className="site-container">
          {/* Category Filter Pills */}
          <div
            className="flavors-filter-bar"
            role="tablist"
            aria-label="Filtrar sabores por categoria"
          >
            {FLAVOR_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flavor-filter-pill ${isActive ? 'active' : ''}`}
                >
                  <span className="filter-pill-main">{cat.label}</span>
                  {cat.sublabel && (
                    <span className="filter-pill-sub">{cat.sublabel}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* 3x2 Flavor Cards Grid */}
          <div className="flavors-cards-grid">
            {filteredFlavors.map((flavor) => (
              <article key={flavor.id} className="flavor-card">
                <div className="flavor-card-scoop-stage">
                  <FlavorMotifGarnish motif={flavor.motif} />

                  <div className="flavor-card-scoop-wrap">
                    <img
                      src={flavor.image}
                      alt={flavor.name}
                      className="flavor-card-scoop-img"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectFlavor(flavor)}
                    className="flavor-card-plus-btn"
                    aria-label={`Ver detalhes de ${flavor.name}`}
                  >
                    <Plus size={14} strokeWidth={2.2} />
                  </button>
                </div>

                <div
                  className="flavor-card-surface"
                  onClick={() => onSelectFlavor(flavor)}
                >
                  <h2 className="flavor-card-title">{flavor.name}</h2>
                  <p className="flavor-card-desc">{flavor.description}</p>
                  <p className="flavor-card-ingredients">
                    {flavor.ingredientsText}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CRIAÇÕES SAZONAIS DA SEMANA BANNER */}
      <section
        className="seasonal-creations-banner"
        aria-labelledby="seasonal-heading"
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="seasonal-top-wave"
        >
          <path
            d="M0,48 C180,82 340,72 520,42 C720,8 920,62 1140,32 C1280,12 1380,18 1440,48 L1440,80 L0,80 Z"
            fill="#9E4734"
          />
          <path
            d="M0,62 C210,18 410,65 650,55 C890,45 1110,75 1440,58 L1440,80 L0,80 Z"
            fill="#3B0912"
          />
        </svg>

        <div className="site-container seasonal-banner-inner">
          <div className="seasonal-banner-copy">
            <h2 id="seasonal-heading" className="seasonal-banner-title">
              Criações Sazonais da Semana
            </h2>
            <p className="seasonal-banner-subtitle">
              Feitos em pequenos lotes no nosso laboratório
            </p>
          </div>

          <GelatoBowlIllustration className="seasonal-bowl-svg" />

          <div className="seasonal-banner-cta">
            <SafeExternalLink href={seasonalWhatsappHref} className="btn-coral">
              <span>PEDIR PELO WHATSAPP</span>
              <ArrowRight size={14} />
            </SafeExternalLink>
          </div>
        </div>
      </section>
    </div>
  );
}
