"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Fades and slides its content into view as it scrolls near (once). Under reduced motion it only fades. Content is
 * visible without JavaScript: the hidden state is set only after the page is running.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  /** Milliseconds, to stagger the parts of one section. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (el === null || typeof IntersectionObserver === "undefined") return;
    // Already on screen when the page opens (the hero): shown, with its stagger, without waiting for a scroll.
    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={state === "shown" ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-opacity motion-reduce:duration-500",
        state === "hidden" && "opacity-0 motion-safe:translate-y-6",
        state === "shown" && "translate-y-0 opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
