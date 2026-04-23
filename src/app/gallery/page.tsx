import type { Metadata } from "next";
import { TextReveal } from "@/components/ui/TextReveal";
import { GalleryClient } from "@/components/gallery/GalleryClient";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Drag to roam — photos and illustrations from inside SweetEscape Sector 35-B.",
};

export default function GalleryPage() {
  return (
    <div className="pt-32 pb-24">
      <header className="mx-auto max-w-[1400px] px-6 md:px-10">
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-terracotta)]">
          The gallery · pan to explore
        </span>
        <TextReveal
          as="h1"
          className="mt-5 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95]"
        >
          Twenty tiles. One counter.
        </TextReveal>
        <TextReveal
          as="p"
          className="mt-5 max-w-2xl text-lg text-[color-mix(in_oklab,var(--color-ink),transparent_30%)] md:text-xl"
        >
          A loose photo-mood of how the bakery actually looks on a Thursday. Grab, drag, and tap
          any tile to enlarge. Nothing here is stock.
        </TextReveal>
      </header>

      <div className="mx-auto mt-14 max-w-[1400px] px-6 md:px-10">
        <GalleryClient />
      </div>
    </div>
  );
}
