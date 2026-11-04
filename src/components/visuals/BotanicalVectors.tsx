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
 * Vector hero backdrops for the inner pages — each page has its own unique artwork
 * and every hero fills the whole first screen (stretched with preserveAspectRatio="none"):
 * - `sabores`: continuous burgundy/terracotta/sand wave ribbons on cream (top and bottom).
 * - `seal` (Unidades): burgundy S-ribbon, terracotta crescent and a warm sand panel.
 * - `sobre`: sand, terracotta and burgundy wave dome cradling the portrait.
 * - `contato`: warm terracotta & burgundy double-wave cradle on cream.
 */
export function SubpageBackdrop({
  variant,
  className = '',
}: {
  readonly variant: 'sabores' | 'seal' | 'sobre' | 'contato' | 'lab';
  readonly className?: string;
}) {
  if (variant === 'lab') {
    return (
      <svg viewBox="0 0 1000 380" preserveAspectRatio="none" aria-hidden="true" className={className}>
        <defs>
          <pattern id="lab-hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cfb89b" strokeWidth="0.45" opacity="0.45" />
            <circle cx="40" cy="40" r="0.9" fill="#b0553f" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="1000" height="380" fill="#f4ede4" />
        <rect width="1000" height="380" fill="url(#lab-hero-grid)" />
        {/* Top wave ribbons */}
        <path d="M-20 42C140 68 310 72 480 50C650 28 810 30 1020 58V96C810 70 650 66 480 88C310 110 140 104 -20 78Z" fill="#e6d0b5" />
        <path d="M-20 54C140 80 310 84 480 62C650 40 810 42 1020 70V92C810 64 650 62 480 84C310 106 140 102 -20 76Z" fill="#b0553f" />
        <path d="M-20 68C140 94 310 98 480 76C650 54 810 56 1020 84V102C810 74 650 72 480 94C310 116 140 112 -20 86Z" fill="#5c0a1e" />
        {/* Bottom laboratory wave cradle */}
        <path d="M-20 228C110 250 240 288 390 304C520 318 660 310 790 286C890 268 965 244 1020 226V342C910 356 780 364 640 366C460 368 220 362 -20 340Z" fill="#e6d0b5" />
        <path d="M-20 254C110 274 240 306 390 320C520 332 660 324 790 302C890 286 965 264 1020 248V326C910 342 780 352 640 356C460 360 220 354 -20 324Z" fill="#b0553f" />
        <path d="M-20 280C115 298 245 322 395 334C525 344 660 338 790 318C890 302 965 282 1020 268V308C910 328 780 344 640 352C460 360 220 352 -20 312Z" fill="#5c0a1e" />
      </svg>
    );
  }

  if (variant === 'sabores') {
    return (
      <svg viewBox="0 0 1000 380" preserveAspectRatio="none" aria-hidden="true" className={className}>
        <rect width="1000" height="380" fill="#f4ede4" />
        <path d="M-20 58C150 82 290 84 440 66C590 48 720 42 850 58C925 68 975 76 1020 74V118C970 120 910 110 830 98C705 80 575 86 430 104C285 122 150 116 -20 90Z" fill="#e6d0b5" />
        <path d="M-20 44C150 68 290 70 440 52C590 34 720 28 850 44C925 54 975 62 1020 60V88C975 90 920 82 840 70C710 52 580 58 435 76C290 94 150 88 -20 64Z" fill="#b0553f" />
        <path d="M-20 62C150 86 290 88 435 70C580 52 710 46 840 64C920 76 975 84 1020 82V104C975 106 915 98 835 86C705 68 575 74 430 92C285 110 150 104 -20 80Z" fill="#5c0a1e" />
        <path d="M-20 215C85 232 195 278 325 298C425 312 575 312 675 298C805 278 915 232 1020 215V334C915 350 805 360 685 364C575 368 425 368 315 364C195 360 85 350 -20 334Z" fill="#e6d0b5" />
        <path d="M-20 245C85 262 195 298 325 314C425 326 575 326 675 314C805 298 915 262 1020 245V316C915 332 805 346 685 354C575 360 425 360 315 354C195 346 85 332 -20 316Z" fill="#b0553f" />
        <path d="M-20 274C90 290 200 318 330 330C425 340 575 340 670 330C800 318 910 290 1020 274V304C910 322 800 342 680 356C575 366 425 366 320 356C200 342 90 322 -20 304Z" fill="#5c0a1e" />
      </svg>
    );
  }

  if (variant === 'sobre') {
    return (
      <svg viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true" className={className}>
        <rect width="1000" height="360" fill="#f4ede4" />
        <path d="M-20 0H380C340 44 260 64 170 82C85 98 20 126 -20 162Z" fill="#ebe0d0" />
        <path d="M-20 174C28 134 102 104 192 86C282 68 360 44 405 0" fill="none" stroke="#dfd0bc" strokeWidth="1.2" />
        <path d="M460 326C505 215 585 118 710 92C825 68 935 88 1020 124V316C945 330 855 328 755 312C655 296 555 304 460 326Z" fill="#e6d0b5" />
        <path d="M-20 228C65 238 155 272 265 296C385 322 475 298 545 218C610 144 695 104 795 112C885 120 960 156 1020 196V312C955 328 875 330 785 314C680 296 580 302 475 326C355 352 215 348 85 324C35 314 -2 304 -20 296Z" fill="#b0553f" />
        <path d="M-20 262C75 272 175 304 295 320C425 338 515 308 585 224C645 152 725 124 815 138C895 150 965 188 1020 228V292C955 312 875 318 780 306C675 292 575 304 465 332C345 360 195 352 65 322C20 312 -5 302 -20 294Z" fill="#5c0a1e" />
        <circle cx="552" cy="148" r="36" fill="#b0553f" opacity="0.88" />
      </svg>
    );
  }

  if (variant === 'contato') {
    return (
      <svg viewBox="0 0 1000 350" preserveAspectRatio="none" aria-hidden="true" className={className}>
        <defs>
          <linearGradient id="ct-panel" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="#efe0cc" />
            <stop offset="0.55" stopColor="#e5cfb4" />
            <stop offset="1" stopColor="#d8bc9a" />
          </linearGradient>
        </defs>
        <rect width="1000" height="350" fill="#f4ede4" />
        <path d="M-20 0H420C375 42 290 58 190 74C95 90 25 118 -20 152Z" fill="#ebe0d0" />
        <path d="M-20 162C35 126 115 98 210 80C305 62 385 42 440 0" fill="none" stroke="#dfd0bc" strokeWidth="1.2" />
        <path d="M750 -10H1020V304C955 318 875 314 785 300C695 286 585 296 440 328C585 280 710 175 750 -10Z" fill="url(#ct-panel)" />
        <path d="M800 -10H1020V242C935 254 855 232 795 182C755 148 762 70 800 -10Z" fill="#f4e6d4" opacity="0.55" />
        <path d="M460 310C595 278 725 276 840 294C915 306 970 302 1020 286V318C965 332 900 334 820 320C715 302 595 306 480 318Z" fill="#b0553f" />
        <path d="M-20 238C120 276 285 288 445 250C565 222 632 146 678 -10H755C720 162 645 264 495 304C325 348 145 336 -20 298Z" fill="#b0553f" />
        <path d="M-20 270C135 306 310 314 475 272C610 238 685 142 725 -10H795C760 166 675 278 515 320C340 364 150 348 -20 312Z" fill="#5c0a1e" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 1000 340" preserveAspectRatio="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="ss-panel" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0" stopColor="#efe0cc" />
          <stop offset="0.55" stopColor="#e5cfb4" />
          <stop offset="1" stopColor="#d7ba96" />
        </linearGradient>
        <radialGradient id="ss-glow" cx="80%" cy="28%" r="44%">
          <stop offset="0" stopColor="#fbf0e1" stopOpacity="0.85" />
          <stop offset="1" stopColor="#fbf0e1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1000" height="340" fill="#f4ede4" />
      <path d="M-20 0H460C410 46 320 64 215 80C115 96 35 124 -20 162Z" fill="#ebe0d0" />
      <path d="M-20 172C42 132 128 104 232 86C332 68 418 44 480 0" fill="none" stroke="#dfd0bc" strokeWidth="1.3" />
      <path d="M750 -10H1020V296C955 312 875 310 785 298C705 288 615 296 490 322C585 245 680 130 750 -10Z" fill="url(#ss-panel)" />
      <path d="M750 -10H1020V296C955 312 875 310 785 298C705 288 615 296 490 322C585 245 680 130 750 -10Z" fill="url(#ss-glow)" />
      <path d="M490 302C605 272 725 270 835 288C910 300 970 296 1020 278V312C965 328 900 330 820 316C725 300 620 304 510 324Z" fill="#b0553f" />
      <path d="M-20 255C55 262 155 278 265 298C205 330 135 338 72 335C28 333 -2 322 -20 312Z" fill="#b0553f" />
      <path d="M558 114C554 78 590 56 630 62C670 68 694 96 686 132C678 166 644 184 610 178C576 172 561 146 558 114Z" fill="#b0553f" />
      <path d="M-20 172C32 172 68 198 98 236C132 278 205 292 345 288C468 284 548 242 616 154C668 86 702 32 718 -12H782C770 42 738 106 688 174C648 228 620 276 592 310C572 334 512 338 405 330C315 322 252 304 175 294C108 286 42 284 -20 284Z" fill="#63091f" />
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

/** Vertical oval seal: text ring and classic interlocked CL monogram. */
export function OvalSeal({ className = '' }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 128 156" aria-hidden="true" className={className}>
      <defs>
        <path id="oval-ring" d="M64 78m-49 0a49 63 0 1 1 98 0a49 63 0 1 1 -98 0" />
      </defs>
      <ellipse cx="64" cy="78" rx="60" ry="74" fill="#f2e4ce" stroke="#d5b892" strokeWidth="1" />
      <ellipse cx="64" cy="78" rx="55.5" ry="69.5" fill="none" stroke="#bfa078" strokeWidth="0.6" />
      <ellipse cx="64" cy="78" rx="41" ry="54" fill="none" stroke="#ceb28c" strokeWidth="0.5" />
      <text fontSize="5.5" letterSpacing="1.8" fill="#63513b" fontFamily="var(--font-sans)">
        <textPath href="#oval-ring" textLength="308" lengthAdjust="spacing">
          CREMA LAB · GELATO · CAFÉ · EXPERIÊNCIAS ·
        </textPath>
      </text>
      <g fontFamily="var(--font-serif)" fill="#3b462b" textAnchor="middle">
        <text x="56" y="88" fontSize="54" fontWeight="500">C</text>
        <text x="72" y="104" fontSize="54" fontWeight="500">L</text>
      </g>
    </svg>
  );
}

/** Hand-drawn underline swoosh used under the script tagline. */
export function ScriptSwoosh({ className = '' }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 160 24" fill="none" aria-hidden="true" className={className}>
      <path d="M4 18C40 10 90 4 154 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M20 21C60 14 100 11 128 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

/** Delicate line-art outline of Italy (with Brescia marker) for the Sobre page. */
export function ItalyMapOutline({ className = '' }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 140 190" fill="none" aria-hidden="true" className={className}>
      <path
        d="M22 24C34 14 52 12 68 18C80 22 92 18 100 28C96 38 84 42 78 50C82 64 96 78 108 92C120 106 130 118 134 130C128 136 120 130 114 124C108 132 114 146 106 158C98 166 90 160 92 148C88 136 78 122 68 108C56 92 48 76 42 62C30 56 18 46 16 34C15 28 18 26 22 24Z"
        stroke="currentColor"
        strokeWidth="1.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Sicily & Sardinia */}
      <path
        d="M66 164C76 162 86 166 88 174C80 178 70 176 64 170C63 167 64 165 66 164Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M26 106C32 104 36 112 34 124C30 130 24 128 22 118C22 112 24 108 26 106Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      {/* Brescia pin dot in Northern Italy */}
      <circle cx="54" cy="34" r="3" fill="#b0553f" />
      <circle cx="54" cy="34" r="6.5" stroke="#b0553f" strokeWidth="0.9" strokeDasharray="2 2" />
    </svg>
  );
}

/** Ornamental ceramic & terrazzo mosaic tile illustration for Capítulo 1 on the Sobre page. */
export function MosaicTileIllustration({ className = '' }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" className={className}>
      <rect width="120" height="120" rx="10" fill="#f7efe2" stroke="#d9c3a8" strokeWidth="1.2" />
      <rect x="8" y="8" width="104" height="104" rx="6" stroke="#b0553f" strokeWidth="0.9" opacity="0.55" />
      {/* Corner terracotta petals */}
      <path d="M8 32C22 32 32 22 32 8" stroke="#6a0a22" strokeWidth="1.2" />
      <path d="M88 8C88 22 98 32 112 32" stroke="#6a0a22" strokeWidth="1.2" />
      <path d="M8 88C22 88 32 98 32 112" stroke="#6a0a22" strokeWidth="1.2" />
      <path d="M88 112C88 98 98 88 112 88" stroke="#6a0a22" strokeWidth="1.2" />
      {/* Center floral rosette */}
      <g transform="translate(60 60)">
        <path d="M0 -30C8 -18 8 -6 0 0C-8 -6 -8 -18 0 -30Z" fill="#b0553f" />
        <path d="M0 30C8 18 8 6 0 0C-8 6 -8 18 0 30Z" fill="#b0553f" />
        <path d="M-30 0C-18 -8 -6 -8 0 0C-6 8 -18 8 -30 0Z" fill="#b0553f" />
        <path d="M30 0C18 -8 6 -8 0 0C6 8 18 8 30 0Z" fill="#b0553f" />
        <path d="M-21 -21C-10 -18 -4 -10 0 0C-10 -4 -18 -10 -21 -21Z" fill="#d4956a" />
        <path d="M21 -21C10 -18 4 -10 0 0C10 -4 18 -10 21 -21Z" fill="#d4956a" />
        <path d="M-21 21C-10 18 -4 10 0 0C-10 4 -18 10 -21 21Z" fill="#d4956a" />
        <path d="M21 21C10 18 4 10 0 0C10 4 18 10 21 21Z" fill="#d4956a" />
        <circle r="7" fill="#5c0a1e" />
        <circle r="3" fill="#f7efe2" />
      </g>
    </svg>
  );
}

/** Fine-line laboratory glassware & botanical extraction vector for the Lab hero. */
export function LabGlasswareIllustration({ className = '' }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 220 240" fill="none" aria-hidden="true" className={className}>
      {/* Molecular hexagon ring */}
      <g stroke="currentColor" strokeWidth="1.2" opacity="0.65">
        <polygon points="48,38 68,26 88,38 88,62 68,74 48,62" />
        <polygon points="54,41 68,33 82,41 82,59 68,67 54,59" strokeDasharray="2 2" />
        <line x1="88" y1="38" x2="106" y2="28" />
        <circle cx="110" cy="26" r="4" />
        <line x1="48" y1="62" x2="32" y2="72" />
        <circle cx="28" cy="74" r="3.5" />
      </g>
      {/* Erlenmeyer conical flask */}
      <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M92 66H128" />
        <path d="M98 66V102L62 178C57 188 64 200 76 200H144C156 200 163 188 158 178L122 102V66" />
        {/* Liquid meniscus wave inside flask */}
        <path
          d="M74 156C88 150 102 162 114 156C126 150 136 154 146 156L156 177C159 184 154 193 144 193H76C66 193 61 184 64 177Z"
          fill="currentColor"
          fillOpacity="0.12"
        />
        {/* Measurement graduation ticks */}
        <line x1="126" y1="130" x2="134" y2="130" />
        <line x1="132" y1="145" x2="142" y2="145" />
        <line x1="138" y1="160" x2="148" y2="160" />
        <line x1="144" y1="175" x2="152" y2="175" />
        {/* Floating bubbles & botanical leaf inside flask */}
        <circle cx="96" cy="172" r="3.5" />
        <circle cx="112" cy="164" r="2.5" />
        <circle cx="106" cy="140" r="2" />
        <circle cx="114" cy="84" r="2.2" />
        <circle cx="106" cy="52" r="3" />
      </g>
    </svg>
  );
}
