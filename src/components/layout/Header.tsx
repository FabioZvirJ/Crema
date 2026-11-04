import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { AppLink, useRouter, type AppRoute } from '@/app/router';
import { BRAND_CONFIG } from '@/config/brand';
import { SafeExternalLink } from '@/components/ui/SafeExternalLink';
import { InstagramIcon } from '@/components/visuals/BotanicalVectors';

interface HeaderProps {
  readonly onOpenOrderModal: () => void;
}

const NAV_ITEMS: ReadonlyArray<{ readonly label: string; readonly to: AppRoute }> =
  Object.freeze([
    { label: 'sabores', to: '/sabores' },
    { label: 'sobre', to: '/sobre' },
    { label: 'unidades', to: '/unidades' },
    { label: 'blog', to: '/blog' },
    { label: 'contato', to: '/contato' },
  ]);

export function Header({ onOpenOrderModal }: HeaderProps) {
  const { currentRoute } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-container header-inner">
        <AppLink
          to="/"
          className="brand-logo-link"
          aria-label="Crema Lab — Página Inicial"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="brand-logo-main">{BRAND_CONFIG.name}</span>
          <span className="brand-logo-sub">{BRAND_CONFIG.tagline}</span>
        </AppLink>

        <nav className="header-nav" aria-label="Navegação Principal">
          {NAV_ITEMS.map((item) => {
            const isActive = currentRoute === item.to;
            return (
              <AppLink
                key={item.to}
                to={item.to}
                className={`header-nav-link ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </AppLink>
            );
          })}
        </nav>

        <div className="header-actions">
          <SafeExternalLink
            href={BRAND_CONFIG.instagramUrl}
            className="header-ig-link"
            aria-label="Siga a Crema Lab no Instagram"
          >
            <InstagramIcon size={16} />
          </SafeExternalLink>

          <button
            type="button"
            onClick={onOpenOrderModal}
            className="btn-coral btn-header-cta"
          >
            <span>PEÇA AGORA</span>
            <ArrowRight size={13} />
          </button>

          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <nav className="mobile-nav-list" aria-label="Menu Mobile">
            <AppLink
              to="/"
              className={`mobile-nav-item ${currentRoute === '/' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              início
            </AppLink>
            {NAV_ITEMS.map((item) => (
              <AppLink
                key={item.to}
                to={item.to}
                className={`mobile-nav-item ${currentRoute === item.to ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </AppLink>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="btn-coral mt-2 justify-center"
            >
              <span>PEÇA AGORA</span>
              <ArrowRight size={14} />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
