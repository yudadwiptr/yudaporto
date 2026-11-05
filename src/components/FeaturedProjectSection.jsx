import React from "react";
import ProjectVisualCard from "./ProjectVisuals";
import { ArrowUpRight, CheckIcon } from "./Icons";

const TAG_TONES = {
  cream: "bg-[#f1eec0] text-[#0a0a0a]",
  blue: "bg-[#3aa1d8] text-[#0a0a0a]",
  red: "bg-[#ea4530] text-[#f1eec0]",
};

// Screenshot in a browser-style (or plain) frame
export function ShotFrame({ shot, label, className = "", sizes = "(min-width: 1024px) 56vw, 100vw", eager = false }) {
  const browser = shot.frame !== "plain";
  return (
    <div
      className={`rounded-xl sm:rounded-2xl overflow-hidden border border-[#f1eec0]/12 bg-[#141414] shadow-[0_24px_60px_rgba(0,0,0,0.65)] ${className}`}
    >
      {browser && (
        <div className="flex items-center gap-3 h-7 sm:h-9 px-3 sm:px-4 bg-[#0d0d0d] border-b border-[#f1eec0]/10">
          <span className="flex gap-1.5 shrink-0">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#27c93f]" />
          </span>
          {label && (
            <span className="mx-auto max-w-[60%] truncate rounded-full bg-[#1a1a1a] px-3 py-0.5 text-[9px] sm:text-[10px] font-mono text-[#f1eec0]/45">
              {label}
            </span>
          )}
        </div>
      )}
      <div className={`overflow-hidden ${browser ? "aspect-[16/9]" : "aspect-[4/3] bg-white"}`}>
        <img
          src={shot.sm || shot.src}
          srcSet={shot.sm ? `${shot.sm} 820w, ${shot.src} 1600w` : undefined}
          sizes={sizes}
          alt={shot.alt || ""}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={`w-full h-full ${browser ? "object-cover object-top" : "object-cover object-center"} transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
        />
      </div>
    </div>
  );
}

export default function FeaturedProjectSection({ project, lang, onOpenCase, index = 0, total = 1 }) {
  const reverse = index % 2 === 1;
  const gallery = project.gallery || [];
  const [main, second] = gallery;
  const shortName = project.title.split(/[—(:]/)[0].trim();
  const open = () => onOpenCase(project);

  return (
    <section
      aria-label={project.title}
      className="relative py-[clamp(56px,10vh,120px)] border-t border-[#f1eec0]/10"
    >
      <div className="px-[clamp(18px,4vw,40px)] grid lg:grid-cols-12 gap-y-10 lg:gap-x-14 items-center">
        {/* ---------- Text ---------- */}
        <div className={`lg:col-span-5 min-w-0 ${reverse ? "lg:order-2" : ""}`}>
          <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.18em]">
            <span className="text-[#ea4530] font-bold">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span className="h-px w-10 bg-[#f1eec0]/20" />
            <span className="text-[#f1eec0]/50 truncate">{project.category}</span>
          </div>

          <h3 className="mt-4 font-stamp lowercase text-[clamp(36px,4.4vw,64px)] leading-[0.96] text-balance">
            <button
              type="button"
              onClick={open}
              className="text-left lowercase text-[#f1eec0] hover:text-[#ea4530] transition-colors cursor-pointer"
            >
              {project.title}
            </button>
          </h3>

          <p className="mt-3 text-sm text-[#f1eec0]/55">
            {project.client} <span className="text-[#f1eec0]/25">·</span> {project.year}
          </p>

          <p className="mt-5 text-[15px] sm:text-base text-[#f1eec0]/75 leading-relaxed line-clamp-5">
            {project.summary[lang]}
          </p>

          {project.highlights?.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {project.highlights.slice(0, 4).map((h, i) => (
                <li key={i} className="flex items-start gap-3 text-[14px] leading-snug text-[#f1eec0]/80">
                  <span
                    className="mt-[1px] w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[11px]"
                    style={{ backgroundColor: `${project.themeColor || "#ea4530"}26`, color: project.themeColor || "#ea4530" }}
                  >
                    <CheckIcon />
                  </span>
                  <span>{h[lang]}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className={`text-[11px] sm:text-xs tracking-tight rounded-full px-3 py-1 font-semibold ${TAG_TONES[tag.tone] || TAG_TONES.red}`}
              >
                {tag[lang]}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={open}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ea4530] text-[#f1eec0] px-5 py-3 text-sm font-bold lowercase hover:bg-[#f1eec0] hover:text-[#0a0a0a] transition-colors cursor-pointer"
          >
            <span>{lang === "en" ? "see full case" : "lihat studi kasus"}</span>
            <ArrowUpRight />
          </button>
        </div>

        {/* ---------- Showcase ---------- */}
        <div className={`lg:col-span-7 min-w-0 ${reverse ? "lg:order-1" : ""}`}>
          {main ? (
            <button
              type="button"
              onClick={open}
              aria-label={`${project.title} — ${lang === "en" ? "open case study" : "buka studi kasus"}`}
              className={`group relative block w-full text-left cursor-pointer ${second ? "pb-[16%]" : ""}`}
            >
              <ShotFrame
                shot={main}
                label={shortName}
                className={second ? (reverse ? "w-[88%] ml-auto" : "w-[88%]") : ""}
              />
              {second && (
                <ShotFrame
                  shot={second}
                  label={shortName}
                  sizes="(min-width: 1024px) 28vw, 55vw"
                  className={`absolute bottom-0 w-[52%] ring-4 ring-[#0a0a0a] ${reverse ? "left-0" : "right-0"}`}
                />
              )}
            </button>
          ) : (
            project.slides?.[0] && (
              <div className="flex justify-center">
                <ProjectVisualCard slide={project.slides[0]} project={project} index={index} onOpenCase={onOpenCase} />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
