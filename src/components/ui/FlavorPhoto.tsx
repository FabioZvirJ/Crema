import type { BotanicalMotif, FlavorItem } from '@/domain/types';

interface FlavorPhotoProps {
  readonly flavor: FlavorItem;
  readonly className: string;
}

const MOTIF_TONES: Readonly<Record<BotanicalMotif, readonly [string, string]>> = Object.freeze({
  pistachio: ['#c9d29a', '#8e9a5b'],
  cacao: ['#7a4a37', '#3d2016'],
  berries: ['#c25673', '#7e1f3d'],
  lemon: ['#f6e7a1', '#d9b948'],
  caramel: ['#d9a062', '#a2682f'],
  amarena: ['#a8374c', '#5c1226'],
});

/**
 * Renders the real product photo when one exists. Flavors without a photo
 * fall back to a flat brand-colored disc instead of a generated image.
 */
export function FlavorPhoto({ flavor, className }: FlavorPhotoProps) {
  if (flavor.image) {
    return (
      <img
        src={flavor.image}
        alt={flavor.name}
        className={className}
        style={flavor.imagePosition ? { objectPosition: flavor.imagePosition } : undefined}
        loading="lazy"
        decoding="async"
      />
    );
  }

  // No product photo yet: show the transparent scoop cut-out whole.
  if (flavor.scoopImage) {
    return (
      <img
        src={flavor.scoopImage}
        alt={flavor.name}
        className={className}
        style={{ objectFit: 'contain' }}
        loading="lazy"
        decoding="async"
      />
    );
  }

  const [light, dark] = flavor.placeholderTone ?? MOTIF_TONES[flavor.motif];
  return (
    <div
      role="img"
      aria-label={flavor.name}
      className={`${className} flavor-photo-placeholder`}
      style={{
        background: `radial-gradient(circle at 32% 26%, rgba(255,255,255,0.55) 0, rgba(255,255,255,0) 34%), radial-gradient(circle at 38% 34%, ${light}, ${dark})`,
      }}
    >
      <span aria-hidden="true">CL</span>
    </div>
  );
}
