import { useEffect, useState } from 'react';
import { X, MapPin, ArrowRight, Check } from 'lucide-react';
import { CURITIBA_UNITS } from '@/domain/locations';
import { FLAVORS_CATALOG } from '@/domain/flavors';
import { buildSafeWhatsAppUrl } from '@/security/safeUrl';
import { SafeExternalLink } from './SafeExternalLink';

interface OrderDrawerModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export function OrderDrawerModal({ isOpen, onClose }: OrderDrawerModalProps) {
  const [selectedUnitId, setSelectedUnitId] = useState<string>('batel');
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>(['Pistacchio']);
  const [packageSize, setPackageSize] = useState<'500g' | '1kg' | 'casquinha'>('500g');

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const selectedUnit =
    CURITIBA_UNITS.find((u) => u.id === selectedUnitId) ?? CURITIBA_UNITS[0]!;

  const toggleFlavor = (flavorName: string) => {
    setSelectedFlavors((prev) =>
      prev.includes(flavorName)
        ? prev.filter((item) => item !== flavorName)
        : prev.length < 3
          ? [...prev, flavorName]
          : prev
    );
  };

  const orderMessage = [
    `Olá, Crema Lab! Gostaria de fazer um pedido:`,
    `• Unidade: ${selectedUnit.name}`,
    `• Formato: ${packageSize === 'casquinha' ? 'Retirada na loja' : `Viagem Térmica (${packageSize})`}`,
    `• Sabores (${selectedFlavors.length || 1}): ${selectedFlavors.join(', ') || 'Pistacchio'}`,
  ].join('\n');

  const whatsappHref = buildSafeWhatsAppUrl(orderMessage);

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      onClick={onClose}
    >
      <div
        className="modal-card modal-card-wide"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Fechar janela de pedido"
        >
          <X size={18} />
        </button>

        <span className="eyebrow-tag">DELIVERY & RETIRADA EM CURITIBA</span>
        <h2 id="order-modal-title" className="modal-flavor-title mt-1">
          Peça seu Gelato Artesanal
        </h2>
        <p className="modal-flavor-subtitle mb-4">
          Escolha a unidade mais próxima e até 3 sabores autorais para atendimento rápido via WhatsApp.
        </p>

        <div className="order-step-group">
          <span className="modal-info-label">1. ESCOLHA A UNIDADE</span>
          <div className="order-unit-grid">
            {CURITIBA_UNITS.map((unit) => {
              const isSelected = unit.id === selectedUnitId;
              return (
                <button
                  key={unit.id}
                  type="button"
                  onClick={() => setSelectedUnitId(unit.id)}
                  className={`order-unit-option ${isSelected ? 'active' : ''}`}
                >
                  <MapPin size={14} />
                  <div>
                    <div className="order-unit-name">{unit.name}</div>
                    <div className="order-unit-sub">{unit.headerLabel}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="order-step-group">
          <span className="modal-info-label">2. EMBALAGEM TÉRMICA / FORMATO</span>
          <div className="order-size-row">
            {(
              [
                ['500g', 'Pote Térmico 500g (até 2 sabores)'],
                ['1kg', 'Pote Térmico 1kg (até 3 sabores)'],
                ['casquinha', 'Retirada na Loja / Affogato'],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setPackageSize(key)}
                className={`order-size-pill ${packageSize === key ? 'active' : ''}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="order-step-group">
          <span className="modal-info-label">
            3. SELECIONE ATÉ 3 SABORES ({selectedFlavors.length}/3)
          </span>
          <div className="order-flavor-chips">
            {FLAVORS_CATALOG.map((flavor) => {
              const active = selectedFlavors.includes(flavor.name);
              return (
                <button
                  key={flavor.id}
                  type="button"
                  onClick={() => toggleFlavor(flavor.name)}
                  className={`order-flavor-chip ${active ? 'active' : ''}`}
                >
                  {active && <Check size={12} />}
                  <span>{flavor.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="modal-flavor-footer mt-5">
          <SafeExternalLink href={whatsappHref} className="btn-coral w-full justify-center">
            <span>FINALIZAR PEDIDO NO WHATSAPP</span>
            <ArrowRight size={15} />
          </SafeExternalLink>
        </div>
      </div>
    </div>
  );
}
