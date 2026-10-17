"use client";
import { useEffect, useState } from "react";

// Rotates through `words` with a type/delete effect.
// Server render shows the first word in full, so there is no layout shift and no-JS users see real text.
export default function Typewriter({ words }) {
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0, n = words[0].length, deleting = true, t;
    const tick = () => {
      const word = words[w];
      n += deleting ? -1 : 1;
      setText(word.slice(0, n));
      let delay = deleting ? 38 : 70;
      if (!deleting && n === word.length) { deleting = true; delay = 2000; }
      else if (deleting && n === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
      t = setTimeout(tick, delay);
    };
    t = setTimeout(tick, 2200);
    return () => clearTimeout(t);
  }, [words]);

  return (
    <span className="typewriter">
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden="true" className="tw">{text}<i className="caret" /></span>
    </span>
  );
}
