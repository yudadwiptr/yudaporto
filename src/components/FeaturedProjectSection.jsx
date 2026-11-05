import React, { useRef, useState } from "react";
import ProjectVisualCard from "./ProjectVisuals";

export default function FeaturedProjectSection({
  project,
  lang,
  onOpenCase,
}) {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.4;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const getTagToneClasses = (tone) => {
    if (tone === "cream") return "bg-[#f1eec0] text-[#0a0a0a]";
    if (tone === "blue") return "bg-[#3aa1d8] text-[#0a0a0a]";
    return "bg-[#ea4530] text-[#f1eec0]";
  };

  return (
    <section
      aria-label={project.title}
      className="relative py-[clamp(36px,6vh,72px)] border-t border-[#f1eec0]/10"
    >
      {/* Top 3-Column Header matching Kenji Lambert's exact grid */}
      <div className="px-[clamp(18px,4vw,40px)] pb-[clamp(18px,3vh,32px)]">
        {/* Category Pills + Desktop "see full case ↗" */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-[clamp(12px,2vh,22px)]">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className={`text-[11px] sm:text-xs tracking-tight rounded-full px-3 py-1 font-semibold ${getTagToneClasses(
                  tag.tone
                )}`}
              >
                {tag[lang]}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onOpenCase(project)}
            className="hidden md:inline-flex text-xs font-semibold tracking-tight bg-[#f1eec0] text-[#0a0a0a] rounded-full px-4 py-2 hover:bg-[#ea4530] hover:text-[#f1eec0] transition-colors shrink-0 cursor-pointer lowercase"
          >
            {lang === "en" ? "see full case ↗" : "lihat studi kasus ↗"}
          </button>
        </div>

        {/* 3-Column Grid: Title (1.55fr) | Year & Client (auto) | Single-Idea Copy (1.15fr) */}
        <div className="grid md:grid-cols-[1.55fr_auto_1.15fr] gap-x-[clamp(20px,3vw,44px)] gap-y-3 items-start">
          <h3 className="text-[clamp(28px,4.8vw,56px)] leading-[1.02] tracking-[-0.02em] mb-2 md:mb-0 text-balance">
            <button
              type="button"
              onClick={() => onOpenCase(project)}
              className="text-left hover:text-[#ea4530] transition-colors cursor-pointer"
            >
              <strong className="font-black">{project.title}</strong>
            </button>
          </h3>

          {/* Mobile CTA */}
          <button
            type="button"
            onClick={() => onOpenCase(project)}
            className="md:hidden inline-flex w-fit mb-2 text-xs font-semibold bg-[#ea4530] text-[#f1eec0] rounded-full px-3.5 py-2 cursor-pointer lowercase"
          >
            {lang === "en" ? "see full case ↗" : "lihat studi kasus ↗"}
          </button>

          {/* Year & Client */}
          <div className="text-xs text-[#f1eec0]/50 leading-[1.5] md:min-w-[130px] md:pt-[0.5em]">
            <div className="text-[#f1eec0]/80 font-semibold">{project.year}</div>
            <div>{project.client}</div>
          </div>

          {/* 1-2 Sentence "Built Around a Single Idea" Description */}
          <div className="md:pt-[0.5em]">
            <p className="text-[13px] sm:text-sm text-[#f1eec0]/85 leading-[1.55]">
              {project.summary[lang]}
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal Draggable Visual Cards Strip */}
      <div
        ref={scrollRef}
        data-cursor="drag"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        className={`overflow-x-auto no-scrollbar px-[clamp(18px,4vw,40px)] pb-4 select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div className="flex gap-3.5 w-max">
          {project.slides.map((slide, idx) => (
            <ProjectVisualCard
              key={idx}
              slide={slide}
              project={project}
              index={idx}
              onOpenCase={onOpenCase}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
