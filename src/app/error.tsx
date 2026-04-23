"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80dvh] flex-col items-center justify-center px-6 text-center">
      <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-terracotta)]">
        Something went wrong
      </span>
      <h1 className="mt-4 font-display text-[clamp(2rem,5vw,4rem)]">
        That wasn&apos;t supposed to happen.
      </h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-[color-mix(in_oklab,var(--color-ink),transparent_30%)]">
        We hit an unexpected error. Try again — if it persists, the bakers are
        probably debugging it right now.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-full bg-[var(--color-espresso)] px-6 py-3 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-cream)] transition-colors hover:bg-[var(--color-terracotta)]"
      >
        Try again
      </button>
    </section>
  );
}
