import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Dot } from "./Icons";

/*
 * Hanging ID card on a red lanyard strap.
 *
 * Motion model (time-based, frame-rate independent, fixed 240 Hz sub-steps):
 *  - Vertical: while the strap is slack the card is in free fall (gravity + light
 *    air drag). Once the strap is taut it behaves like a damped elastic spring,
 *    so the entrance reads as "drop -> soft catch -> small rebound -> settle".
 *  - Horizontal: a soft pendulum spring pulls the card back under its anchor.
 *  - Rotation: a lightly damped pendulum that follows sideways motion.
 * Positions are written straight to the DOM every frame (no React re-render per
 * frame), and the loop sleeps once everything has settled.
 */

const GRAVITY = 1600; // px/s^2 while the strap is slack
const AIR_DRAG = 0.8; // 1/s
const STRAP_HZ = 1.8; // stiffness of the taut strap
const STRAP_DAMPING = 0.55; // damping ratio (≈ one soft rebound)
const SWAY_HZ = 0.7; // horizontal pendulum
const SWAY_DAMPING = 0.32;
const ROT_HZ = 0.85; // card tilt pendulum
const ROT_DAMPING = 0.2;
const STEP = 1 / 240;

const omega = (hz) => 2 * Math.PI * hz;
const K_Y = omega(STRAP_HZ) ** 2;
const C_Y = 2 * STRAP_DAMPING * omega(STRAP_HZ);
const SLACK_Y = -GRAVITY / K_Y; // offset above rest where the strap goes slack
const K_X = omega(SWAY_HZ) ** 2;
const C_X = 2 * SWAY_DAMPING * omega(SWAY_HZ);
const K_R = omega(ROT_HZ) ** 2;
const C_R = 2 * ROT_DAMPING * omega(ROT_HZ);

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function computeLayout(w, h) {
  const isMobile = w < 640;
  const cardH = isMobile ? 210 : 246;
  const baseX = isMobile ? w * 0.5 : Math.min(w * 0.82, w - 120);
  // Mobile: hang the card in the lower part of the hero so the headline stays readable,
  // while keeping it clear of the bottom navigation bar.
  const baseY = isMobile
    ? clamp(h - cardH - 92, h * 0.5, h * 0.62)
    : h * 0.54;
  return {
    w,
    h,
    isMobile,
    cardH,
    baseX,
    baseY,
    anchorX: baseX,
    anchorY: -60,
    strapW: isMobile ? 14 : 20,
  };
}

export default function IdCardLanyard({ lang = "en", isReady = true }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const strapRef = useRef(null);
  const strapShadowRef = useRef(null);
  const claspRef = useRef(null);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);

  const [isDragging, setIsDragging] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewport, setViewport] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 1280,
    h: typeof window !== "undefined" ? window.innerHeight : 800,
  }));

  const layout = computeLayout(viewport.w, viewport.h);
  const layoutRef = useRef(layout);
  layoutRef.current = layout;

  // Card starts parked above the top edge (hidden) until the preloader clears.
  const physicsRef = useRef({
    x: 0,
    y: -(layout.baseY + layout.cardH + 120),
    vx: 0,
    vy: 0,
    rot: 0,
    vRot: 0,
    dragging: false,
    parked: true,
    grabDX: 0,
    grabDY: 0,
    lastMoveT: 0,
    downTime: 0,
    dragDistance: 0,
  });

  // ---- DOM writer -------------------------------------------------------
  const apply = useCallback(() => {
    const p = physicsRef.current;
    const L = layoutRef.current;
    const clipX = L.baseX + p.x;
    const clipY = L.baseY + p.y;

    const dx = clipX - L.anchorX;
    const dy = clipY - 18 - L.anchorY;
    const len = Math.max(0, Math.hypot(dx, dy));
    const angle = (Math.atan2(-dx, dy) * 180) / Math.PI;
    const strapTransform = `translate(${L.anchorX} ${L.anchorY}) rotate(${angle})`;

    if (strapRef.current) {
      strapRef.current.setAttribute("transform", strapTransform);
      strapRef.current.firstChild?.setAttribute("height", len);
    }
    if (strapShadowRef.current) {
      strapShadowRef.current.setAttribute(
        "transform",
        `translate(${L.anchorX + 2} ${L.anchorY + 3}) rotate(${angle})`
      );
      strapShadowRef.current.setAttribute("height", len);
    }
    if (claspRef.current) {
      claspRef.current.setAttribute(
        "transform",
        `translate(${clipX} ${clipY}) rotate(${p.rot * 0.45})`
      );
    }
    if (cardRef.current) {
      cardRef.current.style.transform = `translate3d(${clipX}px, ${clipY}px, 0) translateX(-50%) rotate(${p.rot}deg)`;
    }
  }, []);

  // ---- Physics loop -----------------------------------------------------
  const integrate = (p, dt) => {
    // Vertical: free fall while slack, damped spring while taut
    const ay = p.y > SLACK_Y ? -K_Y * p.y - C_Y * p.vy : GRAVITY - AIR_DRAG * p.vy;
    // Horizontal pendulum toward the anchor
    const ax = -K_X * p.x - C_X * p.vx;
    p.vy += ay * dt;
    p.vx += ax * dt;
    p.y += p.vy * dt;
    p.x += p.vx * dt;

    // Tilt pendulum follows sideways offset & velocity
    const targetRot = clamp(p.x * 0.06 + p.vx * 0.012, -28, 28);
    const ar = -K_R * (p.rot - targetRot) - C_R * p.vRot;
    p.vRot += ar * dt;
    p.rot += p.vRot * dt;
  };

  const isSettled = (p) =>
    Math.abs(p.x) < 0.05 &&
    Math.abs(p.y) < 0.05 &&
    Math.abs(p.vx) < 0.5 &&
    Math.abs(p.vy) < 0.5 &&
    Math.abs(p.rot) < 0.02 &&
    Math.abs(p.vRot) < 0.1;

  const tick = useCallback(
    (now) => {
      const p = physicsRef.current;
      const elapsed = Math.min(0.05, (now - (lastTimeRef.current || now)) / 1000);
      lastTimeRef.current = now;

      if (!p.dragging && !p.parked) {
        let remaining = elapsed;
        while (remaining > 1e-6) {
          const dt = Math.min(STEP, remaining);
          integrate(p, dt);
          remaining -= dt;
        }
        if (isSettled(p)) {
          p.x = p.y = p.vx = p.vy = p.rot = p.vRot = 0;
          apply();
          rafRef.current = 0;
          lastTimeRef.current = 0;
          return;
        }
      }
      apply();
      rafRef.current = requestAnimationFrame(tick);
    },
    [apply]
  );

  const wake = useCallback(() => {
    if (!rafRef.current) {
      lastTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  // ---- Viewport tracking ------------------------------------------------
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const w = Math.round(rect.width || window.innerWidth);
      const h = Math.round(rect.height || window.innerHeight);
      setViewport((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Keep the parked card hidden above the fold if the layout changes before the drop
  useLayoutEffect(() => {
    const p = physicsRef.current;
    if (p.parked) p.y = -(layout.baseY + layout.cardH + 120);
    apply();
  }, [layout.baseX, layout.baseY, layout.cardH, apply]);

  // ---- Entrance drop ----------------------------------------------------
  useEffect(() => {
    if (!isReady) return;
    const p = physicsRef.current;
    if (!p.parked) return;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(() => {
      const L = layoutRef.current;
      p.parked = false;
      if (reduceMotion) {
        p.x = p.y = p.vx = p.vy = p.rot = p.vRot = 0;
        apply();
        return;
      }
      // Start just above the top edge with a little downward speed so the card
      // enters the frame immediately, slightly off-centre so it sways in.
      p.y = -(L.baseY + L.cardH + 30);
      p.vy = 520;
      p.x = L.isMobile ? -18 : -34;
      p.vx = 0;
      p.rot = L.isMobile ? -3 : -5;
      p.vRot = 0;
      wake();
    }, 180);
    return () => clearTimeout(timer);
  }, [isReady, apply, wake]);

  // ---- Dragging ---------------------------------------------------------
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    const p = physicsRef.current;
    p.parked = false;
    p.dragging = true;
    p.grabDX = e.clientX - p.x;
    p.grabDY = e.clientY - p.y;
    p.vx = p.vy = 0;
    p.lastMoveT = performance.now();
    p.downTime = p.lastMoveT;
    p.dragDistance = 0;
    setIsDragging(true);
    wake();

    const onMove = (ev) => {
      if (!p.dragging) return;
      const rawX = ev.clientX - p.grabDX;
      const rawY = ev.clientY - p.grabDY;
      const dist = Math.hypot(rawX, rawY);
      p.dragDistance = Math.max(p.dragDistance, dist);

      // Elastic limit: resistance grows the further you pull
      const maxPull = 420;
      const scale = dist > maxPull ? (maxPull + (dist - maxPull) * 0.15) / dist : 1;
      const nx = rawX * scale;
      const ny = rawY * scale;

      const now = performance.now();
      const dt = Math.max(1 / 240, (now - p.lastMoveT) / 1000);
      p.lastMoveT = now;
      // Smoothed release velocity (px/s)
      p.vx = p.vx * 0.6 + ((nx - p.x) / dt) * 0.4;
      p.vy = p.vy * 0.6 + ((ny - p.y) / dt) * 0.4;
      p.x = nx;
      p.y = ny;
      p.rot = clamp(nx * 0.05 + p.vx * 0.006, -30, 30);
      p.vRot = 0;
    };

    const onUp = () => {
      if (!p.dragging) return;
      p.dragging = false;
      setIsDragging(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);

      // Quick tap without dragging flips the card
      if (p.dragDistance < 8 && performance.now() - p.downTime < 320) {
        setIsFlipped((prev) => !prev);
      }
      // Velocity is stale if the pointer rested before release
      if (performance.now() - p.lastMoveT > 80) {
        p.vx = 0;
        p.vy = 0;
      }
      p.vx = clamp(p.vx, -2400, 2400);
      p.vy = clamp(p.vy, -2400, 2400);
      wake();
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  const { isMobile, strapW } = layout;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none select-none z-10 overflow-hidden"
    >
      {/* Red lanyard strap + metal clasp */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        viewBox={`0 0 ${viewport.w} ${viewport.h}`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="lanyardRed" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#9e2414" />
            <stop offset="18%" stopColor="#d7381f" />
            <stop offset="50%" stopColor="#ef4a31" />
            <stop offset="82%" stopColor="#d7381f" />
            <stop offset="100%" stopColor="#8f2012" />
          </linearGradient>
        </defs>

        {/* Soft shadow behind the strap */}
        <rect
          ref={strapShadowRef}
          x={-(strapW + 2) / 2}
          y="0"
          width={strapW + 2}
          height="0"
          fill="rgba(0,0,0,0.45)"
        />

        {/* Strap ribbon */}
        <g ref={strapRef}>
          <rect x={-strapW / 2} y="0" width={strapW} height="0" fill="url(#lanyardRed)" />
        </g>

        {/* Metal lobster clasp */}
        <g ref={claspRef}>
          <rect
            x={isMobile ? -9 : -12}
            y="-22"
            width={isMobile ? 18 : 24}
            height="8"
            rx="2"
            fill="#a8291a"
            stroke="#5e160c"
            strokeWidth="1.2"
          />
          <ellipse cx="0" cy="-12" rx="6.5" ry="4.5" fill="none" stroke="#9a9a9a" strokeWidth="2.2" />
          <rect x="-3.5" y="-9" width="7" height="8" rx="1.5" fill="#6a6a6a" stroke="#b5b5b5" strokeWidth="1" />
          <path d="M-2.5 -2 L2.5 -2 L3 7 C3 10 -3 10 -3 7 Z" fill="#555" stroke="#c8c8c8" strokeWidth="1.2" />
        </g>
      </svg>

      {/* Draggable ID card (behind the headline) */}
      <div
        ref={cardRef}
        onPointerDown={handlePointerDown}
        data-cursor="drag"
        title={
          lang === "en"
            ? "Pull down & release to snap! (Or click to flip)"
            : "Tarik ke bawah & lepas untuk membal! (Atau klik untuk balik)"
        }
        style={{ transformOrigin: "50% 0%", willChange: "transform" }}
        className={`pointer-events-auto absolute left-0 top-0 w-[146px] h-[210px] sm:w-[172px] sm:h-[246px] touch-none select-none z-10 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        {/* Card 3D flip container */}
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ==================== FRONT ==================== */}
          <div
            style={{ backfaceVisibility: "hidden" }}
            className="absolute inset-0 rounded-[14px] bg-[#55aee6] shadow-[0_22px_50px_rgba(0,0,0,0.75)] border border-[#7bc4f0]/50 overflow-hidden flex flex-col justify-between p-2.5 sm:p-3"
          >
            <div className="flex flex-col items-center">
              <div className="w-8 h-1.5 sm:h-2 rounded-full bg-[#0a0a0a]/90 border border-black/40 shadow-inner" />
            </div>

            <div className="text-center leading-[0.92] tracking-[-0.02em] text-[#f1eec0] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] pt-0.5 sm:pt-1">
              <div className="text-[21px] sm:text-[27px] font-extrabold font-ui lowercase">yuda</div>
              <div className="text-[18px] sm:text-[24px] font-extrabold font-ui lowercase">dwi putra</div>
            </div>

            <div className="relative w-full flex-1 flex items-center justify-center py-0.5 sm:py-1 overflow-hidden">
              <img
                src="/yudaenamel.png"
                alt="Yuda Dwi Putra Enamel Badge"
                draggable="false"
                className="max-h-[105px] sm:max-h-[136px] w-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.4)] pointer-events-none select-none"
              />
            </div>

            <div className="text-center text-[8.5px] sm:text-[10px] font-bold text-[#0a0a0a]/80 tracking-wider font-mono">
              OPEN TO WORK
            </div>
          </div>

          {/* ==================== BACK ==================== */}
          <div
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            className="absolute inset-0 rounded-[14px] bg-[#f5f2cb] text-[#0a0a0a] shadow-[0_22px_50px_rgba(0,0,0,0.75)] border border-[#0a0a0a]/25 p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="flex flex-col items-center mb-1.5 sm:mb-2">
                <div className="w-8 h-1.5 sm:h-2 rounded-full bg-[#0a0a0a] shadow-inner" />
              </div>
              <div className="w-full flex items-center justify-between border-b border-[#0a0a0a]/15 pb-1 gap-1">
                <span className="text-[8px] sm:text-[8.5px] font-mono tracking-wider font-extrabold text-[#0a0a0a]/70 uppercase truncate">
                  ID BADGE // VERIFIED
                </span>
                <span className="px-1.5 py-0.5 bg-[#ea4530] text-[#f1eec0] rounded-[3px] text-[7.5px] sm:text-[8px] font-mono font-bold tracking-tight shrink-0">
                  ISTQB® CTFL
                </span>
              </div>
            </div>

            <div className="space-y-0.5 text-left pt-0.5">
              <div className="text-[13px] sm:text-[15px] font-extrabold font-ui leading-none tracking-tight text-[#0a0a0a] lowercase">
                yuda dwi putra
              </div>
              <div className="text-[8.5px] sm:text-[9.5px] font-bold text-[#ea4530] font-mono tracking-tight uppercase leading-tight">
                System &amp; Business Analyst
              </div>
            </div>

            <div className="space-y-1 text-left text-[8px] sm:text-[9px] text-[#0a0a0a]/85 font-ui leading-none py-0.5">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3aa1d8] shrink-0" />
                <span className="truncate font-medium">Core Banking &amp; Treasury</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ea4530] shrink-0" />
                <span className="truncate font-medium">Bank Mandiri (KOPRA)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0a]/70 shrink-0" />
                <span className="truncate font-medium">PT Adi Data (TNI AL &amp; SMI)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ea4530] shrink-0" />
                <span className="truncate font-semibold text-[#0a0a0a] inline-flex items-center gap-1">
                  6+ Yrs <Dot /> 5× Winner
                </span>
              </div>
            </div>

            <div className="pt-1 border-t border-[#0a0a0a]/15 flex flex-col items-center gap-0.5">
              <div className="w-full h-3 sm:h-3.5 flex items-stretch justify-between gap-[1px]">
                {[2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 2, 3, 1].map((w, i) => (
                  <span key={i} className="bg-[#0a0a0a] inline-block" style={{ flex: w }} />
                ))}
              </div>
              <span className="text-[7px] sm:text-[8px] font-mono tracking-widest text-[#0a0a0a]/65 uppercase">
                23-CTFL-227561-12
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
