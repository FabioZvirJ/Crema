import { useState } from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import { CURITIBA_UNITS } from '@/domain/locations';
import { SafeExternalLink } from '@/components/ui/SafeExternalLink';

export function CuritibaMap() {
  const [activeUnitId, setActiveUnitId] = useState<'batel' | 'barigui' | 'mueller'>('batel');

  const activeUnit =
    CURITIBA_UNITS.find((u) => u.id === activeUnitId) ?? CURITIBA_UNITS[0]!;

  return (
    <div className="curitiba-map-wrapper">
      <div className="curitiba-map-frame">
        <img
          src="/assets/images/curitiba-map-card.png"
          alt="Mapa ilustrado das três unidades da Crema Lab em Curitiba: Batel, ParkShoppingBarigui e Shopping Mueller"
          className="curitiba-map-img"
        />

        {/* Interactive Pin Triggers Overlaid at exact B, C, M coordinates */}
        {CURITIBA_UNITS.map((unit) => {
          const isSelected = unit.id === activeUnitId;
          return (
            <button
              key={unit.id}
              type="button"
              onClick={() => setActiveUnitId(unit.id)}
              style={{
                left: `${unit.mapCoords.x}%`,
                top: `${unit.mapCoords.y}%`,
              }}
              className={`map-pin-hotspot ${isSelected ? 'selected' : ''}`}
              aria-label={`Selecionar ${unit.name} no mapa`}
              title={unit.name}
            >
              <span className="sr-only">{unit.name}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Unit Switcher & Quick Route Bar */}
      <div className="curitiba-map-caption">
        <div className="map-unit-pills">
          {CURITIBA_UNITS.map((unit) => (
            <button
              key={unit.id}
              type="button"
              onClick={() => setActiveUnitId(unit.id)}
              className={`map-unit-pill ${unit.id === activeUnitId ? 'active' : ''}`}
            >
              <span className="map-pin-letter">{unit.mapPinCode}</span>
              <span>{unit.name}</span>
            </button>
          ))}
        </div>

        <div className="map-active-details">
          <div className="flex items-center gap-1.5 text-xs">
            <MapPin size={13} className="shrink-0" />
            <span>{activeUnit.address}</span>
          </div>
          <SafeExternalLink
            href={activeUnit.mapsUrl}
            className="map-open-link"
          >
            <span>Abrir no Google Maps</span>
            <ExternalLink size={12} />
          </SafeExternalLink>
        </div>
      </div>
    </div>
  );
}
