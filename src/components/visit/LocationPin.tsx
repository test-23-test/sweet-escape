"use client";

import { m } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  label?: string;
  className?: string;
};

export function LocationPin({ label = "SweetEscape", className }: Props) {
  const reduced = useReducedMotion();
  const pulse = reduced ? 0 : Infinity;

  return (
    <div className={className}>
      <div className="relative">
        <m.span
          aria-hidden
          initial={{ scale: 0.6, opacity: 0.7 }}
          animate={{ scale: [0.6, 2, 0.6], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2.2, repeat: pulse, ease: "easeOut" }}
          className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-terracotta)]"
          style={{ width: 48, height: 48 }}
        />
        <m.span
          aria-hidden
          initial={{ scale: 0.6, opacity: 0.55 }}
          animate={{ scale: [0.6, 2.6, 0.6], opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 2.2, repeat: pulse, ease: "easeOut", delay: 0.4 }}
          className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-honey)]"
          style={{ width: 80, height: 80 }}
        />
        <div className="flex flex-col items-center">
          <m.div
            initial={{ y: 12, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.3 }}
            className="rounded-full bg-[var(--color-espresso)] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-cream)] shadow-lift"
          >
            {label}
          </m.div>
          <svg width="26" height="38" viewBox="0 0 26 38" className="-mt-0.5">
            <path
              d="M13 0C5.8 0 0 5.8 0 13c0 10 13 25 13 25s13-15 13-25C26 5.8 20.2 0 13 0z"
              fill="var(--color-terracotta)"
              stroke="var(--color-espresso)"
              strokeWidth="1"
            />
            <circle cx="13" cy="13" r="5" fill="var(--color-cream)" />
          </svg>
        </div>
      </div>
    </div>
  );
}
