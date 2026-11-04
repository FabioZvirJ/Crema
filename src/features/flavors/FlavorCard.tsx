import { Plus } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { FlavorItem } from '@/domain/types';
import { FlavorPhoto } from '@/components/ui/FlavorPhoto';
import { FlavorMotifGarnish } from '@/components/visuals/BotanicalVectors';

interface FlavorCardProps {
  readonly flavor: FlavorItem;
  readonly index: number;
  readonly onSelect: (flavor: FlavorItem) => void;
}

export function FlavorCard({ flavor, index, onSelect }: FlavorCardProps) {
  return (
    <article className="flavor-card" style={{ '--i': index } as CSSProperties}>
      <div className="flavor-card-scoop-stage">
        <FlavorMotifGarnish motif={flavor.motif} />

        <div className="flavor-card-scoop-wrap">
          <FlavorPhoto flavor={flavor} className="flavor-card-scoop-img" />
        </div>

        <button
          type="button"
          onClick={() => onSelect(flavor)}
          className="flavor-card-plus-btn"
          aria-label={`Ver detalhes de ${flavor.name}`}
        >
          <Plus size={14} strokeWidth={2.2} />
        </button>
      </div>

      <div className="flavor-card-surface" onClick={() => onSelect(flavor)}>
        <h2 className="flavor-card-title">{flavor.name}</h2>
        <p className="flavor-card-desc">{flavor.description}</p>
        {!flavor.onMenu && <p className="flavor-card-past">Já passou pela vitrine</p>}
      </div>
    </article>
  );
}
