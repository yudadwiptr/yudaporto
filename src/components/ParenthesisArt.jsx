import React, { useState } from "react";

const STICKER_ARTWORKS = [
  {
    id: "cyber-flame",
    widthEm: 0.92,
    label: "Craft Flame",
    render: () => (
      <svg viewBox="0 0 80 80" className="w-full h-full overflow-visible drop-shadow-[0_4px_12px_rgba(234,69,48,0.45)]">
        <defs>
          <linearGradient id="flameGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ea4530" />
            <stop offset="100%" stopColor="#f1eec0" />
          </linearGradient>
        </defs>
        <path
          d="M42 6C42 6 66 24 62 48C59 65 44 74 36 74C22 74 14 61 16 46C18 35 28 30 28 20C28 20 34 26 35 33C38 22 42 6 42 6Z"
          fill="url(#flameGrad)"
          stroke="#0a0a0a"
          strokeWidth="3"
        />
        <circle cx="38" cy="54" r="9" fill="#0a0a0a" />
        <circle cx="38" cy="54" r="4" fill="#3aa1d8" />
      </svg>
    ),
  },
  {
    id: "battery-spark",
    widthEm: 1.42,
    label: "Full Charge",
    render: () => (
      <svg viewBox="0 0 120 80" className="w-full h-full overflow-visible drop-shadow-[0_4px_12px_rgba(58,161,216,0.4)]">
        <rect x="8" y="18" width="94" height="44" rx="10" fill="#3aa1d8" stroke="#f1eec0" strokeWidth="4" />
        <rect x="104" y="30" width="10" height="20" rx="4" fill="#ea4530" />
        <rect x="16" y="26" width="22" height="28" rx="4" fill="#0a0a0a" />
        <rect x="44" y="26" width="22" height="28" rx="4" fill="#0a0a0a" />
        <rect x="72" y="26" width="22" height="28" rx="4" fill="#f1eec0" />
        <path d="M58 10L46 42H60L52 70L74 36H58L58 10Z" fill="#ea4530" stroke="#0a0a0a" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: "retro-crt",
    widthEm: 1.05,
    label: "Pixel CRT",
    render: () => (
      <svg viewBox="0 0 88 80" className="w-full h-full overflow-visible">
        <rect x="10" y="10" width="68" height="54" rx="12" fill="#f1eec0" stroke="#0a0a0a" strokeWidth="3.5" />
        <rect x="18" y="18" width="52" height="38" rx="6" fill="#0a0a0a" />
        <circle cx="34" cy="34" r="4.5" fill="#3aa1d8" />
        <circle cx="54" cy="34" r="4.5" fill="#3aa1d8" />
        <path d="M32 45Q44 53 56 45" stroke="#ea4530" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M26 68H62" stroke="#ea4530" strokeWidth="5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "bezier-pen",
    widthEm: 1.15,
    label: "Bezier Craft",
    render: () => (
      <svg viewBox="0 0 96 80" className="w-full h-full overflow-visible">
        <path d="M12 62C12 24 84 56 84 18" stroke="#3aa1d8" strokeWidth="4" strokeDasharray="5 4" fill="none" />
        <rect x="6" y="54" width="14" height="14" fill="#ea4530" stroke="#f1eec0" strokeWidth="2.5" />
        <rect x="76" y="10" width="14" height="14" fill="#ea4530" stroke="#f1eec0" strokeWidth="2.5" />
        <polygon points="48,14 66,46 48,38 30,46" fill="#f1eec0" stroke="#0a0a0a" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: "cinema-clapper",
    widthEm: 1.12,
    label: "Director Frame",
    render: () => (
      <svg viewBox="0 0 96 80" className="w-full h-full overflow-visible">
        <rect x="12" y="28" width="72" height="44" rx="6" fill="#ea4530" stroke="#f1eec0" strokeWidth="3" />
        <path d="M12 24L82 10L86 22L14 34Z" fill="#f1eec0" stroke="#0a0a0a" strokeWidth="2.5" />
        <circle cx="34" cy="50" r="8" fill="#0a0a0a" />
        <polygon points="46,42 66,50 46,58" fill="#f1eec0" />
      </svg>
    ),
  },
];

export default function ParenthesisArt({ initialIndex = 0, delayMs = 90 }) {
  const [index, setIndex] = useState(initialIndex % STICKER_ARTWORKS.length);
  const [hovered, setHovered] = useState(false);

  const current = STICKER_ARTWORKS[index];
  const dynamicWidth = hovered ? current.widthEm * 1.16 : current.widthEm;

  const handleCycle = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % STICKER_ARTWORKS.length);
  };

  return (
    <button
      type="button"
      onClick={handleCycle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Click to swap artifact inside ( )"
      data-cursor="active"
      style={{ animationDelay: `${delayMs}ms` }}
      className="hero-word inline-flex items-center align-baseline cursor-pointer select-none group focus:outline-none mx-[0.03em]"
    >
      <span className="font-display font-light text-[#f1eec0] transition-colors duration-200 group-hover:text-[#3aa1d8]">
        (
      </span>
      <span
        className="relative inline-block align-[-0.14em]"
        style={{
          height: "1.02em",
          width: `${dynamicWidth}em`,
          transition: "width 0.42s cubic-bezier(.22,1,.36,1)",
        }}
      >
        <span
          className="absolute inset-x-0 top-1/2 flex items-center justify-center sticker-hover"
          style={{
            height: `${dynamicWidth * 0.92}em`,
            transform: `translateY(-50%) rotate(${hovered ? "6deg" : "0deg"}) scale(${hovered ? 1.08 : 1})`,
            transition: "transform 0.38s cubic-bezier(.22,1,.36,1), height 0.42s cubic-bezier(.22,1,.36,1)",
          }}
        >
          {current.render()}
        </span>
      </span>
      <span className="font-display font-light text-[#f1eec0] transition-colors duration-200 group-hover:text-[#3aa1d8]">
        )
      </span>
    </button>
  );
}

