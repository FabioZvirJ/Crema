import { ALLOWED_EXTERNAL_HOSTS, ALLOWED_PROTOCOLS } from '@/config/security';
import { BRAND_CONFIG } from '@/config/brand';
import { sanitizePlainText } from './sanitizer';

const URL_CONTROL_CHARS_REGEX = /[\u0000-\u001F\u007F]/;

/**
 * Validates that a URL is safe to navigate to or render in an `href`.
 * Blocks `javascript:`, `data:`, `vbscript:`, protocol-relative `//`, control characters,
 * embedded credentials, non-standard ports, and unapproved external hosts.
 */
export function isSafeExternalUrl(rawUrl: string): boolean {
  if (!rawUrl || typeof rawUrl !== 'string') {
    return false;
  }

  const trimmed = rawUrl.trim();
  if (
    !trimmed ||
    trimmed.startsWith('//') ||
    trimmed.startsWith('\\') ||
    URL_CONTROL_CHARS_REGEX.test(trimmed)
  ) {
    return false;
  }

  try {
    const decoded = decodeURIComponent(trimmed);
    if (URL_CONTROL_CHARS_REGEX.test(decoded)) {
      return false;
    }
  } catch {
    return false;
  }

  try {
    const parsed = new URL(trimmed);
    if (!ALLOWED_PROTOCOLS.has(parsed.protocol)) {
      return false;
    }

    if (parsed.protocol === 'mailto:') {
      return (
        parsed.search === '' &&
        parsed.pathname.length > 0 &&
        !/[<>'"`?&=]/.test(trimmed) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(parsed.pathname)
      );
    }

    if (parsed.protocol === 'tel:') {
      return (
        parsed.search === '' &&
        !/[<>'"`]/.test(trimmed) &&
        /^\+?[0-9\-().\s]{6,24}$/.test(parsed.pathname)
      );
    }

    if (parsed.username !== '' || parsed.password !== '' || parsed.port !== '') {
      return false;
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

