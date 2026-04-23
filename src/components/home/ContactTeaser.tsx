"use client";

import Link from "next/link";
import { m } from "motion/react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { TextReveal } from "@/components/ui/TextReveal";

export function ContactTeaser() {
  return (
    <section
      data-theme="dark"
      className="relative overflow-hidden bg-[var(--color-espresso)] py-32 text-[var(--color-cream)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 15%, rgba(232,163,69,0.25), transparent 40%), radial-gradient(circle at 85% 85%, rgba(200,85,61,0.3), transparent 45%)",
        }}
      />
      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-10 px-6 text-center md:px-10">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-honey)]">
          Private orders · catering · hampers
        </span>
        <TextReveal
          as="h2"
          className="max-w-[18ch] font-display text-[clamp(3rem,7vw,6rem)] leading-[0.95]"
        >
          Come by. We'll put the kettle on.
        </TextReveal>
        <TextReveal
          as="p"
          className="max-w-xl text-lg leading-relaxed text-[color-mix(in_oklab,var(--color-cream),transparent_20%)]"
        >
          Weddings, corporate hampers, last-minute anniversary cakes. Tell us what you need —
          Ishaan usually replies within the hour.
        </TextReveal>

        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/visit"
            className="group inline-flex items-center gap-3 rounded-full bg-[var(--color-terracotta)] px-8 py-4 text-[var(--color-cream)] transition-transform duration-300 hover:scale-[1.02]"
          >
            <span className="font-display text-lg">Contact the bakery</span>
            <m.span
              whileInView={{ x: [0, 6, 0] }}
              viewport={{ once: false }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowRight size={18} weight="bold" />
            </m.span>
          </Link>
          <a
            href="tel:+911724197326"
            className="rounded-full border border-[color-mix(in_oklab,var(--color-cream),transparent_75%)] px-8 py-4 text-sm transition-colors hover:border-[var(--color-honey)] hover:text-[var(--color-honey)]"
          >
            +91 172 419 7326
          </a>
        </m.div>

        <p className="mt-10 font-script text-4xl text-[var(--color-honey)] md:text-5xl">
          warm regards, from SCO 114
        </p>
      </div>
    </section>
  );
}
