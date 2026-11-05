import React from "react";

// Two-layer curtain for page changes:
//  cover  → red panel sweeps up from the bottom, a dark panel with the
//           destination name follows right behind it
//  reveal → both keep travelling up and off the top (dark first, red last)
//  idle   → panels snap back below the fold without animating
export const CURTAIN_COVER_MS = 620;
export const CURTAIN_REVEAL_MS = 760;

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

const LABELS = {
  home: { en: "home", id: "beranda" },
  work: { en: "work", id: "karya" },
  about: { en: "about", id: "tentang" },
  studio: { en: "studio", id: "studio" },
  contact: { en: "contact", id: "kontak" },
};
const ORDER = ["home", "work", "about", "studio", "contact"];

function panelStyle(phase, coverDelay, revealDelay) {
  if (phase === "cover") {
    return {
      transform: "translate3d(0, 0, 0)",
      transition: `transform ${CURTAIN_COVER_MS - coverDelay}ms ${EASE} ${coverDelay}ms`,
    };
  }
  if (phase === "reveal") {
    return {
      transform: "translate3d(0, -100%, 0)",
      transition: `transform ${CURTAIN_REVEAL_MS - revealDelay}ms ${EASE} ${revealDelay}ms`,
    };
  }
  return { transform: "translate3d(0, 100%, 0)", transition: "none" };
}

export default function PageCurtain({ phase, page, lang }) {
  const label = (LABELS[page] || LABELS.home)[lang] || page;
  const index = Math.max(0, ORDER.indexOf(page)) + 1;
  const active = phase !== "idle";

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[150] overflow-hidden ${
        phase === "cover" ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{ visibility: active ? "visible" : "hidden" }}
    >
      {/* Red lead panel */}
      <div
        className="absolute inset-0 bg-[#ea4530] will-change-transform"
        style={panelStyle(phase, 0, 140)}
      />

      {/* Dark panel carrying the destination label */}
      <div
        className="absolute inset-0 bg-[#0d0d0d] will-change-transform flex flex-col justify-between px-[clamp(20px,5vw,96px)] py-[clamp(28px,6vh,64px)]"
        style={panelStyle(phase, 110, 0)}
      >
        {/* Rounded top edge peeking over the red panel while moving */}
        <span className="absolute left-0 right-0 -top-[1px] h-6 bg-[#0d0d0d] rounded-t-[28px] -translate-y-full" />

        <div className="flex items-center justify-between text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#f1eec0]/45">
          <span>yuda dwi putra</span>
          <span>
            {String(index).padStart(2, "0")} / {String(ORDER.length).padStart(2, "0")}
          </span>
        </div>

        <div
          className="font-stamp lowercase leading-[0.9] text-[clamp(72px,17vw,240px)] text-[#f1eec0] flex items-baseline gap-[0.12em]"
          style={{
            transform: phase === "cover" ? "translateY(0)" : "translateY(40%)",
            opacity: phase === "cover" ? 1 : 0,
            transition:
              phase === "cover"
                ? `transform 700ms ${EASE} 180ms, opacity 400ms ease 180ms`
                : `transform 500ms ${EASE}, opacity 260ms ease`,
          }}
        >
          <span>{label}</span>
          <span className="text-[#ea4530] translate-y-[0.08em]">*</span>
        </div>

        <div className="h-[3px] w-full bg-[#f1eec0]/10 overflow-hidden rounded-full">
          <div
            className="h-full bg-[#3aa1d8] origin-left"
            style={{
              transform: phase === "cover" ? "scaleX(1)" : "scaleX(0)",
              transition:
                phase === "cover" ? `transform ${CURTAIN_COVER_MS}ms ${EASE}` : "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}
