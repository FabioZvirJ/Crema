/**
 * Input Sanitization & Anti-XSS Utilities
 *
 * Defends against:
 * - DOM / Reflected XSS via angle-bracket and dangerous URI scheme stripping
 * - Unicode Bidirectional Spoofing (Trojan Source CVE-2021-42574)
 * - Null-byte and ASCII control character injection
 * - Prototype pollution via untrusted keys
 */

const CONTROL_CHARS_REGEX = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g;
const BIDI_OVERRIDE_REGEX = /[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g;
const HTML_TAGS_REGEX = /<[^>]*>?/g;
const CLOSED_HTML_TAGS_REGEX = /<[^>]*>/g;
const DANGEROUS_PROTOCOL_REGEX = /\b(?:javascript|vbscript|data)\s*:/gi;

const FORBIDDEN_OBJECT_KEYS: ReadonlySet<string> = new Set([
  '__proto__',
  'constructor',
  'prototype',
]);

/** The shared strip pass: normalization, control/bidi characters, HTML tags and URI schemes. */
function stripUnsafeContent(input: string, liveMode = false): string {
  return input
    .normalize('NFC')
    .replace(CONTROL_CHARS_REGEX, '')
    .replace(BIDI_OVERRIDE_REGEX, '')
    .replace(liveMode ? CLOSED_HTML_TAGS_REGEX : HTML_TAGS_REGEX, '')
    .replace(/[<>]/g, '')
    .replace(DANGEROUS_PROTOCOL_REGEX, '');
}

/**
 * Sanitizes plain-text input while optionally preserving newlines for multi-line messages.
 */
export function sanitizePlainText(
  rawInput: unknown,
  options: { maxLength?: number; preserveNewlines?: boolean } = {}
): string {
  if (typeof rawInput !== 'string') {
    return '';
  }

  const { maxLength = 1000, preserveNewlines = false } = options;

  let cleaned = stripUnsafeContent(rawInput);

  if (!preserveNewlines) {
    cleaned = cleaned.replace(/[\r\n]+/g, ' ').replace(/\s{2,}/g, ' ');
  } else {
    cleaned = cleaned.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n');
  }

  return cleaned.trim().slice(0, maxLength);
}

/**
 * Sanitizes live input while typing (does not trim trailing space so user can type spaces between words).
 */
export function sanitizeLiveInput(
  rawInput: string,
  options: { maxLength?: number; preserveNewlines?: boolean } = {}
): string {
  const { maxLength = 1000, preserveNewlines = false } = options;

  let cleaned = stripUnsafeContent(rawInput, true);

  if (!preserveNewlines) {
    cleaned = cleaned.replace(/[\r\n]+/g, ' ');
  } else {
    cleaned = cleaned.replace(/\r\n/g, '\n');
  }

  return cleaned.slice(0, maxLength);
}

/**
 * Guards against Prototype Pollution when cloning or normalizing key-value records.
 */
export function createSafeRecord<T extends Record<string, string>>(
  input: T
): Readonly<Record<string, string>> {
  const safeObj: Record<string, string> = Object.create(null) as Record<string, string>;
  for (const [key, value] of Object.entries(input)) {
    if (!FORBIDDEN_OBJECT_KEYS.has(key)) {
      safeObj[key] = sanitizePlainText(value);
    }
  }
  return Object.freeze(safeObj);
}

