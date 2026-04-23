"use client";

import { useId, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  d: string;
  accent: string;
  className?: string;
};

export function DoughMorph({ d, accent, className }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const sheenId = `dough-sheen-${uid}`;
  const filterId = `dough-soft-${uid}`;

  const pathRef = useRef<SVGPathElement | null>(null);
  const reduced = useReducedMotion();
  const prevD = useRef(d);
  const prevAccent = useRef(accent);

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    if (reduced) {
      el.setAttribute("d", d);
      el.setAttribute("fill", accent);
      return;
    }
    if (prevD.current !== d) {
      gsap.to(el, {
        attr: { d },
        ease: "sine.inOut",
        duration: 1.2,
      });
      prevD.current = d;
    }
    if (prevAccent.current !== accent) {
      gsap.to(el, {
        attr: { fill: accent },
        ease: "sine.inOut",
        duration: 1.2,
      });
      prevAccent.current = accent;
    }
  }, [d, accent, reduced]);

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <defs>
        <radialGradient id={sheenId} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>
      <g filter={`url(#${filterId})`}>
        <path
          ref={pathRef}
          d={d}
          fill={accent}
          stroke="rgba(47,31,20,0.2)"
          strokeWidth="0.8"
        />
      </g>
      <path d={d} fill={`url(#${sheenId})`} opacity={0.55} pointerEvents="none" />
    </svg>
  );
}
