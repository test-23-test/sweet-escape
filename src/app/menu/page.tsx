import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuPageClient } from "@/components/menu/MenuPageClient";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Our daily bakes — cakes, viennoiserie, cookies, breads, and a small fusion line. Baked fresh every morning at SCO 114, Sector 35-B, Chandigarh.",
};

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-24">
        <header className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="h-4 w-56 animate-pulse rounded-full bg-[var(--color-linen)]" />
          <div className="mt-5 h-16 w-[80%] max-w-lg animate-pulse rounded-2xl bg-[var(--color-linen)]" />
          <div className="mt-5 h-5 w-[60%] max-w-md animate-pulse rounded-full bg-[var(--color-linen)]" />
        </header>
        <div className="mx-auto mt-14 grid max-w-[1400px] grid-cols-1 gap-6 px-6 sm:grid-cols-2 md:px-10 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-[28px] bg-[var(--color-linen)]" />
          ))}
        </div>
      </div>
    }>
      <MenuPageClient />
    </Suspense>
  );
}
