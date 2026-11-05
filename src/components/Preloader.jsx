import React, { useEffect, useState } from "react";

export default function Preloader({ isOpen, onComplete, lang = "en" }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setProgress(0);
    setIsExiting(false);

    let current = 0;
    const interval = setInterval(() => {
      const step =
        current < 35
          ? Math.floor(Math.random() * 7) + 5
          : current < 75
          ? Math.floor(Math.random() * 9) + 6
          : Math.floor(Math.random() * 6) + 4;

      current = Math.min(100, current + step);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete?.();
          }, 650);
        }, 360);
      }
    }, 55);

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div
      aria-label="Loading screen"
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0a] text-[#f1eec0] select-none transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isExiting ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* Center Animated Flying Defect Hunter Beetle (No edge text clutter, cleanly scaled) */}
      <div className="flex flex-col items-center justify-center text-center px-4">
        {/* Flying Beetle Graphic with Flapping Wings & Hover Motion */}
        <div className="relative w-44 h-36 sm:w-52 sm:h-40 flex items-center justify-center">
          <svg
            viewBox="0 0 200 160"
            className="w-full h-full overflow-visible"
          >
            <defs>
              {/* Flapping Wing Animation Keyframes */}
              <style>{`
                @keyframes hoverFly {
                  0%, 100% { transform: translateY(0px) rotate(0deg); }
                  50% { transform: translateY(-8px) rotate(-1.5deg); }
                }
                @keyframes flapLeft {
                  0%, 100% { transform: rotate(18deg) scaleY(1); }
                  50% { transform: rotate(38deg) scaleY(0.7); }
                }
                @keyframes flapRight {
                  0%, 100% { transform: rotate(-18deg) scaleY(1); }
                  50% { transform: rotate(-38deg) scaleY(0.7); }
                }
              `}</style>
              <linearGradient id="wingMembrane" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7ae7ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#3aa1d8" stopOpacity="0.25" />
              </linearGradient>
            </defs>

            {/* Flying Beetle Group with Hover Animation */}
            <g style={{ animation: "hoverFly 1.8s ease-in-out infinite", transformOrigin: "100px 80px" }}>
              {/* Translucent Flying Wings (Flapping rapidly behind shell) */}
              <g transform="translate(100, 70)">
                {/* Left Flight Wing */}
                <path
                  d="M0 0 C -40 -35 -65 -15 -55 10 C -48 20 -20 15 0 0 Z"
                  fill="url(#wingMembrane)"
                  stroke="#7ae7ff"
                  strokeWidth="1"
                  style={{
                    animation: "flapLeft 0.12s ease-in-out infinite",
                    transformOrigin: "0px 0px",
                  }}
                />
                {/* Right Flight Wing */}
                <path
                  d="M0 0 C 40 -35 65 -15 55 10 C 48 20 20 15 0 0 Z"
                  fill="url(#wingMembrane)"
                  stroke="#7ae7ff"
                  strokeWidth="1"
                  style={{
                    animation: "flapRight 0.12s ease-in-out infinite",
                    transformOrigin: "0px 0px",
                  }}
                />
              </g>

              {/* Legs in flight posture */}
              <path
                d="M68 62L52 50M66 80L46 80M68 98L52 110"
                stroke="#f1eec0"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <path
                d="M132 62L148 50M134 80L154 80M132 98L148 110"
                stroke="#f1eec0"
                strokeWidth="3.2"
                strokeLinecap="round"
              />

              {/* Antennae */}
              <path
                d="M90 40C85 25 74 21 68 23"
                stroke="#f1eec0"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M110 40C115 25 126 21 132 23"
                stroke="#f1eec0"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="68" cy="23" r="4" fill="#3aa1d8" />
              <circle cx="132" cy="23" r="4" fill="#3aa1d8" />

              {/* Head */}
              <path
                d="M82 50C82 36 118 36 118 50Z"
                fill="#0a0a0a"
                stroke="#f1eec0"
                strokeWidth="3"
              />
              {/* Eyes */}
              <circle cx="92" cy="43" r="3" fill="#3aa1d8" />
              <circle cx="108" cy="43" r="3" fill="#3aa1d8" />

              {/* Outer Elytra (Hard Wing Shells spread open for flight) */}
              {/* Left Shell */}
              <path
                d="M98 52 C 72 54 62 85 76 116 C 94 118 97 78 98 52 Z"
                fill="#ea4530"
                stroke="#0a0a0a"
                strokeWidth="3"
              />
              <circle cx="78" cy="74" r="5" fill="#f1eec0" />
              <circle cx="84" cy="98" r="4.5" fill="#0a0a0a" />

              {/* Right Shell */}
              <path
                d="M102 52 C 128 54 138 85 124 116 C 106 118 103 78 102 52 Z"
                fill="#ea4530"
                stroke="#0a0a0a"
                strokeWidth="3"
              />
              <circle cx="122" cy="74" r="5" fill="#f1eec0" />
              <circle cx="116" cy="98" r="4.5" fill="#0a0a0a" />

              {/* Dark Inner Body visible between shells */}
              <ellipse cx="100" cy="84" rx="14" ry="26" fill="#141414" stroke="#f1eec0" strokeWidth="1.5" />
              <circle cx="100" cy="76" r="3" fill="#3aa1d8" />
              <circle cx="100" cy="92" r="3" fill="#3aa1d8" />
            </g>

            {/* Stamp Badge when >= 90% */}
            {progress >= 90 && (
              <g transform="translate(100, 80) rotate(-10)">
                <rect
                  x="-56"
                  y="-16"
                  width="112"
                  height="32"
                  rx="7"
                  fill="#3aa1d8"
                  stroke="#0a0a0a"
                  strokeWidth="2.5"
                />
                <text
                  x="0"
                  y="5"
                  textAnchor="middle"
                  fill="#0a0a0a"
                  fontSize="13"
                  fontWeight="900"
                  className="font-ui uppercase tracking-wider"
                >
                  0 DEFECTS ✓
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Scaled percentage counter: e.g. [64%] */}
        <div className="font-stamp text-[clamp(46px,8.5vw,88px)] leading-none tracking-tight text-[#f1eec0] flex items-baseline gap-2 mt-2">
          <span>[</span>
          <span className="text-[#3aa1d8] tabular-nums">
            {progress}%
          </span>
          <span>]</span>
        </div>

        {/* Status note */}
        <p className="mt-2.5 text-xs text-[#f1eec0]/55 font-ui tracking-wide lowercase">
          {lang === "en"
            ? "hunting defects & verifying business flows..."
            : "memburu defect & memvalidasi alur bisnis..."}
        </p>
      </div>
    </div>
  );
}
