import React, { useEffect } from "react";
import ProjectVisualCard from "./ProjectVisuals";

export default function CaseStudyModal({ project, lang, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-[120] bg-[#0a0a0a]/95 backdrop-blur-xl overflow-y-auto animate-fadeIn"
    >
      <div className="min-h-full px-[clamp(18px,4vw,44px)] py-[clamp(24px,4vh,48px)] max-w-7xl mx-auto flex flex-col justify-between">
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#f1eec0]/15">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#ea4530]" />
            <span className="text-xs text-[#f1eec0]/60 font-semibold">
              {project.year} — {project.client}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold rounded-full px-4 py-2 bg-[#f1eec0] text-[#0a0a0a] hover:bg-[#ea4530] hover:text-[#f1eec0] transition-colors cursor-pointer lowercase"
          >
            {lang === "en" ? "close [esc] ✕" : "tutup [esc] ✕"}
          </button>
        </div>

        {/* Main Content */}
        <div className="py-10 space-y-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs rounded-full px-3 py-1 font-semibold border border-[#f1eec0]/25 text-[#f1eec0]"
              >
                {tag[lang]}
              </span>
            ))}
          </div>

          {/* Massive Title */}
          <h2 className="font-stamp text-[clamp(42px,7vw,92px)] leading-[0.98] lowercase text-[#f1eec0]">
            {project.title}
          </h2>

          {/* "Built Around a Single Idea" Callout Box */}
          <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 p-6 sm:p-8 rounded-xl border border-[#f1eec0]/15 bg-[#121212]">
            <div>
              <p className="text-xs text-[#ea4530] font-bold mb-2 lowercase">
                {lang === "en" ? "* the single idea" : "* satu ide tunggal"}
              </p>
              <p className="font-accent-serif italic text-2xl sm:text-3xl text-[#f1eec0] leading-snug">
                “{project.singleIdea[lang]}”
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-sm sm:text-base text-[#f1eec0]/85 leading-relaxed">
                {project.summary[lang]}
              </p>
              {/* Metrics Row */}
              {project.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  {project.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-[#0a0a0a] border border-[#f1eec0]/10"
                    >
                      <div className="text-[11px] text-[#f1eec0]/50">
                        {m.label}
                      </div>
                      <div className="text-lg font-bold text-[#3aa1d8] mt-0.5">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Visual Artboards Grid */}
          <div>
            <p className="text-xs text-[#f1eec0]/45 mb-4 lowercase">
              {lang === "en"
                ? "project artifacts & system breakdown"
                : "artefak proyek & rincian sistem"}
            </p>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {project.slides.map((slide, idx) => (
                <ProjectVisualCard
                  key={idx}
                  slide={slide}
                  project={project}
                  index={idx}
                  onOpenCase={() => {}}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-6 border-t border-[#f1eec0]/15 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-[#f1eec0]/60">
            {lang === "en"
              ? "Want to discuss this banking / enterprise case study in detail?"
              : "Ingin mendiskusikan studi kasus perbankan / sistem ini lebih lanjut?"}
          </p>
          <div className="flex items-center gap-3">
            {project.liveUrl && project.liveUrl.startsWith("http") && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold rounded-full px-4 py-2 bg-[#3aa1d8] text-[#0a0a0a] hover:bg-[#f1eec0] transition-colors lowercase"
              >
                {lang === "en" ? "view repository ↗" : "lihat repository ↗"}
              </a>
            )}
            <a
              href="mailto:yudadwiputra@gmail.com"
              className="text-xs font-bold rounded-full px-4 py-2 bg-[#ea4530] text-[#f1eec0] hover:bg-[#f1eec0] hover:text-[#0a0a0a] transition-colors lowercase"
            >
              {lang === "en" ? "start a conversation ↗" : "mulai diskusi ↗"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
