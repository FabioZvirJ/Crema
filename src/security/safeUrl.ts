import { ALLOWED_EXTERNAL_HOSTS, ALLOWED_PROTOCOLS } from '@/config/security';
import { BRAND_CONFIG } from '@/config/brand';
import { sanitizePlainText } from './sanitizer';

/**
 * Validates that a URL is safe to navigate to or render in an `href`.
 * Blocks `javascript:`, `data:`, `vbscript:`, protocol-relative `//`, and unapproved external hosts.
 */
export function isSafeExternalUrl(rawUrl: string): boolean {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return false;
  }

  const trimmed = rawUrl.trim();
  if (trimmed.startsWith('//') || trimmed.startsWith('\\')) {
    return false;
  }

  try {
    const parsed = new URL(trimmed);
    if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
      return false;
    }

    if (parsed.protocol === 'mailto:' || parsed.protocol === 'tel:') {
      return parsed.pathname.length > 0 && !/[<>'"`]/.test(trimmed);
    }

    return ALLOWED_EXTERNAL_HOSTS.has(parsed.hostname.toLowerCase());
  } catch {
    return false;
  }
}

/**
 * Returns a verified URL or falls back to `#` if the URL fails security checks.
 */
export function getSafeHref(rawUrl: string): string {
  return isSafeExternalUrl(rawUrl) ? rawUrl.trim() : '#';
}

/**
 * Builds a sanitized, URL-encoded WhatsApp deep link for orders or event inquiries.
 */
export function buildSafeWhatsAppUrl(message: string): string {
  const cleanMessage = sanitizePlainText(message, {
    maxLength: 600,
    preserveNewlines: true,
  });
  const encoded = encodeURIComponent(cleanMessage);
  return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encoded}`;
}

