"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Scroll reveals run in CSS (base.css) where scroll-driven animation is supported.
// This is the fallback: under `.js` the CSS hides reveal elements and this shows them as they enter.
export default function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (CSS.supports("animation-timeline: view()")) return;

    document.documentElement.classList.add("js");
    const items = document.querySelectorAll("[data-reveal]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
