"use client";

import { m, AnimatePresence } from "motion/react";
import { ShoppingBag } from "@phosphor-icons/react/dist/ssr";
import { useCart, useCartCount } from "@/stores/cart";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/cn";

export function CartBadge({ className, darkOverlay }: { className?: string; darkOverlay?: boolean }) {
  const toggle = useCart((s) => s.toggle);
  const count = useCartCount();
  const ref = useMagnetic<HTMLButtonElement>({ strength: 0.25, radius: 90 });

  return (
    <button
      ref={ref}
      type="button"
      onClick={toggle}
      aria-label={`Open bag · ${count} item${count === 1 ? "" : "s"}`}
      className={cn(
        "relative inline-flex h-10 items-center gap-2 rounded-full px-3 pr-4 transition-colors duration-300",
        "ring-1 ring-inset",
        darkOverlay
          ? "bg-[var(--color-cream)] text-[var(--color-espresso)] ring-[color-mix(in_oklab,var(--color-ink),transparent_85%)] hover:bg-[color-mix(in_oklab,var(--color-cream),#fff_10%)]"
          : "bg-[var(--color-espresso)] text-[var(--color-cream)] ring-[color-mix(in_oklab,var(--color-cream),transparent_85%)] hover:bg-[color-mix(in_oklab,var(--color-espresso),#000_10%)]",
        className,
      )}
    >
      <ShoppingBag size={18} weight="duotone" className="text-[var(--color-honey)]" />
      <span className="font-mono text-[0.78rem] uppercase tracking-[0.18em]">Bag</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={count}
          initial={{ y: -8, opacity: 0, scale: 0.6 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 8, opacity: 0, scale: 0.6 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="inline-flex min-w-[1.35rem] items-center justify-center rounded-full bg-[var(--color-terracotta)] px-1.5 text-[0.72rem] font-semibold leading-[1.35rem] text-[var(--color-cream)]"
        >
          {count}
        </m.span>
      </AnimatePresence>
    </button>
  );
}
