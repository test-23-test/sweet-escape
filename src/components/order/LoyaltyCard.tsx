"use client";

import { m } from "motion/react";
import { Gift, Star } from "@phosphor-icons/react/dist/ssr";
import { useLoyalty, useLoyaltyStamps } from "@/stores/loyalty";
import { cn } from "@/lib/cn";

const TOTAL = 10;

export function LoyaltyCard() {
  const stamps = useLoyaltyStamps();
  const redeemed = useLoyalty((s) => s.redeemed);
  const redeem = useLoyalty((s) => s.redeem);
  const canRedeem = stamps >= TOTAL;

  return (
    <section
      className="mb-12 rounded-[28px] border border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] bg-[var(--color-linen)] p-6 md:p-8"
      aria-label="Loyalty rewards"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-terracotta)]">
            <Gift size={12} weight="duotone" className="mr-1.5 inline-block align-[-1px]" />
            Loyalty card
          </span>
          <h3 className="mt-2 font-display text-2xl leading-tight md:text-3xl">
            {canRedeem ? "Free pastry unlocked!" : `${stamps} of ${TOTAL} stamps`}
          </h3>
          <p className="mt-1 text-sm text-[color-mix(in_oklab,var(--color-ink),transparent_35%)]">
            {canRedeem
              ? "You've earned a free pastry of your choice. Redeem below."
              : `Order ${TOTAL - stamps} more time${TOTAL - stamps === 1 ? "" : "s"} to earn a free pastry.`}
          </p>
        </div>
        {redeemed > 0 && (
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
            {redeemed} free pastry{redeemed > 1 ? "s" : ""} redeemed
          </span>
        )}
      </div>

      <div className="mt-6 grid grid-cols-5 gap-2 sm:gap-3" role="img" aria-label={`${stamps} of ${TOTAL} stamps collected`}>
        {Array.from({ length: TOTAL }).map((_, i) => {
          const filled = i < stamps;
          return (
            <m.div
              key={i}
              initial={false}
              animate={{
                scale: filled ? 1 : 0.85,
                opacity: filled ? 1 : 0.4,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={cn(
                "flex aspect-square items-center justify-center rounded-2xl border-2 transition-colors duration-300",
                filled
                  ? "border-[var(--color-honey)] bg-gradient-to-br from-[var(--color-honey)] to-[var(--color-terracotta)]"
                  : "border-dashed border-[color-mix(in_oklab,var(--color-ink),transparent_75%)] bg-transparent",
              )}
            >
              {filled ? (
                <Star size={20} weight="fill" className="text-white" />
              ) : (
                <span className="font-mono text-[0.65rem] tabular-nums text-[color-mix(in_oklab,var(--color-ink),transparent_55%)]">
                  {i + 1}
                </span>
              )}
            </m.div>
          );
        })}
      </div>

      {canRedeem && (
        <m.button
          type="button"
          onClick={() => redeem()}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 w-full rounded-full bg-[var(--color-espresso)] py-3 text-center font-display text-lg text-[var(--color-cream)] shadow-glow transition-opacity hover:opacity-90"
        >
          <Gift size={18} weight="duotone" className="mr-2 inline-block align-[-3px] text-[var(--color-honey)]" />
          Redeem free pastry
        </m.button>
      )}
    </section>
  );
}
