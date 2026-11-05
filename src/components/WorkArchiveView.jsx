import React, { useState } from "react";
import FeaturedProjectSection from "./FeaturedProjectSection";

export default function WorkArchiveView({ projects, lang, onOpenCase }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    "all",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const filtered =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="pt-[calc(var(--nav-top)+24px)] pb-16">
      {/* Giant work * Marquee (lowercase matching Kenji original) */}
      <div
        className="overflow-hidden whitespace-nowrap select-none py-2 border-b border-[#f1eec0]/10"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="flex animate-marquee text-[clamp(48px,11vw,144px)] tracking-tight lowercase font-stamp leading-[1.04]">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className="flex items-center gap-[clamp(14px,1.85vw,26px)] shrink-0 pr-[clamp(14px,1.85vw,26px)]"
            >
              <span>{lang === "en" ? "work" : "karya"}</span>
              <span className="text-[#3aa1d8] translate-y-[0.12em]">*</span>
            </span>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="px-[clamp(18px,4vw,40px)] py-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors cursor-pointer lowercase ${
                selectedCategory === cat
                  ? "bg-[#ea4530] text-[#f1eec0]"
                  : "bg-[#f1eec0]/10 text-[#f1eec0]/70 hover:bg-[#f1eec0]/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-xs text-[#f1eec0]/45 lowercase">
          {filtered.length} {lang === "en" ? "selected works" : "proyek pilihan"}
        </span>
      </div>

      {/* Render All Filtered Works */}
      <div>
        {filtered.map((project) => (
          <FeaturedProjectSection
            key={project.id}
            project={project}
            lang={lang}
            onOpenCase={onOpenCase}
          />
        ))}
      </div>
    </div>
  );
}
