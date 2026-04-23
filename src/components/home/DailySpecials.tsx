"use client";

import Link from "next/link";
import { m } from "motion/react";
import { ArrowRight, Star } from "@phosphor-icons/react/dist/ssr";
import { DAILY_SPECIALS } from "@/data/specials";
import { PastryIcon } from "@/components/ui/PastryIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatRupees } from "@/stores/cart";
import { cn } from "@/lib/cn";

export function DailySpecials() {
  const today = new Date().getDay();
  const todaySpecial = DAILY_SPECIALS.find((s) => s.day === today)!;
  const others = DAILY_SPECIALS.filter((s) => s.day !== today);

  return (
    <section className="relative bg-[var(--color-cream)] py-24" aria-label="Daily specials">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <SectionHeading
          eyebrow="Today's special"
          title="Every day, one thing we obsess over."
          description="A rotating single-bake spotlight. Whatever day you walk in, there's something that got extra attention at 4am."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Today's featured card */}
          <m.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col overflow-hidden rounded-[32px] p-6 md:flex-row md:items-center md:gap-8 md:p-8"
            style={{
              background: `linear-gradient(145deg, color-mix(in oklab, ${todaySpecial.accent}, var(--color-cream) 72%) 0%, var(--color-cream) 100%)`,
            }}
          >
            <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-espresso)] px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[var(--color-cream)]">
              <Star size={10} weight="fill" className="text-[var(--color-honey)]" />
              Today
            </div>
            <div className="relative mx-auto h-[200px] w-[200px] shrink-0 overflow-hidden rounded-3xl bg-[color-mix(in_oklab,var(--color-cream),#000_4%)] md:h-[240px] md:w-[240px]">
              <PastryIcon kind={todaySpecial.pastry} accent={todaySpecial.accent} />
            </div>
            <div className="mt-6 flex flex-col gap-2 md:mt-0">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_40%)]">
                {todaySpecial.dayLabel}&apos;s special
              </span>
              <h3 className="font-display text-3xl leading-tight md:text-4xl">
                {todaySpecial.name}
              </h3>
              <p className="max-w-md text-[color-mix(in_oklab,var(--color-ink),transparent_25%)]">
                {todaySpecial.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <span className="font-mono text-xl tabular-nums text-[var(--color-ink)]">
                  {formatRupees(todaySpecial.price)}
                </span>
                <Link
                  href="/order"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-espresso)] px-5 py-2.5 text-sm text-[var(--color-cream)] transition-transform duration-300 hover:translate-x-[2px]"
                >
                  Order now <ArrowRight size={14} weight="bold" />
                </Link>
              </div>
            </div>
          </m.article>

          {/* Upcoming days */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-2">
            {others.slice(0, 4).map((special, i) => (
              <m.div
                key={special.day}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={cn(
                  "flex flex-col gap-2 rounded-2xl border border-[color-mix(in_oklab,var(--color-ink),transparent_88%)] p-4 transition-shadow duration-300 hover:shadow-soft",
                )}
              >
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_50%)]">
                  {special.dayLabel}
                </span>
                <p className="font-display text-base leading-tight md:text-lg">
                  {special.name}
                </p>
                <span className="mt-auto font-mono text-sm tabular-nums text-[color-mix(in_oklab,var(--color-ink),transparent_25%)]">
                  {formatRupees(special.price)}
                </span>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
