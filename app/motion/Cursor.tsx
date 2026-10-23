"use client";

import { useEffect, useRef } from "react";
import styles from "./Cursor.module.css";

const EASE = 0.18;

// A ring that trails the pointer and swells over links and buttons. It sits beside the native
// cursor rather than replacing it, and only runs for fine pointers without reduced motion.
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ring.current;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !canHover || reduce) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let placed = false;

    const render = () => {
      current.x += (target.x - current.x) * EASE;
      current.y += (target.y - current.y) * EASE;
      el.style.transform = `translate3d(${current.x.toFixed(1)}px, ${current.y.toFixed(1)}px, 0)`;
      const settled = Math.abs(target.x - current.x) < 0.1 && Math.abs(target.y - current.y) < 0.1;
      frame = settled ? 0 : requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!placed) {
        // First move: start at the pointer instead of sliding in from the corner.
        current.x = target.x;
        current.y = target.y;
        placed = true;
        el.dataset.visible = "true";
      }
      if (!frame) frame = requestAnimationFrame(render);
    };

    const onOver = (event: PointerEvent) => {
      const interactive = (event.target as Element | null)?.closest("a, button, [data-cursor]");
      el.dataset.active = interactive ? "true" : "false";
    };

    const onLeave = () => {
      el.dataset.visible = "false";
      placed = false;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ring} className={styles.cursor} aria-hidden="true">
      <span className={styles.ring} />
    </div>
  );
}
