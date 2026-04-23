"use client";

import { useRef, useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Quotes } from "@phosphor-icons/react/dist/ssr";
import { TESTIMONIALS } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const direction = useRef(1);

  const advance = (dir: number) => {
    direction.current = dir;
    setIndex((v) => (v + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const goTo = (i: number) => {
    if (i === index) return;
    direction.current = i > index ? 1 : -1;
    setIndex(i);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      advance(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      advance(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      goTo(0);
    } else if (e.key === "End") {
      e.preventDefault();
      goTo(TESTIMONIALS.length - 1);
    }
  };

  return (
    <section className="relative bg-[var(--color-cream)] py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          eyebrow="In their words"
          title="Regulars, weekend gifters, the odd cardiologist."
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.1fr]">
          {/* coverflow tiles — drag-to-advance on the whole stack */}
          <m.div
            role="group"
            aria-label="Testimonials coverflow"
            tabIndex={0}
            onKeyDown={onKeyDown}
            className="relative mx-auto aspect-square w-full max-w-[420px] cursor-grab touch-pan-y select-none focus-visible:outline-[var(--color-terracotta)] active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            dragMomentum={false}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) advance(1);
              else if (info.offset.x > 60) advance(-1);
            }}
          >
            {TESTIMONIALS.map((t, i) => {
              const offset = i - index;
              const depth = Math.abs(offset);
              const isActive = offset === 0;
              return (
                <m.div
                  key={t.id}
                  animate={{
                    x: `${offset * 30}%`,
                    rotateY: offset * -18,
                    scale: isActive ? 1 : 0.82,
                    opacity: depth > 2 ? 0 : 1 - depth * 0.25,
                    zIndex: 10 - depth,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className="pointer-events-none absolute inset-0 rounded-[28px] p-5 shadow-lift"
                  style={{
                    background: `linear-gradient(180deg, color-mix(in oklab, ${t.accent}, var(--color-cream) 75%) 0%, var(--color-cream) 100%)`,
                    transformStyle: "preserve-3d",
                    perspective: "1400px",
                  }}
                >
                  <div className="flex h-full flex-col">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-full text-xl"
                        style={{ background: t.accent, color: "var(--color-cream)" }}
                        aria-hidden
                      >
                        {t.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <p className="font-display text-xl leading-tight">{t.name}</p>
                        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                          {t.role}
                        </p>
                      </div>
                    </div>
                    <Quotes
                      size={36}
                      weight="duotone"
                      className="mt-auto text-[var(--color-terracotta)] opacity-70"
                    />
                  </div>
                </m.div>
              );
            })}
          </m.div>

          <div>
            <AnimatePresence mode="wait" custom={direction.current}>
              <m.blockquote
                key={index}
                initial={{ opacity: 0, y: 30 * direction.current }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 * direction.current }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight"
              >
                <span aria-hidden className="text-[var(--color-terracotta)]">&ldquo;</span>
                {TESTIMONIALS[index].quote}
                <span aria-hidden className="text-[var(--color-terracotta)]">&rdquo;</span>
              </m.blockquote>
            </AnimatePresence>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => advance(-1)}
                aria-label="Previous testimonial"
                className="rounded-full border border-[color-mix(in_oklab,var(--color-ink),transparent_75%)] p-3 transition-colors hover:bg-[var(--color-espresso)] hover:text-[var(--color-cream)]"
              >
                <ArrowLeft size={16} weight="bold" />
              </button>
              <button
                type="button"
                onClick={() => advance(1)}
                aria-label="Next testimonial"
                className="rounded-full border border-[color-mix(in_oklab,var(--color-ink),transparent_75%)] p-3 transition-colors hover:bg-[var(--color-espresso)] hover:text-[var(--color-cream)]"
              >
                <ArrowRight size={16} weight="bold" />
              </button>

              <div
                className="ml-1 flex items-center gap-1.5"
                role="tablist"
                aria-label="Select testimonial"
              >
                {TESTIMONIALS.map((t, i) => {
                  const isActive = i === index;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`Testimonial ${i + 1}: ${t.name}`}
                      onClick={() => goTo(i)}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        isActive
                          ? "w-6 bg-[var(--color-terracotta)]"
                          : "w-2 bg-[color-mix(in_oklab,var(--color-ink),transparent_70%)] hover:bg-[color-mix(in_oklab,var(--color-ink),transparent_40%)]",
                      )}
                    />
                  );
                })}
              </div>

              <span className="ml-auto font-mono text-sm tabular-nums text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                {String(index + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
              </span>
            </div>
            <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_55%)]">
              Swipe or press ← → to move.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
