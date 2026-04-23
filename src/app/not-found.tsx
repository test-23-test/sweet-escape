import type { Metadata } from "next";
import Link from "next/link";
import { PastryIcon } from "@/components/ui/PastryIcon";
import { TextReveal } from "@/components/ui/TextReveal";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested does not exist.",
};

export default function NotFound() {
  return (
    <section className="relative mx-auto flex min-h-[90dvh] max-w-[1400px] flex-col items-center justify-center px-6 py-24 text-center md:px-10">
      <div className="absolute inset-x-0 top-16 mx-auto h-[60%] w-full max-w-xl opacity-70">
        <PastryIcon kind="croissant" accent="#C27B52" />
      </div>

      <div className="relative mt-[24vh]">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-terracotta)]">
          Error 404 · nothing rising here
        </span>
        <TextReveal
          as="h1"
          className="mt-5 font-display text-[clamp(2.75rem,8vw,7rem)]"
        >
          This croissant fell out of the tray.
        </TextReveal>
        <TextReveal
          as="p"
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[color-mix(in_oklab,var(--color-ink),transparent_30%)]"
        >
          The page you&apos;re after either never got baked, or was pulled out
          of the display case. Head back to the warm side of the counter — the
          rest is still golden.
        </TextReveal>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-espresso)] px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-cream)] transition-colors duration-300 hover:bg-[var(--color-terracotta)]"
          >
            Back to the counter
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--color-ink),transparent_75%)] px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-ink)] transition-colors duration-300 hover:bg-[var(--color-ink)] hover:text-[var(--color-cream)]"
          >
            Browse the menu
          </Link>
        </div>
      </div>
    </section>
  );
}
