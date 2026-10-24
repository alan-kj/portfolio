"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./Magnetic.module.css";

type MagneticProps = Readonly<{
  children: ReactNode;
  strength?: number;
}>;

// Pulls its child toward the pointer. Fine pointers only.
export default function Magnetic({ children, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!el || !canHover) return;

    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      el.style.setProperty("--mag-x", `${(dx * strength).toFixed(1)}px`);
      el.style.setProperty("--mag-y", `${(dy * strength).toFixed(1)}px`);
    };
    const onLeave = () => {
      el.style.removeProperty("--mag-x");
      el.style.removeProperty("--mag-y");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span ref={ref} className={styles.magnetic}>
      {children}
    </span>
  );
}
