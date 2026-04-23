"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { CartBadge } from "@/components/order/CartBadge";
import { lock, unlock } from "@/lib/scrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const NAV = [
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Story" },
  { href: "/order", label: "Order" },
  { href: "/gallery", label: "Gallery" },
  { href: "/visit", label: "Visit" },
];

// Nav-center scanline — pill is centered in the 64-px header.
const SCANLINE_Y = 32;

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [darkOverlay, setDarkOverlay] = useState(false);
  const mobileNavRef = useFocusTrap<HTMLDivElement>(open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel whenever the user navigates.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock scroll + listen for Escape while the mobile panel is open.
  useEffect(() => {
    if (!open) return;
    lock();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlock();
    };
  }, [open]);

  // Dark-section detection. Any full-width element flagged with
  // `data-theme="dark"` that crosses the nav's vertical center (~32 px
  // below the viewport top) should flip the nav to a cream-on-espresso
  // contrast pair.
  useEffect(() => {
    if (typeof document === "undefined") return;

    let rafId = 0;
    const check = () => {
      rafId = 0;
      const nodes = document.querySelectorAll<HTMLElement>('[data-theme="dark"]');
      let overlap = false;
      for (const n of Array.from(nodes)) {
        const rect = n.getBoundingClientRect();
        if (rect.top <= SCANLINE_Y && rect.bottom >= SCANLINE_Y) {
          overlap = true;
          break;
        }
      }
      setDarkOverlay((prev) => (prev === overlap ? prev : overlap));
    };

    const schedule = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(check);
    };

    // Run immediately and again after a short delay to catch DOM settling
    // after route transitions (template.tsx renders, dynamic imports load).
    check();
    const settleTimer = window.setTimeout(check, 100);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    let moTimer = 0;
    const debouncedSchedule = () => {
      if (moTimer) return;
      moTimer = window.setTimeout(() => { moTimer = 0; schedule(); }, 150);
    };
    const mo = new MutationObserver(debouncedSchedule);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mo.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
      if (moTimer) window.clearTimeout(moTimer);
      window.clearTimeout(settleTimer);
    };
  }, [pathname]);

  return (
    <m.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      data-overlay={darkOverlay ? "dark" : "light"}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Subtle top scrim so pinned section content never reads right under the
          pill. Fades from the current section tone into transparent. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-20 -z-10 transition-opacity duration-500",
          darkOverlay
            ? "bg-gradient-to-b from-[var(--color-espresso)]/85 to-transparent opacity-100"
            : scrolled
              ? "bg-gradient-to-b from-[var(--color-cream)]/70 to-transparent opacity-100"
              : "opacity-0",
        )}
      />

      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8">
        <Link
          href="/"
          aria-label="SweetEscape — home"
          className={cn(
            "group flex items-center gap-2 font-display text-[1.35rem] leading-none tracking-tight transition-colors duration-300",
            darkOverlay ? "text-[var(--color-cream)]" : "text-[var(--color-ink)]",
          )}
        >
          <LogoMark darkOverlay={darkOverlay} />
          <span>
            Sweet
            <span
              className={cn(
                "transition-colors duration-300",
                darkOverlay ? "text-[var(--color-honey)]" : "text-[var(--color-terracotta)]",
              )}
            >
              Escape
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className={cn(
            "relative hidden items-center gap-1 rounded-full px-2 py-1.5 md:flex",
            "ring-1 ring-inset shadow-soft backdrop-blur-xl transition-[background-color,box-shadow,color] duration-500 ease-cubic",
            darkOverlay
              ? "bg-[color-mix(in_oklab,var(--color-espresso),transparent_10%)] ring-[color-mix(in_oklab,var(--color-honey),transparent_65%)]"
              : scrolled
                ? "bg-[color-mix(in_oklab,var(--color-cream),transparent_8%)] ring-[color-mix(in_oklab,var(--color-ink),transparent_82%)]"
                : "bg-[color-mix(in_oklab,var(--color-cream),transparent_25%)] ring-[color-mix(in_oklab,var(--color-ink),transparent_85%)]",
          )}
        >
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300",
                  active
                    ? darkOverlay
                      ? "text-[var(--color-espresso)]"
                      : "text-[var(--color-cream)]"
                    : darkOverlay
                      ? "text-[var(--color-cream)] hover:text-[var(--color-honey)]"
                      : "text-[var(--color-ink)] hover:text-[var(--color-terracotta)]",
                )}
              >
                {active && (
                  <m.span
                    layoutId="nav-pill"
                    className={cn(
                      "absolute inset-0 -z-[1] rounded-full",
                      darkOverlay ? "bg-[var(--color-cream)]" : "bg-[var(--color-espresso)]",
                    )}
                    transition={{ type: "spring", stiffness: 360, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <CartBadge darkOverlay={darkOverlay} />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav-panel"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-full shadow-soft md:hidden transition-colors duration-300",
              darkOverlay && !open
                ? "bg-[var(--color-cream)] text-[var(--color-espresso)]"
                : "bg-[var(--color-espresso)] text-[var(--color-cream)]",
            )}
          >
            <span
              className={cn(
                "absolute h-px w-5 bg-current transition-transform duration-300",
                open ? "translate-y-0 rotate-45" : "-translate-y-1.5",
              )}
            />
            <span
              className={cn(
                "absolute h-px w-5 bg-current transition-transform duration-300",
                open ? "-translate-y-0 -rotate-45" : "translate-y-1.5",
              )}
            />
          </button>
          <MagneticLink
            href="/order"
            className={cn(
              "hidden rounded-full px-5 py-2 text-sm font-medium shadow-soft md:inline-flex transition-colors duration-300",
              darkOverlay
                ? "bg-[var(--color-honey)] text-[var(--color-espresso)] hover:!text-[var(--color-espresso)]"
                : "bg-[var(--color-terracotta)] text-[var(--color-cream)] hover:!text-[var(--color-cream)]",
            )}
          >
            Order
          </MagneticLink>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <m.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[-1] md:hidden"
              onClick={() => setOpen(false)}
            />
            <m.div
              id="mobile-nav-panel"
              ref={mobileNavRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mx-4 overflow-hidden rounded-3xl bg-[var(--color-espresso)] p-6 text-[var(--color-cream)] shadow-lift md:hidden"
            >
              <ul className="flex flex-col gap-3 text-2xl font-display">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-2xl px-4 py-3 transition-colors hover:bg-[color-mix(in_oklab,var(--color-cream),transparent_90%)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-cream),transparent_55%)]">
                Esc to close · tap outside to dismiss
              </p>
            </m.div>
          </>
        ) : null}
      </AnimatePresence>
    </m.header>
  );
}

function LogoMark({ darkOverlay }: { darkOverlay: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden className="shrink-0">
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8A345" />
          <stop offset="100%" stopColor="#C8553D" />
        </linearGradient>
      </defs>
      <circle
        cx="14"
        cy="14"
        r="13"
        fill={darkOverlay ? "var(--color-cream)" : "var(--color-espresso)"}
        className="transition-colors duration-300"
      />
      <path
        d="M7 18c2.5-1 4-3 4-5s-1.5-3-3-3 .5 2 2 2 4-1 4-3.5S12 6 10 7s-4 3-3 6 3 5 6 5 7-2 7-6-3-6-7-6"
        fill="none"
        stroke="url(#logo-grad)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
