import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { SignatureBakes } from "@/components/home/SignatureBakes";
import { VisitTeaser } from "@/components/home/VisitTeaser";
import { ContactTeaser } from "@/components/home/ContactTeaser";

const DailySpecials = dynamic(
  () => import("@/components/home/DailySpecials").then((m) => m.DailySpecials),
  {
    loading: () => (
      <div className="bg-[var(--color-cream)] py-24" aria-hidden>
        <div className="mx-auto h-[400px] max-w-[1400px] px-6 md:px-10" />
      </div>
    ),
  },
);

const ProcessScrolly = dynamic(
  () => import("@/components/home/ProcessScrolly").then((m) => m.ProcessScrolly),
  {
    loading: () => (
      <div className="min-h-[100dvh] bg-[var(--color-espresso)]" aria-hidden />
    ),
  },
);

const Testimonials = dynamic(
  () => import("@/components/home/Testimonials").then((m) => m.Testimonials),
  {
    loading: () => (
      <div className="bg-[var(--color-cream)] py-32" aria-hidden>
        <div className="mx-auto h-[500px] max-w-[1400px] px-6 md:px-10" />
      </div>
    ),
  },
);

const ReviewHighlights = dynamic(
  () => import("@/components/home/ReviewHighlights").then((m) => m.ReviewHighlights),
  {
    loading: () => (
      <div className="bg-[var(--color-linen)] py-24" aria-hidden>
        <div className="mx-auto h-[360px] max-w-[1400px] px-6 md:px-10" />
      </div>
    ),
  },
);

export default function Home() {
  return (
    <>
      <Hero />
      <StoryTeaser />
      <SignatureBakes />
      <DailySpecials />
      <ProcessScrolly />
      <VisitTeaser />
      <Testimonials />
      <ReviewHighlights />
      <ContactTeaser />
    </>
  );
}
