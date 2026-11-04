import { SECURITY_LIMITS } from '@/config/security';
import { sanitizePlainText } from './sanitizer';

export type InquiryCategory = 'eventos-casamentos' | 'corporativo' | 'fale-com-o-lab';

export interface ContactFormPayload {
  readonly category: InquiryCategory;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly eventDetails: string;
  readonly message: string;
  /** Anti-bot honeypot field — must always remain empty for human users */
  readonly websiteHoneypot?: string;
}

export interface ValidationOutcome<T> {
  readonly valid: boolean;
  readonly errors: Partial<Record<keyof T | 'form', string>>;
  readonly sanitizedData?: T;
}

const ALLOWED_CATEGORIES: ReadonlySet<InquiryCategory> = new Set([
  'eventos-casamentos',
  'corporativo',
  'fale-com-o-lab',
]);

/**
 * Linear-time (ReDoS-safe) email validation check.
 */
export function isValidEmail(email: string): boolean {
  if (!email || email.length > SECURITY_LIMITS.MAX_EMAIL_LENGTH) {
    return false;
  }
  const atIndex = email.indexOf('@');
  if (atIndex <= 0 || atIndex !== email.lastIndexOf('@')) {
    return false;
  }
  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);
  if (!local || !domain || domain.startsWith('.') || domain.endsWith('.')) {
    return false;
  }
  const dotIndex = domain.lastIndexOf('.');
  if (dotIndex <= 0 || dotIndex >= domain.length - 2) {
    return false;
  }
  return /^[a-zA-Z0-9._%+-]+$/.test(local) && /^[a-zA-Z0-9.-]+$/.test(domain);
}

/**
 * Validates Brazilian / international phone numbers safely without ReDoS.
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || phone.length > SECURITY_LIMITS.MAX_PHONE_LENGTH) {
    return false;
  }
  if (!/^[0-9+\-() ]+$/.test(phone)) {
    return false;
  }
  const digitsOnly = phone.replace(/\D/g, '');
  return (
    digitsOnly.length >= SECURITY_LIMITS.MIN_PHONE_DIGITS &&
    digitsOnly.length <= SECURITY_LIMITS.MAX_PHONE_DIGITS
  );
}

export function validateContactForm(
  raw: ContactFormPayload
): ValidationOutcome<ContactFormPayload> {
  const errors: Partial<Record<keyof ContactFormPayload | 'form', string>> = {};

  // 1. Honeypot check (silent or explicit block for bots)
  if (raw.websiteHoneypot && raw.websiteHoneypot.trim().length > 0) {
    return {
      valid: false,
      errors: { form: 'Submissão bloqueada pela verificação de segurança.' },
    };
  }

  // 2. Category allowlist check
  if (!ALLOWED_CATEGORIES.has(raw.category)) {
    errors.category = 'Selecione uma categoria válida.';
  }

  // 3. Sanitize all fields
  const name = sanitizePlainText(raw.name, { maxLength: SECURITY_LIMITS.MAX_NAME_LENGTH });
  const email = sanitizePlainText(raw.email, {
    maxLength: SECURITY_LIMITS.MAX_EMAIL_LENGTH,
  }).toLowerCase();
  const phone = sanitizePlainText(raw.phone, { maxLength: SECURITY_LIMITS.MAX_PHONE_LENGTH });
  const eventDetails = sanitizePlainText(raw.eventDetails, {
    maxLength: SECURITY_LIMITS.MAX_EVENT_DETAILS_LENGTH,
  });
  const message = sanitizePlainText(raw.message, {
    maxLength: SECURITY_LIMITS.MAX_MESSAGE_LENGTH,
    preserveNewlines: true,
  });

  if (name.length < SECURITY_LIMITS.MIN_NAME_LENGTH) {
    errors.name = 'Informe seu nome completo (mínimo de 2 caracteres).';
  }

  if (!isValidEmail(email)) {
    errors.email = 'Informe um endereço de e-mail válido.';
  }

  if (!isValidPhone(phone)) {
    errors.phone = 'Informe um telefone ou WhatsApp válido com DDD.';
  }

  if (raw.category !== 'fale-com-o-lab' && eventDetails.length < 3) {
    errors.eventDetails = 'Informe a data aproximada, local ou número de convidados.';
  }

  if (message.length < SECURITY_LIMITS.MIN_MESSAGE_LENGTH) {
    errors.message = 'Sua mensagem deve conter pelo menos 10 caracteres.';
  }

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: {},
    sanitizedData: Object.freeze({
      category: raw.category,
      name,
      email,
      phone,
      eventDetails,
      message,
    }),
  };
}

