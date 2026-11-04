import { useState, type FormEvent } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageCircle,
  AlertCircle,
} from 'lucide-react';
import { AppLink } from '@/app/router';
import { BRAND_CONFIG } from '@/config/brand';
import { RATE_LIMIT_POLICIES, SECURITY_LIMITS } from '@/config/security';
import { EVENT_FAQ_CARDS } from '@/domain/content';
import { sanitizeLiveInput } from '@/security/sanitizer';
import {
  validateContactForm,
  type ContactFormPayload,
  type InquiryCategory,
} from '@/security/validation';
import { rateLimiter } from '@/security/rateLimiter';
import { buildSafeWhatsAppUrl } from '@/security/safeUrl';
import { SubpageHero } from '@/components/layout/SubpageHero';
import { SafeExternalLink } from '@/components/ui/SafeExternalLink';
import {
  BotanicalSprigLeft,
  DiamondLatticePattern,
  InstagramIcon,
  WaveBackdrop,
} from '@/components/visuals/BotanicalVectors';

const INQUIRY_TABS: ReadonlyArray<{
  readonly id: InquiryCategory;
  readonly label: string;
}> = Object.freeze([
  { id: 'eventos-casamentos', label: 'Eventos & Casamentos' },
  { id: 'corporativo', label: 'Corporativo' },
  { id: 'fale-com-o-lab', label: 'Fale com o Lab' },
]);

export function ContactPage() {
  const [category, setCategory] = useState<InquiryCategory>('eventos-casamentos');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [message, setMessage] = useState('');
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');

  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormPayload | 'form', string>>
  >({});
  const [submittedPayload, setSubmittedPayload] =
    useState<ContactFormPayload | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedPayload(null);

    const validation = validateContactForm({
      category,
      name,
      email,
      phone,
      eventDetails,
      message,
      websiteHoneypot,
    });

    if (!validation.valid || !validation.sanitizedData) {
      setErrors(validation.errors);
      return;
    }

    const rateCheck = rateLimiter.checkAndRecord(RATE_LIMIT_POLICIES.CONTACT_FORM);
    if (!rateCheck.allowed) {
      const waitSeconds = Math.ceil(rateCheck.retryAfterMs / 1000);
      setErrors({
        form: `Muitas tentativas recentes. Por favor, aguarde ${waitSeconds}s antes de enviar novamente.`,
      });
      return;
    }

    setErrors({});
    setSubmittedPayload(validation.sanitizedData);
    setName('');
    setEmail('');
    setPhone('');
    setEventDetails('');
    setMessage('');
  };

  const whatsappDirectHref = buildSafeWhatsAppUrl(
    'Olá, Crema Lab! Gostaria de conversar sobre eventos e encomendas em Curitiba.'
  );

  const submittedWhatsappHref = submittedPayload
    ? buildSafeWhatsAppUrl(
        [
          `Olá, Crema Lab! Enviei uma solicitação pelo site:`,
          `• Categoria: ${submittedPayload.category}`,
          `• Nome: ${submittedPayload.name}`,
          `• E-mail: ${submittedPayload.email}`,
          `• Telefone: ${submittedPayload.phone}`,
          submittedPayload.eventDetails
            ? `• Evento: ${submittedPayload.eventDetails}`
            : '',
          `• Mensagem: ${submittedPayload.message}`,
        ]
          .filter(Boolean)
          .join('\n')
      )
    : whatsappDirectHref;

  return (
    <div className="contact-page">
      <SubpageHero
        variant="contato"
        title="Fale Conosco"
        subtitle="Dúvidas, sugestões ou o carrinho da Crema Lab no seu evento especial."
      />

      {/* FORM & DIRECT CHANNELS SECTION */}
      <section className="contact-main-section" aria-label="Formulário de Contato">
        <BotanicalSprigLeft className="contact-sprig-left" />
        <DiamondLatticePattern className="contact-lattice-right" />

        <div className="site-container contact-main-grid">
          {/* Left: White Elevated Form Card */}
          <div className="contact-form-card">
            <div
              className="contact-category-tabs"
              role="tablist"
              aria-label="Tipo de atendimento"
            >
              {INQUIRY_TABS.map((tab) => {
                const isSelected = category === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => {
                      setCategory(tab.id);
                      setErrors({});
                    }}
                    className={`contact-tab-pill ${isSelected ? 'active' : ''}`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} noValidate className="contact-form">
              {/* Honeypot anti-bot field (hidden from screen readers and visual users) */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="contact-website-hp">Não preencha este campo</label>
                <input
                  id="contact-website-hp"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={websiteHoneypot}
                  onChange={(e) => setWebsiteHoneypot(e.target.value)}
                />
              </div>

              <div className="contact-row-two">
                <div className="contact-field-group">
                  <label htmlFor="contact-name" className="contact-label">
                    Nome
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={SECURITY_LIMITS.MAX_NAME_LENGTH}
                    value={name}
                    onChange={(e) =>
                      setName(
                        sanitizeLiveInput(e.target.value, {
                          maxLength: SECURITY_LIMITS.MAX_NAME_LENGTH,
                        })
                      )
                    }
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'err-name' : undefined}
                    className="contact-input"
                  />
                  {errors.name && (
                    <span id="err-name" className="contact-field-error" role="alert">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="contact-field-group">
                  <label htmlFor="contact-email" className="contact-label">
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    required
                    maxLength={SECURITY_LIMITS.MAX_EMAIL_LENGTH}
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        sanitizeLiveInput(e.target.value, {
                          maxLength: SECURITY_LIMITS.MAX_EMAIL_LENGTH,
                        })
                      )
                    }
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'err-email' : undefined}
                    className="contact-input"
                  />
                  {errors.email && (
                    <span id="err-email" className="contact-field-error" role="alert">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-phone" className="contact-label">
                  Telefone
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  maxLength={SECURITY_LIMITS.MAX_PHONE_LENGTH}
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      sanitizeLiveInput(e.target.value, {
                        maxLength: SECURITY_LIMITS.MAX_PHONE_LENGTH,
                      })
                    )
                  }
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'err-phone' : undefined}
                  className="contact-input"
                />
                {errors.phone && (
                  <span id="err-phone" className="contact-field-error" role="alert">
                    {errors.phone}
                  </span>
                )}
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-event" className="contact-label">
                  Seu Evento
                </label>
                <input
                  id="contact-event"
                  name="eventDetails"
                  type="text"
                  placeholder="Data, local, convidados"
                  maxLength={SECURITY_LIMITS.MAX_EVENT_DETAILS_LENGTH}
                  value={eventDetails}
                  onChange={(e) =>
                    setEventDetails(
                      sanitizeLiveInput(e.target.value, {
                        maxLength: SECURITY_LIMITS.MAX_EVENT_DETAILS_LENGTH,
                      })
                    )
                  }
                  aria-invalid={Boolean(errors.eventDetails)}
                  aria-describedby={errors.eventDetails ? 'err-event' : undefined}
                  className="contact-input"
                />
                {errors.eventDetails && (
                  <span id="err-event" className="contact-field-error" role="alert">
                    {errors.eventDetails}
                  </span>
                )}
              </div>

              <div className="contact-field-group">
                <label htmlFor="contact-message" className="contact-label">
                  Mensagem
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={2}
                  required
                  maxLength={SECURITY_LIMITS.MAX_MESSAGE_LENGTH}
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      sanitizeLiveInput(e.target.value, {
                        maxLength: SECURITY_LIMITS.MAX_MESSAGE_LENGTH,
                        preserveNewlines: true,
                      })
                    )
                  }
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'err-message' : undefined}
                  className="contact-textarea"
                />
                {errors.message && (
                  <span id="err-message" className="contact-field-error" role="alert">
                    {errors.message}
                  </span>
                )}
              </div>

              {errors.form && (
                <div className="contact-banner-error" role="alert">
                  <AlertCircle size={15} />
                  <span>{errors.form}</span>
                </div>
              )}

              {submittedPayload && (
                <div className="contact-banner-success" role="status">
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 size={16} />
                    <span>Mensagem recebida com sucesso!</span>
                  </div>
                  <p className="text-xs mt-1">
                    Nossa equipe responderá em breve. Se preferir atendimento imediato:
                  </p>
                  <SafeExternalLink
                    href={submittedWhatsappHref}
                    className="inline-flex items-center gap-1 text-xs font-semibold underline mt-1.5"
                  >
                    <span>Enviar também pelo WhatsApp</span>
                    <ArrowRight size={12} />
                  </SafeExternalLink>
                </div>
              )}

              <div className="mt-4">
                <button type="submit" className="btn-coral btn-contact-submit">
                  ENVIAR MENSAGEM
                </button>
              </div>
            </form>
          </div>

          {/* Right: Direct Contact Channels + 3 Curitiba Box */}
          <aside className="contact-sidebar" aria-label="Canais de Atendimento">
            <div className="contact-channel-list">
              <SafeExternalLink
                href={whatsappDirectHref}
                className="contact-channel-item"
              >
                <span className="contact-channel-icon">
                  <MessageCircle size={20} strokeWidth={1.6} />
                </span>
                <div>
                  <div className="contact-channel-title">
                    WhatsApp Direto Curitiba
                  </div>
                  <div className="contact-channel-value">
                    {BRAND_CONFIG.whatsappDisplay}
                  </div>
                </div>
              </SafeExternalLink>

              <SafeExternalLink
                href={`mailto:${BRAND_CONFIG.email}`}
                className="contact-channel-item"
              >
                <span className="contact-channel-icon">
                  <Mail size={20} strokeWidth={1.6} />
                </span>
                <div>
                  <div className="contact-channel-title">
                    E-mail de Atendimento
                  </div>
                  <div className="contact-channel-value">
                    {BRAND_CONFIG.emailDisplay}
                  </div>
                </div>
              </SafeExternalLink>

              <SafeExternalLink
                href={BRAND_CONFIG.instagramUrl}
                className="contact-channel-item"
              >
                <span className="contact-channel-icon">
                  <InstagramIcon size={20} />
                </span>
                <div>
                  <div className="contact-channel-title">Instagram</div>
                  <div className="contact-channel-value">
                    {BRAND_CONFIG.instagramHandle}
                  </div>
                </div>
              </SafeExternalLink>
            </div>

            <div className="contact-curitiba-box">
              <span className="contact-curitiba-kicker">3 CURITIBA</span>

              <div className="contact-unit-Mini">
                <strong>Batel</strong>
                <span>Terça a Sábado das 11h às 22h</span>
              </div>

              <div className="contact-unit-Mini">
                <strong>ParkShoppingBarigui</strong>
                <span>Domingo das 12h às 20h | Seg a Sáb 10h às 22h</span>
              </div>

              <div className="contact-unit-Mini">
                <strong>Shopping Mueller</strong>
                <span>Diariamente, 10h às 22h</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* CREMA LAB EM EVENTOS SECTION */}
      <section
        className="contact-events-wave-section"
        aria-labelledby="contact-events-heading"
      >
        <WaveBackdrop variant="events" className="contact-events-full-bg" />

        <div className="site-container contact-events-inner">
          <div className="contact-cart-arch">
            <img
              src="/assets/images/real/carretino-eventos-3.jpg"
              alt="Carrinho de gelato artesanal da Crema Lab em frente à loja, usado em eventos"
              className="contact-cart-img"
              loading="lazy"
            />
          </div>

          <div className="contact-events-copy-col">
            <span className="eyebrow-tag eyebrow-coral">CREMA LAB EM EVENTOS</span>
            <h2 id="contact-events-heading" className="contact-events-title">
              Leve o nosso laboratório
              <br />
              para a sua celebração
            </h2>
            <p className="contact-events-desc">
              Menus personalizados, atendimento interativo, serviço artesanal e
              estrutura completa para eventos sociais, casamentos e eventos
              corporativos em Curitiba.
            </p>
            <div className="mt-4">
              <AppLink to="/sobre" className="btn-outline-cream">
                <span>NOSSA TRAJETÓRIA</span>
                <ArrowRight size={12} />
              </AppLink>
            </div>
          </div>
        </div>
      </section>

      {/* 3 BOTTOM FAQ / INFO CARDS */}
      <section className="contact-faq-section" aria-label="Informações sobre Eventos e Encomendas">
        <div className="site-container contact-faq-grid">
          {EVENT_FAQ_CARDS.map((card) => (
            <article key={card.id} className="contact-faq-card">
              <h3 className="contact-faq-title">{card.title}</h3>
              <p className="contact-faq-desc">{card.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
