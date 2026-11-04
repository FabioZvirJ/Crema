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
        <path d="M660 120C780 116 850 62 900 0H1040V182C920 184 790 156 660 120Z" fill="#a24a36" />
        <g transform="translate(0 34)">
        <path d="M640.0 138.0L642.6 139.2L645.5 140.4L648.8 141.8L652.4 143.3L656.3 144.8L660.5 146.4L665.0 148.1L669.7 149.8L674.6 151.6L679.7 153.4L684.9 155.3L690.3 157.2L695.8 159.1L701.4 161.0L707.1 162.9L712.8 164.8L718.6 166.7L724.3 168.6L730.1 170.4L735.8 172.2L741.4 173.9L746.9 175.6L752.3 177.2L757.6 178.8L762.9 179.9L768.1 181.0L773.3 182.1L778.5 183.2L783.8 184.2L789.0 185.3L794.3 186.3L799.6 187.3L804.9 188.3L810.3 189.3L815.6 190.3L821.0 191.2L826.4 192.2L831.9 193.1L837.4 193.9L842.9 194.8L848.4 195.7L854.0 196.5L859.7 197.3L865.4 198.1L871.1 198.8L876.8 199.5L882.7 200.3L888.6 200.9L894.7 201.5L901.1 202.1L907.8 202.6L914.6 203.1L921.6 203.5L928.8 204.0L936.0 204.4L943.4 204.8L950.7 205.1L958.1 205.5L965.4 205.8L972.6 206.1L979.7 206.4L986.6 206.7L993.4 207.0L999.9 207.2L1006.1 207.5L1012.1 207.7L1017.7 207.9L1022.9 208.1L1027.8 208.4L1032.1 208.6L1036.0 208.8L1039.3 209.0L1040.7 171.0L1037.3 171.0L1033.3 170.9L1028.8 170.9L1024.0 170.8L1018.7 170.8L1013.1 170.7L1007.1 170.6L1000.8 170.6L994.3 170.5L987.6 170.4L980.7 170.3L973.7 170.1L966.5 170.0L959.3 169.8L952.0 169.7L944.8 169.5L937.6 169.2L930.4 169.0L923.4 168.7L916.6 168.5L909.9 168.1L903.5 167.8L897.3 167.5L891.4 167.1L885.7 166.7L880.0 166.4L874.4 166.0L868.8 165.6L863.2 165.1L857.7 164.7L852.2 164.2L846.7 163.7L841.3 163.2L835.9 162.7L830.6 162.1L825.2 161.5L819.9 160.9L814.6 160.3L809.3 159.7L804.1 159.0L798.8 158.4L793.6 157.7L788.4 157.0L783.2 156.2L778.0 155.5L772.8 154.8L767.6 154.0L762.4 153.2L757.1 152.8L751.6 152.2L746.0 151.7L740.3 151.0L734.5 150.3L728.6 149.5L722.7 148.7L716.8 147.9L710.9 147.1L705.0 146.3L699.2 145.4L693.4 144.6L687.8 143.7L682.3 142.9L677.0 142.2L671.8 141.4L666.8 140.7L662.1 140.1L657.7 139.6L653.5 139.1L649.6 138.7L646.0 138.3L642.8 138.1L640.0 138.0Z" fill="#4a0a1a" />
        <path d="M-30.0 112.0L-27.0 113.4L-23.5 114.9L-19.7 116.6L-15.4 118.5L-10.7 120.4L-5.8 122.5L-0.5 124.6L5.1 126.8L10.9 129.1L16.9 131.4L23.1 133.8L29.4 136.2L35.9 138.7L42.5 141.1L49.2 143.5L55.9 145.9L62.6 148.3L69.3 150.6L75.9 152.8L82.5 155.0L89.0 157.1L95.3 159.1L101.5 161.0L107.5 162.8L113.4 164.1L119.2 165.3L125.1 166.6L131.0 167.9L136.9 169.1L142.8 170.3L148.8 171.5L154.7 172.7L160.7 173.8L166.7 174.9L172.7 175.9L178.7 176.9L184.7 177.8L190.7 178.7L196.7 179.5L202.7 180.2L208.7 180.9L214.7 181.4L220.7 181.9L226.7 182.3L232.7 182.7L238.7 182.9L244.7 183.0L250.6 183.0L256.6 182.5L262.7 181.9L268.7 181.1L274.6 180.2L280.6 179.2L286.5 178.2L292.4 177.0L298.3 175.8L304.1 174.4L309.9 173.1L315.7 171.6L321.3 170.1L327.0 168.6L332.5 167.1L338.0 165.5L343.4 163.9L348.7 162.3L353.9 160.7L359.1 159.1L364.1 157.6L369.0 156.0L373.8 154.5L378.5 153.0L383.1 151.6L387.7 149.8L392.3 148.0L396.8 146.1L401.4 144.2L405.9 142.2L410.3 140.2L414.7 138.2L419.0 136.1L423.2 134.1L427.3 132.0L431.3 130.0L435.3 128.0L439.1 126.0L442.7 124.0L446.2 122.1L449.6 120.2L452.8 118.4L455.9 116.7L458.7 115.0L461.4 113.4L463.9 111.9L466.1 110.5L468.2 109.2L470.0 108.0L470.0 108.0L467.8 108.3L465.4 108.6L462.8 109.1L459.9 109.7L456.9 110.4L453.7 111.1L450.2 111.9L446.7 112.8L443.0 113.7L439.1 114.7L435.1 115.7L431.0 116.8L426.8 117.8L422.5 118.9L418.1 120.0L413.6 121.1L409.1 122.1L404.5 123.1L399.9 124.1L395.3 125.1L390.7 126.0L386.1 126.9L381.5 127.7L376.9 128.4L372.2 129.4L367.4 130.5L362.4 131.6L357.4 132.8L352.3 133.9L347.1 135.1L341.9 136.3L336.6 137.4L331.2 138.6L325.8 139.7L320.4 140.8L314.9 141.9L309.4 142.9L303.9 143.8L298.3 144.7L292.8 145.6L287.3 146.3L281.7 147.0L276.2 147.6L270.8 148.1L265.3 148.5L260.0 148.8L254.6 149.0L249.4 149.0L244.0 149.3L238.7 149.5L233.3 149.7L227.8 149.7L222.3 149.6L216.7 149.5L211.1 149.3L205.4 149.0L199.8 148.6L194.1 148.2L188.3 147.7L182.6 147.1L176.8 146.5L171.0 145.8L165.2 145.1L159.3 144.4L153.5 143.6L147.6 142.7L141.8 141.9L135.9 141.0L130.0 140.1L124.2 139.1L118.3 138.2L112.5 137.2L106.6 136.6L100.5 135.8L94.1 135.0L87.6 134.0L80.9 132.9L74.2 131.7L67.3 130.5L60.4 129.2L53.5 127.9L46.6 126.5L39.8 125.1L33.1 123.8L26.4 122.4L19.9 121.1L13.6 119.8L7.5 118.5L1.7 117.3L-3.9 116.2L-9.2 115.2L-14.2 114.3L-18.7 113.5L-22.9 112.9L-26.7 112.4L-30.0 112.0Z" fill="#4a0a1a" />
        <path d="M120.0 166.0L123.3 165.7L127.1 165.2L131.3 164.5L135.8 163.7L140.7 162.8L145.8 161.8L151.3 160.7L157.0 159.4L163.0 158.1L169.2 156.8L175.5 155.4L182.1 153.9L188.7 152.5L195.5 151.0L202.4 149.5L209.3 148.1L216.3 146.6L223.3 145.3L230.3 143.9L237.2 142.7L244.0 141.5L250.8 140.4L257.5 139.4L264.0 138.5L270.5 137.4L277.2 136.3L284.0 135.2L290.8 134.1L297.7 133.0L304.7 131.9L311.7 130.8L318.8 129.8L325.9 128.7L333.0 127.7L340.1 126.8L347.3 125.9L354.5 125.0L361.7 124.2L368.9 123.4L376.0 122.7L383.2 122.1L390.3 121.5L397.3 121.0L404.4 120.6L411.3 120.3L418.2 120.1L425.1 120.0L431.8 119.9L438.6 119.4L445.4 118.9L452.3 118.5L459.3 118.1L466.2 117.8L473.2 117.6L480.3 117.5L487.3 117.4L494.4 117.4L501.4 117.4L508.5 117.5L515.5 117.7L522.6 117.9L529.5 118.2L536.5 118.6L543.4 118.9L550.3 119.4L557.1 119.9L563.9 120.4L570.6 121.0L577.2 121.6L583.7 122.3L590.1 123.0L596.4 123.7L602.5 124.4L608.5 125.1L614.5 125.9L620.4 126.8L626.3 127.9L632.2 129.0L638.1 130.1L643.9 131.4L649.8 132.7L655.6 134.0L661.4 135.4L667.2 136.9L673.0 138.3L678.8 139.8L684.5 141.3L690.3 142.8L696.0 144.2L701.7 145.7L707.5 147.1L713.2 148.5L718.9 149.8L724.6 151.1L730.3 152.4L736.0 153.5L741.8 154.3L747.6 155.0L753.5 155.8L759.4 156.5L765.4 157.3L771.5 158.0L777.5 158.8L783.5 159.5L789.5 160.2L795.4 160.9L801.2 161.5L807.0 162.2L812.6 162.8L818.0 163.3L823.3 163.8L828.5 164.3L833.4 164.7L838.0 165.1L842.4 165.4L846.6 165.7L850.4 165.9L854.0 166.0L857.2 166.0L860.0 166.0L860.0 166.0L857.5 164.7L854.6 163.4L851.3 162.0L847.8 160.5L843.9 158.9L839.8 157.3L835.4 155.6L830.8 153.9L826.0 152.1L821.0 150.3L815.8 148.5L810.5 146.6L805.1 144.7L799.6 142.7L794.0 140.7L788.4 138.7L782.7 136.7L777.0 134.7L771.3 132.6L765.7 130.6L760.1 128.6L754.6 126.5L749.2 124.5L744.0 122.5L738.8 120.8L733.6 119.0L728.4 117.2L723.2 115.3L717.8 113.3L712.5 111.3L707.1 109.3L701.6 107.2L696.0 105.1L690.4 102.9L684.8 100.8L679.0 98.6L673.2 96.5L667.3 94.4L661.4 92.3L655.3 90.3L649.2 88.2L642.9 86.3L636.6 84.4L630.2 82.6L623.7 80.9L617.1 79.2L610.3 77.7L603.6 76.3L596.8 75.1L590.1 74.0L583.2 73.0L576.2 72.0L569.2 71.0L562.1 70.1L554.9 69.3L547.7 68.5L540.4 67.7L533.0 67.0L525.6 66.4L518.2 65.8L510.8 65.3L503.3 64.8L495.8 64.4L488.2 64.1L480.7 63.8L473.2 63.6L465.6 63.5L458.1 63.5L450.6 63.5L443.1 63.6L435.6 63.8L428.2 64.1L420.7 65.1L413.2 66.2L405.8 67.4L398.3 68.6L390.8 70.0L383.3 71.5L375.9 73.0L368.4 74.6L361.0 76.3L353.6 78.0L346.3 79.8L338.9 81.6L331.6 83.5L324.4 85.4L317.2 87.4L310.1 89.3L303.1 91.3L296.1 93.3L289.2 95.4L282.4 97.4L275.6 99.4L269.0 101.4L262.5 103.5L256.0 105.5L249.5 107.8L242.9 110.2L236.2 112.8L229.4 115.4L222.7 118.1L215.9 120.8L209.2 123.6L202.5 126.4L195.9 129.3L189.4 132.1L183.0 135.0L176.7 137.8L170.6 140.6L164.6 143.4L158.9 146.1L153.3 148.7L148.1 151.3L143.1 153.7L138.4 156.1L134.0 158.4L129.9 160.5L126.2 162.5L122.9 164.3L120.0 166.0Z" fill="#b0553f" />
        </g>
        <path d="M600 560C630 500 740 454 840 420C930 388 980 336 1040 262V560Z" fill="#b65a40" />
        <path d="M700 560C770 508 880 478 1040 440V560Z" fill="#8a3426" />
        <path d="M-30.0 520.0L-25.4 521.3L-20.1 522.6L-14.3 524.1L-7.9 525.7L-1.0 527.3L6.4 529.0L14.3 530.8L22.6 532.6L31.2 534.5L40.2 536.3L49.4 538.2L58.9 540.1L68.7 541.9L78.6 543.8L88.7 545.5L98.9 547.3L109.1 549.0L119.4 550.6L129.7 552.1L140.0 553.5L150.2 554.8L160.2 556.0L170.2 557.1L180.0 558.0L189.8 558.0L199.6 557.9L209.6 557.7L219.6 557.3L229.7 556.8L239.9 556.3L250.1 555.6L260.3 554.8L270.6 554.0L280.9 553.2L291.2 552.3L301.5 551.4L311.8 550.5L322.1 549.5L332.3 548.6L342.5 547.7L352.6 546.9L362.7 546.1L372.7 545.4L382.5 544.7L392.3 544.1L401.9 543.6L411.4 543.2L420.9 543.0L430.3 542.5L439.8 542.2L449.3 541.8L458.7 541.5L468.2 541.2L477.6 540.9L487.0 540.7L496.4 540.5L505.7 540.4L515.0 540.3L524.3 540.2L533.5 540.1L542.7 540.1L551.8 540.1L560.9 540.2L569.9 540.3L578.8 540.4L587.6 540.5L596.4 540.7L605.1 540.9L613.7 541.1L622.2 541.4L630.6 541.7L638.9 542.0L647.2 541.6L655.6 541.4L664.2 541.2L672.9 541.1L681.7 541.1L690.5 541.1L699.4 541.2L708.2 541.3L716.9 541.5L725.6 541.7L734.1 541.8L742.5 542.0L750.7 542.2L758.7 542.4L766.5 542.6L773.9 542.8L781.1 542.9L787.9 542.9L794.4 543.0L800.4 542.9L806.1 542.8L811.2 542.6L815.9 542.4L820.0 542.0L820.0 542.0L816.1 540.7L811.6 539.3L806.7 537.9L801.3 536.3L795.5 534.7L789.3 533.0L782.6 531.3L775.7 529.5L768.4 527.7L760.9 525.9L753.0 524.1L745.0 522.2L736.7 520.3L728.3 518.5L719.8 516.6L711.1 514.8L702.3 513.0L693.5 511.3L684.7 509.6L675.9 507.9L667.1 506.3L658.3 504.8L649.7 503.4L641.1 502.0L632.6 501.5L624.1 500.9L615.4 500.4L606.7 499.9L597.9 499.5L588.9 499.0L580.0 498.6L570.9 498.3L561.8 497.9L552.6 497.6L543.3 497.4L534.0 497.1L524.6 496.9L515.2 496.8L505.7 496.6L496.2 496.5L486.7 496.5L477.1 496.4L467.5 496.4L457.9 496.5L448.2 496.6L438.5 496.7L428.9 496.8L419.1 497.0L409.3 497.5L399.3 498.2L389.2 499.0L379.1 499.8L368.9 500.8L358.7 501.8L348.5 502.8L338.2 504.0L328.0 505.1L317.7 506.3L307.4 507.4L297.2 508.6L287.0 509.8L276.8 510.9L266.7 512.0L256.7 513.0L246.7 514.0L236.8 514.9L227.0 515.7L217.4 516.4L207.8 517.0L198.4 517.5L189.1 517.8L180.0 518.0L170.8 518.8L161.3 519.4L151.6 519.9L141.7 520.2L131.7 520.5L121.5 520.6L111.3 520.7L101.1 520.7L91.0 520.6L80.9 520.5L70.9 520.4L61.1 520.2L51.4 520.0L42.0 519.8L32.9 519.6L24.1 519.4L15.7 519.2L7.6 519.1L0.0 519.1L-7.1 519.1L-13.7 519.2L-19.8 519.3L-25.2 519.6L-30.0 520.0Z" fill="#b0553f" />
        <path d="M-30.0 440.0L-26.8 441.7L-23.3 443.6L-19.3 445.7L-14.9 448.0L-10.2 450.4L-5.1 453.0L0.3 455.7L6.0 458.5L12.0 461.4L18.2 464.4L24.6 467.4L31.2 470.4L38.0 473.5L45.0 476.5L52.0 479.6L59.2 482.6L66.4 485.5L73.7 488.3L81.0 491.1L88.3 493.7L95.7 496.2L103.0 498.6L110.2 500.8L117.3 502.8L124.4 504.2L131.5 505.6L138.7 506.9L146.0 508.2L153.4 509.5L160.8 510.7L168.4 511.8L176.0 512.9L183.6 513.9L191.4 514.8L199.1 515.7L206.9 516.5L214.8 517.2L222.7 517.8L230.6 518.3L238.5 518.7L246.5 519.0L254.4 519.2L262.4 519.3L270.4 519.3L278.3 519.1L286.3 518.9L294.2 518.4L302.2 517.9L310.3 516.8L318.4 515.4L326.5 513.7L334.5 511.9L342.5 509.8L350.5 507.6L358.4 505.3L366.2 502.9L374.0 500.3L381.8 497.7L389.5 495.1L397.1 492.4L404.7 489.8L412.2 487.1L419.6 484.6L427.0 482.0L434.3 479.6L441.5 477.3L448.6 475.1L455.6 473.1L462.5 471.2L469.3 469.5L476.0 468.0L482.7 466.8L489.4 465.7L496.3 464.7L503.1 463.8L510.0 463.0L516.8 462.3L523.6 461.6L530.4 461.0L537.2 460.5L544.0 460.1L550.7 459.8L557.4 459.5L564.0 459.2L570.6 459.1L577.1 459.0L583.6 459.0L590.0 459.0L596.4 459.1L602.7 459.2L608.9 459.4L615.0 459.6L621.1 459.9L627.1 460.2L632.9 460.6L638.7 460.9L644.3 461.4L649.8 462.0L655.2 462.6L660.6 463.4L665.9 464.2L671.1 465.0L676.3 466.0L681.5 467.0L686.5 468.0L691.6 469.1L696.5 470.2L701.4 471.4L706.2 472.6L711.0 473.9L715.7 475.2L720.4 476.5L725.0 477.8L729.6 479.2L734.0 480.5L738.5 481.9L742.8 483.2L747.2 484.6L751.4 486.0L755.5 487.3L759.7 488.1L763.8 489.0L768.0 489.9L772.1 491.0L776.3 492.1L780.4 493.3L784.5 494.5L788.6 495.8L792.6 497.1L796.6 498.4L800.5 499.7L804.3 501.0L808.0 502.3L811.6 503.5L815.1 504.7L818.5 505.9L821.8 507.0L824.9 508.0L827.9 509.0L830.7 509.8L833.3 510.5L835.7 511.2L838.0 511.7L840.0 512.0L840.0 512.0L838.5 510.6L836.8 509.1L834.9 507.5L832.9 505.7L830.6 503.8L828.2 501.9L825.7 499.8L823.0 497.7L820.1 495.5L817.1 493.2L814.0 490.9L810.7 488.5L807.3 486.1L803.9 483.7L800.3 481.3L796.6 478.9L792.8 476.5L789.0 474.1L785.0 471.7L781.0 469.4L777.0 467.1L772.8 464.9L768.6 462.8L764.5 460.7L760.2 459.3L755.9 457.8L751.5 456.4L747.1 454.9L742.6 453.4L737.9 451.9L733.3 450.5L728.5 449.0L723.6 447.5L718.7 446.1L713.7 444.7L708.6 443.3L703.4 442.0L698.2 440.7L692.8 439.4L687.4 438.2L681.9 437.1L676.4 436.0L670.7 435.0L665.0 434.0L659.2 433.2L653.3 432.4L647.3 431.7L641.3 431.1L635.3 430.5L629.2 429.9L623.0 429.4L616.7 429.0L610.3 428.6L603.9 428.2L597.3 427.9L590.7 427.7L584.0 427.5L577.2 427.3L570.4 427.3L563.5 427.3L556.5 427.3L549.5 427.4L542.5 427.6L535.4 427.9L528.2 428.3L521.1 428.7L513.8 429.2L506.6 429.8L499.3 430.5L492.0 431.3L484.7 432.2L477.3 433.2L469.8 434.4L462.1 435.8L454.4 437.4L446.7 439.2L439.0 441.2L431.4 443.2L423.7 445.5L416.0 447.7L408.3 450.1L400.7 452.5L393.0 454.9L385.4 457.3L377.8 459.7L370.3 462.0L362.7 464.3L355.3 466.5L347.8 468.5L340.5 470.5L333.2 472.2L325.9 473.8L318.8 475.2L311.7 476.4L304.8 477.4L297.8 478.1L290.8 479.0L283.5 479.8L276.3 480.4L268.9 481.0L261.6 481.4L254.2 481.7L246.7 481.9L239.3 482.0L231.8 482.1L224.3 482.0L216.8 481.8L209.3 481.5L201.8 481.2L194.4 480.8L187.0 480.3L179.6 479.7L172.2 479.1L164.9 478.4L157.7 477.7L150.5 476.9L143.4 476.0L136.4 475.1L129.5 474.2L122.7 473.2L115.9 472.6L109.0 471.8L101.9 470.7L94.7 469.6L87.4 468.2L80.1 466.8L72.7 465.2L65.3 463.5L57.9 461.8L50.6 460.0L43.4 458.2L36.3 456.3L29.3 454.5L22.5 452.7L15.9 450.9L9.5 449.2L3.4 447.5L-2.4 446.0L-8.0 444.6L-13.2 443.3L-18.0 442.2L-22.4 441.3L-26.4 440.5L-30.0 440.0Z" fill="#4a0a1a" />
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
