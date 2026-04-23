"use client";

import { useRef, useEffect, useState } from "react";
import { m } from "motion/react";
import type { StoryChapter } from "@/data/storyChapters";
import { DoughMorph } from "@/components/story/DoughMorph";
import { TextReveal } from "@/components/ui/TextReveal";

type Props = {
  chapter: StoryChapter;
  index: number;
  onEnter?: () => void;
};

export function Chapter({ chapter, index, onEnter }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          onEnter?.();
        }
      },
      { threshold: 0.55 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [onEnter]);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] py-24"
      aria-label={`${chapter.chapter}: ${chapter.title.replace(/&apos;/g, "'")}`}
    >
      <div
        className={[
          "mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-[1fr_1fr] md:gap-20 md:px-10",
          isEven ? "" : "md:[grid-template-columns:1fr_1fr]",
        ].join(" ")}
      >
        <div className={isEven ? "md:order-1" : "md:order-2"}>
          <m.span
            initial={{ opacity: 0, x: -14 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="inline-block font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-terracotta)]"
          >
            {chapter.chapter} · {chapter.year}
          </m.span>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)] leading-[1.02]">
            <span dangerouslySetInnerHTML={{ __html: chapter.title }} />
          </h2>
          <p className="mt-6 font-script text-2xl text-[var(--color-terracotta)]">
            {chapter.lede}
          </p>
          {visible ? (
            <TextReveal
              as="p"
              className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-[color-mix(in_oklab,var(--color-ink),transparent_30%)]"
              stagger={0.022}
            >
              {chapter.body}
            </TextReveal>
          ) : null}
        </div>

        <div className={["relative mx-auto aspect-square w-full max-w-[520px]", isEven ? "md:order-2" : "md:order-1"].join(" ")}>
          <DoughMorph
            d={chapter.dough}
            accent={chapter.accent}
            className="h-full w-full drop-shadow-[0_40px_80px_rgba(47,31,20,0.2)]"
          />
          <m.span
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 0.9 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="pointer-events-none absolute inset-x-0 bottom-0 text-center font-mono text-[0.7rem] uppercase tracking-[0.26em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]"
          >
            dough · hydration 68% · bulk 4h
          </m.span>
        </div>
      </div>
    </section>
  );
}
