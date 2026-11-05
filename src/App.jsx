import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import FrameNav from "./components/FrameNav";
import IdCardLanyard from "./components/IdCardLanyard";
import SoftwareIcon from "./components/SoftwareIcon";
import FeaturedProjectSection from "./components/FeaturedProjectSection";
import CaseStudyModal from "./components/CaseStudyModal";
import FooterSection from "./components/FooterSection";
import AboutView from "./components/AboutView";
import WorkArchiveView from "./components/WorkArchiveView";
import StudioLabView from "./components/StudioLabView";
import ContactView from "./components/ContactView";
import { ArrowUpRight, ArrowRight } from "./components/Icons";
import {
  HERO_PRESETS,
  CLIENT_MARQUEE,
  PROJECTS_PERSONAL,
  PROJECTS_AGENCY,
} from "./data/portfolioData";

// ---------- Path routing: / , /work , /about , /studio , /contact , /work/<caseId> ----------
// Vercel rewrites every non-file path to index.html (see vercel.json).
const PAGES = ["home", "work", "about", "studio", "contact"];
const PAGE_LEAVE_MS = 220;
const ALL_PROJECTS = [...PROJECTS_PERSONAL, ...PROJECTS_AGENCY];

const PAGE_TITLES = {
  home: "Yuda Dwi Putra — System & Business Analyst | Core Banking & Treasury",
  work: "Work — Yuda Dwi Putra",
  about: "About — Yuda Dwi Putra",
  studio: "Yuma Studio — Yuda Dwi Putra",
  contact: "Contact — Yuda Dwi Putra",
};

const pagePath = (page) => (page === "home" || !PAGES.includes(page) ? "/" : `/${page}`);
const casePath = (id) => `/work/${encodeURIComponent(id)}`;

function splitPath(raw) {
  return raw
    .split("/")
    .filter(Boolean)
    .map((s) => {
      try {
        return decodeURIComponent(s);
      } catch {
        return s;
      }
    });
}

function routeFromSegments([seg0 = "", seg1 = ""], bgPage) {
  if (seg0 === "work" && ALL_PROJECTS.some((p) => p.id === seg1)) {
    // Case study: keep the page it was opened from underneath, if we know it
    return { page: PAGES.includes(bgPage) ? bgPage : "work", caseId: seg1 };
  }
  // Old hash links used "#/home/<id>" or "#/about/<id>" for cases
  if (ALL_PROJECTS.some((p) => p.id === seg1)) {
    return { page: PAGES.includes(seg0) ? seg0 : "home", caseId: seg1 };
  }
  return { page: PAGES.includes(seg0) ? seg0 : "home", caseId: null };
}

function readLocation() {
  return routeFromSegments(splitPath(window.location.pathname), window.history.state?.bg);
}

// One-time upgrade of legacy hash URLs (#/about, #about, #/work/<id>) to clean paths
function upgradeLegacyHash() {
  const hash = window.location.hash;
  if (!hash || !/^#\/?[a-z]/i.test(hash)) return;
  const route = routeFromSegments(splitPath(hash.replace(/^#\/?/, "")));
  const url = route.caseId ? casePath(route.caseId) : pagePath(route.page);
  window.history.replaceState(route.caseId ? { bg: route.page } : null, "", url);
}

const storage = {
  get(store, key) {
    try {
      return window[store].getItem(key);
    } catch {
      return null;
    }
  },
  set(store, key, value) {
    try {
      window[store].setItem(key, value);
    } catch {
      /* storage unavailable (private mode) — ignore */
    }
  },
};

export default function App() {
  const [lang, setLangState] = useState(() =>
    storage.get("localStorage", "ydp:lang") === "id" ? "id" : "en"
  );
  const [mode, setMode] = useState("personal"); // "personal" | "agency"
  const [presetIndex, setPresetIndex] = useState(2);
  const [route, setRoute] = useState(() => {
    upgradeLegacyHash();
    return readLocation();
  });
  // The page actually rendered. On navigation the old page fades out briefly,
  // then the new one is swapped in (scrolled to top) and fades up.
  const [shownPage, setShownPage] = useState(route.page);
  const [leaving, setLeaving] = useState(false);
  const activePage = shownPage;

  useEffect(() => {
    if (route.page === shownPage) return undefined;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShownPage(route.page);
      return undefined;
    }
    setLeaving(true);
    const t = setTimeout(() => {
      setShownPage(route.page);
      setLeaving(false);
    }, PAGE_LEAVE_MS);
    return () => clearTimeout(t);
  }, [route.page, shownPage]);

  // Preloader plays once per browser session
  const [isLoading, setIsLoading] = useState(
    () => storage.get("sessionStorage", "ydp:intro") !== "1"
  );
  const finishIntro = useCallback(() => {
    setIsLoading(false);
    storage.set("sessionStorage", "ydp:intro", "1");
  }, []);

  const setLang = useCallback((next) => {
    setLangState(next);
    storage.set("localStorage", "ydp:lang", next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Keep route in sync with the address bar (back / forward)
  useEffect(() => {
    const onPop = () => setRoute(readLocation());
    // An old "#/about"-style link opened inside an already-loaded tab
    const onHash = () => {
      upgradeLegacyHash();
      setRoute(readLocation());
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  // New page → start at the top, update the tab title
  const firstPageRef = useRef(true);
  useEffect(() => {
    if (firstPageRef.current) {
      firstPageRef.current = false;
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    document.title = PAGE_TITLES[activePage] || PAGE_TITLES.home;
  }, [activePage]);

  const go = useCallback((url, state = null, replace = false) => {
    if (replace) window.history.replaceState(state, "", url);
    else window.history.pushState(state, "", url);
    setRoute(readLocation());
  }, []);

  const setActivePage = useCallback(
    (page) => {
      const target = pagePath(page);
      if (window.location.pathname !== target) go(target);
    },
    [go]
  );

  // Case study modal lives in the URL too, so it can be shared and closed with Back
  const caseOpenedInApp = useRef(false);
  const openCase = useCallback(
    (project) => {
      if (!project) return;
      caseOpenedInApp.current = true;
      go(casePath(project.id), { bg: activePage });
    },
    [activePage, go]
  );
  const closeCase = useCallback(() => {
    if (caseOpenedInApp.current) {
      caseOpenedInApp.current = false;
      window.history.back();
    } else {
      go(pagePath(activePage), null, true);
    }
  }, [activePage, go]);

  // Modal closed by any means (browser Back included) → next close must not go back in history
  useEffect(() => {
    if (!route.caseId) caseOpenedInApp.current = false;
  }, [route.caseId]);

  const selectedProject = useMemo(
    () => ALL_PROJECTS.find((p) => p.id === route.caseId) || null,
    [route.caseId]
  );

  const presets = HERO_PRESETS[mode] || HERO_PRESETS.personal;
  const activePreset = presets[presetIndex % presets.length] || presets[0];
  const heroCopy = activePreset[lang];

  // Auto-rotate hero copy
  useEffect(() => {
    const timer = setInterval(() => {
      setPresetIndex((prev) => (prev + 1) % presets.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [presets.length]);

  const allProjects =
    mode === "personal" ? PROJECTS_PERSONAL : PROJECTS_AGENCY;
  const featuredProjects = allProjects.filter((p) => p.featured);

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#f1eec0] selection:bg-[#ea4530] selection:text-[#f1eec0]">
      {/* Opening Preloader Screen (Defect Hunter Bug) */}
      <Preloader
        isOpen={isLoading}
        onComplete={finishIntro}
        lang={lang}
      />

      {/* Custom Interactive Cursor */}
      <CustomCursor />

      {/* 4-Corner Fixed Frame Navigation (Logo with no dot/text, centered EN/ID) */}
      <FrameNav
        lang={lang}
        setLang={setLang}
        activePage={route.page}
        setActivePage={setActivePage}
      />

      {/* Main Content Area */}
      <main
        id="conteudo"
        key={activePage}
        className={`flex-1 ${leaving ? "page-leave" : "page-enter"}`}
      >
        {activePage === "home" && (
          <div>
            {/* ==================== 1. HERO SECTION ==================== */}
            <div className="relative h-[100dvh] md:h-auto md:min-h-[max(100svh,700px)] flex flex-col justify-start md:justify-center px-[clamp(20px,5vw,96px)] pt-[max(132px,20dvh)] md:pt-0 overflow-hidden bg-[#0a0a0a] select-none">
              {/* Lanyard ID card hanging on the right (drops in on entrance) */}
              <IdCardLanyard lang={lang} isReady={!isLoading} />

              {/* Left-aligned headline block, in front of the card (pointer-events-none so the card stays draggable) */}
              <div className="relative z-20 pointer-events-none w-full md:max-w-[66vw]">
                <h1
                  key={`${mode}-${lang}-${isLoading}`}
                  className="text-left text-[clamp(46px,5.6vw,112px)] [@media(max-height:700px)_and_(max-width:639px)]:text-[38px] leading-[0.98] tracking-[-0.015em] font-stamp lowercase"
                >
                  <span className="block">
                    <span
                      key={`l1s-${presetIndex}`}
                      className="hero-word inline-block text-[#f1eec0]"
                      style={{ animationDelay: "0ms" }}
                    >
                      {heroCopy.line1Start}
                    </span>{" "}
                    <span
                      key={`l1a-${presetIndex}`}
                      className="hero-word inline-block text-[#ea4530]"
                      style={{ animationDelay: "110ms" }}
                    >
                      {heroCopy.line1Accent}
                    </span>
                  </span>
                  <span className="block">
                    <span
                      key={`l2m-${presetIndex}`}
                      className="hero-word inline-block text-[#f1eec0]"
                      style={{ animationDelay: "200ms" }}
                    >
                      {heroCopy.line2Mid}
                    </span>{" "}
                    <span
                      key={`l2b-${presetIndex}`}
                      className="hero-word inline-block text-[#3aa1d8]"
                      style={{ animationDelay: "290ms" }}
                    >
                      {heroCopy.line2Blue}
                    </span>
                  </span>
                  <span className="block">
                    <span
                      key={`l3r-${presetIndex}`}
                      className="hero-word inline-block text-[#ea4530]"
                      style={{ animationDelay: "380ms" }}
                    >
                      {heroCopy.line3Red}
                    </span>{" "}
                    <span
                      key={`l3m-${presetIndex}`}
                      className="hero-word inline-block text-[#f1eec0]"
                      style={{ animationDelay: "470ms" }}
                    >
                      {heroCopy.line3Mid}
                    </span>{" "}
                    <span
                      key={`l3b-${presetIndex}`}
                      className="hero-word inline-block text-[#3aa1d8]"
                      style={{ animationDelay: "560ms" }}
                    >
                      {heroCopy.line3Blue}
                    </span>
                  </span>
                </h1>

                <div
                  key={`cta-${lang}-${isLoading}`}
                  className="hero-word hidden sm:flex flex-wrap items-center gap-3 mt-10 w-fit pointer-events-auto"
                  style={{ animationDelay: "740ms" }}
                >
                  <button
                    type="button"
                    onClick={() => setActivePage("work")}
                    className="inline-flex items-center gap-2 rounded-full bg-[#ea4530] text-[#f1eec0] px-5 py-3 text-sm font-bold lowercase hover:bg-[#f1eec0] hover:text-[#0a0a0a] transition-colors cursor-pointer"
                  >
                    <span>{lang === "en" ? "see selected work" : "lihat karya pilihan"}</span>
                    <ArrowUpRight />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePage("contact")}
                    className="inline-flex items-center gap-2 rounded-full border border-[#f1eec0]/25 text-[#f1eec0] px-5 py-3 text-sm font-bold lowercase hover:border-[#3aa1d8] hover:text-[#3aa1d8] transition-colors cursor-pointer"
                  >
                    <span>{lang === "en" ? "get in touch" : "hubungi saya"}</span>
                    <ArrowRight />
                  </button>
                </div>
              </div>

              {/* Scroll hint (desktop) */}
              <div
                aria-hidden="true"
                className="hidden md:block absolute bottom-[clamp(28px,4.4vh,46px)] left-1/2 -translate-x-1/2 z-10 scroll-hint pointer-events-none"
              >
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 9L12 17L20 9"
                    stroke="var(--accent-blue)"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* ==================== 2. BIO STATEMENT + SOFTWARE & QA MARQUEE ==================== */}
            <section className="relative pt-24 sm:pt-32 md:pt-40 pb-12 sm:pb-16 flex flex-col overflow-hidden">
              <div className="px-5 sm:px-8 md:px-12 mb-14 sm:mb-20 md:mb-24">
                <div className="text-[clamp(19px,min(3.2vw,4.2vh),36px)] leading-[1.38] sm:leading-[1.3] tracking-tight max-w-[23ch] sm:max-w-[30ch] md:max-w-[42ch] mx-auto text-center">
                  {lang === "en" ? (
                    <>
                      <span className="text-[#ea4530] font-bold">* </span>
                      I&apos;m{" "}
                      <strong className="font-bold text-[#f1eec0]">
                        Yuda Dwi Putra
                      </strong>
                      , a{" "}
                      <strong className="font-bold text-[#3aa1d8]">
                        System &amp; Business Analyst
                      </strong>{" "}
                      who moves between{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        core banking,
                      </em>{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        treasury &amp; e-FX,
                      </em>{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        functional specifications
                      </em>{" "}
                      and{" "}
                      <strong className="font-bold text-[#ea4530]">
                        end-to-end quality validation
                      </strong>{" "}
                      — translating complex banking processes into clear BRDs,
                      as-is / to-be flows, and reliable host integrations. With{" "}
                      <strong className="font-bold text-[#f1eec0]">
                        6+ years
                      </strong>{" "}
                      in financial software delivery, including{" "}
                      <strong className="font-bold text-[#3aa1d8]">
                        5 years at PT Bank Mandiri (KOPRA)
                      </strong>{" "}
                      and enterprise modernization at{" "}
                      <strong className="font-bold text-[#ea4530]">
                        PT Adi Data Informatika
                      </strong>{" "}
                      for{" "}
                      <strong className="font-bold text-[#3aa1d8]">
                        TNI AL (TABPLIN)
                      </strong>{" "}
                      &amp;{" "}
                      <strong className="font-bold text-[#ea4530]">
                        PT SMI
                      </strong>
                      . Make yourself at{" "}
                      <span className="inline-block bg-[#ea4530] text-[#0a0a0a] rounded-full px-[0.5em] py-[0.05em] text-[0.76em] font-bold align-[0.06em]">
                        home
                      </span>
                      !
                    </>
                  ) : (
                    <>
                      <span className="text-[#ea4530] font-bold">* </span>
                      Saya{" "}
                      <strong className="font-bold text-[#f1eec0]">
                        Yuda Dwi Putra
                      </strong>
                      , seorang{" "}
                      <strong className="font-bold text-[#3aa1d8]">
                        System &amp; Business Analyst
                      </strong>{" "}
                      yang bergerak di antara{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        core banking,
                      </em>{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        treasury &amp; e-FX,
                      </em>{" "}
                      <em className="font-accent-serif italic font-normal text-[1.12em]">
                        spesifikasi fungsional
                      </em>{" "}
                      dan{" "}
                      <strong className="font-bold text-[#ea4530]">
                        validasi kualitas end-to-end
                      </strong>{" "}
                      — menerjemahkan proses bisnis perbankan yang kompleks
                      menjadi BRD, alur proses, dan integrasi host yang jernih.
                      Berbekal{" "}
                      <strong className="font-bold text-[#f1eec0]">
                        6+ tahun
                      </strong>{" "}
                      di industri finansial, termasuk{" "}
                      <strong className="font-bold text-[#3aa1d8]">
                        5 tahun di PT Bank Mandiri (KOPRA)
                      </strong>{" "}
                      serta modernisasi sistem di{" "}
                      <strong className="font-bold text-[#ea4530]">
                        PT Adi Data Informatika
                      </strong>{" "}
                      untuk{" "}
                      <strong className="font-bold text-[#3aa1d8]">
                        TNI AL (TABPLIN)
                      </strong>{" "}
                      &amp;{" "}
                      <strong className="font-bold text-[#ea4530]">
                        PT SMI
                      </strong>
                      . Anggap rumah{" "}
                      <span className="inline-block bg-[#ea4530] text-[#0a0a0a] rounded-full px-[0.5em] py-[0.05em] text-[0.76em] font-bold align-[0.06em]">
                        sendiri
                      </span>
                      !
                    </>
                  )}
                </div>
              </div>

              {/* Software & QA Tools Infinite Marquee with 3D Icons */}
              <div
                className="overflow-hidden whitespace-nowrap select-none py-8 border-y border-[#f1eec0]/8"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
                }}
              >
                <div className="flex animate-marquee-slow">
                  {[0, 1].map((dup) => (
                    <span
                      key={dup}
                      className="flex items-center gap-[clamp(28px,5vw,56px)] shrink-0 pr-[clamp(28px,5vw,56px)]"
                    >
                      {CLIENT_MARQUEE.map((tool, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-3 text-base sm:text-lg md:text-xl font-semibold tracking-tight text-[#f1eec0]/50 hover:text-[#f1eec0] transition-colors whitespace-nowrap group"
                        >
                          <SoftwareIcon
                            name={tool.id || tool.name}
                            className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 transition-transform duration-300 group-hover:scale-110"
                          />
                          <span className="font-ui">{tool.name}</span>
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* ==================== 3. FEATURED WORKS MARQUEE HEADER ==================== */}
            <section className="relative z-10 pt-8 pb-4">
              <div className="relative">
                <div
                  className="overflow-hidden whitespace-nowrap select-none py-2"
                  style={{
                    maskImage:
                      "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
                  }}
                >
                  <div className="flex animate-marquee text-[clamp(48px,11vw,144px)] tracking-tight lowercase font-stamp leading-[1.04]">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="flex items-center gap-[clamp(14px,1.85vw,26px)] shrink-0 pr-[clamp(14px,1.85vw,26px)]"
                      >
                        <span>
                          {lang === "en" ? "featured works" : "proyek pilihan"}
                        </span>
                        <span
                          style={{
                            color: "var(--accent-blue)",
                            transform: "translateY(0.14em)",
                          }}
                        >
                          *
                        </span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Floating Right "all works" Pill */}
                <div className="absolute inset-0 hidden md:flex items-center pointer-events-none justify-end pr-[clamp(18px,4vw,40px)]">
                  <div className="pointer-events-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setActivePage("work");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tracking-tight rounded-full px-4 py-2 transition-colors shadow-lg bg-[#ea4530] text-[#f1eec0] hover:bg-[#f1eec0] hover:text-[#0a0a0a] cursor-pointer lowercase"
                    >
                      <span>{lang === "en" ? "all works" : "semua proyek"}</span>
                      <ArrowUpRight />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* ==================== 4. FEATURED CASE STUDIES LIST ==================== */}
            <div>
              {featuredProjects.map((project, i) => (
                <FeaturedProjectSection
                  index={i}
                  total={featuredProjects.length}
                  key={project.id}
                  project={project}
                  lang={lang}
                  onOpenCase={openCase}
                />
              ))}
            </div>

            {/* Bottom "see all works" — full-width CTA row (clear of the fixed bottom nav) */}
            <div className="px-[clamp(18px,4vw,40px)] pt-6 sm:pt-10 pb-20 sm:pb-28">
              <button
                type="button"
                onClick={() => {
                  setActivePage("work");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group w-full flex items-center justify-between gap-4 border-y border-[#f1eec0]/12 py-5 sm:py-8 text-left cursor-pointer"
              >
                <span className="flex flex-col gap-1.5 sm:gap-2 min-w-0">
                  <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.18em] text-[#f1eec0]/45">
                    {allProjects.length} {lang === "en" ? "case studies · 50+ projects delivered" : "studi kasus · 50+ proyek terselesaikan"}
                  </span>
                  <span className="font-stamp lowercase leading-[0.95] text-[clamp(38px,7.5vw,104px)] text-[#f1eec0] transition-colors duration-300 group-hover:text-[#ea4530]">
                    {lang === "en" ? "see all works" : "lihat semua proyek"}
                  </span>
                </span>
                <span className="shrink-0 w-12 h-12 sm:w-20 sm:h-20 rounded-full bg-[#ea4530] text-[#f1eec0] flex items-center justify-center text-xl sm:text-3xl transition-transform duration-300 group-hover:rotate-45 group-hover:scale-105">
                  <ArrowUpRight />
                </span>
              </button>
            </div>
          </div>
        )}

        {activePage === "work" && (
          <WorkArchiveView
            projects={allProjects}
            lang={lang}
            onOpenCase={openCase}
          />
        )}

        {activePage === "about" && (
          <AboutView lang={lang} setActivePage={setActivePage} />
        )}

        {activePage === "studio" && (
          <StudioLabView
            lang={lang}
            mode={mode}
            setMode={setMode}
            presetIndex={presetIndex}
            setPresetIndex={setPresetIndex}
            setActivePage={setActivePage}
          />
        )}

        {activePage === "contact" && <ContactView lang={lang} />}
      </main>

      {/* Mega Footer Section */}
      <FooterSection lang={lang} setActivePage={setActivePage} />

      {/* Case Study Full Modal */}
      <CaseStudyModal
        project={selectedProject}
        lang={lang}
        onClose={closeCase}
      />
    </div>
  );
}
