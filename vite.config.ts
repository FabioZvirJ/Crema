import { defineConfig } from 'vitest/config';
import type { Connect, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { DEFAULT_SITE_URL, ROUTE_SEO, type RouteSeoMetadata, type SeoAppRoute } from './src/config/routeSeoData.ts';

/**
 * Staff-level HTTP Security Headers plugin for Vite dev and preview servers.
 * Mirrors the production headers configured in `public/_headers` and `vercel.json`.
 */
function securityHeadersPlugin(): Plugin {
  const baseSecurityHeaders: Record<string, string> = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy':
      'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
  };

  const previewOnlyHeaders: Record<string, string> = {
    ...baseSecurityHeaders,
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'Content-Security-Policy':
      "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https://tile.openstreetmap.org; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
  };

  const applyHeaders =
    (headers: Record<string, string>, withCachePolicy: boolean): Connect.NextHandleFunction =>
    (req, res, next) => {
      for (const [key, value] of Object.entries(headers)) {
        res.setHeader(key, value);
      }
      if (withCachePolicy) {
        const url = req.url ?? '/';
        res.setHeader(
          'Cache-Control',
          url.startsWith('/assets/')
            ? 'public, max-age=31536000, immutable'
            : 'public, max-age=0, must-revalidate'
        );
      }
      next();
    };

  return {
    name: 'crema-security-headers',
    configureServer(server) {
      server.middlewares.use(applyHeaders(baseSecurityHeaders, false));
    },
    configurePreviewServer(server) {
      server.middlewares.use(applyHeaders(previewOnlyHeaders, true));
    },
  };
}

function resolveBuildSiteUrl(): string {
  const explicit = process.env.VITE_SITE_URL?.trim().replace(/\/+$/, '');
  if (explicit && /^https?:\/\//i.test(explicit)) {
    return explicit;
  }
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim().replace(/\/+$/, '');
  if (vercelProd) {
    return vercelProd.startsWith('http') ? vercelProd : `https://${vercelProd}`;
  }
  const vercelPreview = process.env.VERCEL_URL?.trim().replace(/\/+$/, '');
  if (vercelPreview) {
    return vercelPreview.startsWith('http') ? vercelPreview : `https://${vercelPreview}`;
  }
  return DEFAULT_SITE_URL;
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function replaceMetaContent(html: string, attrKey: 'name' | 'property', attrVal: string, content: string): string {
  const escaped = escapeHtmlAttr(content);
  const pattern = new RegExp(
    `(<meta\\s+[^>]*${attrKey}="${attrVal}"[^>]*\\bcontent=")[^"]*("[^>]*>)`,
    'is'
  );
  if (pattern.test(html)) {
    return html.replace(pattern, `$1${escaped}$2`);
  }
  const reversedPattern = new RegExp(
    `(<meta\\s+[^>]*\\bcontent=")[^"]*("[^>]*${attrKey}="${attrVal}"[^>]*>)`,
    'is'
  );
  return html.replace(reversedPattern, `$1${escaped}$2`);
}

function injectRouteMetadata(
  html: string,
  route: SeoAppRoute,
  meta: RouteSeoMetadata,
  siteUrl: string
): string {
  const canonicalUrl = route === '/' ? `${siteUrl}/` : `${siteUrl}${route}`;
  let out = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtmlAttr(meta.title)}</title>`);
  out = out.replace(
    /(<link\s+[^>]*rel="canonical"[^>]*\bhref=")[^"]*("[^>]*>)/i,
    `$1${escapeHtmlAttr(canonicalUrl)}$2`
  );
  out = replaceMetaContent(out, 'name', 'description', meta.description);
  out = replaceMetaContent(out, 'name', 'keywords', meta.keywords);
  out = replaceMetaContent(out, 'property', 'og:title', meta.ogTitle);
  out = replaceMetaContent(out, 'property', 'og:description', meta.ogDescription);
  out = replaceMetaContent(out, 'property', 'og:url', canonicalUrl);
  out = replaceMetaContent(out, 'name', 'twitter:title', meta.ogTitle);
  out = replaceMetaContent(out, 'name', 'twitter:description', meta.ogDescription);
  return out;
}

/**
 * Resolves production domain URL across index.html, robots.txt, sitemap.xml,
 * and emits per-route static HTML entrypoints so non-JS crawlers see route-specific metadata.
 */
function seoBuildPlugin(): Plugin {
  const siteUrl = resolveBuildSiteUrl();
  let outDir = 'dist';

  return {
    name: 'crema-seo-build',
    configResolved(resolved) {
      outDir = resolved.build.outDir;
    },
    transformIndexHtml(html) {
      return siteUrl === DEFAULT_SITE_URL ? html : html.split(DEFAULT_SITE_URL).join(siteUrl);
    },
    closeBundle() {
      const distRoot = join(dirname(fileURLToPath(import.meta.url)), outDir);
      const indexHtmlPath = join(distRoot, 'index.html');
      if (!existsSync(indexHtmlPath)) return;

      if (siteUrl !== DEFAULT_SITE_URL) {
        for (const staticFile of ['robots.txt', 'sitemap.xml']) {
          const filePath = join(distRoot, staticFile);
          if (existsSync(filePath)) {
            const content = readFileSync(filePath, 'utf8');
            writeFileSync(filePath, content.split(DEFAULT_SITE_URL).join(siteUrl), 'utf8');
          }
        }
      }

      const baseHtml = readFileSync(indexHtmlPath, 'utf8');
      for (const [route, meta] of Object.entries(ROUTE_SEO) as [SeoAppRoute, RouteSeoMetadata][]) {
        if (route === '/') continue;
        const routeDir = join(distRoot, route.slice(1));
        mkdirSync(routeDir, { recursive: true });
        writeFileSync(join(routeDir, 'index.html'), injectRouteMetadata(baseHtml, route, meta, siteUrl), 'utf8');
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), securityHeadersPlugin(), seoBuildPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false, // Prevent source code leakage in production bundles
    // three.js lives in its own lazy chunk (GelatoScene), only fetched on /lab.
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/react/') || id.includes('/node_modules/react-dom/') || id.includes('/node_modules/scheduler/')) {
            return 'vendor';
          }
          if (id.includes('/node_modules/lucide-react/')) {
            return 'icons';
          }
          return undefined;
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
  },
});
