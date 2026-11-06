import React, { useEffect, useRef } from "react";

/*
 * Infinite marquee that also responds to the pointer:
 *  - auto-scrolls at a constant speed (one copy per `secondsPerLoop`)
 *  - mouse hover eases it to a stop
 *  - drag / swipe horizontally to scrub it, release to fling with momentum,
 *    then it eases back into the auto-scroll
 *  - vertical swipes on touch screens still scroll the page (touch-action: pan-y)
 * Children are rendered twice; the offset wraps by the width of one copy.
 */
export default function DraggableMarquee({
  children,
  secondsPerLoop = 76,
  className = "",
  trackClassName = "",
  style,
}) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const copyRef = useRef(null);
  const state = useRef({
    x: 0, // px scrolled (content moves left as x grows)
    fling: 0, // extra velocity from a throw, px/s
    speed: 0, // current auto speed, px/s (eases toward target)
    hover: false,
    dragging: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastT: 0,
    dragVel: 0,
    decided: false,
    visible: true,
    copyW: 0,
  });

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    const copy = copyRef.current;
    if (!wrap || !track || !copy) return undefined;
    const s = state.current;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      s.copyW = copy.getBoundingClientRect().width || 1;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(copy);

    const io = new IntersectionObserver(([entry]) => {
      s.visible = entry.isIntersecting;
    });
    io.observe(wrap);

    let raf = 0;
    let last = performance.now();
    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (s.visible && s.copyW > 1) {
        const autoSpeed = reduceMotion ? 0 : s.copyW / secondsPerLoop;
        const target = s.hover || s.dragging ? 0 : autoSpeed;
        s.speed += (target - s.speed) * Math.min(1, dt * 4);
        if (!s.dragging) {
          s.x += (s.speed + s.fling) * dt;
          s.fling *= Math.exp(-dt * 3.2);
          if (Math.abs(s.fling) < 2) s.fling = 0;
        }
        s.x = ((s.x % s.copyW) + s.copyW) % s.copyW;
        track.style.transform = `translate3d(${-s.x}px, 0, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onDown = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      s.pointerId = e.pointerId;
      s.startX = s.lastX = e.clientX;
      s.startY = e.clientY;
      s.lastT = performance.now();
      s.dragVel = 0;
      s.decided = false;
      s.fling = 0;
    };
    const onMove = (e) => {
      if (s.pointerId !== e.pointerId) return;
      const dx = e.clientX - s.startX;
      const dy = e.clientY - s.startY;
      if (!s.decided) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        s.decided = true;
        if (Math.abs(dx) <= Math.abs(dy)) {
          s.pointerId = null; // vertical intent: leave it to the page
          return;
        }
        s.dragging = true;
        wrap.setPointerCapture?.(e.pointerId);
        wrap.dataset.dragging = "true";
      }
      if (!s.dragging) return;
      const now = performance.now();
      const step = e.clientX - s.lastX;
      const dtm = Math.max(1, now - s.lastT) / 1000;
      s.x -= step;
      s.dragVel = s.dragVel * 0.7 + (-step / dtm) * 0.3;
      s.lastX = e.clientX;
      s.lastT = now;
    };
    const onUp = (e) => {
      if (s.pointerId !== e.pointerId && !s.dragging) return;
      if (s.dragging) {
        const idle = performance.now() - s.lastT;
        s.fling = idle > 90 ? 0 : Math.max(-3000, Math.min(3000, s.dragVel));
      }
      s.dragging = false;
      s.pointerId = null;
      delete wrap.dataset.dragging;
    };
    const onEnter = (e) => {
      if (e.pointerType === "mouse") s.hover = true;
    };
    const onLeave = (e) => {
      if (e.pointerType === "mouse") s.hover = false;
    };

    wrap.addEventListener("pointerdown", onDown);
    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerup", onUp);
    wrap.addEventListener("pointercancel", onUp);
    wrap.addEventListener("pointerenter", onEnter);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      wrap.removeEventListener("pointerdown", onDown);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerup", onUp);
      wrap.removeEventListener("pointercancel", onUp);
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [secondsPerLoop]);

  return (
    <div
      ref={wrapRef}
      data-cursor="drag"
      className={`overflow-hidden select-none cursor-grab data-[dragging=true]:cursor-grabbing ${className}`}
      style={{ touchAction: "pan-y", ...style }}
    >
      <div ref={trackRef} className={`flex w-max will-change-transform ${trackClassName}`}>
        <div ref={copyRef} className="flex shrink-0">
          {children}
        </div>
        <div className="flex shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
