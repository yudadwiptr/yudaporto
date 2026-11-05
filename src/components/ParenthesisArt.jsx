import React, { useState } from "react";

const STICKER_ARTWORKS = [
  {
    id: "snare-drum",
    widthEm: 1.08,
    label: "Rhythm Drum",
    render: () => (
      <svg
        viewBox="0 0 110 105"
        className="w-full h-full overflow-visible drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]"
      >
        <g transform="translate(55, 56) rotate(-26) translate(-55, -56)">
          {/* Drum Bottom Rim */}
          <ellipse
            cx="55"
            cy="78"
            rx="30"
            ry="11"
            fill="#1126b8"
            stroke="#d49b1a"
            strokeWidth="2.5"
          />
          {/* Drum Cylinder Body */}
          <path
            d="M25 44 L25 78 A30 11 0 0 0 85 78 L85 44 Z"
            fill="#1a35e0"
          />
          {/* Zigzag Tension Cords */}
          <path
            d="M26 46 L35 79 L46 49 L55 82 L65 49 L75 79 L84 46"
            fill="none"
            stroke="#7eb8da"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M26 74 L35 46 L46 80 L55 49 L65 80 L75 46 L84 74"
            fill="none"
            stroke="#7eb8da"
            strokeWidth="1.4"
            strokeLinejoin="round"
            opacity="0.7"
          />
          {/* Bottom Gold Band */}
          <path
            d="M25 74 A30 11 0 0 0 85 74 L85 79 A30 11 0 0 1 25 79 Z"
            fill="#e5a91a"
          />
          {/* Top Drumhead (Cream) */}
          <ellipse
            cx="55"
            cy="44"
            rx="30"
            ry="11"
            fill="#f1eec0"
            stroke="#e5a91a"
            strokeWidth="3.5"
          />
          {/* Left Drumstick */}
          <line
            x1="8"
            y1="26"
            x2="44"
            y2="37"
            stroke="#3aa1d8"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <line
            x1="8"
            y1="26"
            x2="15"
            y2="28.2"
            stroke="#f1eec0"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <circle cx="46" cy="38" r="5" fill="#f2b705" />
          {/* Right Drumstick */}
          <line
            x1="88"
            y1="8"
            x2="64"
            y2="42"
            stroke="#3aa1d8"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <line
            x1="88"
            y1="8"
            x2="83"
            y2="15"
            stroke="#f1eec0"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          <circle cx="63" cy="43" r="5" fill="#f2b705" />
        </g>
      </svg>
    ),
  },
  {
    id: "birdcage-letter",
    widthEm: 0.96,
    label: "Birdcage Note",
    render: () => (
      <svg
        viewBox="0 0 100 115"
        className="w-full h-full overflow-visible drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]"
      >
        {/* Top Hanging Ring */}
        <circle
          cx="50"
          cy="9"
          r="4.5"
          fill="none"
          stroke="#a5c9dc"
          strokeWidth="2"
        />
        {/* Top Dome Cap */}
        <path
          d="M37 22 Q50 11 63 22 Z"
          fill="#ede7b1"
          stroke="#a5c9dc"
          strokeWidth="1.5"
        />
        {/* Back Base Rim */}
        <ellipse
          cx="50"
          cy="94"
          rx="29"
          ry="8"
          fill="#1b4d6b"
          stroke="#8cb8d1"
          strokeWidth="1.8"
        />
        {/* Blue Envelope / Love Letter Inside Cage */}
        <g transform="translate(50, 66) rotate(-14) translate(-20, -15)">
          <rect
            x="0"
            y="0"
            width="38"
            height="27"
            rx="2"
            fill="#3aa1d8"
            stroke="#1b6ca8"
            strokeWidth="1.5"
          />
          {/* Open Flap (Cream) */}
          <polygon points="0,0 38,0 19,15" fill="#f1eec0" />
          <polyline
            points="0,27 19,12 38,27"
            fill="none"
            stroke="#75c4f0"
            strokeWidth="1.5"
          />
        </g>
        {/* Cage Outer Arch & Vertical Wire Bars */}
        <path
          d="M21 94 L21 50 C21 26 35 20 50 20 C65 20 79 26 79 50 L79 94"
          fill="none"
          stroke="#d8e6ee"
          strokeWidth="2"
        />
        <path
          d="M28 96 L28 48 C28 28 38 21 50 21 C62 21 72 28 72 48 L72 96"
          fill="none"
          stroke="#b8d4e3"
          strokeWidth="1.5"
        />
        <path
          d="M36 98 L36 47 C36 30 43 22 50 22 C57 22 64 30 64 47 L64 98"
          fill="none"
          stroke="#b8d4e3"
          strokeWidth="1.5"
        />
        <line
          x1="45"
          y1="22"
          x2="45"
          y2="100"
          stroke="#d8e6ee"
          strokeWidth="1.5"
        />
        <line
          x1="55"
          y1="22"
          x2="55"
          y2="100"
          stroke="#d8e6ee"
          strokeWidth="1.5"
        />
        {/* Horizontal Wire Rings */}
        <ellipse
          cx="50"
          cy="48"
          rx="29"
          ry="4.5"
          fill="none"
          stroke="#d8e6ee"
          strokeWidth="2"
        />
        <ellipse
          cx="50"
          cy="72"
          rx="29"
          ry="5"
          fill="none"
          stroke="#b8d4e3"
          strokeWidth="1.6"
        />
        {/* Bottom Decorative Scallop Base */}
        <path
          d="M21 94 C28 104 72 104 79 94"
          fill="none"
          stroke="#d8e6ee"
          strokeWidth="3.2"
          strokeDasharray="4 3"
        />
      </svg>
    ),
  },
  {
    id: "studio-headphones",
    widthEm: 1.05,
    label: "Studio Headphones",
    render: () => (
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]"
      >
        <g transform="translate(50, 50) rotate(-12) translate(-50, -50)">
          {/* Outer Curved Metallic Headband */}
          <path
            d="M20 54 C20 22 80 22 80 54"
            fill="none"
            stroke="#1c1c1c"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Inner Padded Cushion Arch */}
          <path
            d="M25 46 C25 25 75 25 75 46"
            fill="none"
            stroke="#0a0a0a"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Silver adjustment brackets */}
          <rect
            x="17"
            y="48"
            width="6"
            height="10"
            rx="1.5"
            fill="#a5c9dc"
            stroke="#0a0a0a"
            strokeWidth="1.2"
          />
          <rect
            x="77"
            y="48"
            width="6"
            height="10"
            rx="1.5"
            fill="#a5c9dc"
            stroke="#0a0a0a"
            strokeWidth="1.2"
          />
          {/* Left Earcup (Cobalt Shell + Cushion Pad) */}
          <g transform="translate(19, 64) rotate(14)">
            <ellipse
              cx="0"
              cy="0"
              rx="11"
              ry="17"
              fill="#3aa1d8"
              stroke="#0a0a0a"
              strokeWidth="2.5"
            />
            <ellipse cx="-2" cy="0" rx="7" ry="13" fill="#1b4d6b" />
            <ellipse
              cx="3"
              cy="0"
              rx="5"
              ry="14"
              fill="#0a0a0a"
              stroke="#2a2a2a"
              strokeWidth="1"
            />
          </g>
          {/* Right Earcup (Cobalt Shell + Cushion Pad) */}
          <g transform="translate(81, 64) rotate(-14)">
            <ellipse
              cx="0"
              cy="0"
              rx="11"
              ry="17"
              fill="#3aa1d8"
              stroke="#0a0a0a"
              strokeWidth="2.5"
            />
            <ellipse cx="2" cy="0" rx="7" ry="13" fill="#1b4d6b" />
            <ellipse
              cx="-3"
              cy="0"
              rx="5"
              ry="14"
              fill="#0a0a0a"
              stroke="#2a2a2a"
              strokeWidth="1"
            />
          </g>
        </g>
      </svg>
    ),
  },
  {
    id: "defect-hunter-bug",
    widthEm: 1.04,
    label: "Defect Hunter #1",
    render: () => (
      <svg
        viewBox="0 0 96 90"
        className="w-full h-full overflow-visible drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]"
      >
        <path
          d="M24 32L10 22M20 48L6 48M24 64L10 74M72 32L86 22M76 48L90 48M72 64L86 74"
          stroke="#f1eec0"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <ellipse
          cx="48"
          cy="50"
          rx="24"
          ry="27"
          fill="#ea4530"
          stroke="#0a0a0a"
          strokeWidth="3.5"
        />
        <line x1="48" y1="24" x2="48" y2="77" stroke="#0a0a0a" strokeWidth="3" />
        <circle cx="38" cy="42" r="4.5" fill="#f1eec0" />
        <circle cx="58" cy="42" r="4.5" fill="#f1eec0" />
        <circle cx="36" cy="58" r="5.5" fill="#0a0a0a" />
        <circle cx="60" cy="58" r="5.5" fill="#0a0a0a" />
        <circle cx="40" cy="20" r="3.5" fill="#3aa1d8" />
        <circle cx="56" cy="20" r="3.5" fill="#3aa1d8" />
      </svg>
    ),
  },
  {
    id: "as400-terminal",
    widthEm: 1.12,
    label: "AS400 Core Banking Host",
    render: () => (
      <svg
        viewBox="0 0 100 95"
        className="w-full h-full overflow-visible drop-shadow-[0_6px_14px_rgba(0,0,0,0.55)]"
      >
        {/* Monitor Stand */}
        <polygon
          points="32,74 68,74 74,84 26,84"
          fill="#1e1e1e"
          stroke="#0a0a0a"
          strokeWidth="2"
        />
        <rect
          x="20"
          y="84"
          width="60"
          height="6"
          rx="2"
          fill="#333"
          stroke="#0a0a0a"
          strokeWidth="1.5"
        />
        {/* Main CRT Bezel */}
        <rect
          x="12"
          y="12"
          width="76"
          height="62"
          rx="10"
          fill="#ede7b1"
          stroke="#0a0a0a"
          strokeWidth="3.2"
        />
        {/* Inner Dark Screen */}
        <rect
          x="19"
          y="18"
          width="62"
          height="46"
          rx="6"
          fill="#0c1712"
          stroke="#0a0a0a"
          strokeWidth="2"
        />
        {/* Green Terminal Prompt */}
        <text
          x="25"
          y="35"
          fill="#39e66b"
          fontSize="9.5"
          fontWeight="bold"
          fontFamily="monospace"
        >
          &gt; AS400
        </text>
        <text
          x="25"
          y="48"
          fill="#27c93f"
          fontSize="7.5"
          fontFamily="monospace"
        >
          BDS READY_
        </text>
        {/* LED Indicator */}
        <circle cx="78" cy="67" r="2.2" fill="#39e66b" />
        <circle cx="72" cy="67" r="1.6" fill="#ea4530" />
      </svg>
    ),
  },
];

export default function ParenthesisArt({ initialIndex = 0, delayMs = 90 }) {
  const [index, setIndex] = useState(initialIndex % STICKER_ARTWORKS.length);
  const [hovered, setHovered] = useState(false);

  const current = STICKER_ARTWORKS[index];
  const dynamicWidth = hovered ? current.widthEm * 1.14 : current.widthEm;

  const handleCycle = (e) => {
    e.preventDefault();
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
      className="hero-word pointer-events-auto relative z-30 inline-flex items-center align-baseline cursor-pointer select-none group focus:outline-none mx-[0.02em]"
    >
      <span className="font-display font-extralight text-[#f1eec0] transition-colors duration-200 group-hover:text-[#3aa1d8]">
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
            height: `${dynamicWidth * 0.96}em`,
            transform: `translateY(-50%) rotate(${
              hovered ? "6deg" : "0deg"
            }) scale(${hovered ? 1.08 : 1})`,
            transition:
              "transform 0.38s cubic-bezier(.22,1,.36,1), height 0.42s cubic-bezier(.22,1,.36,1)",
          }}
        >
          {current.render()}
        </span>
      </span>
      <span className="font-display font-extralight text-[#f1eec0] transition-colors duration-200 group-hover:text-[#3aa1d8]">
        )
      </span>
    </button>
  );
}
