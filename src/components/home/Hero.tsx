"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { m } from "motion/react";
import { ArrowRight, Phone } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/ui/TextReveal";
import { PastryIcon } from "@/components/ui/PastryIcon";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-3/4 w-3/4">
        <PastryIcon kind="cupcake" accent="#C8553D" />
      </div>
    </div>
  ),
});

const LINES = [
  "Butter,",
  "flour,",
  "Chandigarh.",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate min-h-[100dvh] w-full overflow-hidden bg-[var(--color-cream)] pt-24"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-[1.1fr_0.9fr] md:gap-6 md:px-10">
        <div className="relative z-10 flex flex-col gap-6">
          <m.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-terracotta)]"
          >
            <span className="inline-block h-px w-10 bg-current opacity-70" />
            SweetEscape · Sector 35-B · Since 2022
          </m.span>

          <h1 className="font-display text-[clamp(2.75rem,7.4vw,6.5rem)] leading-[1.02] tracking-tight">
            {LINES.map((line, i) => (
              <span
                key={i}
                className="block"
                style={{ overflow: "clip", overflowClipMargin: "0.35em" }}
              >
                <m.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.3 + i * 0.12,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block pb-[0.12em]"
                >
                  {line === "Chandigarh." ? (
                    <>
                      <span className="italic text-[var(--color-terracotta)]">Chandigarh</span>
                      <span>.</span>
                    </>
                  ) : (
                    line
                  )}
                </m.span>
              </span>
            ))}
          </h1>

          <TextReveal
            as="p"
            className="max-w-lg text-lg leading-relaxed text-[color-mix(in_oklab,var(--color-ink),transparent_30%)] md:text-xl"
          >
            The morning ritual that got away from us. Classical French technique, Indian-ingredient
            flourishes — baked fresh at 5am on Sector 35-B.
          </TextReveal>

          <div className="mt-2 flex flex-wrap items-center gap-4">
            <Link href="/menu">
              <Button size="lg" icon={<ArrowRight size={18} weight="bold" />}>
                Today&apos;s menu
              </Button>
            </Link>
            <Link href="/visit">
              <Button size="lg" variant="ghost" icon={<Phone size={16} weight="duotone" />}>
                Visit the bakery
              </Button>
            </Link>
          </div>

          <dl className="mt-6 grid max-w-md grid-cols-1 gap-4 border-t border-[color-mix(in_oklab,var(--color-ink),transparent_88%)] pt-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                Open today
              </dt>
              <dd className="mt-1 font-display text-lg">08 – 22</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                Today&apos;s bake
              </dt>
              <dd className="mt-1 font-display text-lg">42 items</dd>
            </div>
            <div>
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                Waitlist
              </dt>
              <dd className="mt-1 font-display text-lg">∅</dd>
            </div>
          </dl>
        </div>

        <div className="relative aspect-square w-full md:aspect-[4/5]">
          <div
            className="absolute inset-4 rounded-[40%_60%_55%_45%/_50%_45%_55%_50%] bg-gradient-to-br from-[var(--color-butter)] via-[var(--color-linen)] to-[var(--color-terracotta)] opacity-80 blur-[2px]"
            aria-hidden
          />
          <HeroScene />
          <span
            aria-hidden
            className="absolute bottom-4 left-4 font-script text-2xl text-[var(--color-terracotta)] md:text-3xl"
          >
            just baked
          </span>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-6 mx-auto flex w-full max-w-[1400px] flex-col items-start gap-1 px-6 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[color-mix(in_oklab,var(--color-ink),transparent_55%)] sm:flex-row sm:items-center sm:justify-between md:px-10"
      >
        <span>scroll to continue ↓</span>
        <span className="hidden sm:inline">SCO 114 · 30.7291°N · 76.7586°E</span>
      </div>
    </section>
  );
}
