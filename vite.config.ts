import { defineConfig } from 'vitest/config';
import type { Connect, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

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

export default defineConfig({
  plugins: [react(), securityHeadersPlugin()],
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
