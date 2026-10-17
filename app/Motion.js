"use client";
import { useEffect } from "react";

// Progressive enhancement for scroll reveals. The page remains visible without JavaScript.
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    return () => {
      io?.disconnect();
      root.classList.remove("js");
    };
  }, []);
  return null;
}
