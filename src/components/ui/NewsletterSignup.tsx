"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "motion/react";
import { EnvelopeSimple, CheckCircle } from "@phosphor-icons/react/dist/ssr";

type Status = "idle" | "submitting" | "done" | "already";

const STORAGE_KEY = "sweetescape-newsletter";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY)) {
      setStatus("already");
    }
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1200));
    localStorage.setItem(STORAGE_KEY, email);
    setStatus("done");
  };

  if (status === "already") {
    return (
      <div className="flex items-center gap-2 text-sm text-[color-mix(in_oklab,var(--color-cream),transparent_35%)]">
        <CheckCircle size={16} weight="duotone" className="text-[var(--color-honey)]" />
        You&apos;re subscribed to our weekly bake notes.
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-honey)]">
        Bake notes · weekly
      </p>
      <p className="mt-2 text-sm text-[color-mix(in_oklab,var(--color-cream),transparent_25%)]">
        One email a week — what&apos;s coming out of the oven, seasonal specials, the odd recipe.
      </p>
      <AnimatePresence mode="wait">
        {status === "done" ? (
          <m.div
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 text-[var(--color-honey)]"
          >
            <CheckCircle size={20} weight="duotone" />
            <span className="font-display text-lg">You&apos;re in. See you Monday.</span>
          </m.div>
        ) : (
          <m.form
            key="form"
            onSubmit={onSubmit}
            exit={{ opacity: 0, y: -8 }}
            className="mt-4 flex flex-col gap-2 sm:flex-row"
          >
            <div className="relative flex-1">
              <EnvelopeSimple
                size={16}
                weight="duotone"
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[color-mix(in_oklab,var(--color-cream),transparent_55%)]"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full rounded-full border border-[color-mix(in_oklab,var(--color-cream),transparent_75%)] bg-transparent py-2.5 pl-10 pr-4 text-sm text-[var(--color-cream)] outline-none transition-colors placeholder:text-[color-mix(in_oklab,var(--color-cream),transparent_55%)] focus:border-[var(--color-honey)]"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="shrink-0 rounded-full bg-[var(--color-honey)] px-5 py-2.5 text-sm font-medium text-[var(--color-espresso)] transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "submitting" ? "Subscribing…" : "Subscribe"}
            </button>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
