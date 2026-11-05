import React, { useState } from "react";

export default function FrameNav({
  lang,
  setLang,
  activePage,
  setActivePage,
  mode,
  setMode,
}) {
  const [logoAccent, setLogoAccent] = useState("#3aa1d8");

  const cycleLogoColor = () => {
    const colors = ["#3aa1d8", "#ea4530", "#f1eec0"];
    const next = colors[(colors.indexOf(logoAccent) + 1) % colors.length];
    setLogoAccent(next);
  };

  return (
    <header>
      {/* Top Bar: Logo Mark (Left), Language & Mode Switch (Center), Work (Right) */}
      <nav
        aria-label="Primary"
        className="fixed left-0 right-0 top-0 z-50 flex items-start justify-between px-[clamp(17px,2.9vw,34px)] py-[clamp(12px,1.7vw,22px)] pointer-events-none"
      >
        {/* Top-Left Brand Poster Mark (Kenji's interactive cat stamp equivalent) */}
        <button
          type="button"
          onClick={() => {
            setActivePage("home");
            cycleLogoColor();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onMouseEnter={cycleLogoColor}
          title="Yuda Dwi Putra — Home"
          className="pointer-events-auto -mt-[clamp(2px,0.6vw,7px)] -ml-[clamp(2px,0.7vw,10px)] group relative block w-[74px] h-[74px] sm:w-[88px] sm:h-[88px] text-left focus:outline-none"
        >
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full overflow-visible transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
          >
            {/* Stamp outer jagged/rounded poster badge */}
            <rect
              x="10"
              y="10"
              width="100"
              height="100"
              rx="18"
              fill="#0a0a0a"
              stroke={logoAccent}
              strokeWidth="4.5"
            />
            {/* Inner graphic character / monogram */}
            <path
              d="M28 32H46L60 56L74 32H92L68 70V92H52V70L28 32Z"
              fill={logoAccent}
            />
            {/* Expressive eyes inside the Y stamp */}
            <circle cx="45" cy="26" r="4" fill="#f1eec0" />
            <circle cx="75" cy="26" r="4" fill="#f1eec0" />
            {/* Stamp corner star */}
            <circle cx="86" cy="82" r="8" fill="#ea4530" />
            <text
              x="22"
              y="104"
              fill="#f1eec0"
              fontSize="9"
              fontWeight="800"
              letterSpacing="1.5"
              className="font-ui uppercase opacity-60"
            >
              YDP.26
            </text>
          </svg>
        </button>

        {/* Top-Center: EN / ID Toggle + Personal/Agency Mode Pill */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[clamp(16px,2.2vw,28px)] pointer-events-none flex flex-col items-center gap-1.5">
          <div className="pointer-events-auto flex items-center gap-3 bg-[#0a0a0a]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#f1eec0]/15">
            {/* Language Toggle */}
            <div className="flex items-center text-[clamp(11px,1.4vw,13px)] tracking-[0.06em] font-ui">
              <button
                type="button"
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
                className={`px-1 font-bold uppercase transition-opacity cursor-pointer ${
                  lang === "en" ? "opacity-100 text-[#f1eec0]" : "opacity-35 hover:opacity-70"
                }`}
              >
                EN
              </button>
              <span aria-hidden="true" className="opacity-30 mx-0.5">
                /
              </span>
              <button
                type="button"
                onClick={() => setLang("id")}
                aria-pressed={lang === "id"}
                className={`px-1 font-bold uppercase transition-opacity cursor-pointer ${
                  lang === "id" ? "opacity-100 text-[#f1eec0]" : "opacity-35 hover:opacity-70"
                }`}
              >
                ID
              </button>
            </div>

            <span className="h-3 w-[1px] bg-[#f1eec0]/20" />

            {/* Mode Switcher: Personal Portfolio vs Creative Agency */}
            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] uppercase tracking-[0.08em] font-semibold">
              <button
                type="button"
                onClick={() => setMode("personal")}
                className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                  mode === "personal"
                    ? "bg-[#3aa1d8] text-black font-bold"
                    : "text-[#f1eec0]/50 hover:text-[#f1eec0]"
                }`}
              >
                {lang === "en" ? "Personal" : "Pribadi"}
              </button>
              <button
                type="button"
                onClick={() => setMode("agency")}
                className={`px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                  mode === "agency"
                    ? "bg-[#ea4530] text-[#f1eec0] font-bold"
                    : "text-[#f1eec0]/50 hover:text-[#f1eec0]"
                }`}
              >
                {lang === "en" ? "Agency" : "Agensi"}
              </button>
            </div>
          </div>
        </div>

        {/* Top-Right: work / karya */}
        <button
          type="button"
          onClick={() => {
            setActivePage("work");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          data-active={activePage === "work"}
          className="nav-link pointer-events-auto py-1 text-[clamp(20px,3.5vw,28px)] font-bold transition-colors duration-200 font-ui text-[#f1eec0] cursor-pointer"
        >
          {lang === "en" ? "work" : "karya"}
        </button>
      </nav>

      {/* Bottom Bar: about (Left) & studio/formula (Right) */}
      <nav
        aria-label="Secondary"
        className="fixed left-0 right-0 bottom-0 z-50 flex items-end justify-between px-[clamp(17px,2.9vw,34px)] py-[clamp(12px,1.7vw,22px)] pointer-events-none"
      >
        <button
          type="button"
          onClick={() => {
            setActivePage("about");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          data-active={activePage === "about"}
          className="nav-link pointer-events-auto py-1 text-[clamp(20px,3.5vw,28px)] font-bold transition-colors duration-200 font-ui text-[#f1eec0] cursor-pointer"
        >
          {lang === "en" ? "about" : "tentang"}
        </button>

        <button
          type="button"
          onClick={() => {
            setActivePage("studio");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          data-active={activePage === "studio"}
          className="nav-link pointer-events-auto py-1 text-[clamp(20px,3.5vw,28px)] font-bold transition-colors duration-200 font-ui text-[#ea4530] cursor-pointer"
        >
          studio
        </button>
      </nav>
    </header>
  );
}

