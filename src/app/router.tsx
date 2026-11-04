import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type AppRoute = '/' | '/sabores' | '/unidades' | '/contato' | '/sobre' | '/blog';

const ALLOWED_ROUTES: ReadonlySet<AppRoute> = new Set<AppRoute>([
  '/',
  '/sabores',
  '/unidades',
  '/contato',
  '/sobre',
  '/blog',
]);

const ROUTE_TITLES: Readonly<Record<AppRoute, string>> = Object.freeze({
  '/': 'crema lab | Gelato • Café • Experiências — Curitiba',
  '/sabores': 'Nossos Sabores | crema lab — Gelato Artesanal',
  '/unidades': 'Nossas Unidades em Curitiba | crema lab',
  '/contato': 'Fale Conosco & Eventos | crema lab',
  '/sobre': 'Sobre a Crema Lab | Uma história de paixão, arte e sabor',
  '/blog': 'Journal & Novidades | crema lab',
});

/**
 * Security-hardened route normalizer.
 * Prevents Open Redirects (`//attacker.com`) and arbitrary path injection by enforcing a strict allowlist.
 */
export function normalizeSafeRoute(rawPath: string): AppRoute {
  if (!rawPath || typeof rawPath !== 'string') {
    return '/';
  }
  const clean = rawPath.split('?')[0]?.split('#')[0]?.trim().toLowerCase() ?? '/';
  if (ALLOWED_ROUTES.has(clean as AppRoute)) {
    return clean as AppRoute;
  }
  return '/';
}

interface RouterContextValue {
  readonly currentRoute: AppRoute;
  readonly navigate: (to: AppRoute) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

export function RouterProvider({
  initialRoute,
  children,
}: {
  readonly initialRoute?: AppRoute;
  readonly children: React.ReactNode;
}) {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() =>
    initialRoute ? normalizeSafeRoute(initialRoute) : normalizeSafeRoute(window.location.pathname)
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(normalizeSafeRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    document.title = ROUTE_TITLES[currentRoute];
  }, [currentRoute]);

  const navigate = useCallback((to: AppRoute) => {
    const safeTarget = normalizeSafeRoute(to);
    setCurrentRoute((prev) => {
      if (prev !== safeTarget && typeof window !== 'undefined') {
        try {
          window.history.pushState(null, '', safeTarget);
        } catch {
          // Ignore pushState restrictions in sandboxed/test environments
        }
      }
      return safeTarget;
    });
    if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch {
        // Ignore in test environments
      }
    }
  }, []);

  const value = useMemo(
    () => ({ currentRoute, navigate }),
    [currentRoute, navigate]
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter(): RouterContextValue {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

export interface AppLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  readonly to: AppRoute;
  readonly children: React.ReactNode;
}

export function AppLink({ to, onClick, children, ...rest }: AppLinkProps) {
  const { navigate } = useRouter();
  const safeTarget = normalizeSafeRoute(to);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }
    event.preventDefault();
    onClick?.(event);
    navigate(safeTarget);
  };

  return (
    <a href={safeTarget} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

