"use client";

import { useRef, useCallback, useState, useEffect } from "react";
import { m } from "motion/react";
import { Star, GoogleLogo, ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { REVIEWS, AGGREGATE } from "@/data/reviews";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export function ReviewHighlights() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = track;
      setAtStart(scrollLeft <= 2);
      setAtEnd(scrollLeft >= scrollWidth - clientWidth - 2);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(track);
    return () => { track.removeEventListener("scroll", update); ro.disconnect(); };
  }, []);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * 340, behavior: "smooth" });
  }, []);

  return (
    <section className="relative bg-[var(--color-linen)] py-24" aria-label="Customer reviews">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <SectionHeading
              eyebrow="Reviews"
              title="What Chandigarh says."
            />
            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    weight={i < Math.floor(AGGREGATE.rating) ? "fill" : "regular"}
                    className="text-[var(--color-honey)]"
                  />
                ))}
              </div>
              <span className="font-display text-xl">{AGGREGATE.rating}</span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                · {AGGREGATE.count} reviews on
              </span>
              <GoogleLogo size={16} weight="bold" className="text-[color-mix(in_oklab,var(--color-ink),transparent_30%)]" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              aria-label="Previous reviews"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                atStart
                  ? "cursor-not-allowed border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] text-[color-mix(in_oklab,var(--color-ink),transparent_65%)]"
                  : "border-[color-mix(in_oklab,var(--color-ink),transparent_75%)] hover:bg-[var(--color-espresso)] hover:text-[var(--color-cream)]",
              )}
            >
              <ArrowLeft size={14} weight="bold" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              aria-label="Next reviews"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                atEnd
                  ? "cursor-not-allowed border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] text-[color-mix(in_oklab,var(--color-ink),transparent_65%)]"
                  : "border-[color-mix(in_oklab,var(--color-ink),transparent_75%)] hover:bg-[var(--color-espresso)] hover:text-[var(--color-cream)]",
              )}
            >
              <ArrowRight size={14} weight="bold" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
          data-lenis-prevent
        >
          {REVIEWS.map((review, i) => (
            <m.article
              key={review.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="flex w-[300px] shrink-0 snap-start flex-col gap-4 rounded-[24px] border border-[color-mix(in_oklab,var(--color-ink),transparent_88%)] bg-[var(--color-cream)] p-5 sm:w-[320px]"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-honey)] to-[var(--color-terracotta)] font-mono text-xs font-bold text-white"
                >
                  {review.initials}
                </div>
                <div>
                  <p className="font-display text-sm leading-tight">{review.name}</p>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_50%)]">
                    {review.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    size={13}
                    weight={j < review.rating ? "fill" : "regular"}
                    className="text-[var(--color-honey)]"
                  />
                ))}
              </div>
              <p className="flex-1 text-sm leading-relaxed text-[color-mix(in_oklab,var(--color-ink),transparent_20%)]">
                &ldquo;{review.text}&rdquo;
              </p>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  );
}
