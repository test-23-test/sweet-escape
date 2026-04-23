"use client";

import { createElement, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

type Props = {
  as?: Tag;
  children: string;
  className?: string;
  stagger?: number;
  delay?: number;
  splitBy?: "word" | "char";
  start?: string;
};

const INLINE_TAGS: Tag[] = ["span"];

export function TextReveal({
  as = "p",
  children,
  className,
  stagger = 0.055,
  delay = 0,
  splitBy = "word",
  start = "top 85%",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tokens = Array.from(el.querySelectorAll<HTMLElement>("[data-token]"));
    if (!tokens.length) return;

    if (reduced) {
      gsap.set(tokens, { yPercent: 0, opacity: 1 });
      return;
    }

    gsap.set(tokens, { yPercent: 115, opacity: 0 });

    const ctx = gsap.context(() => {
      gsap.to(tokens, {
        yPercent: 0,
        opacity: 1,
        ease: "power3.out",
        duration: 0.9,
        stagger,
        delay,
        scrollTrigger: { trigger: el, start, once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [children, stagger, delay, reduced, start]);

  const units =
    splitBy === "word" ? children.split(/(\s+)/) : Array.from(children);

  return createElement(
    as,
    {
      ref,
      className: cn(INLINE_TAGS.includes(as) ? "inline-block" : "block", className),
      style: { textWrap: "balance" as const },
    },
    units.map((unit, i) => {
      if (/^\s+$/.test(unit)) {
        return (
          <span key={`s-${i}`} aria-hidden="false" style={{ whiteSpace: "pre" }}>
            {unit}
          </span>
        );
      }
      return (
        <span key={`u-${i}`} className="kinetic-word">
          <span data-token>{unit}</span>
        </span>
      );
    }),
  );
}
