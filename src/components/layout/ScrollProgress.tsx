"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? scrollTop / max : 0;
      gsap.set(bar, { scaleX: p });
    };

    update();
    const trig = ScrollTrigger.create({ onUpdate: update });
    window.addEventListener("resize", update);
    return () => {
      trig.kill();
      window.removeEventListener("resize", update);
    };
  }, [reduced]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[49] h-[3px]">
      <div
        ref={barRef}
        className="absolute inset-0 origin-left bg-gradient-to-r from-[var(--color-terracotta)] via-[var(--color-honey)] to-[var(--color-butter)]"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
