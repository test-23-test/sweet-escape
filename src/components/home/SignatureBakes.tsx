"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSignatureBakes } from "@/data/menu";
import { formatRupees } from "@/stores/cart";
import { PastryIcon } from "@/components/ui/PastryIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRight, ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/cn";

export function SignatureBakes() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const bakes = getSignatureBakes();

  // Keep the scroll-state indicators and arrow enabled/disabled flags in sync
  // with whatever the user does — wheel, drag, keyboard, or the arrows below.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = track;
      const max = Math.max(1, scrollWidth - clientWidth);
      const p = Math.min(1, Math.max(0, scrollLeft / max));
      setProgress(p);
      setAtStart(scrollLeft <= 2);
      setAtEnd(scrollLeft >= max - 2);
    };

    update();
    track.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(track);

    return () => {
      track.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, []);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    // Advance by roughly one card width so the scroll feels paged.
    const firstCard = track.querySelector<HTMLElement>("[data-bake-card]");
    const step = firstCard ? firstCard.offsetWidth + 24 : track.clientWidth * 0.85;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollBy(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollBy(-1);
    }
  };

  return (
    <section className="relative bg-[var(--color-cream)] py-24" aria-label="Signature bakes">
      <div className="mx-auto mb-10 flex max-w-[1400px] flex-col gap-6 px-6 md:mb-14 md:flex-row md:items-end md:justify-between md:px-10">
        <div className="flex-1">
          <SectionHeading
            eyebrow="Signature bakes"
            title="Six things we are stubborn about."
            description="Everyone on the team has their own favourite. These are the ones we won't change the recipe on."
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={atStart}
            aria-label="Previous bake"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300",
              atStart
                ? "cursor-not-allowed border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] text-[color-mix(in_oklab,var(--color-ink),transparent_65%)]"
                : "border-[color-mix(in_oklab,var(--color-ink),transparent_75%)] text-[var(--color-ink)] hover:border-[var(--color-ink)] hover:bg-[var(--color-espresso)] hover:text-[var(--color-cream)]",
            )}
          >
            <ArrowLeft size={16} weight="bold" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={atEnd}
            aria-label="Next bake"
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-300",
              atEnd
                ? "cursor-not-allowed border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] text-[color-mix(in_oklab,var(--color-ink),transparent_65%)]"
                : "border-[color-mix(in_oklab,var(--color-ink),transparent_75%)] text-[var(--color-ink)] hover:border-[var(--color-ink)] hover:bg-[var(--color-espresso)] hover:text-[var(--color-cream)]",
            )}
          >
            <ArrowRight size={16} weight="bold" />
          </button>
          <Link
            href="/menu"
            className="ml-2 inline-flex rounded-full border border-[color-mix(in_oklab,var(--color-ink),transparent_75%)] px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.22em] transition-colors hover:bg-[var(--color-espresso)] hover:text-[var(--color-cream)] md:px-4 md:py-2 md:text-[0.7rem]"
          >
            View all
          </Link>
        </div>
      </div>

      <div
        ref={trackRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Signature bakes"
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex snap-x snap-mandatory scroll-pl-6 scroll-smooth overflow-x-auto overflow-y-hidden pb-2 md:scroll-pl-10 focus-visible:outline-[var(--color-terracotta)]"
        data-lenis-prevent
        style={{ scrollbarWidth: "none" }}
      >
        <style>{`[data-lenis-prevent]::-webkit-scrollbar { display: none; }`}</style>
        <div className="flex w-max gap-6 px-6 pr-10 md:px-10 md:pr-20">
          {bakes.map((bake, i) => (
            <article
              key={bake.id}
              data-bake-card
              className="group relative flex h-[380px] w-[260px] shrink-0 snap-start flex-col overflow-hidden rounded-[28px] p-5 transition-shadow duration-500 hover:shadow-lift sm:h-[440px] sm:w-[300px] md:h-[500px] md:w-[340px] lg:w-[360px]"
              style={{
                background: `linear-gradient(180deg, color-mix(in oklab, ${bake.accent}, var(--color-cream) 82%) 0%, var(--color-cream) 100%)`,
              }}
            >
              <div className="relative h-[240px] overflow-hidden rounded-2xl bg-[color-mix(in_oklab,var(--color-cream),#000_4%)] md:h-[260px]">
                <PastryIcon kind={bake.pastry} accent={bake.accent} />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-[var(--color-espresso)] px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-cream)]">
                  <span className="h-1 w-1 rounded-full bg-[var(--color-honey)]" />
                  Signature
                </span>
              </div>
              <div className="mt-auto flex flex-col gap-2 pt-5">
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                  {bake.subtitle}
                </span>
                <h3 className="font-display text-2xl leading-tight md:text-3xl">{bake.name}</h3>
                <p className="text-sm leading-relaxed text-[color-mix(in_oklab,var(--color-ink),transparent_30%)]">
                  {bake.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-lg tabular-nums text-[var(--color-ink)]">
                    {formatRupees(bake.price)}
                  </span>
                  <Link
                    href={`/order#${bake.id}`}
                    className="inline-flex items-center gap-1 rounded-full bg-[var(--color-espresso)] px-4 py-2 text-xs text-[var(--color-cream)] transition-transform duration-300 group-hover:translate-x-[2px]"
                  >
                    Order this <ArrowRight size={12} weight="bold" />
                  </Link>
                </div>
              </div>
              <span
                aria-hidden
                className="pointer-events-none absolute right-5 top-5 font-mono text-[0.7rem] tabular-nums text-[color-mix(in_oklab,var(--color-ink),transparent_55%)]"
              >
                0{i + 1} / 0{bakes.length}
              </span>
            </article>
          ))}
          <Link
            href="/menu"
            className="group flex h-[380px] w-[240px] shrink-0 snap-start flex-col items-start justify-between rounded-[28px] border border-dashed border-[color-mix(in_oklab,var(--color-ink),transparent_70%)] bg-transparent p-7 transition-colors duration-500 hover:bg-[var(--color-espresso)] hover:text-[var(--color-cream)] sm:h-[440px] sm:w-[280px] md:h-[500px] md:w-[320px]"
          >
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.28em]">The full menu</span>
            <div>
              <p className="font-display text-3xl leading-tight md:text-4xl">
                42 bakes,<br />zero fillers.
              </p>
              <p className="mt-4 text-sm opacity-70">
                Every item hand-finished the morning you pick it up.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm transition-transform duration-300 group-hover:translate-x-2">
              Browse <ArrowRight size={16} weight="bold" />
            </span>
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-[1400px] items-center gap-4 px-6 md:px-10">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_55%)]">
          {String(Math.round(progress * bakes.length) + 1).padStart(2, "0")} / {String(bakes.length + 1).padStart(2, "0")}
        </span>
        <div
          aria-hidden
          className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-[color-mix(in_oklab,var(--color-ink),transparent_90%)]"
        >
          <span
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--color-terracotta)] via-[var(--color-honey)] to-[var(--color-butter)] transition-[width] duration-200"
            style={{ width: `${Math.max(8, progress * 100)}%` }}
          />
        </div>
        <span className="hidden font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_55%)] md:inline">
          Drag · ← → · tap
        </span>
      </div>
    </section>
  );
}
