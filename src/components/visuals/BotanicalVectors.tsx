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
