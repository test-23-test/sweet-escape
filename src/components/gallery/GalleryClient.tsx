"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { m } from "motion/react";
import { GALLERY, GALLERY_CATEGORIES, type GalleryCategory } from "@/data/gallery";
import { DragGrid } from "@/components/gallery/DragGrid";
import { cn } from "@/lib/cn";

export function GalleryClient() {
  const [active, setActive] = useState<GalleryCategory>("All");
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filtered = useMemo(() => {
    if (active === "All") return GALLERY;
    return GALLERY.filter((t) => t.category === active);
  }, [active]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const idx = GALLERY_CATEGORIES.indexOf(active);
      let next = idx;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        next = (idx + 1) % GALLERY_CATEGORIES.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        next = (idx - 1 + GALLERY_CATEGORIES.length) % GALLERY_CATEGORIES.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        next = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        next = GALLERY_CATEGORIES.length - 1;
      } else {
        return;
      }
      setActive(GALLERY_CATEGORIES[next]);
      btnRefs.current[next]?.focus();
    },
    [active],
  );

  return (
    <div className="flex flex-col gap-8">
      <div
        className="flex gap-2 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none" }}
        role="tablist"
        aria-label="Gallery categories"
        onKeyDown={onKeyDown}
      >
        {GALLERY_CATEGORIES.map((cat, i) => {
          const isActive = cat === active;
          const count = cat === "All" ? GALLERY.length : GALLERY.filter((t) => t.category === cat).length;
          return (
            <button
              key={cat}
              ref={(el) => { btnRefs.current[i] = el; }}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(cat)}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 font-mono text-[0.7rem] uppercase tracking-[0.22em] transition-colors duration-300",
                isActive
                  ? "text-[var(--color-cream)]"
                  : "text-[var(--color-ink)] hover:text-[var(--color-terracotta)]",
              )}
            >
              {isActive && (
                <m.span
                  layoutId="gallery-cat-pill"
                  className="absolute inset-0 -z-[1] rounded-full bg-[var(--color-espresso)]"
                  transition={{ type: "spring", stiffness: 360, damping: 30 }}
                />
              )}
              {cat}
              <span className="ml-1.5 inline-block rounded-full bg-[color-mix(in_oklab,var(--color-ink),transparent_88%)] px-1.5 py-0.5 text-[0.6rem] tabular-nums">
                {count}
              </span>
            </button>
          );
        })}
      </div>
      <DragGrid items={filtered} />
      <p className="sr-only" aria-live="polite">
        Showing {filtered.length} of {GALLERY.length} gallery items{active !== "All" ? ` in ${active}` : ""}.
      </p>
    </div>
  );
}
