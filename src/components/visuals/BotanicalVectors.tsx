import { useId, type CSSProperties } from 'react';
import type { BotanicalMotif } from '@/domain/types';
import { CremaMonogramMark } from './BrandLogo';

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
      return (
        <svg
          viewBox="0 0 220 110"
          fill="none"
          aria-hidden="true"
          className="flavor-motif-svg"
        >
          {/* Left botanical leaves & stem */}
          <g stroke="#8c7258" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
            <path d="M48 76C38 62 34 46 36 30" />
            <path d="M40 58C26 52 18 40 22 29C32 33 40 44 40 58Z" />
            <path d="M37 42C26 32 24 20 31 13C38 20 41 31 37 42Z" />
            <path d="M43 68C52 60 60 56 64 59" opacity="0.65" />
          </g>
          {/* Right split pistachio shells */}
          <g stroke="#8c7258" strokeWidth="1.15" strokeLinecap="round">
            <ellipse cx="170" cy="36" rx="11" ry="7.5" transform="rotate(26 170 36)" />
            <path d="M161 32C168 37 174 39 180 39" opacity="0.7" />
            <ellipse cx="182" cy="54" rx="11.5" ry="7.5" transform="rotate(-14 182 54)" />
            <path d="M172 56C179 52 186 51 192 52" opacity="0.7" />
            <path d="M158 68C166 64 176 66 182 74C172 78 162 76 158 68Z" />
          </g>
        </svg>
      );
    case 'lemon':
      return (
        <svg
          viewBox="0 0 220 110"
          fill="none"
          aria-hidden="true"
          className="flavor-motif-svg"
        >
          {/* Left lemon leaves */}
          <g stroke="#8c7258" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
            <path d="M44 74C32 58 26 42 28 24" />
            <path d="M35 56C20 49 14 37 19 26C30 30 37 42 35 56Z" />
            <path d="M30 40C40 31 50 28 56 32C50 41 40 44 30 40Z" />
          </g>
          {/* Right citrus slice & leaves */}
          <g stroke="#8c7258" strokeWidth="1.15" strokeLinecap="round">
            <circle cx="176" cy="40" r="14" />
            <circle cx="176" cy="40" r="10.5" strokeDasharray="1.5 2" />
            <path d="M176 30V50M166 40H186M169 33L183 47M183 33L169 47" opacity="0.65" />
            <path d="M166 66C176 60 188 61 195 69C185 75 174 74 166 66Z" />
          </g>
        </svg>
      );
    case 'cacao':
    case 'caramel':
      return (
        <svg
          viewBox="0 0 220 110"
          fill="none"
          aria-hidden="true"
          className="flavor-motif-svg"
        >
          {/* Left roasted cacao/coffee beans */}
          <g>
            <ellipse cx="34" cy="30" rx="6" ry="4" transform="rotate(-28 34 30)" fill="#5C3A28" />
            <path d="M29 32C33 30 36 28 39 27" stroke="#f4ede4" strokeWidth="0.9" />
            <ellipse cx="24" cy="46" rx="5.5" ry="3.8" transform="rotate(18 24 46)" fill="#6d4732" />
            <path d="M19 45C23 46 26 47 29 47" stroke="#f4ede4" strokeWidth="0.9" />
            <ellipse cx="38" cy="54" rx="5" ry="3.4" transform="rotate(-12 38 54)" fill="#4A2F23" />
          </g>
          {/* Right cacao leaves & twig */}
          <g stroke="#5C3A28" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round">
            <path d="M166 64C172 48 178 34 188 22" />
            <path d="M172 46C174 30 184 20 194 22C191 34 183 44 172 46Z" />
            <path d="M170 56C182 48 195 48 202 56C192 63 180 62 170 56Z" />
            <path d="M168 64C158 58 154 48 159 40C167 45 171 54 168 64Z" opacity="0.7" />
          </g>
        </svg>
      );
    case 'berries':
    case 'amarena':
      return (
        <svg
          viewBox="0 0 220 110"
          fill="none"
          aria-hidden="true"
          className="flavor-motif-svg"
        >
          {/* Left berry & cherry cluster */}
          <g>
            <circle cx="34" cy="64" r="6.2" fill="#5e1121" />
            <circle cx="24" cy="54" r="3.2" fill="#7a1b30" />
            <circle cx="38" cy="40" r="4.5" fill="#460E18" />
            <path
              d="M34 58C35 48 39 40 44 33"
              stroke="#5e1121"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <path
              d="M28 74C18 68 14 58 18 50C26 53 31 63 28 74Z"
              stroke="#6e4b3c"
              strokeWidth="1"
            />
          </g>
          {/* Right cherries with stem & leaf */}
          <g>
            <circle cx="176" cy="34" r="5" fill="#460E18" />
            <circle cx="188" cy="48" r="7" fill="#5e1121" />
            <circle cx="168" cy="58" r="3.2" fill="#7a1b30" />
            <path
              d="M176 29C180 20 186 15 194 12C191 22 189 32 188 41"
              stroke="#460E18"
              strokeWidth="1.15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M194 12C202 12 208 18 206 26C198 25 193 19 194 12Z"
              stroke="#6e4b3c"
              strokeWidth="1"
            />
          </g>
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
      <g style={{ color: 'var(--seal-mono, #3f4a2e)' }}>
        <CremaMonogramMark transform="translate(64, 62) scale(2.35)" />
      </g>
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
        {/* Soft upper corner cream contour lines */}
        <path d="M-20 120C90 95 210 62 320 0H-20Z" fill="#efe4d5" opacity="0.7" />
        <path d="M700 0C800 58 910 88 1020 104V0Z" fill="#efe4d5" opacity="0.55" />
        {/* Flowing bottom wave cradle in sand, terracotta and deep burgundy */}
        <path d="M-20 245C105 222 225 268 375 288C525 308 665 260 805 232C895 214 965 216 1020 228V380H-20Z" fill="#ead8c1" opacity="0.65" />
        <path d="M-20 278C95 258 215 296 360 308C495 320 625 278 755 248C860 224 950 220 1020 236V352C925 362 800 364 665 360C500 356 260 364 -20 342Z" fill="#a84d38" />
        <path d="M-20 294C115 274 235 308 380 318C520 328 655 294 790 278C890 266 965 274 1020 288V338C910 352 785 356 645 350C485 342 250 362 -20 330Z" fill="#5c0a1e" />
        {/* Clean cream base along the bottom edge */}
        <path d="M-20 324C140 348 310 342 480 330C660 318 840 336 1020 326V380H-20Z" fill="#f4ede4" />
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
      <CremaMonogramMark transform="translate(18, 17) scale(1.34)" />
    </svg>
  );
}

/** Leaves of the hero sprig: [leaf outline, midrib, attachment point on the stem]. */
const LEAF_SPRIG_LEAVES: ReadonlyArray<readonly [string, string, string]> = [
  ['M72.1 544.6Q133.7 540.6 170.4 490.9Q108.8 494.9 72.1 544.6Z', 'M72.1 544.6L158.6 497.4', '72.1px 544.6px'],
  ['M81.7 485.7Q64.0 431.0 10.8 409.2Q28.5 463.9 81.7 485.7Z', 'M81.7 485.7L19.3 418.4', '81.7px 485.7px'],
  ['M91.3 426.6Q144.4 423.2 176.1 380.3Q123.0 383.8 91.3 426.6Z', 'M91.3 426.6L165.9 385.9', '91.3px 426.6px'],
  ['M101.3 367.4Q87.0 320.5 41.9 301.3Q56.3 348.2 101.3 367.4Z', 'M101.3 367.4L49.0 309.2', '101.3px 367.4px'],
  ['M112.3 308.2Q157.0 306.5 184.7 271.3Q139.9 272.9 112.3 308.2Z', 'M112.3 308.2L176.0 275.8', '112.3px 308.2px'],
  ['M124.5 248.9Q114.2 209.7 77.7 192.2Q87.9 231.4 124.5 248.9Z', 'M124.5 248.9L83.3 199.0', '124.5px 248.9px'],
  ['M138.4 189.8Q174.7 190.5 198.6 163.3Q162.4 162.5 138.4 189.8Z', 'M138.4 189.8L191.4 166.4', '138.4px 189.8px'],
  ['M154.4 130.7Q148.5 99.3 120.6 83.5Q126.6 114.9 154.4 130.7Z', 'M154.4 130.7L124.7 89.1', '154.4px 130.7px'],
  ['M173.0 71.9Q200.7 74.7 220.7 55.4Q193.0 52.6 173.0 71.9Z', 'M173.0 71.9L214.9 57.4', '173.0px 71.9px'],
];

/**
 * Elegant outlined leaf branch with midribs (hero decoration). The branch sways from
 * its base and every leaf flutters around the point where it meets the stem.
 */
export function LeafSprig({ className = '' }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 300 620" fill="none" aria-hidden="true" className={className}>
      <g
        className="sprig-sway"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transformOrigin: '60px 615px' }}
      >
        <path className="sprig-stem" pathLength={1} strokeWidth="2.2" d="M60 615C95 420 115 220 190 25" />
        {LEAF_SPRIG_LEAVES.map(([leaf, vein, origin], i) => (
          <g
            key={origin}
            className="sprig-leaf"
            style={{ transformOrigin: origin, '--leaf': i } as CSSProperties}
          >
            <path className="sprig-leaves" pathLength={1} strokeWidth="2.2" d={leaf} />
            <path className="sprig-veins" pathLength={1} strokeWidth="1.1" d={vein} />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Leaves of the berry sprig: [leaf outline, midrib, attachment point on the stem]. */
const BERRY_SPRIG_LEAVES: ReadonlyArray<readonly [string, string, string]> = [
  ['M46.8 231.0Q76.8 232.2 96.4 209.6Q66.5 208.3 46.8 231.0Z', 'M46.8 231.0L90.5 212.1', '46.8px 231.0px'],
  ['M57.1 188.2Q51.0 163.0 27.6 152.1Q33.7 177.3 57.1 188.2Z', 'M57.1 188.2L31.1 156.5', '57.1px 188.2px'],
  ['M67.3 142.1Q89.0 142.3 102.7 125.4Q81.0 125.2 67.3 142.1Z', 'M67.3 142.1L98.4 127.4', '67.3px 142.1px'],
  ['M78.8 93.1Q75.2 75.9 59.4 68.1Q63.1 85.3 78.8 93.1Z', 'M78.8 93.1L61.7 71.1', '78.8px 93.1px'],
  ['M93.2 41.4Q106.6 42.5 115.9 32.7Q102.4 31.6 93.2 41.4Z', 'M93.2 41.4L113.1 33.8', '93.2px 41.4px'],
];

const BERRY_SPRIG_BERRIES: ReadonlyArray<readonly [number, number, number]> = [[110, 24, 8], [124, 58, 7], [84, 70, 6], [112, 98, 6]];

/** Small branch with outlined berries (hero decoration); sways, leaves flutter, berries bob. */
export function BerrySprig({ className = '' }: { readonly className?: string }) {
  return (
    <svg viewBox="0 0 140 260" fill="none" aria-hidden="true" className={className}>
      <g
        className="sprig-sway"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transformOrigin: '40px 255px' }}
      >
        <path className="sprig-stem" pathLength={1} strokeWidth="2" d="M40 255C60 190 70 110 100 20" />
        {BERRY_SPRIG_LEAVES.map(([leaf, vein, origin], i) => (
          <g
            key={origin}
            className="sprig-leaf"
            style={{ transformOrigin: origin, '--leaf': i } as CSSProperties}
          >
            <path className="sprig-leaves" pathLength={1} strokeWidth="2" d={leaf} />
            <path className="sprig-veins" pathLength={1} strokeWidth="1" d={vein} />
          </g>
        ))}
        <g className="sprig-berries" strokeWidth="1.8">
          {BERRY_SPRIG_BERRIES.map(([cx, cy, r], i) => (
            <circle
              key={`${cx}-${cy}`}
              className="sprig-berry"
              cx={cx}
              cy={cy}
              r={r}
              style={{ '--leaf': i } as CSSProperties}
            />
          ))}
        </g>
      </g>
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
      <g color="#3b462b">
        <CremaMonogramMark transform="translate(18, 30) scale(1.92)" />
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
  const clipId = `flask-${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg viewBox="0 0 220 240" fill="none" aria-hidden="true" className={className}>
      <defs>
        <clipPath id={clipId}>
          <path d="M99 102L63 178C58 188 65 199 76 199H144C155 199 162 188 157 178L121 102Z" />
        </clipPath>
      </defs>
      {/* Molecular hexagon ring */}
      <g className="lab-glass-molecule" style={{ transformOrigin: '68px 50px' }} stroke="currentColor" strokeWidth="1.2" opacity="0.65">
        <polygon points="48,38 68,26 88,38 88,62 68,74 48,62" />
        <polygon className="lab-glass-ring" points="54,41 68,33 82,41 82,59 68,67 54,59" strokeDasharray="2 2" />
        <line x1="88" y1="38" x2="106" y2="28" />
        <circle className="lab-glass-atom" cx="110" cy="26" r="4" />
        <line x1="48" y1="62" x2="32" y2="72" />
        <circle className="lab-glass-atom lab-glass-atom--late" cx="28" cy="74" r="3.5" />
      </g>
      {/* Erlenmeyer conical flask */}
      <g className="lab-glass-flask" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ transformOrigin: '110px 200px' }}>
        <path d="M92 66H128" />
        <path d="M98 66V102L62 178C57 188 64 200 76 200H144C156 200 163 188 158 178L122 102V66" />
        {/* Liquid inside the flask: two wave layers flowing in opposite directions */}
        <g clipPath={`url(#${clipId})`} stroke="none">
          <path
            className="lab-glass-wave lab-glass-wave--back"
            d="M20 158c10-6 20-6 30 0s20 6 30 0 20-6 30 0 20 6 30 0 20-6 30 0 20 6 30 0 20-6 30 0V205H20Z"
            fill="currentColor"
            fillOpacity="0.1"
          />
          <path
            className="lab-glass-wave"
            d="M20 156c10 5 20 5 30 0s20-5 30 0 20 5 30 0 20-5 30 0 20 5 30 0 20-5 30 0 20 5 30 0V205H20Z"
            fill="currentColor"
            fillOpacity="0.16"
          />
        </g>
        {/* Measurement graduation ticks */}
        <line x1="126" y1="130" x2="134" y2="130" />
        <line x1="132" y1="145" x2="142" y2="145" />
        <line x1="138" y1="160" x2="148" y2="160" />
        <line x1="144" y1="175" x2="152" y2="175" />
        {/* Floating bubbles & botanical leaf inside flask */}
        <circle className="lab-glass-bubble" cx="96" cy="172" r="3.5" />
        <circle className="lab-glass-bubble lab-glass-bubble--2" cx="112" cy="164" r="2.5" />
        <circle className="lab-glass-bubble lab-glass-bubble--3" cx="106" cy="140" r="2" />
        <circle className="lab-glass-vapor" cx="114" cy="84" r="2.2" />
        <circle className="lab-glass-vapor lab-glass-vapor--2" cx="106" cy="52" r="3" />
      </g>
    </svg>
  );
}
