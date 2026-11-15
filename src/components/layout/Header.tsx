import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { AppLink, useRouter, type AppRoute } from '@/app/router';
import { BRAND_CONFIG } from '@/config/brand';
import { SafeExternalLink } from '@/components/ui/SafeExternalLink';
import { InstagramIcon } from '@/components/visuals/BotanicalVectors';
import { CremaMonogramBadge, CremaWordmark } from '@/components/visuals/BrandLogo';

interface HeaderProps {
  readonly onOpenOrderModal: () => void;
}

const NAV_ITEMS: ReadonlyArray<{ readonly label: string; readonly to: AppRoute }> =
  Object.freeze([
    { label: 'home', to: '/' },
    { label: 'sabores', to: '/sabores' },
    { label: 'lab', to: '/lab' },
    { label: 'sobre', to: '/sobre' },
    { label: 'unidades', to: '/unidades' },
    { label: 'contato', to: '/contato' },
  ]);

export function Header({ onOpenOrderModal }: HeaderProps) {
  const { currentRoute } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      setScrolled(y > 12);
      if (y < 80) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }
      if (Math.abs(delta) > 6) lastScrollY.current = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHidden = hidden && !mobileMenuOpen;

  return (
    <header
      className={`site-header ${scrolled ? 'is-scrolled' : ''} ${isHidden ? 'is-hidden' : ''}`}
    >
      <div className="site-container header-inner">
        <AppLink
          to="/"
          className="brand-logo-link"
          aria-label="Crema Lab — Página Inicial"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="header-logo-badge" aria-hidden="true">
            <CremaMonogramBadge className="header-logo-badge-svg" />
          </span>
          <span className="brand-logo-text">
            <CremaWordmark className="brand-logo-wordmark" />
            <span className="brand-logo-sub">{BRAND_CONFIG.tagline}</span>
          </span>
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
                {isActive && (
                  <svg
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                    className="header-nav-spark"
                  >
                    <path
                      d="M6 0L7.3 4.7L12 6L7.3 7.3L6 12L4.7 7.3L0 6L4.7 4.7Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                <span>{item.label}</span>
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
