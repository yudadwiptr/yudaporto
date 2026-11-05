import React from "react";

export default function ProjectVisualCard({ slide, project, index, onOpenCase }) {
  const accent = slide.accent || project.themeColor || "#ea4530";
  const isLightCard = index % 4 === 2;

  return (
    <div
      onClick={() => onOpenCase(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpenCase(project)}
      className={`group relative h-[320px] sm:h-[400px] md:h-[440px] aspect-[4/5] rounded-md shrink-0 overflow-hidden select-none cursor-pointer transition-transform duration-500 hover:scale-[0.985] border ${
        isLightCard
          ? "bg-[#f1eec0] text-[#0a0a0a] border-[#f1eec0]/30"
          : "bg-[#121212] text-[#f1eec0] border-white/10"
      }`}
    >
      {/* Subtle architectural grid & ambient glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at ${
            index % 2 === 0 ? "80% 20%" : "20% 80%"
          }, ${accent}, transparent 65%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Card Inner Layout */}
      <div className="relative z-10 h-full w-full p-5 sm:p-6 flex flex-col justify-between">
        {/* Top Meta Strip */}
        <div className="flex items-center justify-between gap-2 text-[10px] uppercase tracking-[0.14em] font-semibold opacity-75">
          <span>{slide.kicker}</span>
          <span
            className="px-2 py-0.5 rounded-full text-[9px] font-bold"
            style={{
              backgroundColor: accent,
              color: accent === "#f1eec0" || accent === "#3aa1d8" ? "#0a0a0a" : "#f1eec0",
            }}
          >
            {project.year}
          </span>
        </div>

        {/* Center Visual Artifact based on slide.type */}
        <div className="my-auto py-4 flex items-center justify-center">
          {slide.type === "poster-hero" && (
            <div className="w-full space-y-3">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                <span className="text-[11px] uppercase tracking-widest opacity-60 font-mono">
                  {project.client}
                </span>
              </div>
              <div className="font-stamp text-[clamp(36px,4.5vw,54px)] leading-[0.94] uppercase tracking-tight break-words">
                {slide.headline}
              </div>
              {/* Abstract geometric poster graphic */}
              <div className="pt-3 flex items-center gap-2">
                <div
                  className="h-12 flex-1 rounded-sm flex items-center justify-between px-3"
                  style={{ backgroundColor: accent, color: "#0a0a0a" }}
                >
                  <span className="font-stamp text-sm tracking-wider uppercase">
                    CRAFT // 0{index + 1}
                  </span>
                  <span className="text-lg font-bold">↗</span>
                </div>
                <div className="h-12 w-12 rounded-full border-2 border-current flex items-center justify-center font-stamp text-sm">
                  *
                </div>
              </div>
            </div>
          )}

          {slide.type === "ui-flow" && (
            <div className="w-full space-y-2.5">
              {/* Mockup Window Frame */}
              <div className="rounded-lg border border-current/20 bg-black/40 p-3.5 backdrop-blur-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ea4530]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f1eec0]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3aa1d8]" />
                  </div>
                  <span className="text-[9px] font-mono uppercase opacity-60">
                    LIVE_SYSTEM.TSX
                  </span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-2 w-2/3 rounded bg-current/20" />
                  <div
                    className="h-8 w-full rounded flex items-center justify-between px-2.5 text-[11px] font-bold"
                    style={{ backgroundColor: accent, color: "#0a0a0a" }}
                  >
                    <span>{slide.headline}</span>
                    <span>100%</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <div className="h-12 rounded bg-current/10 border border-current/15 flex flex-col justify-end p-1.5">
                    <span className="text-[8px] opacity-60">STEP 01</span>
                    <span className="text-[10px] font-bold">INPUT</span>
                  </div>
                  <div className="h-12 rounded bg-current/10 border border-current/15 flex flex-col justify-end p-1.5">
                    <span className="text-[8px] opacity-60">STEP 02</span>
                    <span className="text-[10px] font-bold">ENGINE</span>
                  </div>
                  <div
                    className="h-12 rounded flex flex-col justify-end p-1.5"
                    style={{ backgroundColor: "#ea4530", color: "#f1eec0" }}
                  >
                    <span className="text-[8px] opacity-80">STEP 03</span>
                    <span className="text-[10px] font-bold">INSTANT</span>
                  </div>
                </div>
              </div>
              <div className="font-stamp text-2xl uppercase tracking-tight pt-1">
                {slide.headline}
              </div>
            </div>
          )}

          {slide.type === "type-specimen" && (
            <div className="w-full space-y-3">
              <div className="flex items-baseline justify-between border-b border-current/20 pb-2">
                <span className="font-stamp text-5xl sm:text-6xl leading-none">
                  Aa
                </span>
                <span className="font-accent-serif italic text-3xl sm:text-4xl opacity-85">
                  (craft)
                </span>
              </div>
              <div className="font-stamp text-[clamp(28px,3.6vw,42px)] leading-[0.96] uppercase">
                {slide.headline}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] uppercase px-2 py-0.5 rounded border border-current/30">
                  ANTON 400
                </span>
                <span className="text-[10px] uppercase px-2 py-0.5 rounded border border-current/30">
                  INSTRUMENT SERIF
                </span>
              </div>
            </div>
          )}

          {(slide.type === "metrics-card" ||
            slide.type === "grid-system" ||
            slide.type === "token-matrix") && (
            <div className="w-full space-y-3">
              <div
                className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: accent, color: "#0a0a0a" }}
              >
                VERIFIED BENCHMARK
              </div>
              <div className="font-stamp text-[clamp(36px,4.5vw,56px)] leading-[0.92] uppercase">
                {slide.headline}
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {(project.metrics || []).slice(0, 2).map((m, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded border border-current/20 bg-current/[0.04]"
                  >
                    <div className="text-[9px] uppercase opacity-60">
                      {m.label}
                    </div>
                    <div className="text-sm font-bold mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Caption */}
        <div className="pt-3 border-t border-current/15 flex items-end justify-between gap-3">
          <p className="text-xs leading-snug opacity-80 line-clamp-2">
            {slide.sub}
          </p>
          <span className="text-xs font-bold uppercase tracking-wider shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
            ↗
          </span>
        </div>
      </div>
    </div>
  );
}

