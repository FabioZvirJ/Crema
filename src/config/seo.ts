import type { AppRoute } from '@/app/router';
import { DEFAULT_SITE_URL, ROUTE_SEO } from './routeSeoData';

export { DEFAULT_SITE_URL, ROUTE_SEO } from './routeSeoData';
export type { RouteSeoMetadata } from './routeSeoData';

function resolveRuntimeOrigin(): string {
  const configured = import.meta.env.VITE_SITE_URL?.trim().replace(/\/+$/, '');
  if (configured && /^https?:\/\//i.test(configured)) {
    return configured;
  }
  if (
    typeof window !== 'undefined' &&
    window.location?.origin &&
    /^https?:\/\//i.test(window.location.origin) &&
    !window.location.hostname.includes('localhost') &&
    window.location.hostname !== '127.0.0.1'
  ) {
    return window.location.origin;
  }
  return DEFAULT_SITE_URL;
}

function upsertMeta(attrName: 'name' | 'property', attrValue: string, content: string): void {
  if (typeof document === 'undefined' || !document.head) return;
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attrName}="${attrValue}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonical(href: string): void {
  if (typeof document === 'undefined' || !document.head) return;
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Synchronizes document title, meta tags, Open Graph metadata, and canonical URL on route changes.
 */
export function applyRouteSeo(route: AppRoute): void {
  if (typeof document === 'undefined') return;
  const meta = ROUTE_SEO[route];
  const origin = resolveRuntimeOrigin();
  const canonicalUrl = route === '/' ? `${origin}/` : `${origin}${route}`;

  document.title = meta.title;
  upsertMeta('name', 'description', meta.description);
  upsertMeta('name', 'keywords', meta.keywords);
  upsertMeta('property', 'og:title', meta.ogTitle);
  upsertMeta('property', 'og:description', meta.ogDescription);
  upsertMeta('property', 'og:url', canonicalUrl);
  upsertMeta('name', 'twitter:title', meta.ogTitle);
  upsertMeta('name', 'twitter:description', meta.ogDescription);
  upsertCanonical(canonicalUrl);
}
