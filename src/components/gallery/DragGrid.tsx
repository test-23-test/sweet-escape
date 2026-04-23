"use client";

import { useRef, useEffect, useCallback, useState, useLayoutEffect } from "react";
import { m, AnimatePresence } from "motion/react";
import Image from "next/image";
import { X, ArrowsOutSimple, HandPointing } from "@phosphor-icons/react/dist/ssr";
import { gsap, Draggable } from "@/lib/gsap";
import { GALLERY, type GalleryTile } from "@/data/gallery";
import { GalleryTileSVG } from "@/components/gallery/GalleryTileSVG";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { cn } from "@/lib/cn";

const ASPECT_CLASS: Record<GalleryTile["aspect"], string> = {
  square: "col-span-2 row-span-2",
  portrait: "col-span-2 row-span-3",
  landscape: "col-span-3 row-span-2",
  tall: "col-span-2 row-span-4",
};

function useResponsiveGrid() {
  const [cols, setCols] = useState(10);
  const [cell, setCell] = useState(140);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) { setCols(6); setCell(100); }
      else if (w < 1024) { setCols(8); setCell(120); }
      else { setCols(10); setCell(140); }
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);
  return { cols, cell };
}

export function DragGrid({ items }: { items?: GalleryTile[] }) {
  const tiles = items ?? GALLERY;
  const { cols, cell } = useResponsiveGrid();
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const [viewportVersion, setViewportVersion] = useState(0);
  const [cuePulse, setCuePulse] = useState(true);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setDimensions({ w: track.scrollWidth, h: track.scrollHeight });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  // Re-run the Draggable effect whenever the window resizes so bounds stay
  // in sync with the real viewport (the ResizeObserver above only fires on
  // the track itself, not when the viewport box shrinks around it).
  useEffect(() => {
    const onResize = () => setViewportVersion((v) => v + 1);
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  // Fade the "Drag to roam" cue after the first beat so it doesn't hover
  // forever — it's a hint, not furniture.
  useEffect(() => {
    const t = window.setTimeout(() => setCuePulse(false), 3500);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const vw = viewport.getBoundingClientRect();
    const tw = track.scrollWidth;
    const th = track.scrollHeight;

    const inst = Draggable.create(track, {
      type: "x,y",
      edgeResistance: 0.7,
      dragResistance: 0.12,
      inertia: true,
      // Let the browser handle vertical touch-scroll so mobile users aren't
      // trapped when their finger hits the grid. GSAP still claims the
      // horizontal axis for roaming.
      allowNativeTouchScrolling: true,
      bounds: {
        minX: Math.min(0, vw.width - tw),
        maxX: 0,
        minY: Math.min(0, vw.height - th),
        maxY: 0,
      },
      onPress() {
        gsap.set(track, { cursor: "grabbing" });
        setCuePulse(false);
      },
      onRelease() {
        gsap.set(track, { cursor: "grab" });
      },
    });

    return () => {
      inst.forEach((d) => d.kill());
    };
  }, [reduced, dimensions, viewportVersion]);

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const selected = lightbox ? tiles.find((g) => g.id === lightbox) : null;
  const lightboxTrapRef = useFocusTrap<HTMLDivElement>(!!selected);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!selected) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [selected, closeLightbox]);

  return (
    <>
      <div
        ref={viewportRef}
        className="relative h-[min(78vh,860px)] w-full overflow-hidden rounded-[32px] border border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] bg-[var(--color-linen)]"
      >
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute left-4 top-4 z-30 inline-flex items-center gap-2 rounded-full bg-[var(--color-espresso)] px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[var(--color-cream)] transition-opacity duration-700",
            cuePulse ? "opacity-100" : "opacity-60",
          )}
        >
          <HandPointing
            size={14}
            weight="duotone"
            className={cuePulse ? "handpoint-pulse" : undefined}
          />
          Drag · tap to expand
        </div>
        <div
          ref={trackRef}
          className="relative grid origin-top-left touch-pan-y select-none gap-3 p-6"
          style={{
            cursor: reduced ? "auto" : "grab",
            gridTemplateColumns: `repeat(${cols}, ${cell}px)`,
            gridAutoRows: `${cell}px`,
            willChange: "transform",
          }}
        >
          {tiles.map((tile, i) => (
            <button
              key={tile.id}
              type="button"
              onClick={() => setLightbox(tile.id)}
              className={cn(
                "group relative overflow-hidden rounded-2xl bg-[var(--color-cream)] shadow-soft focus-visible:outline-[var(--color-terracotta)]",
                ASPECT_CLASS[tile.aspect],
              )}
              aria-label={`Open: ${tile.caption}`}
            >
              <m.div layoutId={`tile-${tile.id}`} className="absolute inset-0">
                {tile.kind === "photo" ? (
                  <Image
                    src={`https://picsum.photos/seed/${tile.seed}/420/420`}
                    alt={tile.caption}
                    fill
                    sizes="(max-width: 768px) 40vw, 25vw"
                    className="object-cover"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAP0lEQVR4nGNgYGBgZGT8//8/AwMDIyMjAwMDw////xkYGP7//8/IwMDw////f/8ZGBj+/2dgYPj/n+E/AwMAZAkL/zy5OQYAAAAASUVORK5CYII="
                  />
                ) : (
                  <GalleryTileSVG pattern={tile.pattern} accent={tile.accent} caption={tile.caption} />
                )}
              </m.div>
              <span
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent_60%)] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(232,163,69,0.18),transparent_65%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[rgba(47,31,20,0.75)] to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[var(--color-cream)]">
                  {String(i + 1).padStart(2, "0")} / {tiles.length}
                </span>
                <span className="font-display text-sm text-[var(--color-cream)]">
                  {tile.caption}
                </span>
                <ArrowsOutSimple size={14} weight="bold" className="text-[var(--color-honey)]" />
              </span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <m.div
            ref={lightboxTrapRef}
            role="dialog"
            aria-modal="true"
            aria-label={selected.caption}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-[color-mix(in_oklab,var(--color-espresso),transparent_15%)] p-6 backdrop-blur-lg"
            onClick={closeLightbox}
          >
            <m.div
              layoutId={`tile-${selected.id}`}
              className="relative h-[min(80vh,720px)] w-[min(90vw,1000px)] overflow-hidden rounded-[32px] bg-[var(--color-cream)] shadow-lift"
              onClick={(e) => e.stopPropagation()}
            >
              {selected.kind === "photo" ? (
                <Image
                  src={`https://picsum.photos/seed/${selected.seed}/1600/1200`}
                  alt={selected.caption}
                  fill
                  sizes="90vw"
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAP0lEQVR4nGNgYGBgZGT8//8/AwMDIyMjAwMDw////xkYGP7//8/IwMDw////f/8ZGBj+/2dgYPj/n+E/AwMAZAkL/zy5OQYAAAAASUVORK5CYII="
                />
              ) : (
                <GalleryTileSVG
                  pattern={selected.pattern}
                  accent={selected.accent}
                  caption={selected.caption}
                />
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[rgba(47,31,20,0.8)] to-transparent p-6 text-[var(--color-cream)]">
                <span className="font-script text-3xl">{selected.caption}</span>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em]">
                  SweetEscape · Sector 35-B
                </span>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                aria-label="Close"
                onClick={closeLightbox}
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-espresso)]/80 text-[var(--color-cream)] backdrop-blur transition-colors hover:bg-[var(--color-terracotta)]"
              >
                <X size={16} />
              </button>
            </m.div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
