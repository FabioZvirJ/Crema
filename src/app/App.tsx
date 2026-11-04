import { useLayoutEffect, useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { RouterProvider, useRouter, type AppRoute } from './router';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FlavorModal } from '@/components/ui/FlavorModal';
import { OrderDrawerModal } from '@/components/ui/OrderDrawerModal';
import { HomePage } from '@/features/home/HomePage';
import { FlavorsPage } from '@/features/flavors/FlavorsPage';
import { LabPage } from '@/features/lab/LabPage';
import { LocationsPage } from '@/features/locations/LocationsPage';
import { ContactPage } from '@/features/contact/ContactPage';
import { AboutPage } from '@/features/about/AboutAndBlogPage';
import type { FlavorItem } from '@/domain/types';

/** Blocks that softly fade up once they scroll into view. */
const REVEAL_SELECTORS = [
  '.value-prop-item',
  '.home-about-inner',
  '.home-flavors-inner',
  '.flavors-filter-bar',
  '.seasonal-banner-inner',
  '.lab-station-card',
  '.lab-chamber-panel',
  '.units-section-heading',
  '.unit-card',
  '.experience-strip-block',
  '.events-map-copy',
  '.events-map-visual',
  '.about-chapter-grid',
  '.about-philosophy-grid',
  '.contact-form-card',
  '.contact-sidebar',
  '.contact-faq-card',
].join(',');

function useScrollReveal(routeKey: string) {
  useLayoutEffect(() => {
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    for (const el of elements) {
      const index = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
      el.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 90}ms`);
      el.classList.add('reveal');
      observer.observe(el);
    }

    return () => {
      observer.disconnect();
      for (const el of elements) {
        el.classList.remove('reveal', 'is-visible');
        el.style.removeProperty('--reveal-delay');
      }
    };
  }, [routeKey]);
}

function AppRoutes({
  onSelectFlavor,
}: {
  readonly onSelectFlavor: (flavor: FlavorItem) => void;
}) {
  const { currentRoute } = useRouter();
  useScrollReveal(currentRoute);

  let page: React.ReactNode;
  switch (currentRoute) {
    case '/':
      page = <HomePage onSelectFlavor={onSelectFlavor} />;
      break;
    case '/sabores':
      page = <FlavorsPage onSelectFlavor={onSelectFlavor} />;
      break;
    case '/lab':
      page = <LabPage />;
      break;
    case '/unidades':
      page = <LocationsPage />;
      break;
    case '/contato':
      page = <ContactPage />;
      break;
    case '/sobre':
      page = <AboutPage />;
      break;
  }

  return (
    <div key={currentRoute} className="page-fade">
      {page}
    </div>
  );
}

export function App({ initialRoute }: { readonly initialRoute?: AppRoute }) {
  const [selectedFlavor, setSelectedFlavor] = useState<FlavorItem | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  return (
    <ErrorBoundary>
      <RouterProvider initialRoute={initialRoute}>
        <div className="app-shell">
          <Header onOpenOrderModal={() => setOrderModalOpen(true)} />
          <main id="main-content" className="app-main">
            <AppRoutes onSelectFlavor={setSelectedFlavor} />
          </main>
          <Footer />

          <FlavorModal
            flavor={selectedFlavor}
            onClose={() => setSelectedFlavor(null)}
          />
          <OrderDrawerModal
            isOpen={orderModalOpen}
            onClose={() => setOrderModalOpen(false)}
          />
        </div>
      </RouterProvider>
    </ErrorBoundary>
  );
}
