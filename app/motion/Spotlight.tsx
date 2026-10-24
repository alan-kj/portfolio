"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Spotlight.module.css";

type SpotlightProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

// A soft light that follows the pointer across a surface. Fine pointers only.
export default function Spotlight({ children, className = "" }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!el || !canHover) return;

    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      el.style.setProperty("--sx", `${(event.clientX - box.left).toFixed(0)}px`);
      el.style.setProperty("--sy", `${(event.clientY - box.top).toFixed(0)}px`);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={ref} className={`${styles.spotlight} ${className}`}>
      {children}
    </div>
  );
}
