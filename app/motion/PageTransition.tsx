import { ViewTransition, type ReactNode } from "react";

// Slides a page in the direction a <Link transitionTypes> navigation travels; other updates stay still.
const slide = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" } as const;

export default function PageTransition({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ViewTransition enter={slide} exit={slide} default="none">
      {children}
    </ViewTransition>
  );
}
