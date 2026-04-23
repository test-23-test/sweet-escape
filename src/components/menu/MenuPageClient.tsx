"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MENU, CATEGORY_ORDER, type MenuCategory } from "@/data/menu";
import { CategoryFilter } from "@/components/menu/CategoryFilter";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { SearchPalette } from "@/components/menu/SearchPalette";
import { TextReveal } from "@/components/ui/TextReveal";

type Filter = MenuCategory | "all";

function isCategory(value: string | null): value is MenuCategory {
  return !!value && (CATEGORY_ORDER as readonly string[]).includes(value);
}

export function MenuPageClient() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("filter");
  const [active, setActive] = useState<Filter>(isCategory(initial) ? initial : "all");

  // Keep browser back/forward in sync if someone pops state while on /menu.
  useEffect(() => {
    const p = params.get("filter");
    const next: Filter = isCategory(p) ? p : "all";
    setActive((prev) => (prev === next ? prev : next));
  }, [params]);

  const updateFilter = useCallback(
    (value: Filter) => {
      setActive(value);
      const next = new URLSearchParams(Array.from(params.entries()));
      if (value === "all") next.delete("filter");
      else next.set("filter", value);
      const qs = next.toString();
      router.replace(qs ? `/menu?${qs}` : "/menu", { scroll: false });
    },
    [params, router],
  );

  const filtered = useMemo(() => {
    if (active === "all") return MENU;
    return MENU.filter((m) => m.category === active);
  }, [active]);

  const counts = useMemo(() => {
    const c: Partial<Record<MenuCategory | "all", number>> = { all: MENU.length };
    for (const m of MENU) {
      c[m.category] = (c[m.category] ?? 0) + 1;
    }
    return c;
  }, []);

  return (
    <div className="pt-32 pb-24">
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-terracotta)]">
          The menu · updated daily at 07:45
        </span>
        <TextReveal
          as="h1"
          className="mt-5 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] tracking-tight"
        >
          42 bakes. Zero fillers.
        </TextReveal>
        <TextReveal
          as="p"
          className="mt-5 max-w-2xl text-lg text-[color-mix(in_oklab,var(--color-ink),transparent_30%)]"
        >
          Cakes hand-finished at 8am. Viennoiserie pulled out every hour till noon. Breads
          scored by Ishaan. Whatever&apos;s sold out today is baked again tomorrow.
        </TextReveal>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <CategoryFilter active={active} onChange={updateFilter} counts={counts} />
          <SearchPalette />
        </div>
      </header>

      <div className="mx-auto mt-14 max-w-[1400px] px-6 md:px-10">
        <MenuGrid items={filtered} />
      </div>

      <footer className="mx-auto mt-24 grid max-w-[1400px] grid-cols-1 gap-10 px-6 md:grid-cols-3 md:px-10">
        <Fact
          heading="Pickup only"
          description="We don't deliver. SCO 114, Sector 35-B — open 08:00–22:00."
        />
        <Fact
          heading="Pre-order by 9pm"
          description="For next-morning cakes and hampers, ping us on Instagram or call the bakery."
        />
        <Fact
          heading="Unsold bakes"
          description="Anything left at 9pm goes to the Chandigarh night shelter. We bake fewer items on Sundays."
        />
      </footer>
    </div>
  );
}

function Fact({ heading, description }: { heading: string; description: string }) {
  return (
    <div className="rounded-3xl border border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] p-6">
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-honey)]">
        {heading}
      </p>
      <p className="mt-3 font-display text-xl leading-tight">{description}</p>
    </div>
  );
}
