"use client";
import { useEffect } from "react";

// Progressive enhancement: scroll reveals, pointer spotlight and a scroll-progress fallback.
// Renders nothing; everything is driven by data attributes and CSS.
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scroll reveal (runs once per element)
    const items = document.querySelectorAll("[data-reveal]");
    let io;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
    } else {
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
      items.forEach((el) => io.observe(el));
    }

    // Scroll progress bar fallback for browsers without scroll-driven animations
    const bar = document.querySelector(".progress");
    let raf = 0, onScroll;
    if (bar && !CSS.supports("animation-timeline: scroll()")) {
      onScroll = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const max = root.scrollHeight - innerHeight;
          bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
        });
      };
      addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // Pointer spotlight on project rows (fine pointers only)
    const rows = [...document.querySelectorAll(".proj")];
    const move = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    };
    if (!reduce && matchMedia("(pointer: fine)").matches) rows.forEach((r) => r.addEventListener("pointermove", move));

    return () => {
      io?.disconnect();
      if (onScroll) removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      rows.forEach((r) => r.removeEventListener("pointermove", move));
    };
  }, []);
  return null;
}
