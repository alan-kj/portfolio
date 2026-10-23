"use client";

import { useEffect } from "react";

const EASE = 0.08;

// Eases the page light (--mx/--my) and the wordmark width (--px) toward the pointer.
// Fine pointers only; reduced motion and touch keep the static defaults from the stylesheet.
export default function HeroLight() {
  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduce) return;

    const root = document.documentElement;
    const target = { x: 0.5, y: -0.08, width: 1 };
    const current = { ...target };
    let frame = 0;

    const render = () => {
      current.x += (target.x - current.x) * EASE;
      current.y += (target.y - current.y) * EASE;
      current.width += (target.width - current.width) * EASE;
      root.style.setProperty("--mx", `${(current.x * 100).toFixed(2)}%`);
      root.style.setProperty("--my", `${(current.y * 100).toFixed(2)}%`);
      root.style.setProperty("--px", current.width.toFixed(3));

      const settled =
        Math.abs(target.x - current.x) < 0.0005 &&
        Math.abs(target.y - current.y) < 0.0005 &&
        Math.abs(target.width - current.width) < 0.0005;
      frame = settled ? 0 : requestAnimationFrame(render);
    };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX / window.innerWidth;
      target.y = event.clientY / window.innerHeight;
      target.width = target.x;
      if (!frame) frame = requestAnimationFrame(render);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      ["--mx", "--my", "--px"].forEach((name) => root.style.removeProperty(name));
    };
  }, []);

  return null;
}
