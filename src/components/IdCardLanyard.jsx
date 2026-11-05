import React, { useEffect, useRef, useState } from "react";

export default function IdCardLanyard({ lang = "en", isReady = true }) {
  const containerRef = useRef(null);

  // Offset (x, y) from resting position, plus tilt angle (rot)
  // Starts high above the screen ceiling (-800px) so it naturally falls down when opened
  const [offset, setOffset] = useState({ x: 0, y: -800, rot: -10 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [viewport, setViewport] = useState({ w: 1280, h: 800 });

  const physicsRef = useRef({
    x: 0,
    y: -800,
    vx: 0,
    vy: 0,
    rot: -10,
    vRot: 0,
    dragging: false,
    startX: 0,
    startY: 0,
    pointerDownTime: 0,
    dragDistance: 0,
  });

  // Track viewport size for accurate layout
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setViewport({
        w: rect.width || window.innerWidth,
        h: rect.height || window.innerHeight,
      });
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Trigger natural falling animation from top when preloader clears or component mounts
  useEffect(() => {
    if (!isReady) return;

    // Small delay so the preloader reveal happens smoothly first
    const timer = setTimeout(() => {
      const p = physicsRef.current;
      p.x = 0;
      p.y = -Math.max(520, viewport.h * 0.75);
      p.vx = (Math.random() - 0.5) * 6; // subtle organic horizontal drift
      p.vy = 28; // strong downward falling velocity
      p.rot = -12;
      p.vRot = 3.2;
      setOffset({ x: p.x, y: p.y, rot: p.rot });
    }, 180);

    return () => clearTimeout(timer);
  }, [isReady, viewport.h]);

  // Spring physics loop: elastic spring-damper with sharp upward snap recoil & realistic bounce
  useEffect(() => {
    let rafId;
    const stiffness = 0.075;
    const damping = 0.86;

    const step = () => {
      const p = physicsRef.current;
      if (!p.dragging) {
        // Restoring spring force towards upright resting point (0, 0)
        const ax = -stiffness * p.x;
        const ay = -stiffness * p.y;
        p.vx = (p.vx + ax) * damping;
        p.vy = (p.vy + ay) * damping;
        p.x += p.vx;
        p.y += p.vy;

        // Dynamic pendulum rotation coupled to movement velocity
        const targetRot = p.x * 0.04 + p.vx * 0.38 + p.vy * 0.04;
        const aRot = (targetRot - p.rot) * 0.15;
        p.vRot = (p.vRot + aRot) * 0.84;
        p.rot += p.vRot;

        if (
          Math.abs(p.x) > 0.02 ||
          Math.abs(p.y) > 0.02 ||
          Math.abs(p.vx) > 0.02 ||
          Math.abs(p.vy) > 0.02 ||
          Math.abs(p.rot) > 0.02
        ) {
          setOffset({ x: p.x, y: p.y, rot: p.rot });
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Window-level dragging listeners
  const handlePointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;

    const p = physicsRef.current;
    p.dragging = true;
    p.startX = clientX - p.x;
    p.startY = clientY - p.y;
    p.vx = 0;
    p.vy = 0;
    p.pointerDownTime = Date.now();
    p.dragDistance = 0;
    setIsDragging(true);

    const handleWindowMove = (moveEvent) => {
      if (!p.dragging) return;
      const curX = moveEvent.clientX ?? moveEvent.touches?.[0]?.clientX ?? 0;
      const curY = moveEvent.clientY ?? moveEvent.touches?.[0]?.clientY ?? 0;

      const rawX = curX - p.startX;
      const rawY = curY - p.startY;

      const dist = Math.hypot(rawX, rawY);
      p.dragDistance = Math.max(p.dragDistance, dist);

      // Elastic limit for pull
      const maxPull = 450;
      const scale = dist > maxPull ? maxPull / dist : 1;
      const nextX = rawX * scale;
      const nextY = rawY * scale;

      p.vx = nextX - p.x;
      p.vy = nextY - p.y;
      p.x = nextX;
      p.y = nextY;
      p.rot = Math.max(-30, Math.min(30, nextX * 0.05 + p.vx * 0.4));

      setOffset({ x: p.x, y: p.y, rot: p.rot });
    };

    const handleWindowUp = () => {
      if (!p.dragging) return;
      p.dragging = false;
      setIsDragging(false);

      window.removeEventListener("pointermove", handleWindowMove);
      window.removeEventListener("pointerup", handleWindowUp);
      window.removeEventListener("pointercancel", handleWindowUp);

      const elapsed = Date.now() - p.pointerDownTime;
      // If quick tap without dragging, flip the ID card!
      if (p.dragDistance < 10 && elapsed < 320) {
        setIsFlipped((prev) => !prev);
        return;
      }

      // "terlempar gitu animasinya keatas seperti menarik id card asli"
      // If pulled downward, release gives an immediate upward fling velocity!
      if (p.y > 15) {
        p.vy = -(p.y * 0.44 + 16);
        p.vx = -p.x * 0.25;
      }
    };

    window.addEventListener("pointermove", handleWindowMove);
    window.addEventListener("pointerup", handleWindowUp);
    window.addEventListener("pointercancel", handleWindowUp);
  };

  // Dimensions & Anchors:
  // Perfectly straight vertical layout — NO diagonal slant!
  const isMobile = viewport.w < 768;
  const baseClipX = isMobile
    ? viewport.w * 0.5
    : Math.min(viewport.w * 0.82, viewport.w - 120);
  const baseClipY = isMobile ? viewport.h * 0.52 : viewport.h * 0.54;

  // The strap anchor is at the EXACT same horizontal position as the card,
  // starting well above the ceiling (-60px) so it hangs 100% straight down without being cut off!
  const anchorX = baseClipX;
  const anchorY = -60;

  const currentClipX = baseClipX + offset.x;
  const currentClipY = baseClipY + offset.y;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none select-none z-10 overflow-visible"
    >
      {/* 100% Straight Vertical Solid Lanyard Strap (Clean smooth ribbon, no stripes) */}
      <svg
        className="w-full h-full overflow-visible pointer-events-none"
        viewBox={`0 0 ${viewport.w} ${viewport.h}`}
      >
        <defs>
          <linearGradient id="solidSmoothStrap" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1c1c1c" />
            <stop offset="35%" stopColor="#252525" />
            <stop offset="65%" stopColor="#252525" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
        </defs>

        {/* Soft drop shadow behind the vertical strap */}
        <line
          x1={anchorX}
          y1={anchorY}
          x2={currentClipX}
          y2={currentClipY - 18}
          stroke="rgba(0,0,0,0.45)"
          strokeWidth={isMobile ? "16" : "22"}
          strokeLinecap="butt"
          transform="translate(0, 3)"
        />

        {/* Smooth Solid Matte Ribbon Strap (Clean, uniform, no stripes or dashed texture) */}
        <line
          x1={anchorX}
          y1={anchorY}
          x2={currentClipX}
          y2={currentClipY - 18}
          stroke="url(#solidSmoothStrap)"
          strokeWidth={isMobile ? "14" : "20"}
          strokeLinecap="butt"
        />

        {/* Metal Lobster Hook Clasp */}
        <g
          transform={`translate(${currentClipX}, ${currentClipY}) rotate(${offset.rot * 0.45
            })`}
        >
          {/* Clamp Fold */}
          <rect
            x={isMobile ? -9 : -12}
            y="-22"
            width={isMobile ? 18 : 24}
            height="8"
            rx="2"
            fill="#222"
            stroke="#444"
            strokeWidth="1.2"
          />
          {/* Metal D-Ring */}
          <ellipse
            cx="0"
            cy="-12"
            rx="6.5"
            ry="4.5"
            fill="none"
            stroke="#777"
            strokeWidth="2.2"
          />
          {/* Swivel Barrel */}
          <rect
            x="-3.5"
            y="-9"
            width="7"
            height="8"
            rx="1.5"
            fill="#555"
            stroke="#999"
            strokeWidth="1"
          />
          {/* Clasp Hook Passing into Card Slot */}
          <path
            d="M-2.5 -2 L2.5 -2 L3 7 C3 10 -3 10 -3 7 Z"
            fill="#444"
            stroke="#bbb"
            strokeWidth="1.2"
          />
        </g>
      </svg>

      {/* Draggable Blue ID Card (Upright, straight vertical, behind text) */}
      <div
        onPointerDown={handlePointerDown}
        data-cursor="drag"
        title={
          lang === "en"
            ? "Pull down & release to snap! (Or click to flip)"
            : "Tarik ke bawah & lepas untuk membal! (Atau klik untuk balik)"
        }
        style={{
          left: `${currentClipX}px`,
          top: `${currentClipY}px`,
          transform: `translate(-50%, 0px) rotate(${offset.rot}deg)`,
          transformOrigin: "50% 0%",
        }}
        className={`pointer-events-auto absolute w-[138px] h-[196px] sm:w-[166px] sm:h-[238px] touch-none select-none z-10 ${isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
      >
        {/* Card 3D Flip Container */}
        <div
          className="relative w-full h-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ==================== FRONT: BLUE ID BADGE WITH TRANSPARENT YUDA ENAMEL BADGE ==================== */}
          <div
            style={{ backfaceVisibility: "hidden" }}
            className="absolute inset-0 rounded-[12px] bg-[#55aee6] shadow-[0_22px_50px_rgba(0,0,0,0.75)] border border-[#7bc4f0]/50 overflow-hidden flex flex-col justify-between p-2.5 sm:p-3"
          >
            {/* Top Slot Hole */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-2 rounded-full bg-[#0a0a0a]/90 border border-black/40 shadow-inner" />
            </div>

            {/* Stacked Name (Exact Kenji typography) */}
            <div className="text-center leading-[0.92] tracking-[-0.02em] text-[#f1eec0] drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] pt-1">
              <div className="text-[23px] sm:text-[27px] font-extrabold font-ui lowercase">
                yuda
              </div>
              <div className="text-[20px] sm:text-[24px] font-extrabold font-ui lowercase">
                dwi putra
              </div>
            </div>

            {/* Official Transparent Yuda Enamel Pin Artwork (No white background!) */}
            <div className="relative w-full flex-1 flex items-center justify-center py-1 overflow-hidden">
              <img
                src="/yudaenamel.png"
                alt="Yuda Dwi Putra Enamel Badge"
                className="max-h-[110px] sm:max-h-[136px] w-auto object-contain drop-shadow-[0_8px_18px_rgba(0,0,0,0.4)] pointer-events-none select-none"
              />
            </div>

            {/* Bottom Sub-tag */}
            <div className="text-center text-[9px] sm:text-[10px] font-bold text-[#0a0a0a]/80 tracking-wider font-mono">
              OPEN TO WORK
            </div>
          </div>

          {/* ==================== BACK: STAFF CLEARANCE & ISTQB CREDENTIALS ==================== */}
          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className="absolute inset-0 rounded-[12px] bg-[#f1eec0] text-[#0a0a0a] shadow-[0_22px_50px_rgba(0,0,0,0.75)] border border-[#0a0a0a]/20 p-3 sm:p-3.5 flex flex-col justify-between"
          >
            {/* Top Slot + Header */}
            <div className="flex flex-col items-center">
              <div className="w-8 h-2 rounded-full bg-[#0a0a0a] mb-2" />
              <div className="w-full flex items-center justify-between text-[8.5px] font-extrabold tracking-wider border-b border-[#0a0a0a]/20 pb-1">
                <span>CLEARANCE // QA-BA</span>
                <span className="px-1.5 py-0.2 bg-[#ea4530] text-[#f1eec0] rounded text-[8px]">
                  ISTQB® CTFL
                </span>
              </div>
            </div>

            {/* CV Details */}
            <div className="my-auto space-y-1.5 text-left">
              <div className="text-[12px] sm:text-[13px] font-black leading-tight lowercase">
                yuda dwi putra
              </div>
              <div className="text-[9px] sm:text-[10px] font-bold text-[#ea4530] leading-tight">
                System &amp; Business Analyst
              </div>
              <div className="text-[8.5px] text-[#0a0a0a]/80 leading-snug pt-0.5">
                • Core Banking &amp; Treasury
                <br />
                • PT Bank Mandiri (KOPRA 5 Yrs)
                <br />
                • PT Adi Data (TNI AL &amp; SMI)
                <br />• 5× 1st Place Defect Hunter
              </div>
            </div>

            {/* Barcode */}
            <div className="pt-1 border-t border-[#0a0a0a]/20 flex flex-col items-center gap-0.5">
              <div className="w-full h-4 flex items-stretch justify-between gap-[1.5px]">
                {[2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 2, 3, 1].map((w, i) => (
                  <span
                    key={i}
                    className="bg-[#0a0a0a] inline-block"
                    style={{ flex: w }}
                  />
                ))}
              </div>
              <span className="text-[7.5px] font-mono tracking-widest opacity-60">
                23-CTFL-227561-12
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
