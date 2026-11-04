import type { BotanicalMotif } from '@/domain/types';

export function InstagramIcon({ size = 16 }: { readonly size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function TikTokIcon({ size = 15 }: { readonly size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

export function BotanicalSprigLeft({ className = '' }: { readonly className?: string }) {
  return (
    <svg
      viewBox="0 0 120 220"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M15 215C28 165 55 110 85 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M36 165C22 148 16 125 28 112C38 124 42 146 36 165Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M52 132C38 114 34 90 48 76C58 90 60 112 52 132Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M68 92C56 75 55 52 68 40C77 54 76 74 68 92Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M44 152C62 146 82 152 92 166C76 170 56 164 44 152Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M60 114C78 106 96 112 106 125C90 130 72 125 60 114Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M75 74C90 66 105 70 114 82C100 88 84 84 75 74Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}

export function BotanicalSprigRight({ className = '' }: { readonly className?: string }) {
  return (
    <svg
      viewBox="0 0 120 220"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M105 215C92 165 65 110 35 20"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M84 165C98 148 104 125 92 112C82 124 78 146 84 165Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M68 132C82 114 86 90 72 76C62 90 60 112 68 132Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M52 92C64 75 65 52 52 40C43 54 44 74 52 92Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M76 152C58 146 38 152 28 166C44 170 64 164 76 152Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M60 114C42 106 24 112 14 125C30 130 48 125 60 114Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}

export function DiamondLatticePattern({ className = '' }: { readonly className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.35">
        <path d="M0 40L200 240M0 100L140 240M0 160L80 240M40 0L240 200M100 0L240 140M160 0L240 80" />
        <path d="M240 40L40 240M240 100L100 240M240 160L160 240M200 0L0 200M140 0L0 140M80 0L0 80" />
      </g>
    </svg>
  );
}

/**
 * Botanical & ingredient line-art garnish behind each flavor scoop on the Sabores cards.
 */
export function FlavorMotifGarnish({ motif }: { readonly motif: BotanicalMotif }) {
  switch (motif) {
    case 'pistachio':
    case 'lemon':
      return (
        <svg
          viewBox="0 0 180 90"
          fill="none"
          aria-hidden="true"
          className="flavor-motif-svg"
        >
          {/* Left leaves */}
          <path
            d="M36 52C22 44 16 30 22 20C32 25 38 38 36 52Z"
            stroke="#9B866C"
            strokeWidth="1.1"
          />
          <path
            d="M32 58C18 58 10 50 12 40C22 42 30 48 32 58Z"
            stroke="#9B866C"
            strokeWidth="1.1"
          />
          {/* Right pistachio / lemon shells */}
          <ellipse
            cx="144"
            cy="28"
            rx="9"
            ry="6"
            transform="rotate(28 144 28)"
            stroke="#9B866C"
            strokeWidth="1.1"
          />
          <ellipse
            cx="156"
            cy="42"
            rx="10"
            ry="6.5"
            transform="rotate(18 156 42)"
            stroke="#9B866C"
            strokeWidth="1.1"
          />
        </svg>
      );
    case 'cacao':
    case 'caramel':
      return (
        <svg
          viewBox="0 0 180 90"
          fill="none"
          aria-hidden="true"
          className="flavor-motif-svg"
        >
          {/* Left coffee/cacao beans */}
          <ellipse
            cx="26"
            cy="24"
            rx="5"
            ry="3.5"
            transform="rotate(-30 26 24)"
            fill="#5C3A28"
          />
          <ellipse
            cx="18"
            cy="35"
            rx="5"
            ry="3.5"
            transform="rotate(15 18 35)"
            fill="#5C3A28"
          />
          <ellipse
            cx="32"
            cy="36"
            rx="4.5"
            ry="3"
            transform="rotate(-15 32 36)"
            fill="#5C3A28"
          />
          {/* Right botanical cacao leaves */}
          <path
            d="M142 36C146 22 156 14 164 18C160 28 152 35 142 36Z"
            stroke="#4A2F23"
            strokeWidth="1.2"
          />
          <path
            d="M145 45C155 38 166 38 171 45C163 50 153 49 145 45Z"
            stroke="#4A2F23"
            strokeWidth="1.2"
          />
        </svg>
      );
    case 'berries':
    case 'amarena':
      return (
        <svg
          viewBox="0 0 180 90"
          fill="none"
          aria-hidden="true"
          className="flavor-motif-svg"
        >
          {/* Top-right berries / cherries */}
          <circle cx="150" cy="20" r="4" fill="#460E18" />
          <circle cx="160" cy="34" r="6" fill="#460E18" />
          <path
            d="M160 28C162 20 166 15 170 12"
            stroke="#460E18"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          {/* Bottom-left berry cluster */}
          <circle cx="28" cy="74" r="5.5" fill="#631624" />
          <circle cx="19" cy="68" r="2.5" fill="#631624" />
        </svg>
      );
  }
}

export function GelatoBowlIllustration({ className = '' }: { readonly className?: string }) {
  return (
    <svg
      viewBox="0 0 140 120"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {/* Spoon handle */}
      <path
        d="M78 65L122 14C126 10 132 14 128 20L86 68"
        stroke="#A56652"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Scoops in bowl */}
      <path
        d="M24 68C26 52 42 44 56 52C66 44 84 50 86 68"
        stroke="#A56652"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      {/* Bowl rim & body */}
      <ellipse cx="55" cy="70" rx="38" ry="8" stroke="#A56652" strokeWidth="1.4" />
      <path
        d="M17 70C20 94 35 106 55 106C75 106 90 94 93 70"
        stroke="#A56652"
        strokeWidth="1.4"
      />
      <ellipse cx="55" cy="108" rx="18" ry="4" stroke="#A56652" strokeWidth="1.3" />
    </svg>
  );
}

/**
 * Organic wave backdrops (vector, no photography) used behind the home
 * "Sobre" and contact "Eventos" sections. Real photos are layered on top.
 */
export function WaveBackdrop({
  variant,
  className = '',
}: {
  readonly variant: 'about' | 'events';
  readonly className?: string;
}) {
  if (variant === 'events') {
    return (
      <svg
        viewBox="0 0 1144 480"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className={className}
      >
        <rect width="1144" height="480" fill="#3a0812" />
        <path d="M0 0H1144V70C1000 40 900 90 760 60C600 28 470 60 330 40C200 22 100 70 0 110Z" fill="#a8503c" />
        <path d="M0 60C120 100 230 150 300 260C360 350 330 420 220 480H0Z" fill="#6a0a22" />
        <path d="M880 480C940 400 1040 350 1144 345V480Z" fill="#a8503c" />
        <path d="M0 480V462C190 428 380 478 570 458C770 436 960 418 1144 452V480Z" fill="#f4ede4" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 1144 480"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      <rect width="1144" height="480" fill="#b05540" />
      <path d="M0 0H540C500 80 400 100 300 140C190 185 90 150 0 215Z" fill="#c9765f" />
      <path d="M760 0H1144V95C1060 108 985 48 905 36C850 28 800 22 760 0Z" fill="#6a0a22" />
      <path d="M0 255C120 190 260 215 385 300C520 392 640 432 780 476L0 480Z" fill="#6a0a22" />
      <path d="M840 480C915 385 1040 342 1144 335V480Z" fill="#c0654f" />
      <path d="M0 480V455C200 420 380 470 560 455C760 436 950 408 1144 445V480Z" fill="#f4ede4" />
    </svg>
  );
}

/**
 * Vector backdrop for the home hero: cream field, burgundy diagonal, terracotta
 * blobs and a wood-slice oval. The real photo is layered on top and clipped by
 * the `hero-photo-clip` shape declared here.
 */
export function HeroBackdrop({ className = '' }: { readonly className?: string }) {
  return (
    <>
      <svg
        viewBox="0 0 1900 930"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className={className}
      >
        <defs>
          <radialGradient id="hb-cream" cx="30%" cy="35%" r="75%">
            <stop offset="0" stopColor="#f8f2ea" />
            <stop offset="1" stopColor="#efe4d7" />
          </radialGradient>
          <linearGradient id="hb-beige" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ecdcc8" />
            <stop offset="1" stopColor="#d5b79a" />
          </linearGradient>
          <radialGradient id="hb-smoke" cx="50%" cy="0%" r="70%">
            <stop offset="0" stopColor="#7a5a45" stopOpacity="0.3" />
            <stop offset="1" stopColor="#7a5a45" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1900" height="930" fill="url(#hb-cream)" />
        <circle cx="560" cy="330" r="520" fill="#ffffff" opacity="0.16" />
        <path d="M1365 0H1620V930H630Z" fill="#6a0a22" />
        <path d="M1478 0H1900V930H1568C1548 680 1515 330 1478 0Z" fill="url(#hb-beige)" />
        <rect x="1478" y="0" width="422" height="320" fill="url(#hb-smoke)" />
        <g transform="rotate(14 1470 610)">
          <ellipse cx="1470" cy="610" rx="140" ry="200" fill="#d9b995" />
          <g fill="none" stroke="#b98d68" strokeWidth="2" opacity="0.55">
            <ellipse cx="1470" cy="610" rx="112" ry="168" />
            <ellipse cx="1470" cy="610" rx="84" ry="134" />
            <ellipse cx="1470" cy="610" rx="56" ry="100" />
            <ellipse cx="1470" cy="610" rx="30" ry="62" />
          </g>
        </g>
        <path
          d="M1010 350C1090 335 1125 420 1070 495C1030 548 1020 560 960 540C890 515 880 430 925 385C950 360 980 354 1010 350Z"
          fill="#b0553f"
        />
        <path
          d="M900 700C900 640 960 610 1020 640C1060 660 1050 720 1000 745C950 770 900 750 900 700Z"
          fill="#b0553f"
        />
        <circle cx="1545" cy="705" r="72" fill="#6a0a22" />
      </svg>
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
        <clipPath id="hero-photo-clip" clipPathUnits="objectBoundingBox">
          <path d="M0 1V0.4C0 0.18 0.12 0.06 0.4 0.03C0.76 -0.01 1 0.14 1 0.42V1Z" />
        </clipPath>
      </svg>
    </>
  );
}

/** Circular brand seal (text ring + CL monogram), pure vector. */
export function BrandSeal({ className = '' }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 240 240" aria-hidden="true" className={className}>
      <defs>
        <path id="seal-ring" d="M120 120m-92 0a92 92 0 1 1 184 0a92 92 0 1 1 -184 0" />
      </defs>
      <circle cx="120" cy="120" r="112" fill="rgba(244,237,227,0.38)" stroke="currentColor" strokeWidth="0.8" />
      <text fontSize="10.5" letterSpacing="3.4" fill="currentColor" fontFamily="var(--font-sans)">
        <textPath href="#seal-ring">CREMA LAB · GELATO · CAFÉ · EXPERIÊNCIAS · </textPath>
      </text>
      <text
        x="120"
        y="150"
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize="92"
        letterSpacing="-6"
        style={{ fill: 'var(--seal-mono, #3f4a2e)' }}
      >
        CL
      </text>
    </svg>
  );
}

/**
 * Vector hero backdrops for the inner pages (replaces the old raster banners).
 * `sabores`: layered burgundy/terracotta waves on cream.
 * `seal`: burgundy swoosh, terracotta blob and wood-slice oval on a warm beige panel.
 */
export function SubpageBackdrop({
  variant,
  className = '',
}: {
  readonly variant: 'sabores' | 'seal';
  readonly className?: string;
}) {
  if (variant === 'sabores') {
    return (
      <svg
        viewBox="0 0 1000 526"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className={className}
      >
        <rect width="1000" height="526" fill="#f3eee3" />
        {/* Soft, continuous layers: every shape runs past the edges or tucks under its neighbor. */}
        <path d="M-20 70C150 92 280 92 420 72C560 52 680 44 800 62C890 76 960 88 1020 84V126C960 130 880 118 780 100C660 84 540 90 400 108C260 126 140 118 -20 92Z" fill="#b0553f" />
        <path d="M-20 92C140 118 260 126 400 108C540 90 660 84 780 100C880 114 960 126 1020 122V150C960 154 880 142 780 128C660 112 540 118 400 136C260 154 140 146 -20 120Z" fill="#4a0a1a" />
        <path d="M820 70C900 56 960 24 990 -20H1020V104C960 110 880 96 820 70Z" fill="#a24a36" />
        <path d="M-20 462C120 488 260 492 400 476C540 460 640 452 780 466C880 476 960 488 1020 486V560H-20Z" fill="#b0553f" />
        <path d="M-20 428C120 456 260 462 400 446C540 430 650 422 780 436C880 446 960 458 1020 456V490C960 492 880 480 780 470C650 456 540 462 400 480C260 496 120 490 -20 462Z" fill="#4a0a1a" />
        <path d="M700 560C760 516 850 492 930 458C970 440 1000 420 1020 396V560Z" fill="#b65a40" />
        <path d="M800 560C860 528 940 510 1020 496V560Z" fill="#8a3426" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 1900 711"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <radialGradient id="ss-cream" cx="28%" cy="40%" r="80%">
          <stop offset="0" stopColor="#f8f2ea" />
          <stop offset="1" stopColor="#efe4d7" />
        </radialGradient>
        <linearGradient id="ss-beige" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ecdcc8" />
          <stop offset="1" stopColor="#d5b79a" />
        </linearGradient>
        <radialGradient id="ss-smoke" cx="50%" cy="0%" r="70%">
          <stop offset="0" stopColor="#7a5a45" stopOpacity="0.28" />
          <stop offset="1" stopColor="#7a5a45" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1900" height="711" fill="url(#ss-cream)" />
      <path
        d="M0 711V470C150 420 330 500 520 560C700 616 820 640 1010 598C1250 546 1390 300 1340 0H1650V711Z"
        fill="#6a0a22"
      />
      <path d="M0 711V622C190 592 360 660 560 676C740 690 880 694 1040 711Z" fill="#b0553f" opacity="0.9" />
      <path d="M1470 0H1900V711H1560C1540 520 1505 250 1470 0Z" fill="url(#ss-beige)" />
      <rect x="1470" y="0" width="430" height="260" fill="url(#ss-smoke)" />
      <g transform="rotate(12 1560 470)">
        <ellipse cx="1560" cy="470" rx="150" ry="215" fill="#d9b995" />
        <g fill="none" stroke="#b98d68" strokeWidth="2" opacity="0.55">
          <ellipse cx="1560" cy="470" rx="120" ry="180" />
          <ellipse cx="1560" cy="470" rx="90" ry="144" />
          <ellipse cx="1560" cy="470" rx="60" ry="108" />
          <ellipse cx="1560" cy="470" rx="32" ry="66" />
        </g>
      </g>
      <path
        d="M1250 250C1330 232 1370 318 1316 394C1276 448 1262 470 1204 446C1134 418 1124 330 1170 286C1194 262 1222 254 1250 250Z"
        fill="#b0553f"
      />
    </svg>
  );
}

/** Scalloped brand seal (dotted edge, thin inner ring, serif CL). */
export function ScallopSeal({ className = '' }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="3.2" strokeDasharray="1.4 3.15" strokeLinecap="round" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <text x="50" y="64" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="40" fontWeight="600" fill="currentColor">
        CL
      </text>
    </svg>
  );
}

/** Elegant outlined leaf branch with midribs (hero decoration). */
export function LeafSprig({ className = '' }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 300 620" fill="none" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M60 615C95 420 115 220 190 25" />
        <path d="M72.1 544.6Q133.7 540.6 170.4 490.9Q108.8 494.9 72.1 544.6Z M81.7 485.7Q64.0 431.0 10.8 409.2Q28.5 463.9 81.7 485.7Z M91.3 426.6Q144.4 423.2 176.1 380.3Q123.0 383.8 91.3 426.6Z M101.3 367.4Q87.0 320.5 41.9 301.3Q56.3 348.2 101.3 367.4Z M112.3 308.2Q157.0 306.5 184.7 271.3Q139.9 272.9 112.3 308.2Z M124.5 248.9Q114.2 209.7 77.7 192.2Q87.9 231.4 124.5 248.9Z M138.4 189.8Q174.7 190.5 198.6 163.3Q162.4 162.5 138.4 189.8Z M154.4 130.7Q148.5 99.3 120.6 83.5Q126.6 114.9 154.4 130.7Z M173.0 71.9Q200.7 74.7 220.7 55.4Q193.0 52.6 173.0 71.9Z" />
      </g>
      <path d="M72.1 544.6L158.6 497.4 M81.7 485.7L19.3 418.4 M91.3 426.6L165.9 385.9 M101.3 367.4L49.0 309.2 M112.3 308.2L176.0 275.8 M124.5 248.9L83.3 199.0 M138.4 189.8L191.4 166.4 M154.4 130.7L124.7 89.1 M173.0 71.9L214.9 57.4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

/** Small branch with outlined berries (hero decoration). */
export function BerrySprig({ className = '' }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 140 260" fill="none" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M40 255C60 190 70 110 100 20" />
        <path d="M46.8 231.0Q76.8 232.2 96.4 209.6Q66.5 208.3 46.8 231.0Z M57.1 188.2Q51.0 163.0 27.6 152.1Q33.7 177.3 57.1 188.2Z M67.3 142.1Q89.0 142.3 102.7 125.4Q81.0 125.2 67.3 142.1Z M78.8 93.1Q75.2 75.9 59.4 68.1Q63.1 85.3 78.8 93.1Z M93.2 41.4Q106.6 42.5 115.9 32.7Q102.4 31.6 93.2 41.4Z" />
      </g>
      <path d="M46.8 231.0L90.5 212.1 M57.1 188.2L31.1 156.5 M67.3 142.1L98.4 127.4 M78.8 93.1L61.7 71.1 M93.2 41.4L113.1 33.8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <g stroke="currentColor" strokeWidth="1.8"><circle cx="110" cy="24" r="8" /><circle cx="124" cy="58" r="7" /><circle cx="84" cy="70" r="6" /><circle cx="112" cy="98" r="6" /></g>
    </svg>
  );
}
