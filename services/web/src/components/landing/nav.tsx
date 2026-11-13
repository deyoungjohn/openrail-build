"use client";

import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Brand } from "@/components/brand";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/cn";
import { MENUS } from "./links";

/** The landing page's bar: three menus, Proof, and the way into the app. */
export function LandingNav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (bar.current && !bar.current.contains(e.target as Node)) setOpen(null);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", esc);
    };
  }, []);

  // The bar stays on screen while the page scrolls: a liquid-glass strip once the page has moved under it.
  return (
    <div className="sticky top-0 z-50 px-2 pt-2 sm:px-4 sm:pt-3">
      <header
        ref={bar}
        className={cn(
          "relative mx-auto flex h-16 max-w-[1240px] items-center gap-6 rounded-full px-3 transition-[background,border-color] duration-300 sm:px-4",
          scrolled ? "glass rounded-full!" : "border border-transparent",
        )}
      >
        <Link href="/" aria-label="Openrail home" className="shrink-0">
          <Brand className="h-8 w-auto" />
        </Link>

        <nav
          aria-label="Main"
          className="mx-auto hidden items-center gap-1 rounded-full p-1 lg:flex"
        >
          {MENUS.map((m) => (
            <div
              key={m.label}
              className="relative"
              onMouseEnter={() => setOpen(m.label)}
              onMouseLeave={() => setOpen((o) => (o === m.label ? null : o))}
            >
              <button
                type="button"
                aria-expanded={open === m.label}
                onClick={() => setOpen((o) => (o === m.label ? null : m.label))}
                className={cn(
                  "flex h-10 items-center gap-1 rounded-full px-4 text-[14px] font-medium transition-colors",
                  open === m.label ? "bg-accent text-on-accent" : "text-text hover:bg-surface-2",
                )}
              >
                {m.label}
                <ChevronDown
                  aria-hidden
                  size={14}
                  strokeWidth={2}
                  className={cn("transition-transform", open === m.label && "rotate-180")}
                />
              </button>
              {open === m.label ? (
                <div className="absolute top-full left-1/2 w-[320px] -translate-x-1/2 pt-3">
                  <ul className="rounded-2xl border border-border bg-surface p-2">
                    {m.items.map((it) => (
                      <li key={it.label}>
                        <a
                          href={it.href}
                          {...(it.external ? { target: "_blank", rel: "noreferrer" } : {})}
                          className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-surface-2"
                          onClick={() => setOpen(null)}
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block text-[14px] font-semibold">{it.label}</span>
                            <span className="block text-[13px] leading-5 text-muted">
                              {it.note}
                            </span>
                          </span>
                          {it.external ? (
                            <ArrowUpRight aria-hidden size={14} className="mt-1 text-muted" />
                          ) : null}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ))}
          <Link
            href="/proof"
            className="flex h-10 items-center rounded-full px-4 text-[14px] font-medium hover:bg-surface-2"
          >
            Proof
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <ThemeToggle />
          <Link
            href="/app"
            className="hidden h-11 items-center rounded-full bg-accent px-5 text-[14px] font-semibold text-on-accent hover:bg-accent-hover sm:inline-flex"
          >
            Open the app
          </Link>
          <button
            type="button"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            onClick={() => setMobile((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-border lg:hidden"
          >
            {mobile ? <X aria-hidden size={18} /> : <Menu aria-hidden size={18} />}
          </button>
        </div>

        {mobile ? (
          <div className="absolute inset-x-0 top-[72px] rounded-2xl border border-border bg-surface p-4 lg:hidden">
            {MENUS.map((m) => (
              <div key={m.label} className="mb-3">
                <p className="caption mb-1 font-semibold">{m.label}</p>
                <ul className="grid grid-cols-2 gap-1">
                  {m.items.map((it) => (
                    <li key={it.label}>
                      <a
                        href={it.href}
                        {...(it.external ? { target: "_blank", rel: "noreferrer" } : {})}
                        onClick={() => setMobile(false)}
                        className="block rounded-lg px-2 py-2 text-[14px] hover:bg-surface-2"
                      >
                        {it.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex gap-2">
              <Link
                href="/proof"
                className="flex h-11 flex-1 items-center justify-center rounded-full border border-border text-[14px] font-semibold"
              >
                Proof
              </Link>
              <Link
                href="/app"
                className="flex h-11 flex-1 items-center justify-center rounded-full bg-accent text-[14px] font-semibold text-on-accent"
              >
                Open the app
              </Link>
            </div>
          </div>
        ) : null}
      </header>
    </div>
  );
}
