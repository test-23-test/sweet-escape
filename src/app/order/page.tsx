import type { Metadata } from "next";
import { ProductGrid } from "@/components/order/ProductGrid";
import { CheckoutStub } from "@/components/order/CheckoutStub";
import { LoyaltyCard } from "@/components/order/LoyaltyCard";
import { TextReveal } from "@/components/ui/TextReveal";

export const metadata: Metadata = {
  title: "Order online",
  description:
    "Reserve pickup for today's bake — 42 fusion-bakery items, no online payment, ready in 20 minutes. SCO 114, Sector 35-B, Chandigarh.",
};

export default function OrderPage() {
  return (
    <div className="pt-32 pb-24">
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-terracotta)]">
          Order online · pickup only
        </span>
        <TextReveal
          as="h1"
          className="mt-5 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95]"
        >
          Pack it warm. We&apos;ll keep it aside.
        </TextReveal>
        <TextReveal
          as="p"
          className="mt-5 max-w-2xl text-lg text-[color-mix(in_oklab,var(--color-ink),transparent_30%)] md:text-xl"
        >
          Reserve today&apos;s bakes; pick them up from the counter within the next few hours. No
          payment online — pay at the bakery.
        </TextReveal>
      </header>

      <div className="mx-auto mt-16 max-w-[1400px] px-6 md:px-10">
        <ProductGrid />
        <LoyaltyCard />
        <CheckoutStub />
      </div>
    </div>
  );
}
