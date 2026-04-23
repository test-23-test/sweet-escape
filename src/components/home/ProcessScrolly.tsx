"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { PROCESS_STEPS } from "@/data/processSteps";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ProcessScrolly() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  const setStepRef = useCallback(
    (i: number) => (el: HTMLLIElement | null) => { stepRefs.current[i] = el; },
    [],
  );

  // Desktop: GSAP-pinned scroll timeline
  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const pin = pinRef.current;
    const path = pathRef.current;
    if (!section || !pin || !path) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const stepCount = PROCESS_STEPS.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * stepCount * 0.9}`,
          pin: pin,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      PROCESS_STEPS.forEach((step, i) => {
        if (i === 0) return;
        tl.to(path, {
          attr: { d: step.pathD },
          fill: step.accent,
          ease: "sine.inOut",
          duration: 1,
        }, i);
      });

      tl.eventCallback("onUpdate", () => {
        const prog = tl.progress();
        const index = Math.min(
          PROCESS_STEPS.length - 1,
          Math.floor(prog * PROCESS_STEPS.length),
        );
        setActive(index);
      });

      return () => {
        setActive(0);
      };
    });

    return () => mm.revert();
  }, [reduced]);

  // IntersectionObserver fallback: drives active step on mobile (always) and
  // on desktop when reduced motion is on (since the GSAP timeline is skipped).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (isDesktop && !reduced) return;

    const els = stepRefs.current.filter(Boolean) as HTMLLIElement[];
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = els.indexOf(entry.target as HTMLLIElement);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      { rootMargin: "-35% 0px -35% 0px", threshold: 0.3 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="relative bg-[var(--color-espresso)] text-[var(--color-cream)]"
      aria-label="Our process"
    >
      <div
        ref={pinRef}
        className="flex min-h-[100dvh] w-full items-center overflow-hidden py-24 md:py-20"
      >
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-10">
          <div className="relative order-2 md:order-1">
            <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] uppercase tracking-[0.28em] text-[color-mix(in_oklab,var(--color-honey),#fff_10%)]">
              <span aria-hidden className="inline-block h-px w-8 bg-current opacity-70" />
              The 5am loop · daily
            </span>
            <h2 className="mt-5 font-display text-[clamp(2.25rem,5.5vw,4.6rem)] leading-[1.02]">
              <span className="italic text-[var(--color-honey)]">Five</span> stages
              <br /> between sleep and breakfast.
            </h2>
            <ol className="mt-10 flex flex-col gap-1.5">
              {PROCESS_STEPS.map((step, i) => {
                const isActive = i === active;
                return (
                  <li
                    key={step.id}
                    ref={setStepRef(i)}
                    aria-current={isActive ? "step" : undefined}
                    className={[
                      "grid grid-cols-[auto_1fr_auto] items-start gap-4 rounded-2xl px-4 py-3 transition-colors duration-500",
                      isActive
                        ? "bg-[color-mix(in_oklab,var(--color-cream),transparent_88%)] text-[var(--color-cream)] ring-1 ring-[color-mix(in_oklab,var(--color-honey),transparent_60%)]"
                        : "text-[color-mix(in_oklab,var(--color-cream),transparent_30%)] hover:text-[var(--color-cream)]",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "font-mono text-sm tabular-nums transition-colors duration-500",
                        isActive
                          ? "text-[var(--color-honey)]"
                          : "text-[color-mix(in_oklab,var(--color-honey),transparent_40%)]",
                      ].join(" ")}
                    >
                      {step.number}
                    </span>
                    <div>
                      <p className="font-display text-xl leading-tight md:text-2xl">
                        {step.title}
                      </p>
                      <p
                        className={[
                          "mt-1 max-w-md text-sm leading-relaxed text-[color-mix(in_oklab,var(--color-cream),transparent_15%)] transition-[opacity,max-height] duration-500",
                          reduced
                            ? ""
                            : isActive
                              ? "lg:opacity-100 lg:max-h-40"
                              : "lg:opacity-0 lg:max-h-0 lg:overflow-hidden",
                        ].join(" ")}
                      >
                        {step.description}
                      </p>
                    </div>
                    <span
                      className={[
                        "font-mono text-xs tabular-nums transition-colors duration-500",
                        isActive
                          ? "text-[var(--color-honey)]"
                          : "text-[color-mix(in_oklab,var(--color-honey),transparent_55%)]",
                      ].join(" ")}
                    >
                      {step.time}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="relative order-1 md:order-2">
            <div className="relative mx-auto aspect-square w-full max-w-[420px] md:max-w-[520px]">
              <svg
                viewBox="0 0 200 200"
                className="h-full w-full drop-shadow-[0_30px_60px_rgba(232,163,69,0.25)]"
                aria-hidden
              >
                <defs>
                  <radialGradient id="process-grad" cx="50%" cy="40%" r="70%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                  </radialGradient>
                </defs>
                <path
                  ref={pathRef}
                  d={PROCESS_STEPS[0].pathD}
                  fill={PROCESS_STEPS[0].accent}
                  stroke="rgba(47,31,20,0.25)"
                  strokeWidth="0.75"
                />
                <path
                  d="M60,60 Q100,30 140,60 Q170,100 140,140 Q100,170 60,140 Q30,100 60,60Z"
                  fill="url(#process-grad)"
                  opacity="0.5"
                />
              </svg>
              <div className="absolute inset-x-0 -bottom-6 text-center md:-bottom-10">
                <span className="font-script text-3xl text-[var(--color-honey)] md:text-4xl">
                  {PROCESS_STEPS[active]?.title}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
