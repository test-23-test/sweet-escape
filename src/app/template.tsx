"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(6px)";

    const raf = requestAnimationFrame(() => {
      el.style.transition = "opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });

    const cleanup = () => {
      el.style.transition = "";
      el.style.opacity = "";
      el.style.transform = "";
    };
    el.addEventListener("transitionend", cleanup, { once: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("transitionend", cleanup);
      el.style.transition = "";
      el.style.opacity = "";
      el.style.transform = "";
    };
  }, [reduced]);

  return <div ref={ref}>{children}</div>;
}
