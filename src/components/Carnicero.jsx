import './Carnicero.css'

// Mini-clip SVG: two silhouetted hands on cutting board — one holds knife and chops.
// Pure SVG + CSS keyframes, ~2KB. Designed as an overlay for IntroOpcion2.
export default function Carnicero() {
  return (
    <div className="carnicero" aria-hidden="true">
      <svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg">
        {/* Cutting board */}
        <rect x="20" y="120" width="200" height="18" rx="3" fill="#1a1a1a" opacity="0.88" />
        <rect x="20" y="118" width="200" height="3" rx="1.5" fill="#1a1a1a" opacity="0.55" />

        {/* Meat slab being chopped */}
        <g className="carnicero__meat">
          <path
            d="M 88 118 Q 88 110 96 108 L 148 108 Q 156 108 156 114 L 158 118 Z"
            fill="#B0000B"
            opacity="0.92"
          />
          <path
            d="M 98 112 L 146 112"
            stroke="#8B0009"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
        </g>

        {/* Left hand — holds meat steady */}
        <g className="carnicero__left-hand">
          <rect x="60" y="90" width="28" height="30" rx="6" fill="#1a1a1a" />
          <rect x="55" y="70" width="14" height="28" rx="7" fill="#1a1a1a" />
        </g>

        {/* Right hand + knife — chopping arm */}
        <g className="carnicero__chop">
          {/* Forearm coming from top-right */}
          <rect x="170" y="20" width="14" height="60" rx="7" fill="#1a1a1a" />
          {/* Hand */}
          <rect x="158" y="72" width="32" height="26" rx="6" fill="#1a1a1a" />
          {/* Knife handle */}
          <rect x="138" y="88" width="20" height="10" rx="2" fill="#2a1810" />
          {/* Knife blade */}
          <path
            d="M 138 88 L 88 88 L 80 96 L 138 98 Z"
            fill="#C0C0C0"
            stroke="#404040"
            strokeWidth="0.6"
          />
          {/* Blade highlight */}
          <path
            d="M 90 90 L 136 90"
            stroke="#F0F0F0"
            strokeWidth="0.8"
            fill="none"
            opacity="0.9"
          />
        </g>
      </svg>
    </div>
  )
}
