"use client";

import Link from "next/link";
import { m } from "motion/react";
import { MapPin, Clock, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { TextReveal } from "@/components/ui/TextReveal";

export function VisitTeaser() {
  return (
    <section className="relative py-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-6 md:grid-cols-[0.9fr_1.1fr] md:px-10">
        <div>
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[var(--color-terracotta)]">
            The shop
          </span>
          <TextReveal
            as="h2"
            className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]"
          >
            A small corner of Sector 35 where the ovens never quite cool.
          </TextReveal>
          <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <dt className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                <MapPin size={14} weight="duotone" />
                Address
              </dt>
              <dd className="mt-2 font-display text-2xl leading-tight">
                SCO 114, Sector 35-B<br />Chandigarh 160022
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                <Clock size={14} weight="duotone" />
                Hours
              </dt>
              <dd className="mt-2 font-display text-2xl leading-tight">
                Tue – Sun<br />
                <span className="font-mono text-lg">08 : 00 – 22 : 00</span>
              </dd>
            </div>
          </dl>
          <Link
            href="/visit"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--color-espresso)] px-6 py-3 text-sm text-[var(--color-cream)] transition-colors duration-300 hover:bg-[var(--color-terracotta)]"
          >
            Get directions <ArrowUpRight size={16} weight="bold" />
          </Link>
        </div>

        <ChandigarhGrid />
      </div>
    </section>
  );
}

function ChandigarhGrid() {
  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden rounded-[32px] border border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] bg-[var(--color-linen)]">
      <svg
        viewBox="0 0 500 400"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(47,31,20,0.1)" strokeWidth="1" />
          </pattern>
          <linearGradient id="roadway" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c8553d" stopOpacity="0" />
            <stop offset="40%" stopColor="#c8553d" stopOpacity="1" />
            <stop offset="100%" stopColor="#e8a345" stopOpacity="1" />
          </linearGradient>
        </defs>
        <rect width="500" height="400" fill="url(#grid)" />
        {/* sector grid */}
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            {[0, 1, 2, 3, 4].map((c) => {
              const x = 50 + c * 90;
              const y = 50 + r * 80;
              return (
                <g key={c}>
                  <rect
                    x={x}
                    y={y}
                    width="70"
                    height="60"
                    fill="none"
                    stroke="rgba(47,31,20,0.25)"
                    strokeWidth="1"
                  />
                  <text
                    x={x + 6}
                    y={y + 16}
                    fontSize="9"
                    fontFamily="var(--font-mono)"
                    fill="rgba(47,31,20,0.4)"
                  >
                    S{r * 10 + c + 17}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
        {/* route line */}
        <path
          d="M 30 370 C 120 320, 180 300, 260 240 C 310 205, 340 175, 380 140"
          fill="none"
          stroke="url(#roadway)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="1 0"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="480"
            to="0"
            dur="3s"
            fill="freeze"
            begin="0.3s"
          />
          <animate attributeName="stroke-dasharray" values="0,480;480,0" dur="3s" fill="freeze" begin="0.3s" />
        </path>
      </svg>

      {/* pulsing pin */}
      <m.div
        initial={{ scale: 0, y: -20, opacity: 0 }}
        whileInView={{ scale: 1, y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ type: "spring", stiffness: 220, damping: 18, delay: 0.9 }}
        className="absolute"
        style={{ left: "76%", top: "35%" }}
      >
        <div className="relative">
          <span
            aria-hidden
            className="absolute inset-0 -z-10 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-[var(--color-terracotta)] opacity-40"
          />
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 -z-10 h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-[var(--color-honey)] opacity-25"
            style={{ animationDelay: "0.4s" }}
          />
          <div className="flex -translate-x-1/2 -translate-y-full flex-col items-center">
            <div className="rounded-full bg-[var(--color-espresso)] px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-cream)] shadow-lift">
              SweetEscape
            </div>
            <svg width="22" height="32" viewBox="0 0 22 32" className="-mt-1">
              <path
                d="M11 0C4.9 0 0 4.9 0 11c0 8.3 11 21 11 21s11-12.7 11-21C22 4.9 17.1 0 11 0z"
                fill="var(--color-terracotta)"
              />
              <circle cx="11" cy="11" r="4" fill="var(--color-cream)" />
            </svg>
          </div>
        </div>
      </m.div>

      <div className="absolute bottom-4 left-5 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
        30.7291°N · 76.7586°E
      </div>
    </div>
  );
}
