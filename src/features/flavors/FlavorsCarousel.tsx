import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { FlavorItem } from '@/domain/types';
import { FlavorCard } from './FlavorCard';

interface FlavorsCarouselProps {
  readonly flavors: ReadonlyArray<FlavorItem>;
  readonly onSelectFlavor: (flavor: FlavorItem) => void;
}

const PAGE_SIZE = 6;
const AUTOPLAY_MS = 7500;

function chunk<T>(items: ReadonlyArray<T>, size: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    pages.push(items.slice(i, i + size));
  }
  return pages;
}

function slideLabel(page: ReadonlyArray<FlavorItem>): string {
  if (page.every((f) => f.onMenu)) return 'Na vitrine agora';
  if (page.every((f) => !f.onMenu)) return 'Já passaram pela vitrine';
  return 'Sabores da casa';
}

/**
 * Shows six flavors per slide. With more than six it becomes a carousel: the
 * track slides, the cards of the active slide rise in one after the other, and
 * it autoplays (paused on hover/focus, off for reduced-motion users).
 */
export function FlavorsCarousel({ flavors, onSelectFlavor }: FlavorsCarouselProps) {
  const pages = useMemo(() => chunk(flavors, PAGE_SIZE), [flavors]);
  const count = pages.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIndex(0);
  }, [flavors]);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (count < 2 || paused || reducedMotion) return;
    const timer = window.setTimeout(() => setIndex((prev) => (prev + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [count, index, paused, reducedMotion]);

  const go = (next: number) => setIndex(((next % count) + count) % count);
  const activePage = pages[index] ?? pages[0] ?? [];

  return (
    <div
      className="flavors-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {count > 1 && (
        <p className="flavors-carousel-label" aria-live="polite" key={index}>
          {slideLabel(activePage)}
        </p>
      )}

      <div className="flavors-carousel-viewport">
        <div
          className="flavors-carousel-track"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {pages.map((page, pageIndex) => (
            <div
              key={pageIndex}
              className={`flavors-slide flavors-cards-grid${pageIndex === index ? ' is-active' : ''}`}
              aria-hidden={pageIndex === index ? undefined : true}
              {...(pageIndex === index ? {} : { inert: true })}
            >
              {page.map((flavor, cardIndex) => (
                <FlavorCard
                  key={flavor.id}
                  flavor={flavor}
                  index={cardIndex}
                  onSelect={onSelectFlavor}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="flavors-carousel-controls">
          <button
            type="button"
            className="flavors-carousel-arrow"
            onClick={() => go(index - 1)}
            aria-label="Grupo anterior de sabores"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flavors-carousel-dots" role="tablist" aria-label="Grupos de sabores">
            {pages.map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                role="tab"
                aria-selected={dotIndex === index}
                aria-label={`Grupo ${dotIndex + 1} de ${count}`}
                className={`flavors-carousel-dot${dotIndex === index ? ' is-active' : ''}`}
                onClick={() => go(dotIndex)}
              />
            ))}
          </div>

          <button
            type="button"
            className="flavors-carousel-arrow"
            onClick={() => go(index + 1)}
            aria-label="Próximo grupo de sabores"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
