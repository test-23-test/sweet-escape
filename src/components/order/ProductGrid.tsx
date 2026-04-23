"use client";

import { useMemo, useState } from "react";
import { MENU, CATEGORY_ORDER, CATEGORY_LABELS, type MenuCategory } from "@/data/menu";
import { CategoryFilter } from "@/components/menu/CategoryFilter";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { SearchPalette } from "@/components/menu/SearchPalette";

type Filter = MenuCategory | "all";

type Props = {
  showPreview?: boolean;
};

export function ProductGrid({ showPreview = true }: Props) {
  const [active, setActive] = useState<Filter>("all");

  const filtered = useMemo(() => {
    if (active === "all") return MENU;
    return MENU.filter((m) => m.category === active);
  }, [active]);

  const counts = useMemo(() => {
    const c: Partial<Record<Filter, number>> = { all: MENU.length };
    for (const m of MENU) {
      c[m.category] = (c[m.category] ?? 0) + 1;
    }
    return c;
  }, []);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <CategoryFilter active={active} onChange={setActive} counts={counts} />
        <div className="flex items-center gap-3">
          <SearchPalette />
          <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)] sm:inline">
            Pickup only · SCO 114
          </span>
        </div>
      </div>
      <MenuGrid items={filtered} showPreview={showPreview} />
      <p className="sr-only" aria-live="polite">
        Showing {filtered.length} of {MENU.length} items in the {active === "all" ? "full" : active} selection.
      </p>
      <CategoryLegend />
    </div>
  );
}

const CATEGORY_COLORS: Record<MenuCategory, string> = {
  cakes: "bg-[var(--color-terracotta)]",
  viennoiserie: "bg-[var(--color-honey)]",
  cookies: "bg-[var(--color-butter)]",
  breads: "bg-[var(--color-sage)]",
  fusion: "bg-[var(--color-ink)]",
};

function CategoryLegend() {
  return (
    <ul className="flex flex-wrap items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
      {CATEGORY_ORDER.map((c) => (
        <li key={c} className="flex items-center gap-2">
          <span className={`inline-block h-1.5 w-1.5 rounded-full ${CATEGORY_COLORS[c]}`} />
          {c}
        </li>
      ))}
    </ul>
  );
}
