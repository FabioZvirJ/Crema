import { useEffect, useRef, useState } from 'react';
import { ExternalLink, MapPin } from 'lucide-react';
import type { Map as LeafletMap, Marker } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CURITIBA_UNITS } from '@/domain/locations';
import { SafeExternalLink } from '@/components/ui/SafeExternalLink';

type UnitId = 'batel' | 'barigui' | 'mueller';

const TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors';

/** Real, interactive map (OpenStreetMap tiles, tinted to the brand palette in CSS). */
export function CuritibaMap() {
  const [activeUnitId, setActiveUnitId] = useState<UnitId>('batel');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Map<UnitId, Marker>>(new Map());
  const activeRef = useRef<UnitId>('batel');
  const syncRef = useRef<(id: UnitId, fly: boolean) => void>(() => undefined);

  const activeUnit = CURITIBA_UNITS.find((u) => u.id === activeUnitId) ?? CURITIBA_UNITS[0]!;

  // Create the map once; Leaflet is loaded lazily so other pages stay light.
  useEffect(() => {
    let cancelled = false;
    const markers = markersRef.current;

    void import('leaflet')
      .then((L) => {
        const container = containerRef.current;
        if (cancelled || !container || mapRef.current) return;

        const map = L.map(container, {
          zoomControl: false,
          scrollWheelZoom: false,
          attributionControl: true,
        });
        L.control.zoom({ position: 'bottomright' }).addTo(map);
        L.tileLayer(TILE_URL, {
          attribution: TILE_ATTRIBUTION,
          maxZoom: 19,
        }).addTo(map);

        const bounds = L.latLngBounds(CURITIBA_UNITS.map((u) => [u.coords.lat, u.coords.lng] as [number, number]));
        map.fitBounds(bounds, { padding: [48, 48] });

        CURITIBA_UNITS.forEach((unit) => {
          const pinOuter = document.createElement('span');
          pinOuter.className = 'crema-pin';
          const pinInner = document.createElement('span');
          pinInner.textContent = unit.mapPinCode;
          pinOuter.appendChild(pinInner);

          const icon = L.divIcon({
            className: 'crema-pin-wrap',
            html: pinOuter,
            iconSize: [38, 46],
            iconAnchor: [19, 44],
          });
          const marker = L.marker([unit.coords.lat, unit.coords.lng], {
            icon,
            title: unit.name,
            keyboard: true,
          }).addTo(map);
          marker.on('click', () => setActiveUnitId(unit.id));
          markers.set(unit.id, marker);
        });

        mapRef.current = map;
        syncSelection(activeRef.current, false);
      })
      .catch(() => {
        /* The map is progressive enhancement: the unit list below still works. */
      });

    function syncSelection(id: UnitId, fly: boolean) {
      const map = mapRef.current;
      if (!map) return;
      markers.forEach((marker, key) => {
        marker.getElement()?.classList.toggle('is-selected', key === id);
        marker.setZIndexOffset(key === id ? 1000 : 0);
      });
      const unit = CURITIBA_UNITS.find((u) => u.id === id);
      if (fly && unit) map.flyTo([unit.coords.lat, unit.coords.lng], 15, { duration: 0.9 });
    }
    syncRef.current = syncSelection;

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markers.clear();
    };
  }, []);

  useEffect(() => {
    activeRef.current = activeUnitId;
    syncRef.current(activeUnitId, true);
  }, [activeUnitId]);

  return (
    <div className="curitiba-map-wrapper">
      <div className="curitiba-map-frame">
        <div
          ref={containerRef}
          className="curitiba-map-canvas"
          role="region"
          aria-label="Mapa das três unidades da Crema Lab em Curitiba: Batel, ParkShoppingBarigui e Shopping Mueller"
        />
      </div>

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
          <SafeExternalLink href={activeUnit.mapsUrl} className="map-open-link">
            <span>Abrir no Google Maps</span>
            <ExternalLink size={12} />
          </SafeExternalLink>
        </div>
      </div>
    </div>
  );
}
