import React, { useEffect, useRef, useState } from "react";

export default function FrameNav({
  lang,
  setLang,
  activePage,
  setActivePage,
}) {
  const [logoAccent, setLogoAccent] = useState("#3aa1d8");
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const logoRef = useRef(null);

  const cycleLogoColor = () => {
    const colors = ["#3aa1d8", "#ea4530", "#f1eec0"];
    const next = colors[(colors.indexOf(logoAccent) + 1) % colors.length];
    setLogoAccent(next);
  };

  // Interactive Eye Tracking: pupils look towards the cursor anywhere on screen
  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!logoRef.current) return;
      const rect = logoRef.current.getBoundingClientRect();
      const logoCenterX = rect.left + rect.width / 2;
      const logoCenterY = rect.top + rect.height / 2;

      const dx = e.clientX - logoCenterX;
      const dy = e.clientY - logoCenterY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(2.4, Math.hypot(dx, dy) / 45);

      setPupil({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  // Periodic natural eye blink every 4.5 seconds
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, 4500);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <header>
      {/* Top Bar: Logo Mark with animated looking eyes (Left), EN/ID (Center), work (Right) */}
      <nav
        aria-label="Primary"
        className="fixed left-0 right-0 top-0 z-50 flex items-start justify-between px-[clamp(17px,2.9vw,34px)] py-[clamp(12px,1.7vw,22px)] pointer-events-none bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent pb-8"
      >
        {/* Top-Left Brand Poster Mark with interactive living eyes */}
        <button
          ref={logoRef}
          type="button"
          onClick={() => {
            setActivePage("home");
            cycleLogoColor();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onMouseEnter={cycleLogoColor}
          title="Yuda Dwi Putra — Home (Eyes follow your cursor!)"
          className="-mt-[clamp(2px,0.6vw,7px)] -ml-[clamp(2px,0.7vw,10px)] group relative block w-[56px] h-[56px] sm:w-[78px] sm:h-[78px] text-left focus:outline-none pointer-events-auto cursor-pointer"
        >
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full overflow-visible transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
          >
            {/* Outer rounded badge */}
            <rect
              x="10"
              y="10"
              width="100"
              height="100"
              rx="22"
              fill="#0a0a0a"
              stroke={logoAccent}
              strokeWidth="5"
            />

            {/* Inner Y Monogram */}
            <path
              d="M28 28H46L60 56L74 28H92L68 72V94H52V72L28 28Z"
              fill={logoAccent}
            />

            {/* Living Interactive Eyes (Follow cursor + natural blinks) */}
            {isBlinking ? (
              <>
                {/* Left eye blinking slit */}
                <line
                  x1="40"
                  y1="22"
                  x2="50"
                  y2="22"
                  stroke="#f1eec0"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                {/* Right eye blinking slit */}
                <line
                  x1="70"
                  y1="22"
                  x2="80"
                  y2="22"
                  stroke="#f1eec0"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                {/* Left Eyeball */}
                <circle cx="45" cy="22" r="5.2" fill="#f1eec0" />
                {/* Left Pupil (Tracks cursor) */}
                <circle
                  cx={45 + pupil.x}
                  cy={22 + pupil.y}
                  r="2.5"
                  fill="#0a0a0a"
                />
                {/* Left Catchlight */}
                <circle
                  cx={45 + pupil.x - 0.8}
                  cy={22 + pupil.y - 0.8}
                  r="0.8"
                  fill="#ffffff"
                />

                {/* Right Eyeball */}
                <circle cx="75" cy="22" r="5.2" fill="#f1eec0" />
                {/* Right Pupil (Tracks cursor) */}
                <circle
                  cx={75 + pupil.x}
                  cy={22 + pupil.y}
                  r="2.5"
                  fill="#0a0a0a"
                />
                {/* Right Catchlight */}
                <circle
                  cx={75 + pupil.x - 0.8}
                  cy={22 + pupil.y - 0.8}
                  r="0.8"
                  fill="#ffffff"
                />
              </>
            )}
          </svg>
        </button>

        {/* Top-Center: EN / ID Toggle (Exact Kenji center placement) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[clamp(16px,2.2vw,28px)] pointer-events-auto flex items-center text-[clamp(13px,1.4vw,15px)] font-bold tracking-[0.08em] font-ui">
          <button
            type="button"
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
            className={`px-1.5 py-0.5 font-bold uppercase transition-opacity cursor-pointer ${
              lang === "en"
                ? "opacity-100 text-[#f1eec0]"
                : "opacity-35 hover:opacity-70 text-[#f1eec0]"
            }`}
          >
            EN
          </button>
          <span aria-hidden="true" className="opacity-30 mx-0.5 text-[#f1eec0]">
            /
          </span>
          <button
            type="button"
            onClick={() => setLang("id")}
            aria-pressed={lang === "id"}
            className={`px-1.5 py-0.5 font-bold uppercase transition-opacity cursor-pointer ${
              lang === "id"
                ? "opacity-100 text-[#f1eec0]"
                : "opacity-35 hover:opacity-70 text-[#f1eec0]"
            }`}
          >
            ID
          </button>
        </div>

        {/* Top-Right: work / karya (lowercase matching screenshot) */}
        <button
          type="button"
          onClick={() => {
            setActivePage("work");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          data-active={activePage === "work"}
          className="nav-link pointer-events-auto py-1 text-[clamp(20px,3.5vw,28px)] font-bold transition-colors duration-200 font-ui text-[#f1eec0] cursor-pointer lowercase"
        >
          {lang === "en" ? "work" : "karya"}
        </button>
      </nav>

      {/* Bottom Bar: about (Left) & studio (Right) */}
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
          className="nav-link pointer-events-auto py-1 text-[clamp(20px,3.5vw,28px)] font-bold transition-colors duration-200 font-ui text-[#f1eec0] cursor-pointer lowercase"
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
          className="nav-link pointer-events-auto py-1 text-[clamp(20px,3.5vw,28px)] font-bold transition-colors duration-200 font-ui text-[#ea4530] cursor-pointer lowercase"
        >
          studio
        </button>
      </nav>
    </header>
  );
}
