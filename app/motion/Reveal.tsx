"use client";
import { useEffect } from "react";

// Progressive enhancement for scroll reveals. The page remains visible without JavaScript.
export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const items = document.querySelectorAll("[data-reveal]");
    let observer: IntersectionObserver | undefined;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
      );
      items.forEach((el) => observer?.observe(el));
    }

    return () => {
      observer?.disconnect();
      root.classList.remove("js");
    };
  }, []);
  return null;
}
