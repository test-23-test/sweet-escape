"use client";

import Link from "next/link";
import { m } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Marquee } from "@/components/ui/Marquee";
import { TextReveal } from "@/components/ui/TextReveal";

const FACTS = [
  "Handcrafted in Chandigarh",
  "Fresh every morning at 5am",
  "32 layers in our kouign-amann",
  "72-hour sourdough ferment",
  "Ingredients from six Punjab farms",
];

export function StoryTeaser() {
  return (
    <section className="relative my-32 overflow-hidden py-20" aria-label="Our story">
      <h2 className="sr-only">What makes SweetEscape different</h2>
      <Marquee speed={55} direction="left" className="font-display">
        <span className="flex items-center gap-12 px-6 text-[clamp(3rem,8vw,7rem)] leading-none tracking-tight">
          {FACTS.map((f, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>{f}</span>
              <span aria-hidden className="text-[var(--color-terracotta)]">✦</span>
            </span>
          ))}
        </span>
      </Marquee>

      <Marquee speed={42} direction="right" className="mt-6 font-display opacity-60">
        <span className="flex items-center gap-12 px-6 text-[clamp(2.5rem,6vw,5.5rem)] italic leading-none tracking-tight">
          {FACTS.slice().reverse().map((f, i) => (
            <span key={i} className="flex items-center gap-12">
              <span>{f}</span>
              <span aria-hidden className="text-[var(--color-honey)]">✦</span>
            </span>
          ))}
        </span>
      </Marquee>

      <div className="mx-auto mt-20 flex max-w-[1400px] flex-col items-start gap-6 px-6 md:flex-row md:items-end md:justify-between md:px-10">
        <TextReveal
          as="p"
          className="max-w-2xl font-display text-3xl leading-tight text-[var(--color-ink)] md:text-5xl"
        >
          We are a small bakery on Sector 35-B that takes its flour seriously — and not much else.
        </TextReveal>

        <Link
          href="/story"
          className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-ink)] px-5 py-2.5 text-sm transition-colors duration-300 hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
        >
          <span>Read the story</span>
          <m.span
            whileInView={{ rotate: [0, 45, 0] }}
            viewport={{ once: false }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <ArrowUpRight size={16} weight="bold" />
          </m.span>
        </Link>
      </div>
    </section>
  );
}
