"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "./Contact.module.css";

type CopyState = "idle" | "copied" | "failed";

const labels: Record<CopyState, string> = {
  idle: "Copy email",
  copied: "Copied",
  failed: "Copy failed",
};

export default function CopyEmail({ email }: Readonly<{ email: string }>) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    let next: CopyState = "copied";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      next = "failed";
    }
    setState(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2200);
  }

  return (
    <>
      <button type="button" className={`btn btn-primary ${styles.copy}`} onClick={copy}>
        {state === "copied" ? (
          <Check size={16} aria-hidden="true" />
        ) : (
          <Copy size={16} aria-hidden="true" />
        )}
        {labels[state]}
      </button>
      <span className="sr-only" role="status">
        {state === "copied" && "Email address copied."}
        {state === "failed" && "Could not copy. Use the email link instead."}
      </span>
    </>
  );
}
