import { useState } from 'react';
import { ErrorBoundary } from './ErrorBoundary';
import { RouterProvider, useRouter, type AppRoute } from './router';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FlavorModal } from '@/components/ui/FlavorModal';
import { OrderDrawerModal } from '@/components/ui/OrderDrawerModal';
import { HomePage } from '@/features/home/HomePage';
import { FlavorsPage } from '@/features/flavors/FlavorsPage';
import { LocationsPage } from '@/features/locations/LocationsPage';
import { ContactPage } from '@/features/contact/ContactPage';
import { AboutPage, BlogPage } from '@/features/about/AboutAndBlogPage';
import type { FlavorItem } from '@/domain/types';

function AppRoutes({
  onSelectFlavor,
}: {
  readonly onSelectFlavor: (flavor: FlavorItem) => void;
}) {
  const { currentRoute } = useRouter();

  switch (currentRoute) {
    case '/':
      return <HomePage onSelectFlavor={onSelectFlavor} />;
    case '/sabores':
      return <FlavorsPage onSelectFlavor={onSelectFlavor} />;
    case '/unidades':
      return <LocationsPage />;
    case '/contato':
      return <ContactPage />;
    case '/sobre':
      return <AboutPage />;
    case '/blog':
      return <BlogPage />;
  }
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
