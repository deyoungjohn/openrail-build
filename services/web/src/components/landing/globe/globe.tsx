"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

interface Scene {
  dispose(): void;
  setColors(c: Record<string, string>): void;
}

/** Colours from the page's own tokens, so the globe follows light and dark. */
function colors(): Record<string, string> {
  const css = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  return {
    ink: v("--text", "#0f172a"),
    dim: v("--border", "#e4e7ee"),
    accent: v("--accent", "#3f46fe"),
    mint: v("--accent", "#3f46fe"),
    bg: v("--bg", "#f7f8fa"),
  };
}

/**
 * The hero globe: payments arc between points and settle, the ten coin and chain icons ride its orbit. Drag to spin,
 * tap to send one. It loads after the page (three.js is only fetched here) and shows a line drawing until it is ready.
 */
export function Globe() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const scene = useRef<Scene | null>(null);
  const [ready, setReady] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const [THREE, world] = await Promise.all([import("three/webgpu"), import("./world.js")]);
      if (cancelled || canvas.current === null) return;
      const s = (await world.mount(canvas.current, {
        THREE,
        iconBase: "/icons/",
        colors,
        onRequest({ x, y }: { x: number; y: number }) {
          const chip = document.createElement("div");
          chip.className = "globe-chip";
          chip.innerHTML = "<i></i>payment <b>settled</b>";
          chip.style.left = `${x}px`;
          chip.style.top = `${y}px`;
          box.current?.append(chip);
          setTimeout(() => chip.remove(), 2500);
        },
      })) as Scene;
      if (cancelled) {
        s.dispose();
        return;
      }
      scene.current = s;
      setReady(true);
    })().catch(() => undefined);
    return () => {
      cancelled = true;
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  useEffect(() => {
    scene.current?.setColors(colors());
  }, [resolvedTheme, ready]);

  return (
    <div ref={box} className="relative aspect-square w-full">
      {ready ? null : (
        <svg
          viewBox="0 0 400 400"
          aria-hidden
          fill="none"
          stroke="currentColor"
          className="absolute inset-[8%] text-border"
        >
          <circle cx="200" cy="200" r="150" />
          <ellipse cx="200" cy="200" rx="60" ry="150" />
          <ellipse cx="200" cy="200" rx="115" ry="150" />
          <path d="M50 200h300M70 125h260M70 275h260" />
          <ellipse
            cx="200"
            cy="200"
            rx="190"
            ry="54"
            transform="rotate(-18 200 200)"
            strokeDasharray="3 6"
          />
        </svg>
      )}
      <canvas
        ref={canvas}
        role="img"
        aria-label="A globe of payments arriving from many chains and settling. Drag to spin, tap to send one."
        className="absolute inset-0 size-full cursor-grab touch-pan-y active:cursor-grabbing"
      />
    </div>
  );
}
