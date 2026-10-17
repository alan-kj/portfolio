"use client";
import { useEffect, useState } from "react";

// Rotates through `words` with a type/delete effect.
// Server render shows the first word in full, so there is no layout shift and no-JS users see real text.
type TypewriterProps = {
  words: readonly string[];
};

export default function Typewriter({ words }: TypewriterProps) {
  const [text, setText] = useState(words[0] ?? "");

  useEffect(() => {
    if (words.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let wordIndex = 0;
    let characterIndex = words[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = words[wordIndex];
      if (word === undefined) return;

      characterIndex += deleting ? -1 : 1;
      setText(word.slice(0, characterIndex));
      let delay = deleting ? 38 : 70;

      if (!deleting && characterIndex === word.length) {
        deleting = true;
        delay = 2000;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
      }

      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 2200);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <span className="typewriter">
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden="true" className="tw">{text}<i className="caret" /></span>
    </span>
  );
}
