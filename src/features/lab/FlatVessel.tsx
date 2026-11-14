import type { VesselId } from './LabPage';

/** Flat vector vessel, used only when WebGL is unavailable (the 3D scene replaces it everywhere else). */
export function FlatVessel({ vesselId }: { readonly vesselId: VesselId }) {
  if (vesselId === 'casquinha-artesanal') {
    return (
      <svg
        viewBox="0 0 220 190"
        className="lab-chamber-vessel-svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="waffle-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dfaa6c" />
            <stop offset="55%" stopColor="#c68642" />
            <stop offset="100%" stopColor="#9c6228" />
          </linearGradient>
        </defs>
        {/* Scalloped waffle rim */}
        <path
          d="M44 18C62 28 86 22 110 26C134 22 158 28 176 18L116 178C113 185 107 185 104 178Z"
          fill="url(#waffle-grad)"
          stroke="#7d4918"
          strokeWidth="2"
        />
        <ellipse
          cx="110"
          cy="18"
          rx="66"
          ry="11"
          fill="#e7b97e"
          stroke="#8a521d"
          strokeWidth="1.8"
        />
        {/* Waffle lattice lines */}
        <g stroke="#8a521d" strokeWidth="1.2" opacity="0.55">
          <line x1="60" y1="26" x2="122" y2="148" />
          <line x1="82" y1="27" x2="134" y2="120" />
          <line x1="106" y1="28" x2="146" y2="94" />
          <line x1="130" y1="27" x2="158" y2="68" />
          <line x1="160" y1="26" x2="98" y2="148" />
          <line x1="138" y1="27" x2="86" y2="120" />
          <line x1="114" y1="28" x2="74" y2="94" />
          <line x1="90" y1="27" x2="62" y2="68" />
        </g>
      </svg>
    );
  }

  if (vesselId === 'casquinha-premium') {
    return (
      <svg
        viewBox="0 0 220 190"
        className="lab-chamber-vessel-svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="waffle-prem" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dfaa6c" />
            <stop offset="55%" stopColor="#c68642" />
            <stop offset="100%" stopColor="#9c6228" />
          </linearGradient>
          <linearGradient id="choc-dip" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4b2518" />
            <stop offset="100%" stopColor="#2a1109" />
          </linearGradient>
        </defs>
        {/* Cone body */}
        <path
          d="M44 18L116 178C113 185 107 185 104 178L176 18Z"
          fill="url(#waffle-prem)"
          stroke="#7d4918"
          strokeWidth="2"
        />
        {/* Waffle lines on lower half */}
        <g stroke="#8a521d" strokeWidth="1.2" opacity="0.55">
          <line x1="72" y1="68" x2="120" y2="154" />
          <line x1="92" y1="68" x2="132" y2="128" />
          <line x1="148" y1="68" x2="100" y2="154" />
          <line x1="128" y1="68" x2="88" y2="128" />
        </g>
        {/* Belgian chocolate dipped rim */}
        <path
          d="M44 18H176L156 72C146 66 138 78 128 70C118 62 112 78 100 70C88 62 80 76 66 68Z"
          fill="url(#choc-dip)"
          stroke="#230d06"
          strokeWidth="1.5"
        />
        <ellipse
          cx="110"
          cy="18"
          rx="66"
          ry="11"
          fill="#3b1b10"
          stroke="#230d06"
          strokeWidth="1.6"
        />
        {/* Roasted pistachio & hazelnut granella on the chocolate rim */}
        <g fill="#9db876" opacity="0.95">
          <circle cx="68" cy="36" r="3" />
          <circle cx="84" cy="48" r="2.5" />
          <circle cx="102" cy="34" r="3.2" />
          <circle cx="118" cy="52" r="2.8" />
          <circle cx="136" cy="38" r="3" />
          <circle cx="150" cy="46" r="2.4" />
        </g>
        <g fill="#dfb57b" opacity="0.9">
          <circle cx="76" cy="42" r="2.2" />
          <circle cx="94" cy="44" r="2.6" />
          <circle cx="112" cy="40" r="2.2" />
          <circle cx="128" cy="46" r="2.5" />
          <circle cx="144" cy="34" r="2.2" />
        </g>
      </svg>
    );
  }

  if (vesselId === 'copinho-lab') {
    return (
      <svg
        viewBox="0 0 220 155"
        className="lab-chamber-vessel-svg lab-chamber-vessel-cup"
        aria-hidden="true"
      >
        {/* Lab cup body */}
        <path
          d="M38 20H182L164 128C162 138 152 145 140 145H80C68 145 58 138 56 128Z"
          fill="#f7efe3"
          stroke="#b0553f"
          strokeWidth="2"
        />
        {/* Terracotta double band */}
        <path d="M44 54H176L173 72H47Z" fill="#b0553f" opacity="0.18" />
        <ellipse
          cx="110"
          cy="20"
          rx="74"
          ry="10"
          fill="#efe1ce"
          stroke="#b0553f"
          strokeWidth="2"
        />
        {/* CL monogram badge on cup */}
        <circle
          cx="110"
          cy="86"
          r="24"
          fill="#fbf6ee"
          stroke="#b0553f"
          strokeWidth="1.4"
        />
        <text
          x="110"
          y="93"
          textAnchor="middle"
          fontFamily="var(--font-serif)"
          fontSize="20"
          fontWeight="600"
          fill="#5c0a1e"
        >
          CL
        </text>
        {/* Graduated volume ticks on the side of the cup */}
        <g stroke="#8a6d56" strokeWidth="1.2">
          <line x1="152" y1="44" x2="164" y2="44" />
          <line x1="150" y1="68" x2="160" y2="68" />
          <line x1="148" y1="92" x2="158" y2="92" />
          <line x1="146" y1="116" x2="154" y2="116" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 220 165"
      className="lab-chamber-vessel-svg lab-chamber-vessel-cup"
      aria-hidden="true"
    >
      {/* Thermal capsule container */}
      <path
        d="M32 22H188L174 136C172 146 164 152 152 152H68C56 152 48 146 46 136Z"
        fill="#5c0a1e"
        stroke="#3a0612"
        strokeWidth="2"
      />
      {/* Insulated cream label wrap */}
      <path d="M39 58H181L176 112H44Z" fill="#f4ede4" />
      <ellipse
        cx="110"
        cy="22"
        rx="78"
        ry="10"
        fill="#e6d0b5"
        stroke="#3a0612"
        strokeWidth="2"
      />
      <text
        x="110"
        y="83"
        textAnchor="middle"
        fontFamily="var(--font-serif)"
        fontSize="16"
        fontWeight="600"
        fill="#5c0a1e"
      >
        crema lab
      </text>
      <text
        x="110"
        y="99"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="7.5"
        fontWeight="700"
        letterSpacing="2"
        fill="#b0553f"
      >
        CÁPSULA TÉRMICA · -14°C
      </text>
    </svg>
  );
}
