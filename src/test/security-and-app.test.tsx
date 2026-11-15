import { describe, expect, it, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  sanitizeLiveInput,
  sanitizePlainText,
  createSafeRecord,
} from '@/security/sanitizer';
import {
  isSafeExternalUrl,
  getSafeHref,
  buildSafeWhatsAppUrl,
} from '@/security/safeUrl';
import { rateLimiter } from '@/security/rateLimiter';
import { validateContactForm } from '@/security/validation';
import { normalizeSafeRoute } from '@/app/router';
import { App } from '@/app/App';

describe('Crema Lab — Security Hardening Suite', () => {
  beforeEach(() => {
    rateLimiter.reset();
  });

  it('strips XSS vectors, HTML tags, control chars, and Bidi override characters', () => {
    const malicious =
      '<script>alert("xss")</script>Olá\u0000\u202E <img src=x onerror=alert(1)> javascript:evil() Mundo';
    const cleaned = sanitizePlainText(malicious);

    expect(cleaned).not.toContain('<script>');
    expect(cleaned).not.toContain('<img');
    expect(cleaned).not.toContain('javascript:');
    expect(cleaned).not.toContain('\u0000');
    expect(cleaned).not.toContain('\u202E');
    expect(cleaned).toContain('Olá');
    expect(cleaned).toContain('Mundo');
  });

  it('prevents Prototype Pollution when creating safe key-value records', () => {
    const untrusted = JSON.parse(
      '{"name":"Harlen","__proto__":{"polluted":true},"constructor":"bad"}'
    ) as Record<string, string>;
    const safe = createSafeRecord(untrusted);

    expect(safe.name).toBe('Harlen');
    expect(Object.prototype.hasOwnProperty.call(safe, '__proto__')).toBe(false);
    expect(Object.prototype.hasOwnProperty.call(safe, 'constructor')).toBe(false);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
  });

  it('enforces strict protocol and hostname allowlist for external links', () => {
    expect(isSafeExternalUrl('javascript:alert(1)')).toBe(false);
    expect(isSafeExternalUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
    expect(isSafeExternalUrl('//evil.example.com/phishing')).toBe(false);
    expect(isSafeExternalUrl('https://evil.example.com')).toBe(false);
    expect(getSafeHref('javascript:void(0)')).toBe('#');

    expect(isSafeExternalUrl('https://www.instagram.com/cremalabgelato')).toBe(true);
    expect(isSafeExternalUrl('https://wa.me/5541999887766?text=Ola')).toBe(true);
    expect(isSafeExternalUrl('mailto:e-mail@cremalab.com')).toBe(true);
    expect(isSafeExternalUrl('tel:+5541999887766')).toBe(true);

    expect(isSafeExternalUrl('https://user:pass@www.instagram.com/cremalab')).toBe(false);
    expect(isSafeExternalUrl('https://www.instagram.com:8443/cremalab')).toBe(false);
    expect(isSafeExternalUrl('mailto:e-mail@cremalab.com?bcc=evil@attacker.com')).toBe(false);
    expect(isSafeExternalUrl('mailto:e-mail@cremalab.com%0ABcc:evil@attacker.com')).toBe(false);
    expect(isSafeExternalUrl('tel:javascript:alert(1)')).toBe(false);

    expect(sanitizeLiveInput('Gelato <3 Pistacchio')).toBe('Gelato 3 Pistacchio');
    expect(sanitizeLiveInput('Oi <script>alert(1)</script> Mundo')).toBe('Oi alert(1) Mundo');

    const waUrl = buildSafeWhatsAppUrl('Olá <script>evil</script> Pistacchio');
    expect(waUrl).toContain('https://wa.me/5541999887766?text=');
    expect(waUrl).not.toContain('<script>');
  });

  it('prevents Open Redirects in SPA router path normalization', () => {
    expect(normalizeSafeRoute('//attacker.com')).toBe('/');
    expect(normalizeSafeRoute('https://attacker.com')).toBe('/');
    expect(normalizeSafeRoute('/../../etc/passwd')).toBe('/');
    expect(normalizeSafeRoute('/sabores?filter=gelatos')).toBe('/sabores');
    expect(normalizeSafeRoute('/LAB')).toBe('/lab');
    expect(normalizeSafeRoute('/UNIDADES')).toBe('/unidades');
    expect(normalizeSafeRoute('/contato')).toBe('/contato');
  });

  it('enforces sliding-window rate limiting', () => {
    const policy = { actionId: 'test_action', maxRequests: 2, windowMs: 10_000 };
    expect(rateLimiter.checkAndRecord(policy, 1000).allowed).toBe(true);
    expect(rateLimiter.checkAndRecord(policy, 2000).allowed).toBe(true);

    const blocked = rateLimiter.checkAndRecord(policy, 3000);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterMs).toBe(8000);

    // After window expires, requests are allowed again
    expect(rateLimiter.checkAndRecord(policy, 11500).allowed).toBe(true);
  });

  it('blocks bot honeypot submissions and validates contact form fields', () => {
    const botAttempt = validateContactForm({
      category: 'eventos-casamentos',
      name: 'Bot User',
      email: 'bot@example.com',
      phone: '41999887766',
      eventDetails: 'Casamento 100 pessoas',
      message: 'Quero orçamento completo para casamento.',
      websiteHoneypot: 'http://spam-bot.ru',
    });
    expect(botAttempt.valid).toBe(false);

    const validHuman = validateContactForm({
      category: 'eventos-casamentos',
      name: 'Maria Clara',
      email: 'maria.clara@exemplo.com.br',
      phone: '(41) 99988-7766',
      eventDetails: '15/12, Batel, 80 convidados',
      message: 'Gostaria de orçamento do carrinho para casamento em Curitiba.',
      websiteHoneypot: '',
    });
    expect(validHuman.valid).toBe(true);
    expect(validHuman.sanitizedData?.name).toBe('Maria Clara');
  });
});

describe('Crema Lab — Multi-Page Application Integration', () => {
  it('renders Home page and navigates across Sabores, Unidades, and Contato', async () => {
    render(<App initialRoute="/" />);

    // Home Hero
    expect(
      screen.getByRole('heading', { name: /Tradição italiana/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Uma história de paixão/i })
    ).toBeInTheDocument();

    // Navigate to Sabores
    const saboresLinks = screen.getAllByRole('link', { name: /^sabores$/i });
    fireEvent.click(saboresLinks[0]!);

    expect(
      await screen.findByRole('heading', { name: /Nossos Sabores/i })
    ).toBeInTheDocument();
    expect(screen.getByText("PISTACCHIO L'ARTI")).toBeInTheDocument();
    expect(screen.getByText('NOCCIOLOTTO')).toBeInTheDocument();

    // Filter by SORBETS
    const sorbetsTab = screen.getByRole('tab', { name: /SORBETS/i });
    fireEvent.click(sorbetsTab);
    expect(screen.getByText('ROSSO FRAPONE')).toBeInTheDocument();
    expect(screen.queryByText('CUCA DE DOCE DE LEITE')).not.toBeInTheDocument();

    // Navigate to Unidades
    const unidadesLinks = screen.getAllByRole('link', { name: /^unidades$/i });
    fireEvent.click(unidadesLinks[0]!);
    expect(
      await screen.findByRole('heading', { name: /Nossas Unidades/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Unidade Batel' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'ParkShoppingBarigui' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Shopping Mueller' })
    ).toBeInTheDocument();

    // Navigate to Contato
    const contatoLinks = screen.getAllByRole('link', { name: /^contato$/i });
    fireEvent.click(contatoLinks[0]!);
    expect(
      await screen.findByRole('heading', { name: /Fale Conosco/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /Leve o nosso laboratório/i,
      })
    ).toBeInTheDocument();
  });

  it('opens FlavorModal on flavor card interaction and opens OrderDrawerModal from Header CTA', async () => {
    render(<App initialRoute="/sabores" />);

    const pistacchioBtn = await screen.findByRole('button', {
      name: /Ver detalhes de PISTACCHIO/i,
    });
    fireEvent.click(pistacchioBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/NOTAS DO LABORATÓRIO/i)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const orderNowBtn = screen.getByRole('button', { name: /PEÇA AGORA/i });
    fireEvent.click(orderNowBtn);

    expect(
      screen.getByRole('heading', { name: /Peça seu Gelato Artesanal/i })
    ).toBeInTheDocument();
  });

  it('renders the interactive Laboratório Crema (/lab) workbench and issues a prescription ticket', async () => {
    render(<App initialRoute="/lab" />);

    expect(
      await screen.findByRole('heading', { name: /Laboratório Crema/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Escolha a Base da Fórmula/i })
    ).toBeInTheDocument();

    // Switch vessel to Copinho de Ensaio (allows up to 3 extractions)
    const copinhoBtn = screen.getByRole('button', { name: /Copinho de Ensaio/i });
    fireEvent.click(copinhoBtn);

    // Add a 3rd flavor reagent (NOCCIOLOTTO)
    const nocciolottoReagent = screen.getByRole('button', { name: /NOCCIOLOTTO/i });
    fireEvent.click(nocciolottoReagent);

    // Open the Lab Prescription Ticket modal
    const ticketBtn = screen.getByRole('button', {
      name: /EMITIR LAUDO DE BALCÃO/i,
    });
    fireEvent.click(ticketBtn);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByText(/CREMA LAB · LABORATÓRIO DE GELATO/i)
    ).toBeInTheDocument();
  });

  it('falls back to the flat chamber when WebGL is unavailable and still lets layers be removed', async () => {
    // jsdom has no WebGL, so the lazy 3D scene is never loaded.
    render(<App initialRoute="/lab" />);

    const removePistachio = await screen.findByRole('button', { name: /Remover camada PISTACCHIO/i });
    expect(
      screen.getByRole('button', { name: /Remover camada ROSSO FRAPONE/i })
    ).toBeInTheDocument();

    fireEvent.click(removePistachio);

    expect(
      screen.queryByRole('button', { name: /Remover camada PISTACCHIO/i })
    ).not.toBeInTheDocument();
    // The last remaining layer can never be removed.
    expect(
      screen.queryByRole('button', { name: /Remover camada ROSSO FRAPONE/i })
    ).not.toBeInTheDocument();
  });

  it('synchronizes document title, meta description, Open Graph, and canonical URL across routes', async () => {
    render(<App initialRoute="/" />);

    expect(document.title).toContain('crema lab');
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://cremalab.com/'
    );

    const saboresLinks = screen.getAllByRole('link', { name: /^sabores$/i });
    fireEvent.click(saboresLinks[0]!);

    await screen.findByRole('heading', { name: /Nossos Sabores/i });
    expect(document.title).toContain('Nossos Sabores');
    expect(
      document.head.querySelector('meta[name="description"]')?.getAttribute('content')
    ).toContain('sabores autorais da Crema Lab');
    expect(
      document.head.querySelector('meta[property="og:url"]')?.getAttribute('content')
    ).toBe('https://cremalab.com/sabores');
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://cremalab.com/sabores'
    );
  });
});
