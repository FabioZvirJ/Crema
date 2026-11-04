import { useState, type FormEvent } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { AppLink } from '@/app/router';
import { BRAND_CONFIG } from '@/config/brand';
import { RATE_LIMIT_POLICIES, SECURITY_LIMITS } from '@/config/security';
import { sanitizeLiveInput, sanitizePlainText } from '@/security/sanitizer';
import { isValidEmail } from '@/security/validation';
import { rateLimiter } from '@/security/rateLimiter';
import { SafeExternalLink } from '@/components/ui/SafeExternalLink';
import { InstagramIcon, TikTokIcon } from '@/components/visuals/BotanicalVectors';

export function Footer() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleaned = sanitizePlainText(email, {
      maxLength: SECURITY_LIMITS.MAX_EMAIL_LENGTH,
    }).toLowerCase();

    if (!isValidEmail(cleaned)) {
      setIsSuccess(false);
      setStatusMessage('Informe um e-mail válido.');
      return;
    }

    const rateCheck = rateLimiter.checkAndRecord(RATE_LIMIT_POLICIES.NEWSLETTER);
    if (!rateCheck.allowed) {
      setIsSuccess(false);
      setStatusMessage('Aguarde alguns segundos antes de tentar novamente.');
      return;
    }

    setIsSuccess(true);
    setEmail('');
    setStatusMessage('Inscrição confirmada com sucesso!');
  };

  return (
    <footer className="site-footer">
      <div className="site-container footer-top">
        <div className="footer-brand">
          <AppLink to="/" className="footer-logo-link">
            <span className="footer-logo-main">{BRAND_CONFIG.name}</span>
            <span className="footer-logo-sub">{BRAND_CONFIG.tagline}</span>
          </AppLink>
        </div>

        <nav className="footer-nav" aria-label="Links do Rodapé">
          <AppLink to="/" className="footer-nav-link">
            Home
          </AppLink>
          <AppLink to="/sabores" className="footer-nav-link">
            Sabores
          </AppLink>
          <AppLink to="/sobre" className="footer-nav-link">
            Sobre
          </AppLink>
          <AppLink to="/unidades" className="footer-nav-link">
            Unidades
          </AppLink>
          <AppLink to="/blog" className="footer-nav-link">
            Blog
          </AppLink>
          <AppLink to="/contato" className="footer-nav-link">
            Contato
          </AppLink>
        </nav>

        <div className="footer-socials">
          <SafeExternalLink
            href={BRAND_CONFIG.instagramUrl}
            className="footer-social-icon"
            aria-label="Instagram da Crema Lab"
          >
            <InstagramIcon size={15} />
          </SafeExternalLink>
          <SafeExternalLink
            href={BRAND_CONFIG.tiktokUrl}
            className="footer-social-icon"
            aria-label="TikTok da Crema Lab"
          >
            <TikTokIcon size={15} />
          </SafeExternalLink>
        </div>

        <form
          className="footer-newsletter"
          onSubmit={handleNewsletterSubmit}
          noValidate
        >
          <label htmlFor="footer-newsletter-email" className="footer-newsletter-label">
            Receba novidades da Crema
          </label>
          <div className="footer-newsletter-input-wrap">
            <input
              id="footer-newsletter-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="Seu e-mail"
              value={email}
              maxLength={SECURITY_LIMITS.MAX_EMAIL_LENGTH}
              onChange={(e) => {
                setEmail(
                  sanitizeLiveInput(e.target.value, {
                    maxLength: SECURITY_LIMITS.MAX_EMAIL_LENGTH,
                  })
                );
                if (statusMessage) setStatusMessage(null);
              }}
              className="footer-newsletter-input"
            />
            <button
              type="submit"
              className="footer-newsletter-btn"
              aria-label="Inscrever-se na newsletter"
            >
              {isSuccess ? <Check size={14} /> : <ArrowRight size={14} />}
            </button>
          </div>
          {statusMessage && (
            <p
              role="status"
              className={`footer-newsletter-feedback ${
                isSuccess ? 'text-emerald-300' : 'text-amber-300'
              }`}
            >
              {statusMessage}
            </p>
          )}
        </form>
      </div>

      <div className="site-container footer-bottom">
        <span>{BRAND_CONFIG.city}</span>
        <span>
          © {BRAND_CONFIG.copyrightYear} Crema Lab. Todos os direitos reservados.
        </span>
        <span>Feito com calor ♥</span>
      </div>
    </footer>
  );
}
