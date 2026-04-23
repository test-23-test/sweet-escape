"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { TIMELINE_EVENTS } from "@/data/storyChapters";

export function TimelineSVG() {
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
          start: "top 80%",
          end: "bottom 40%",
          scrub: 0.6,
        },
      });

      gsap.from("[data-timeline-dot]", {
        scale: 0,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: wrap,
          start: "top 75%",
        },
      });
      gsap.from("[data-timeline-label]", {
        y: 16,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: wrap,
          start: "top 75%",
        },
      });
    }, wrap);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  return (
    <section
      ref={wrapRef}
      className="mx-auto my-24 max-w-[1400px] px-6 md:px-10"
      aria-label="Timeline"
    >
      <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-terracotta)]">
        On paper · 2019 → 2026
      </span>
      <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.02]">
        A short history, drawn by hand.
      </h2>

      <div className="relative mt-16 w-full">
        <svg viewBox="0 0 1200 260" className="w-full" aria-hidden>
          <path
            ref={pathRef}
            d="M20,180 C220,60 420,260 600,130 C780,0 960,260 1180,80"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {TIMELINE_EVENTS.map((e, i) => {
            const x = 20 + (1160 / (TIMELINE_EVENTS.length - 1)) * i;
            return (
              <g key={e.year}>
                <circle
                  data-timeline-dot
                  cx={x}
                  cy={180 - Math.sin((i / (TIMELINE_EVENTS.length - 1)) * Math.PI * 2) * 60}
                  r="8"
                  fill={e.accent}
                  stroke="var(--color-ink)"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </svg>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {TIMELINE_EVENTS.map((e) => (
            <div
              key={e.year}
              data-timeline-label
              className="rounded-2xl border border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] p-4"
            >
              <span
                className="inline-block rounded-full px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-[0.22em]"
                style={{ background: e.accent, color: "var(--color-espresso)" }}
              >
                {e.year}
              </span>
              <p className="mt-2 font-display text-base leading-snug">{e.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
