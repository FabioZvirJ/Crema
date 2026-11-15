import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { flushSync } from 'react-dom';
import { applyRouteSeo } from '@/config/seo';

export type AppRoute = '/' | '/sabores' | '/lab' | '/unidades' | '/contato' | '/sobre';

const ALLOWED_ROUTES: ReadonlySet<AppRoute> = new Set<AppRoute>([
  '/',
  '/sabores',
  '/lab',
  '/unidades',
  '/contato',
  '/sobre',
]);

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
    applyRouteSeo(currentRoute);
  }, [currentRoute]);

  const navigate = useCallback((to: AppRoute) => {
    const safeTarget = normalizeSafeRoute(to);
    const applyNavigation = () => {
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
    };

    const docWithTransition =
      typeof document !== 'undefined'
        ? (document as Document & {
            startViewTransition?: (cb: () => void) => { finished: Promise<void> };
          })
        : null;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (docWithTransition?.startViewTransition && !prefersReducedMotion) {
      try {
        docWithTransition.startViewTransition(() => {
          flushSync(applyNavigation);
        });
      } catch {
        applyNavigation();
      }
    } else {
      applyNavigation();
    }

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

