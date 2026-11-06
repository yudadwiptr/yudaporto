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

// Flexible strap: a verlet rope between the fixed anchor and the clasp
const ROPE_N = 18; // points
const ROPE_GRAVITY = 1800; // px/s^2
const ROPE_DAMP = 0.992; // velocity kept per 1/240 s step
const ROPE_ITERS = 14; // constraint passes per step
const ROPE_BEND = 1.55; // min distance between i and i+2, in segments (gives the strap some stiffness)

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
    ? clamp(h - cardH - 84, h * 0.5, h * 0.66)
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
    // Strap tab that threads through the card slot (px above the card's top edge)
    tabTop: 4,
    // Grommet sits on the flexible strap, this far above the card edge
    grommetLift: isMobile ? 13 : 17,
    grommetR: isMobile ? 4.6 : 6,
  };
}

export default function IdCardLanyard({ lang = "en", isReady = true }) {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const strapRef = useRef(null);
  const strapHiRef = useRef(null);
  const grommetRef = useRef(null);
  const strapShadowRef = useRef(null);
  const ropeRef = useRef(null);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);

  const [isDragging, setIsDragging] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(true);
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

  // ---- Rope -------------------------------------------------------------
  // The simulated strap ends where the card-mounted strap tab begins (2px overlap
  // hides the seam); the tab swings with the card around its top centre.
  const ropeEnd = () => {
    const p = physicsRef.current;
    const L = layoutRef.current;
    const a = (p.rot * Math.PI) / 180;
    const r = L.tabTop - 2;
    return [L.baseX + p.x + Math.sin(a) * r, L.baseY + p.y - Math.cos(a) * r];
  };

  // (Re)build the strap as a straight line to the clasp, bowed sideways if slack
  const initRope = useCallback((endVy = 0) => {
    const L = layoutRef.current;
    const [ex, ey] = ropeEnd();
    const restLen = L.baseY - (L.tabTop - 2) - L.anchorY;
    const seg = restLen / (ROPE_N - 1);
    const d = Math.hypot(ex - L.anchorX, ey - L.anchorY);
    const bow = 0.35 * Math.sqrt(Math.max(0, restLen * restLen - d * d));
    const px = new Float64Array(ROPE_N);
    const py = new Float64Array(ROPE_N);
    const ox = new Float64Array(ROPE_N);
    const oy = new Float64Array(ROPE_N);
    for (let i = 0; i < ROPE_N; i++) {
      const t = i / (ROPE_N - 1);
      px[i] = L.anchorX + (ex - L.anchorX) * t + Math.sin(Math.PI * t) * bow;
      py[i] = L.anchorY + (ey - L.anchorY) * t;
      ox[i] = px[i];
      oy[i] = py[i] - endVy * t * STEP;
    }
    ropeRef.current = { px, py, ox, oy, seg };
  }, []);

  // One verlet step; returns how far the strap moved (used for sleeping)
  const stepRope = (dt) => {
    const r = ropeRef.current;
    if (!r) return 0;
    const L = layoutRef.current;
    const { px, py, ox, oy, seg } = r;
    const last = ROPE_N - 1;
    const g = ROPE_GRAVITY * dt * dt;
    const damp = Math.pow(ROPE_DAMP, dt / STEP);
    let moved = 0;
    for (let i = 1; i < last; i++) {
      const vx = (px[i] - ox[i]) * damp;
      const vy = (py[i] - oy[i]) * damp;
      ox[i] = px[i];
      oy[i] = py[i];
      px[i] += vx;
      py[i] += vy + g;
      moved = Math.max(moved, Math.abs(vx) + Math.abs(vy));
    }
    const [ex, ey] = ropeEnd();
    const pin = () => {
      px[0] = L.anchorX;
      py[0] = L.anchorY;
      px[last] = ex;
      py[last] = ey;
    };
    pin();
    const minBend = seg * ROPE_BEND;
    for (let k = 0; k < ROPE_ITERS; k++) {
      // Length: a strap does not stretch, but it can go slack
      for (let i = 0; i < last; i++) {
        const dx = px[i + 1] - px[i];
        const dy = py[i + 1] - py[i];
        const d = Math.hypot(dx, dy) || 1e-6;
        if (d <= seg) continue;
        const f = (d - seg) / d;
        const w0 = i === 0 ? 0 : i + 1 === last ? 1 : 0.5;
        const w1 = i + 1 === last ? 0 : i === 0 ? 1 : 0.5;
        px[i] += dx * f * w0;
        py[i] += dy * f * w0;
        px[i + 1] -= dx * f * w1;
        py[i + 1] -= dy * f * w1;
      }
      // Bending stiffness: keep i and i+2 apart so slack bows instead of folding
      for (let i = 0; i < last - 1; i++) {
        const dx = px[i + 2] - px[i];
        const dy = py[i + 2] - py[i];
        const d = Math.hypot(dx, dy) || 1e-6;
        if (d >= minBend) continue;
        const f = (d - minBend) / d;
        const w0 = i === 0 ? 0 : i + 2 === last ? 1 : 0.5;
        const w1 = i + 2 === last ? 0 : i === 0 ? 1 : 0.5;
        px[i] += dx * f * w0;
        py[i] += dy * f * w0;
        px[i + 2] -= dx * f * w1;
        py[i + 2] -= dy * f * w1;
      }
      pin();
    }
    return moved;
  };

  // Smooth path through the rope points (midpoint quadratic curves)
  const ropePath = () => {
    const r = ropeRef.current;
    if (!r) return "";
    const { px, py } = r;
    let d = `M${px[0].toFixed(1)} ${py[0].toFixed(1)}`;
    for (let i = 1; i < ROPE_N - 1; i++) {
      const mx = (px[i] + px[i + 1]) / 2;
      const my = (py[i] + py[i + 1]) / 2;
      d += ` Q${px[i].toFixed(1)} ${py[i].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`;
    }
    d += ` L${px[ROPE_N - 1].toFixed(1)} ${py[ROPE_N - 1].toFixed(1)}`;
    return d;
  };

  // ---- DOM writer -------------------------------------------------------
  const apply = useCallback(() => {
    const p = physicsRef.current;
    const L = layoutRef.current;
    const clipX = L.baseX + p.x;
    const clipY = L.baseY + p.y;

    if (!ropeRef.current) initRope();
    const d = ropePath();
    strapRef.current?.setAttribute("d", d);
    strapHiRef.current?.setAttribute("d", d);

    // Grommet: walk back along the strap from its end and sit there, aligned with it
    if (grommetRef.current && ropeRef.current) {
      const { px, py } = ropeRef.current;
      let need = L.grommetLift;
      let gx = px[ROPE_N - 1];
      let gy = py[ROPE_N - 1];
      let ang = 0;
      for (let i = ROPE_N - 1; i > 0; i--) {
        const dx = px[i - 1] - px[i];
        const dy = py[i - 1] - py[i];
        const len = Math.hypot(dx, dy) || 1e-6;
        ang = (Math.atan2(dx, -dy) * 180) / Math.PI;
        if (len >= need) {
          gx = px[i] + (dx * need) / len;
          gy = py[i] + (dy * need) / len;
          need = 0;
          break;
        }
        need -= len;
        gx = px[i - 1];
        gy = py[i - 1];
      }
      grommetRef.current.setAttribute("transform", `translate(${gx.toFixed(1)} ${gy.toFixed(1)}) rotate(${ang.toFixed(1)})`);
    }
    strapShadowRef.current?.setAttribute("d", d);

    if (cardRef.current) {
      cardRef.current.style.transform = `translate3d(${clipX}px, ${clipY}px, 0) translateX(-50%) rotate(${p.rot}deg)`;
    }
  }, [initRope]);

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

      let ropeMoved = 0;
      if (!p.parked) {
        let remaining = elapsed;
        while (remaining > 1e-6) {
          const dt = Math.min(STEP, remaining);
          if (!p.dragging) integrate(p, dt);
          ropeMoved = Math.max(ropeMoved, stepRope(dt));
          remaining -= dt;
        }
        if (!p.dragging && isSettled(p) && ropeMoved < 0.02) {
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
    initRope();
    apply();
  }, [layout.baseX, layout.baseY, layout.cardH, apply, initRope]);

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
        initRope();
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
      initRope(p.vy);
      wake();
    }, 180);
    return () => clearTimeout(timer);
  }, [isReady, apply, wake, initRope]);

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
    setShowHint(false);
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
        {/* Soft shadow behind the strap */}
        <path
          ref={strapShadowRef}
          fill="none"
          stroke="rgba(0,0,0,0.45)"
          strokeWidth={strapW + 2}
          strokeLinejoin="round"
          strokeLinecap="round"
          transform="translate(2 3)"
        />

        {/* Strap ribbon (flexible) */}
        <path ref={strapRef} fill="none" stroke="#d93b24" strokeWidth={strapW} strokeLinejoin="round" strokeLinecap="round" />
        {/* Woven sheen down the middle of the ribbon */}
        <path
          ref={strapHiRef}
          fill="none"
          stroke="#f4614a"
          strokeOpacity="0.55"
          strokeWidth={Math.max(3, strapW * 0.36)}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Metal grommet punched through the strap (positioned along the strap each frame) */}
        <defs>
          <radialGradient id="grommetMetal" cx="38%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#cfcfcf" />
            <stop offset="78%" stopColor="#7f7f7f" />
            <stop offset="100%" stopColor="#4a4a4a" />
          </radialGradient>
        </defs>
        <g ref={grommetRef}>
          <circle r={layout.grommetR + 0.8} cy="0.9" fill="rgba(0,0,0,0.35)" />
          <circle r={layout.grommetR} fill="url(#grommetMetal)" />
          <circle r={layout.grommetR * 0.5} fill="#0a0a0a" />
          <circle r={layout.grommetR * 0.5} fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="0.8" />
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
        className={`pointer-events-auto absolute left-0 top-0 w-[146px] h-[210px] sm:w-[172px] sm:h-[246px] touch-none select-none z-10 ${isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
      >
        {/* One-time interaction hint under the card */}
        {showHint && isReady && (
          <span
            aria-hidden="true"
            className="flip-hint absolute left-0 right-0 top-full mt-3 flex justify-center pointer-events-none"
          >
            <span className="whitespace-nowrap rounded-full border border-[#f1eec0]/15 bg-[#0a0a0a]/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-mono lowercase tracking-wide text-[#f1eec0]/65">
              {lang === "en" ? "tap to flip · pull me" : "ketuk untuk balik · tarik aku"}
            </span>
          </span>
        )}

        {/* Strap tab: folds over the top edge (2px under the strap end) and threads into the slot */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 z-20 w-[14px] -top-[4px] h-[18.5px] sm:w-[20px] sm:h-[22px]"
        >
          {/* ribbon (same colours as the simulated strap: base + centre sheen) */}
          <span className="absolute inset-0 bg-[#d93b24] rounded-b-[3px]" />
          <span className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[36%] bg-[#f4614a]/55" />
          {/* edge stitching */}
          <span className="absolute inset-y-0.5 left-[2px] border-l border-dashed border-[#f7a08f]/50" />
          <span className="absolute inset-y-0.5 right-[2px] border-r border-dashed border-[#f7a08f]/50" />
          {/* shading where it disappears into the slot */}
          <span className="absolute inset-x-0 bottom-0 h-[6px] rounded-b-[3px] bg-gradient-to-b from-transparent to-black/45" />
        </div>

        {/* Card 3D flip container */}
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ==================== FRONT: full-bleed photo badge ==================== */}
          <div
            style={{ backfaceVisibility: "hidden" }}
            className="absolute inset-0 rounded-[14px] overflow-hidden bg-gradient-to-b from-[#a8dcf8] via-[#63b6e8] to-[#3d93cc] shadow-[0_22px_50px_rgba(0,0,0,0.75)] ring-1 ring-white/25"
          >
            {/* Soft light behind the head */}
            <span className="absolute left-1/2 top-[14%] -translate-x-1/2 w-[95%] aspect-square rounded-full bg-white/30 blur-[18px]" />

            {/* Photo, larger than the card and anchored to the bottom edge */}
            <img
              src="/yuda-photo-full.webp"
              alt="Yuda Dwi Putra"
              draggable="false"
              width="720"
              height="653"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[132%] max-w-none h-auto pointer-events-none select-none"
            />

            {/* Strap slot cut through the card */}
            <span className="absolute left-1/2 -translate-x-1/2 top-[10px] w-[22px] h-[7px] sm:top-[12px] sm:w-[30px] sm:h-[9px] rounded-full bg-[#0a0a0a] shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.9)] ring-1 ring-white/25" />

            {/* Dark fade for the name block */}
            <span className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#07121c] via-[#07121c]/85 to-transparent" />

            {/* Name, role and mark */}
            <div className="absolute inset-x-0 bottom-0 px-2.5 sm:px-3 pb-2.5 sm:pb-3">
              <div className="font-ui font-extrabold text-[#f8f6e3] leading-[0.95] tracking-[-0.02em] text-[19px] sm:text-[23px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                Yuda
                <br />
                Dwi Putra
              </div>
              <div className="mt-1.5 text-[7.5px] sm:text-[9px] leading-tight text-[#f8f6e3]/70 font-ui">
                System &amp; Business Analyst
              </div>
            </div>
          </div>

          {/* ==================== BACK ==================== */}
          <div
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            className="absolute inset-0 rounded-[14px] bg-[#f5f2cb] text-[#0a0a0a] shadow-[0_22px_50px_rgba(0,0,0,0.75)] border border-[#0a0a0a]/25 p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="flex flex-col items-center mb-1.5 sm:mb-2">
                <div className="w-8 h-1.5 sm:h-2 invisible" aria-hidden="true" />
                <span className="absolute left-1/2 -translate-x-1/2 top-[10px] w-[22px] h-[7px] sm:top-[12px] sm:w-[30px] sm:h-[9px] rounded-full bg-[#0a0a0a] shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.9)] ring-1 ring-black/10" />
              </div>
              <div className="w-full flex items-center justify-between border-b border-[#0a0a0a]/15 pb-1 gap-1">

                <span className="px-1.5 py-0.5 bg-[#ea4530] text-[#f1eec0] rounded-[3px] text-[7.5px] sm:text-[8px] font-mono font-bold tracking-tight shrink-0">
                  ISTQB® CTFL
                </span>
              </div>
            </div>

            <div className="space-y-1 text-left pt-0.5">
              <div className="text-[12px] sm:text-[14px] font-extrabold font-ui leading-[1.05] tracking-tight text-[#0a0a0a]">
                System &amp; Business Analyst
              </div>
              <div className="text-[8.5px] sm:text-[9.5px] font-bold text-[#ea4530] font-mono tracking-tight uppercase leading-tight">
                Software Engineer · QA Lead
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
