import React, { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const [cursorState, setCursorState] = useState("default"); // default | active | drag
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    let rafId = null;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) setVisible(true);

      const el = e.target;
      if (!el) return;
      if (el.closest("[data-cursor='drag']")) {
        setCursorState("drag");
      } else if (
        el.closest("a, button, [role='button'], input, textarea, [data-cursor='active']")
      ) {
        setCursorState("active");
      } else {
        setCursorState("default");
      }
    };

    const onMouseLeave = () => setVisible(false);

    const render = () => {
      currentX += (targetX - currentX) * 0.28;
      currentY += (targetY - currentY) * 0.28;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className={`cursor-dot ${
        cursorState === "active"
          ? "is-active"
          : cursorState === "drag"
          ? "is-drag"
          : ""
      }`}
    />
  );
}

