import { useEffect } from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import type { FlavorItem } from '@/domain/types';
import { buildSafeWhatsAppUrl } from '@/security/safeUrl';
import { FlavorPhoto } from './FlavorPhoto';
import { SafeExternalLink } from './SafeExternalLink';

interface FlavorModalProps {
  readonly flavor: FlavorItem | null;
  readonly onClose: () => void;
}

export function FlavorModal({ flavor, onClose }: FlavorModalProps) {
  useEffect(() => {
    if (!flavor) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [flavor, onClose]);

  if (!flavor) {
    return null;
  }

  const whatsappHref = buildSafeWhatsAppUrl(
    `Olá, Crema Lab! Gostaria de saber a disponibilidade do sabor ${flavor.name} hoje nas unidades de Curitiba.`
  );

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="flavor-modal-title"
      onClick={onClose}
    >
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Fechar detalhes do sabor"
        >
          <X size={18} />
        </button>

        <div className="modal-flavor-header">
          <div className="modal-scoop-wrap">
            <FlavorPhoto flavor={flavor} className="modal-scoop-img" />
          </div>
          <div className="modal-badges-row">
            {flavor.dietaryBadges.map((badge) => (
              <span key={badge} className="dietary-pill">
                <Sparkles size={11} />
                {badge}
              </span>
            ))}
          </div>
          <h2 id="flavor-modal-title" className="modal-flavor-title">
            {flavor.name}
          </h2>
          <p className="modal-flavor-subtitle">{flavor.description}</p>
        </div>

        <div className="modal-flavor-body">
          {!flavor.onMenu && (
            <p className="modal-past-note">
              Este sabor está indisponível no momento. Vale perguntar pelo
              WhatsApp quando ele volta.
            </p>
          )}

          <div className="modal-info-block">
            <span className="modal-info-label">NOTAS DO LABORATÓRIO</span>
            <p className="modal-info-text">{flavor.story}</p>
          </div>

          <div className="modal-info-block">
            <span className="modal-info-label">SUGESTÃO DE HARMONIZAÇÃO</span>
            <p className="modal-info-text">{flavor.pairingNote}</p>
          </div>
        </div>

        <div className="modal-flavor-footer">
          <SafeExternalLink href={whatsappHref} className="btn-coral w-full justify-center">
            <span>{flavor.onMenu ? 'PEDIR ESTE SABOR NO WHATSAPP' : 'PERGUNTAR SE ESTÁ DISPONÍVEL'}</span>
            <ArrowRight size={15} />
          </SafeExternalLink>
        </div>
      </div>
    </div>
  );
}
