"use client";

import { m } from "motion/react";
import { Plus, Check } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { PastryIcon } from "@/components/ui/PastryIcon";
import { TiltCard } from "@/components/ui/TiltCard";
import { formatRupees, useCart } from "@/stores/cart";
import { useToast } from "@/stores/toast";
import type { MenuItem } from "@/data/menu";
import { CATEGORY_LABELS } from "@/data/menu";
import { cn } from "@/lib/cn";

type Props = {
  item: MenuItem;
  index?: number;
  showPreview?: boolean;
};

export function ProductCard({ item, index = 0, showPreview = true }: Props) {
  const add = useCart((s) => s.add);
  const addToast = useToast((s) => s.add);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    add({
      id: item.id,
      name: item.name,
      price: item.price,
      category: CATEGORY_LABELS[item.category],
      accent: item.accent,
    });
    addToast({ message: `${item.name} added to your bag`, type: "success" });
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <m.article
      layout
      layoutId={`card-${item.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      id={item.id}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[28px] p-5",
        "border border-[color-mix(in_oklab,var(--color-ink),transparent_90%)]",
      )}
      style={{
        background: `linear-gradient(180deg, color-mix(in oklab, ${item.accent}, var(--color-cream) 85%) 0%, var(--color-cream) 100%)`,
      }}
    >
      <TiltCard max={6} className="h-56 w-full overflow-hidden rounded-2xl bg-[color-mix(in_oklab,var(--color-cream),#000_3%)]">
        {showPreview ? (
          <PastryIcon kind={item.pastry} accent={item.accent} />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl" aria-hidden>🥐</div>
        )}
      </TiltCard>

      <div className="mt-5 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[color-mix(in_oklab,var(--color-ink),transparent_50%)]">
            {CATEGORY_LABELS[item.category]}
          </span>
          {item.signature ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-espresso)] px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-[var(--color-cream)]">
              <span className="h-1 w-1 rounded-full bg-[var(--color-honey)]" />
              Chef&apos;s pick
            </span>
          ) : null}
        </div>
        <h3 className="font-display text-2xl leading-tight">{item.name}</h3>
        <p className="font-script text-xl text-[var(--color-terracotta)]">{item.subtitle}</p>
        <p className="mt-1 text-sm leading-relaxed text-[color-mix(in_oklab,var(--color-ink),transparent_30%)]">
          {item.description}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="font-mono text-xl tabular-nums text-[var(--color-ink)]">
          {formatRupees(item.price)}
        </span>
        <button
          type="button"
          onClick={handleAdd}
          aria-label={`Add ${item.name} to bag`}
          className={cn(
            "inline-flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
            justAdded
              ? "bg-[var(--color-sage)] text-[var(--color-cream)]"
              : "bg-[var(--color-espresso)] text-[var(--color-cream)] hover:bg-[var(--color-terracotta)]",
          )}
        >
          <m.span
            key={justAdded ? "added" : "add"}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2"
          >
            {justAdded ? (
              <>
                <Check size={14} weight="bold" /> Added
              </>
            ) : (
              <>
                <Plus size={14} weight="bold" /> Add to bag
              </>
            )}
          </m.span>
        </button>
      </div>
    </m.article>
  );
}
