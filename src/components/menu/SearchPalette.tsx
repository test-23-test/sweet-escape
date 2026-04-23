"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { m, AnimatePresence } from "motion/react";
import { MagnifyingGlass, X, ArrowRight, Command } from "@phosphor-icons/react/dist/ssr";
import { MENU, CATEGORY_LABELS } from "@/data/menu";
import { formatRupees } from "@/stores/cart";
import { lock, unlock } from "@/lib/scrollLock";
import { cn } from "@/lib/cn";

export function SearchPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    lock();
    return () => {
      unlock();
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MENU.slice(0, 6);
    return MENU.filter((m) =>
      [m.name, m.subtitle, m.description, m.category]
        .join(" ")
        .toLowerCase()
        .includes(q),
    ).slice(0, 10);
  }, [query]);

  // Reset selection whenever the result set changes.
  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  // Keep the active result visible as the user arrows through.
  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-active="true"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open, results.length]);

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(results.length - 1, i + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(0, i - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[activeIndex];
      if (!target) return;
      setOpen(false);
      router.push(`/menu#${target.id}`);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(results.length - 1);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search menu"
        className="group inline-flex items-center gap-3 rounded-full border border-[color-mix(in_oklab,var(--color-ink),transparent_80%)] bg-[var(--color-linen)]/60 px-4 py-2 text-sm text-[color-mix(in_oklab,var(--color-ink),transparent_30%)] backdrop-blur transition-colors hover:border-[var(--color-ink)]/40"
      >
        <MagnifyingGlass size={14} weight="bold" />
        <span>Search the menu</span>
        <kbd className="ml-6 inline-flex items-center gap-1 rounded-md border border-[color-mix(in_oklab,var(--color-ink),transparent_80%)] bg-[var(--color-cream)] px-1.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.2em]">
          <Command size={10} weight="bold" /> K
        </kbd>
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[90] bg-[color-mix(in_oklab,var(--color-espresso),transparent_30%)] backdrop-blur-sm"
            />
            <m.div
              role="dialog"
              aria-label="Search the menu"
              aria-modal="true"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 360, damping: 30 }}
              className="fixed left-1/2 top-[14%] z-[91] w-[min(720px,calc(100vw-2rem))] -translate-x-1/2"
            >
              <div className="overflow-hidden rounded-3xl bg-[var(--color-cream)] shadow-lift ring-1 ring-[color-mix(in_oklab,var(--color-ink),transparent_85%)]">
                <div className="flex items-center gap-3 border-b border-[color-mix(in_oklab,var(--color-ink),transparent_90%)] px-5 py-4">
                  <MagnifyingGlass size={18} weight="bold" className="text-[var(--color-terracotta)]" />
                  <input
                    ref={inputRef}
                    type="search"
                    placeholder="Try 'saffron' or 'kouign'"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={onInputKeyDown}
                    aria-controls="search-palette-list"
                    aria-activedescendant={
                      results[activeIndex] ? `search-opt-${results[activeIndex].id}` : undefined
                    }
                    aria-autocomplete="list"
                    className="flex-1 bg-transparent text-lg outline-none placeholder:text-[color-mix(in_oklab,var(--color-ink),transparent_55%)]"
                  />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close search"
                    className="rounded-full p-1.5 transition-colors hover:bg-[color-mix(in_oklab,var(--color-ink),transparent_90%)]"
                  >
                    <X size={16} />
                  </button>
                </div>
                <ul
                  ref={listRef}
                  id="search-palette-list"
                  role="listbox"
                  className="max-h-[60vh] overflow-y-auto p-2"
                  data-lenis-prevent
                >
                  {results.length === 0 ? (
                    <li className="flex flex-col items-center gap-2 py-12 text-center">
                      <p className="font-display text-2xl">No match.</p>
                      <p className="text-sm text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                        Try a simpler word — &quot;chocolate&quot; or &quot;bread&quot;.
                      </p>
                    </li>
                  ) : (
                    results.map((r, i) => {
                      const isActive = i === activeIndex;
                      return (
                        <li key={r.id} role="presentation">
                          <Link
                            id={`search-opt-${r.id}`}
                            href={`/menu#${r.id}`}
                            role="option"
                            aria-selected={isActive}
                            data-active={isActive}
                            onMouseEnter={() => setActiveIndex(i)}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "flex items-center gap-4 rounded-2xl px-3 py-2.5 transition-colors",
                              isActive
                                ? "bg-[color-mix(in_oklab,var(--color-terracotta),transparent_88%)] ring-1 ring-[color-mix(in_oklab,var(--color-terracotta),transparent_45%)]"
                                : "hover:bg-[color-mix(in_oklab,var(--color-ink),transparent_92%)]",
                            )}
                          >
                            <span
                              aria-hidden
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
                              style={{ background: r.accent, color: "var(--color-cream)" }}
                            >
                              •
                            </span>
                            <div className="flex-1">
                              <p className="font-display text-lg leading-tight">{r.name}</p>
                              <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_50%)]">
                                {CATEGORY_LABELS[r.category]} · {r.subtitle}
                              </p>
                            </div>
                            <span className="font-mono text-sm tabular-nums">{formatRupees(r.price)}</span>
                            <ArrowRight
                              size={14}
                              weight="bold"
                              className={cn(
                                "transition-transform duration-200",
                                isActive
                                  ? "translate-x-0.5 text-[var(--color-terracotta)]"
                                  : "text-[var(--color-terracotta)]/60",
                              )}
                            />
                          </Link>
                        </li>
                      );
                    })
                  )}
                </ul>
                <footer className="flex items-center justify-between border-t border-[color-mix(in_oklab,var(--color-ink),transparent_90%)] bg-[var(--color-linen)] px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                  <span className="inline-flex items-center gap-2">
                    <Kbd>↑</Kbd>
                    <Kbd>↓</Kbd>
                    <span>navigate</span>
                    <span aria-hidden>·</span>
                    <Kbd>↵</Kbd>
                    <span>open</span>
                    <span aria-hidden>·</span>
                    <Kbd>esc</Kbd>
                    <span>close</span>
                  </span>
                  <span>{results.length} of {MENU.length}</span>
                </footer>
              </div>
            </m.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex min-w-[1.25rem] items-center justify-center rounded border border-[color-mix(in_oklab,var(--color-ink),transparent_80%)] bg-[var(--color-cream)] px-1 py-px font-mono text-[0.65rem] uppercase tracking-[0.18em]">
      {children}
    </kbd>
  );
}
