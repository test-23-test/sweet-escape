import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { STORY_CHAPTERS } from "@/data/storyChapters";
import { Chapter } from "@/components/story/Chapter";
import { TimelineSVG } from "@/components/story/TimelineSVG";
import { TextReveal } from "@/components/ui/TextReveal";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Six chapters behind SweetEscape — a Paris stage, a lockdown oven, a SCO 114 lease. Ishaan Sood + Niharika Bhardwaj, told in six dough shapes.",
};

export default function StoryPage() {
  return (
    <div className="pt-32">
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-terracotta)]">
          Our story · by Ishaan &amp; Niharika
        </span>
        <TextReveal
          as="h1"
          className="mt-5 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight"
        >
          Six chapters. One oven. A lot of butter.
        </TextReveal>
        <TextReveal
          as="p"
          className="mt-6 max-w-2xl text-lg text-[color-mix(in_oklab,var(--color-ink),transparent_30%)] md:text-xl"
        >
          SweetEscape started with a dare, a borrowed convection oven, and a 2,000-rupee
          Instagram ad. This is how we got from there to SCO 114.
        </TextReveal>
      </header>

      {STORY_CHAPTERS.map((chapter, i) => (
        <Chapter key={chapter.id} chapter={chapter} index={i} />
      ))}

      <TimelineSVG />

      <section className="relative mx-auto mb-32 max-w-[1400px] px-6 md:px-10">
        <div className="relative overflow-hidden rounded-[40px] bg-[var(--color-espresso)] p-10 text-[var(--color-cream)] md:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 30%, rgba(232,163,69,0.5), transparent 40%)",
            }}
          />
          <div className="relative flex flex-col gap-6">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-honey)]">
              Chapter seven
            </span>
            <h2 className="max-w-3xl font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02]">
              You&apos;re reading this chapter. We&apos;d love for you to come write the next one.
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-terracotta)] px-6 py-3 transition-transform hover:scale-[1.02]"
              >
                Today&apos;s menu <ArrowRight size={16} weight="bold" />
              </Link>
              <Link
                href="/visit"
                className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--color-cream),transparent_70%)] px-6 py-3 transition-colors hover:bg-[color-mix(in_oklab,var(--color-cream),transparent_92%)]"
              >
                Visit the bakery <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
