"use client";

import { useEffect, useRef, useState } from "react";
import { HOURS } from "@/data/hours";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const DAY_INDEX = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function useToday() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
  }, []);
  return now;
}

export function HoursTable() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();
  const now = useToday();
  const todayName = now ? DAY_INDEX[now.getDay()] : null;

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    if (!wrap) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hours-row]", {
        x: -24,
        opacity: 0,
        stagger: 0.06,
        duration: 0.7,
        ease: "power3.out",
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
      className="rounded-[28px] border border-[color-mix(in_oklab,var(--color-ink),transparent_85%)] bg-[var(--color-linen)] p-6"
    >
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-2xl leading-tight">Hours</h3>
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
          IST · closed Mondays
        </span>
      </div>

      <ul className="mt-5 divide-y divide-[color-mix(in_oklab,var(--color-ink),transparent_90%)]">
        {HOURS.map((h) => {
          const isToday = h.day === todayName;
          const isClosed = !h.open;
          return (
            <li
              data-hours-row
              key={h.day}
              className={[
                "flex items-center justify-between gap-3 rounded-2xl px-2 py-3",
                isToday ? "bg-[color-mix(in_oklab,var(--color-honey),transparent_75%)]" : "",
              ].join(" ")}
            >
              <div className="flex items-center gap-3">
                {isToday ? (
                  <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--color-terracotta)]" aria-hidden />
                ) : (
                  <span className="inline-block h-2 w-2 rounded-full bg-transparent" aria-hidden />
                )}
                <span className="font-display text-lg leading-none">{h.day}</span>
                {isToday ? (
                  <span className="font-script text-lg text-[var(--color-terracotta)]">today</span>
                ) : null}
              </div>
              <div className="text-right">
                <span className={`font-mono text-sm tabular-nums ${isClosed ? "text-[color-mix(in_oklab,var(--color-ink),transparent_50%)] italic" : "text-[var(--color-ink)]"}`}>
                  {isClosed ? "Closed" : `${h.open} – ${h.close}`}
                </span>
                {h.note ? (
                  <p className="mt-0.5 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                    {h.note}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
