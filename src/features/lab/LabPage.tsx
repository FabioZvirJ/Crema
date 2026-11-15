import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Beaker,
  Check,
  FileText,
  FlaskConical,
  Plus,
  RotateCcw,
  Sparkles,
  ThermometerSnowflake,
  X,
} from 'lucide-react';
import { SubpageHero } from '@/components/layout/SubpageHero';
import { SafeExternalLink } from '@/components/ui/SafeExternalLink';
import { FLAVORS_CATALOG } from '@/domain/flavors';
import type { FlavorCategory, FlavorItem } from '@/domain/types';
import { sanitizePlainText } from '@/security/sanitizer';
import { buildSafeWhatsAppUrl } from '@/security/safeUrl';
import { GelatoStage } from './GelatoStage';
import { MiniScoop } from './MiniScoop';

export type VesselId =
  | 'casquinha-artesanal'
  | 'casquinha-premium'
  | 'copinho-lab'
  | 'pote-termico';

export interface LabVesselOption {
  readonly id: VesselId;
  readonly code: string;
  readonly name: string;
  readonly subtitle: string;
  readonly description: string;
  readonly maxScoops: number;
  readonly volumeLabel: string;
  readonly thermalSpec: string;
  readonly badge: string;
}

export const LAB_VESSELS: ReadonlyArray<LabVesselOption> = Object.freeze([
  {
    id: 'casquinha-artesanal',
    code: 'CONO-01',
    name: 'Casquinha Artesanal',
    subtitle: 'Cestinha crocante assada na loja',
    description:
      'Massa leve com toque de baunilha natural, assada diariamente na bancada para crocância máxima.',
    maxScoops: 2,
    volumeLabel: '140 ml',
    thermalSpec: 'Consumo Imediato · Crocância 95%',
    badge: 'Clássico da Loja',
  },
  {
    id: 'casquinha-premium',
    code: 'CONO-PR',
    name: 'Casquinha Premium Belga',
    subtitle: 'Borda banhada em chocolate + pistache',
    description:
      'Casquinha artesanal com borda selada em chocolate belga 70% e granella de pistache tostado.',
    maxScoops: 2,
    volumeLabel: '165 ml',
    thermalSpec: 'Borda Selada · Contraste Quente/Frio',
    badge: 'Assinatura Lab',
  },
  {
    id: 'copinho-lab',
    code: 'CUP-LAB',
    name: 'Copinho de Ensaio',
    subtitle: 'Degustação na bancada com biscoito',
    description:
      'Ideal para testar até 3 extrações puras sem interferência, finalizado com biscoito da casa.',
    maxScoops: 3,
    volumeLabel: '210 ml',
    thermalSpec: 'Estabilidade Alta · Até 3 Camadas',
    badge: 'Mais Versátil',
  },
  {
    id: 'pote-termico',
    code: 'THERM-500',
    name: 'Cápsula Térmica (Viagem)',
    subtitle: 'Isolamento criogênico 500g / 1kg',
    description:
      'Embalagem selada de dupla parede para levar suas extrações favoritas para casa sem perder textura.',
    maxScoops: 3,
    volumeLabel: '500 g',
    thermalSpec: 'Isolamento 45 min · Viagem & Delivery',
    badge: 'Para Viagem',
  },
]);

export type CatalystId =
  | 'farofinha-pistache'
  | 'gianduia-quente'
  | 'reducao-amarena'
  | 'crumble-speculoos'
  | 'flor-de-sal'
  | 'puro';

/** The Lab no longer offers toppings: every formula is served pure. */
const LAB_TOPPING: CatalystId = 'puro';

interface FlavorLabMeta {
  readonly symbol: string;
  readonly atomicNum: string;
  readonly cremosidade: number;
  readonly dulcor: number;
  readonly frescor: number;
  readonly brix: string;
  readonly ph: string;
}

const FLAVOR_LAB_META: Readonly<Record<string, FlavorLabMeta>> = Object.freeze({
  pistacchio: {
    symbol: 'Pi',
    atomicNum: '01',
    cremosidade: 86,
    dulcor: 66,
    frescor: 58,
    brix: '21°Bx',
    ph: '6.4',
  },
  cioccolato: {
    symbol: 'Ci',
    atomicNum: '02',
    cremosidade: 94,
    dulcor: 72,
    frescor: 38,
    brix: '23°Bx',
    ph: '6.2',
  },
  'frutas-vermelhas': {
    symbol: 'Fv',
    atomicNum: '03',
    cremosidade: 62,
    dulcor: 60,
    frescor: 95,
    brix: '19°Bx',
    ph: '3.8',
  },
  nocciolotto: {
    symbol: 'No',
    atomicNum: '05',
    cremosidade: 95,
    dulcor: 76,
    frescor: 34,
    brix: '24°Bx',
    ph: '6.3',
  },
  'cuca-doce-de-leite': {
    symbol: 'Cd',
    atomicNum: '06',
    cremosidade: 92,
    dulcor: 88,
    frescor: 32,
    brix: '26°Bx',
    ph: '6.4',
  },
});

interface CuratedFormulaPreset {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly subtitle: string;
  readonly vesselId: VesselId;
  readonly flavorIds: ReadonlyArray<string>;
}

const CURATED_PRESETS: ReadonlyArray<CuratedFormulaPreset> = Object.freeze([
  {
    id: 'triade-siciliana',
    code: 'EXP-01',
    title: 'Dueto Pistache & Avelã',
    subtitle: 'Casquinha Premium + Pistacchio + Nocciolotto',
    vesselId: 'casquinha-premium',
    flavorIds: ['pistacchio', 'nocciolotto'],
  },
  {
    id: 'contraste-rubi',
    code: 'EXP-02',
    title: 'Contraste Cacau & Rubi',
    subtitle: 'Casquinha Artesanal + Cioccolatudo + Rosso Frapone',
    vesselId: 'casquinha-artesanal',
    flavorIds: ['cioccolato', 'frutas-vermelhas'],
  },
  {
    id: 'botanica-vegana',
    code: 'EXP-03',
    title: 'Dueto Botânico (100% Plant-Based)',
    subtitle: 'Copinho de Ensaio + Pistacchio + Rosso Frapone',
    vesselId: 'copinho-lab',
    flavorIds: ['pistacchio', 'frutas-vermelhas'],
  },
]);

function getFlavorMeta(flavorId: string): FlavorLabMeta {
  return (
    FLAVOR_LAB_META[flavorId] ?? {
      symbol: 'Gl',
      atomicNum: '00',
      cremosidade: 80,
      dulcor: 70,
      frescor: 70,
      brix: '20°Bx',
      ph: '6.0',
    }
  );
}

export function LabPage() {
  const [vesselId, setVesselId] = useState<VesselId>('casquinha-premium');
  const [selectedFlavorIds, setSelectedFlavorIds] = useState<string[]>([
    'pistacchio',
    'frutas-vermelhas',
  ]);
  const [categoryFilter, setCategoryFilter] = useState<FlavorCategory>('todos');
  const [formulaCustomName, setFormulaCustomName] = useState<string>('');
  const [ticketModalOpen, setTicketModalOpen] = useState<boolean>(false);

  const currentVessel = useMemo(
    () => LAB_VESSELS.find((v) => v.id === vesselId) ?? LAB_VESSELS[0]!,
    [vesselId]
  );

  const selectedFlavorItems = useMemo(
    () =>
      selectedFlavorIds
        .map((id) => FLAVORS_CATALOG.find((item) => item.id === id))
        .filter((item): item is FlavorItem => Boolean(item)),
    [selectedFlavorIds]
  );

  const filteredReagents = useMemo(() => {
    if (categoryFilter === 'todos') {
      return FLAVORS_CATALOG;
    }
    return FLAVORS_CATALOG.filter(
      (item) =>
        item.category === categoryFilter ||
        item.secondaryCategories?.includes(categoryFilter)
    );
  }, [categoryFilter]);

  const handleSelectVessel = (nextVessel: LabVesselOption) => {
    setVesselId(nextVessel.id);
    setSelectedFlavorIds((prev) => prev.slice(0, nextVessel.maxScoops));
  };

  const handleAddOrToggleFlavor = (flavorId: string) => {
    setSelectedFlavorIds((prev) => {
      if (prev.includes(flavorId)) {
        if (prev.length === 1) return prev; // Keep at least 1 extraction on the workbench
        return prev.filter((id) => id !== flavorId);
      }
      if (prev.length < currentVessel.maxScoops) {
        return [...prev, flavorId];
      }
      // Replace the top layer when already at max capacity
      return [...prev.slice(0, prev.length - 1), flavorId];
    });
  };

  const handleRemoveLayerAt = (index: number) => {
    setSelectedFlavorIds((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleApplyPreset = (preset: CuratedFormulaPreset) => {
    setVesselId(preset.vesselId);
    setSelectedFlavorIds([...preset.flavorIds]);
    setFormulaCustomName(preset.title);
  };

  const handleSurpriseFormula = () => {
    const randomVessel =
      LAB_VESSELS[Math.floor(Math.random() * LAB_VESSELS.length)] ?? LAB_VESSELS[0]!;
    const shuffledFlavors = [...FLAVORS_CATALOG].sort(() => Math.random() - 0.5);
    const pickedFlavors = shuffledFlavors
      .slice(0, randomVessel.maxScoops)
      .map((f) => f.id);

    setVesselId(randomVessel.id);
    setSelectedFlavorIds(pickedFlavors);
    setFormulaCustomName('Alquimia Surpresa da Chef');
  };

  const handleResetWorkbench = () => {
    setVesselId('casquinha-premium');
    setSelectedFlavorIds(['pistacchio', 'frutas-vermelhas']);
    setFormulaCustomName('');
  };

  // Compute live laboratory telemetry & formula code
  const telemetry = useMemo(() => {
    const metas = selectedFlavorItems.map((f) => getFlavorMeta(f.id));
    const count = metas.length || 1;

    const avgCremosidade = Math.round(
      metas.reduce((acc, m) => acc + m.cremosidade, 0) / count
    );
    const rawDulcor =
      Math.round(metas.reduce((acc, m) => acc + m.dulcor, 0) / count);
    const avgDulcor = Math.max(25, Math.min(98, rawDulcor));
    const avgFrescor = Math.round(
      metas.reduce((acc, m) => acc + m.frescor, 0) / count
    );
    const baseCrunch =
      vesselId === 'casquinha-premium'
        ? 82
        : vesselId === 'casquinha-artesanal'
          ? 74
          : 42;
    const texturaContraste = Math.min(98, baseCrunch);

    const symbolsChain = metas.map((m) => m.symbol).join('·');
    const numericHash =
      selectedFlavorItems.reduce((acc, item, idx) => acc + item.id.length * (idx + 17), 104) +
      currentVessel.maxScoops * 31;
    const formulaCode = `CL-${symbolsChain || 'GL'}-${numericHash}`;

    const allSorbets = selectedFlavorItems.every((f) => f.category === 'sorbets');
    const isPlantBased =
      allSorbets && vesselId !== 'casquinha-premium';

    let chefNote = '';
    if (selectedFlavorItems.length === 1) {
      const f = selectedFlavorItems[0]!;
      chefNote = `Extração monocromática de ${f.name}: ideal para apreciar a pureza dos ingredientes naturais. ${f.pairingNote ?? ''}`;
    } else if (avgFrescor >= 75 && avgCremosidade >= 75) {
      chefNote =
        'Equilíbrio Clássico de Bancada: o contraste entre a base cremosa e a acidez viva da fruta limpa o paladar a cada colherada.';
    } else if (avgCremosidade >= 85) {
      chefNote =
        'Alquimia Aveludada de Alta Densidade: combinação rica em pastas nobres e cacau/castanhas. Harmoniza perfeitamente com um espresso tirado na hora.';
    } else {
      chefNote =
        'Perfil Botânico & Refrescante: extrações leves de frutas frescas com baixo dulçor e alta vivacidade aromática.';
    }

    return {
      cremosidade: avgCremosidade,
      dulcor: avgDulcor,
      frescor: avgFrescor,
      texturaContraste,
      formulaCode,
      isPlantBased,
      chefNote,
    };
  }, [selectedFlavorItems, vesselId, currentVessel.maxScoops]);

  const cleanFormulaTitle =
    sanitizePlainText(formulaCustomName, { maxLength: 60 }) ||
    `Fórmula ${telemetry.formulaCode}`;

  const whatsappMessage = [
    `Olá, Crema Lab! Criei uma fórmula no Laboratório do site:`,
    `• Código de Bancada: #${telemetry.formulaCode}`,
    `• Nome da Criação: ${cleanFormulaTitle}`,
    `• Recipiente: ${currentVessel.name} (${currentVessel.code})`,
    `• Extrações (${selectedFlavorItems.length}/${currentVessel.maxScoops}): ${selectedFlavorItems.map((f) => f.name).join(' + ')}`,
  ].join('\n');

  const whatsappHref = buildSafeWhatsAppUrl(whatsappMessage);

  return (
    <div className="lab-page">
      <SubpageHero
        title="Laboratório Crema"
        subtitle="Nossa bancada experimental: escolha o recipiente, combine extrações puras na câmara fria e crie sua fórmula autoral."
        variant="lab"
      />

      <section className="lab-workbench-section">
        <div className="site-container">
          {/* Top Laboratory Protocol & Presets Bar */}
          <div className="lab-protocol-bar">
            <div className="lab-protocol-meta">
              <span className="lab-protocol-badge">
                <FlaskConical size={14} />
                <span>PROTOCOLO #{telemetry.formulaCode}</span>
              </span>
              <span className="lab-protocol-stat">
                <ThermometerSnowflake size={14} />
                <span>CÂMARA: -14.2°C</span>
              </span>
              <span className="lab-protocol-stat">
                <Beaker size={14} />
                <span>
                  CAPACIDADE: {selectedFlavorItems.length}/{currentVessel.maxScoops} EXTRAÇÕES
                </span>
              </span>
            </div>

            <div className="lab-protocol-actions">
              <button
                type="button"
                onClick={handleSurpriseFormula}
                className="lab-btn-surprise"
              >
                <Sparkles size={14} />
                <span>FÓRMULA SURPRESA DA CHEF</span>
              </button>
              <button
                type="button"
                onClick={handleResetWorkbench}
                className="lab-btn-reset"
                aria-label="Reiniciar bancada"
              >
                <RotateCcw size={13} />
                <span>LIMPAR BANCADA</span>
              </button>
            </div>
          </div>

          {/* Quick Curated Formulas Strip */}
          <div className="lab-presets-strip" aria-label="Fórmulas assinadas pela Chef">
            <span className="lab-presets-label">FÓRMULAS DE REFERÊNCIA:</span>
            <div className="lab-presets-list">
              {CURATED_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="lab-preset-chip"
                >
                  <span className="lab-preset-code">{preset.code}</span>
                  <span className="lab-preset-title">{preset.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main 2-Column Laboratory Workbench */}
          <div className="lab-workbench-grid">
            {/* LEFT COLUMN: 4 Interactive Formulation Stations */}
            <div className="lab-stations-col">
              {/* STATION 01: VESSEL / BASE */}
              <article className="lab-station-card">
                <header className="lab-station-header">
                  <div>
                    <span className="lab-station-step">ESTAÇÃO 01 · RECIPIENTE DE ENSAIO</span>
                    <h2 className="lab-station-title">Escolha a Base da Fórmula</h2>
                  </div>
                  <span className="lab-station-spec">{currentVessel.volumeLabel}</span>
                </header>

                <div className="lab-vessel-grid">
                  {LAB_VESSELS.map((vessel) => {
                    const isSelected = vessel.id === vesselId;
                    return (
                      <button
                        key={vessel.id}
                        type="button"
                        onClick={() => handleSelectVessel(vessel)}
                        className={`lab-vessel-card ${isSelected ? 'is-active' : ''}`}
                        aria-pressed={isSelected}
                      >
                        <div className="lab-vessel-card-top">
                          <span className="lab-vessel-code">{vessel.code}</span>
                          <span className="lab-vessel-badge">{vessel.badge}</span>
                        </div>
                        <h3 className="lab-vessel-name">{vessel.name}</h3>
                        <p className="lab-vessel-sub">{vessel.subtitle}</p>
                        <p className="lab-vessel-desc">{vessel.description}</p>
                        <div className="lab-vessel-footer">
                          <span>Até {vessel.maxScoops} extrações</span>
                          <span>•</span>
                          <span>{vessel.volumeLabel}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </article>

              {/* STATION 02: PERIODIC TABLE OF FLAVOR REAGENTS */}
              <article className="lab-station-card">
                <header className="lab-station-header">
                  <div>
                    <span className="lab-station-step">
                      ESTAÇÃO 02 · TABELA PERIÓDICA DE EXTRAÇÕES ({selectedFlavorItems.length}/
                      {currentVessel.maxScoops})
                    </span>
                    <h2 className="lab-station-title">Selecione os Reagentes de Sabor</h2>
                  </div>

                  <div className="lab-reagent-filters" role="tablist" aria-label="Filtrar reagentes">
                    {(
                      [
                        ['todos', 'TODOS'],
                        ['gelatos', 'BASE LEITE'],
                        ['sorbets', 'BASE ÁGUA / FRUTA'],
                        ['especiais', 'AUTORAIS LAB'],
                      ] as const
                    ).map(([catId, label]) => (
                      <button
                        key={catId}
                        type="button"
                        role="tab"
                        aria-selected={categoryFilter === catId}
                        onClick={() => setCategoryFilter(catId)}
                        className={`lab-filter-pill ${categoryFilter === catId ? 'is-active' : ''}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </header>

                <div className="lab-periodic-grid">
                  {filteredReagents.map((flavor) => {
                    const meta = getFlavorMeta(flavor.id);
                    const layerIndex = selectedFlavorIds.indexOf(flavor.id);
                    const isSelected = layerIndex !== -1;

                    return (
                      <button
                        key={flavor.id}
                        type="button"
                        onClick={() => handleAddOrToggleFlavor(flavor.id)}
                        className={`lab-element-card ${isSelected ? 'is-selected' : ''}`}
                        aria-pressed={isSelected}
                      >
                        <div className="lab-element-top">
                          <span className="lab-element-num">{meta.atomicNum}</span>
                          <span className="lab-element-brix">{meta.brix}</span>
                        </div>

                        <div className="lab-element-visual">
                          <span className="lab-element-symbol">{meta.symbol}</span>
                          <MiniScoop flavorId={flavor.id} size="sm" />
                        </div>

                        <div className="lab-element-info">
                          <span className="lab-element-name">{flavor.name}</span>
                          <span className="lab-element-cat">
                            {flavor.category === 'sorbets' ? 'Sorbet · Base Água' : 'Gelato · Base Leite'}
                          </span>
                        </div>

                        <div className="lab-element-status">
                          {isSelected ? (
                            <span className="lab-element-layer-tag">
                              <Check size={11} /> CAMADA 0{layerIndex + 1}
                            </span>
                          ) : (
                            <span className="lab-element-add-tag">
                              <Plus size={11} /> ADICIONAR
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </article>

            </div>

            {/* RIGHT COLUMN (STICKY): CRYOGENIC CHAMBER & TELEMETRY REPORT */}
            <aside className="lab-chamber-col" aria-label="Câmara de visualização e laudo técnico">
              <div className="lab-chamber-panel">
                {/* Chamber Header */}
                <div className="lab-chamber-topbar">
                  <div>
                    <span className="lab-chamber-eyebrow">CÂMARA DE ENSAIO CRIOGÊNICO</span>
                    <h3 className="lab-chamber-formula-id">#{telemetry.formulaCode}</h3>
                  </div>
                  <div className="lab-chamber-status-pill">
                    <span className="lab-status-led" />
                    <span>ESTÁVEL · -14.2°C</span>
                  </div>
                </div>

                <div className="lab-chamber-pin">
                  {/* Visual Glass Chamber with Graduated Scale */}
                  <div className="lab-chamber-viewport">
                    {/* Left graduated cylinder ruler */}
                    <div className="lab-chamber-scale" aria-hidden="true">
                      <span>250ml</span>
                      <span>200ml</span>
                      <span>150ml</span>
                      <span>100ml</span>
                      <span>50ml</span>
                      <span>0ml</span>
                    </div>

                    {/* Live 3D assembly: vessel and scoops dropping in */}
                    <GelatoStage
                      vesselId={vesselId}
                      catalystId={LAB_TOPPING}
                      layers={selectedFlavorItems.map((f) => ({
                        id: f.id,
                        name: f.name,
                        symbol: getFlavorMeta(f.id).symbol,
                      }))}
                      onRemoveLayer={handleRemoveLayerAt}
                    />
                  </div>
                </div>

                <div className="lab-chamber-details">
                  {/* Sensory Telemetry Bars */}
                  <div className="lab-telemetry-box">
                    <div className="lab-telemetry-header">
                      <span>TELEMETRIA SENSORIAL DA AMOSTRA</span>
                      <span>OVERRUN 22%</span>
                    </div>

                    <div className="lab-meter-list">
                      <div className="lab-meter-row">
                        <div className="lab-meter-labels">
                          <span>Índice de Cremosidade (Emulsão)</span>
                          <strong>{telemetry.cremosidade}%</strong>
                        </div>
                        <div className="lab-meter-track">
                          <div
                            className="lab-meter-fill lab-meter-fill-burgundy"
                            style={{ width: `${telemetry.cremosidade}%` }}
                          />
                        </div>
                      </div>

                      <div className="lab-meter-row">
                        <div className="lab-meter-labels">
                          <span>Equilíbrio de Dulçor (°Brix)</span>
                          <strong>{telemetry.dulcor}%</strong>
                        </div>
                        <div className="lab-meter-track">
                          <div
                            className="lab-meter-fill lab-meter-fill-terracotta"
                            style={{ width: `${telemetry.dulcor}%` }}
                          />
                        </div>
                      </div>

                      <div className="lab-meter-row">
                        <div className="lab-meter-labels">
                          <span>Frescor Botânico & Acidez</span>
                          <strong>{telemetry.frescor}%</strong>
                        </div>
                        <div className="lab-meter-track">
                          <div
                            className="lab-meter-fill lab-meter-fill-olive"
                            style={{ width: `${telemetry.frescor}%` }}
                          />
                        </div>
                      </div>

                      <div className="lab-meter-row">
                        <div className="lab-meter-labels">
                          <span>Contraste de Textura & Crocância</span>
                          <strong>{telemetry.texturaContraste}%</strong>
                        </div>
                        <div className="lab-meter-track">
                          <div
                            className="lab-meter-fill lab-meter-fill-gold"
                            style={{ width: `${telemetry.texturaContraste}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chef's Technical Analysis Card */}
                  <div className="lab-chef-report">
                    <div className="lab-chef-report-header">
                      <span className="lab-chef-report-tag">LAUDO TÉCNICO · CHEF HARLEN</span>
                      {telemetry.isPlantBased && (
                        <span className="lab-Report-vegan-pill">100% PLANT-BASED</span>
                      )}
                    </div>
                    <p className="lab-chef-report-text">{telemetry.chefNote}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="lab-chamber-actions">
                    <SafeExternalLink
                      href={whatsappHref}
                      className="btn-coral lab-whatsapp-cta"
                    >
                      <span>PEDIR ESTA FÓRMULA NO WHATSAPP</span>
                      <ArrowRight size={15} />
                    </SafeExternalLink>

                    <button
                      type="button"
                      onClick={() => setTicketModalOpen(true)}
                      className="lab-ticket-btn"
                    >
                      <FileText size={14} />
                      <span>EMITIR LAUDO DE BALCÃO (RECEITUÁRIO)</span>
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Printable / Counter Prescription Ticket Modal */}
      {ticketModalOpen && (
        <div
          className="modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lab-ticket-modal-title"
          onClick={() => setTicketModalOpen(false)}
        >
          <div
            className="lab-ticket-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setTicketModalOpen(false)}
              aria-label="Fechar laudo de bancada"
            >
              <X size={18} />
            </button>

            <div className="lab-ticket-paper">
              <div className="lab-ticket-header">
                <span className="lab-ticket-brand">CREMA LAB · LABORATÓRIO DE GELATO</span>
                <h2 id="lab-ticket-modal-title" className="lab-ticket-title">
                  {cleanFormulaTitle}
                </h2>
                <span className="lab-ticket-code">
                  PROTOCOLO DE BANCADA #{telemetry.formulaCode}
                </span>
              </div>

              <div className="lab-ticket-divider" />

              <dl className="lab-ticket-specs">
                <div className="lab-ticket-row">
                  <dt>RECIPIENTE (BASE)</dt>
                  <dd>
                    {currentVessel.name} ({currentVessel.code})
                  </dd>
                </div>
                <div className="lab-ticket-row">
                  <dt>EXTRAÇÕES SELECIONADAS</dt>
                  <dd>
                    {selectedFlavorItems
                      .map((f, idx) => `0${idx + 1}. ${f.name} [${getFlavorMeta(f.id).symbol}]`)
                      .join(' · ')}
                  </dd>
                </div>
                <div className="lab-ticket-row">
                  <dt>TELEMETRIA</dt>
                  <dd>
                    Cremosidade {telemetry.cremosidade}% · Dulçor {telemetry.dulcor}% · Frescor{' '}
                    {telemetry.frescor}%
                  </dd>
                </div>
              </dl>

              <div className="lab-ticket-divider" />

              <p className="lab-ticket-note">
                Apresente este receituário no balcão de uma das nossas unidades ou envie
                diretamente pelo WhatsApp para consultar disponibilidade das extrações do dia.
              </p>

              <div className="lab-ticket-barcode" aria-hidden="true">
                <div className="lab-barcode-bars" />
                <span>*{telemetry.formulaCode}-CURITIBA*</span>
              </div>

              <div className="lab-ticket-actions">
                <SafeExternalLink
                  href={whatsappHref}
                  className="btn-coral w-full justify-center"
                >
                  <span>ENVIAR LAUDO NO WHATSAPP</span>
                  <ArrowRight size={14} />
                </SafeExternalLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
