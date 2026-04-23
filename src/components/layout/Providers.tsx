"use client";

import { LazyMotion, domMax, MotionConfig } from "motion/react";
import { useEffect } from "react";
import "@/lib/gsap";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("is-ready");
  }, []);

  return (
    // `domMax` (vs `domAnimation`) is required because the Testimonials
    // coverflow uses drag-to-advance. Strict mode is off intentionally so
    // components can still use the `motion.*` alias without crashing.
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 260, damping: 30 }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
