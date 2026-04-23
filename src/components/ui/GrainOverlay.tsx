"use client";

import { useLowGPU } from "@/hooks/useLowGPU";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function GrainOverlay() {
  const low = useLowGPU();
  const reduced = useReducedMotion();
  if (low || reduced) return null;
  return <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[48]" />;
}
