"use client";

import { AnimatePresence } from "motion/react";
import { ProductCard } from "@/components/menu/ProductCard";
import type { MenuItem } from "@/data/menu";

type Props = {
  items: MenuItem[];
  showPreview?: boolean;
};

export function MenuGrid({ items, showPreview = true }: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout" initial={false}>
        {items.map((item, i) => (
          <ProductCard key={item.id} item={item} index={i} showPreview={showPreview} />
        ))}
      </AnimatePresence>
    </div>
  );
}
