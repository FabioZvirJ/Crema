/**
 * Staff-level security policies, input bounds, and allowlists.
 * All external navigation and user-submitted payloads are validated against these constraints.
 */
export const SECURITY_LIMITS = Object.freeze({
  MAX_NAME_LENGTH: 80,
  MIN_NAME_LENGTH: 2,
  MAX_EMAIL_LENGTH: 120,
  MAX_PHONE_LENGTH: 24,
  MIN_PHONE_DIGITS: 10,
  MAX_PHONE_DIGITS: 13,
  MAX_EVENT_DETAILS_LENGTH: 160,
  MAX_MESSAGE_LENGTH: 1000,
  MIN_MESSAGE_LENGTH: 10,
} as const);

export const ALLOWED_EXTERNAL_HOSTS: ReadonlySet<string> = new Set([
  'instagram.com',
  'www.instagram.com',
  'tiktok.com',
  'www.tiktok.com',
  'wa.me',
  'api.whatsapp.com',
  'maps.google.com',
  'www.google.com',
  // Photo attributions on the Sabores page (licence terms require the links).
  'commons.wikimedia.org',
  'creativecommons.org',
]);

export const ALLOWED_PROTOCOLS: ReadonlySet<string> = new Set([
  'https:',
  'mailto:',
  'tel:',
]);

export const RATE_LIMIT_POLICIES = Object.freeze({
  CONTACT_FORM: {
    actionId: 'contact_form_submit',
    maxRequests: 3,
    windowMs: 60_000,
  },
  NEWSLETTER: {
    actionId: 'newsletter_subscribe',
    maxRequests: 2,
    windowMs: 60_000,
  },
} as const);

