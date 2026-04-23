"use client";

import { useRef, useCallback } from "react";
import { m } from "motion/react";
import { CATEGORY_LABELS, CATEGORY_ORDER, type MenuCategory } from "@/data/menu";
import { cn } from "@/lib/cn";

type Props = {
  active: MenuCategory | "all";
  onChange: (value: MenuCategory | "all") => void;
  counts?: Partial<Record<MenuCategory | "all", number>>;
};

export function CategoryFilter({ active, onChange, counts }: Props) {
  const items: Array<MenuCategory | "all"> = ["all", ...CATEGORY_ORDER];
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const idx = items.indexOf(active);
      let next = idx;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next = (idx + 1) % items.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        next = (idx - 1 + items.length) % items.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = items.length - 1;
      } else {
        return;
      }
      onChange(items[next]);
      btnRefs.current[next]?.focus();
    },
    [active, items, onChange],
  );

  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      onKeyDown={onKeyDown}
      className="flex flex-wrap gap-2 rounded-full border border-[color-mix(in_oklab,var(--color-ink),transparent_82%)] bg-[var(--color-linen)]/70 p-1.5 backdrop-blur"
    >
      {items.map((item, i) => {
        const label = item === "all" ? "All" : CATEGORY_LABELS[item];
        const isActive = active === item;
        const count = counts?.[item];
        return (
          <button
            key={item}
            ref={(el) => { btnRefs.current[i] = el; }}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(item)}
            className={cn(
              "relative z-0 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-300",
              isActive ? "text-[var(--color-cream)]" : "text-[var(--color-ink)] hover:text-[var(--color-terracotta)]",
            )}
          >
            {isActive ? (
              <m.span
                layoutId="menu-filter-pill"
                className="absolute inset-0 -z-10 rounded-full bg-[var(--color-espresso)]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            ) : null}
            <span>{label}</span>
            {typeof count === "number" ? (
              <span className={cn(
                "font-mono text-[0.68rem] tabular-nums",
                isActive ? "text-[var(--color-honey)]" : "text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]"
              )}>
                {String(count).padStart(2, "0")}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
