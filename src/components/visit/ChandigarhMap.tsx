"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LocationPin } from "@/components/visit/LocationPin";

export function ChandigarhMap() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    const path = pathRef.current;
    if (!wrap || !path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top 75%",
          end: "bottom 40%",
          scrub: 0.5,
        },
      });

      gsap.from("[data-map-sector]", {
        opacity: 0,
        stagger: 0.03,
        duration: 0.5,
        scrollTrigger: { trigger: wrap, start: "top 80%" },
      });
    }, wrap);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-[5/4] w-full overflow-hidden rounded-[32px] border border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] bg-[var(--color-linen)]"
    >
      <svg viewBox="0 0 600 480" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <pattern id="map-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(47,31,20,0.08)" strokeWidth="1" />
          </pattern>
          <linearGradient id="route" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-honey)" />
            <stop offset="100%" stopColor="var(--color-terracotta)" />
          </linearGradient>
        </defs>
        <rect width="600" height="480" fill="url(#map-grid)" />

        {/* sector blocks loosely modelled on Chandigarh's grid */}
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: 6 }).map((_, c) => {
            const x = 30 + c * 95;
            const y = 30 + r * 85;
            const sectorNo = 9 + r * 6 + c;
            const isOurs = sectorNo === 35;
            return (
              <g key={`${r}-${c}`} data-map-sector>
                <rect
                  x={x}
                  y={y}
                  width="80"
                  height="70"
                  rx="6"
                  fill={isOurs ? "var(--color-butter)" : "rgba(47,31,20,0.04)"}
                  stroke={isOurs ? "var(--color-terracotta)" : "rgba(47,31,20,0.2)"}
                  strokeWidth={isOurs ? 2 : 1}
                />
                <text
                  x={x + 8}
                  y={y + 18}
                  fontSize="10"
                  fontFamily="var(--font-mono)"
                  fill="rgba(47,31,20,0.55)"
                >
                  Sec {sectorNo}
                </text>
              </g>
            );
          }),
        )}

        {/* boulevards */}
        <path
          d="M 0 240 L 600 240"
          stroke="rgba(47,31,20,0.15)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="2 8"
        />
        <path
          d="M 300 0 L 300 480"
          stroke="rgba(47,31,20,0.15)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="2 8"
        />

        {/* route from ISBT to SweetEscape */}
        <path
          ref={pathRef}
          d="M 40 410 C 140 380 200 340 250 300 C 310 260 360 240 410 230 C 450 225 470 220 472 215"
          fill="none"
          stroke="url(#route)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* landmarks */}
        <g fontFamily="var(--font-mono)" fontSize="9" fill="rgba(47,31,20,0.55)">
          <circle cx="40" cy="410" r="5" fill="var(--color-espresso)" />
          <text x="50" y="415">ISBT Sector 17</text>
          <circle cx="300" cy="360" r="4" fill="rgba(47,31,20,0.6)" />
          <text x="308" y="364">Sukhna Lake</text>
        </g>

        <circle cx="472" cy="215" r="6" fill="var(--color-terracotta)" />
      </svg>

      <div
        className="pointer-events-none absolute"
        style={{
          left: `${(472 / 600) * 100}%`,
          top: `${(215 / 480) * 100}%`,
          transform: "translate(-50%, -100%)",
        }}
      >
        <LocationPin label="SCO 114" />
      </div>

      <div className="absolute bottom-5 left-5 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
        30.7291°N · 76.7586°E · Sector 35-B
      </div>
    </div>
  );
}
