"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  children: ReactNode;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  reverseOnScroll?: boolean;
  repeat?: number;
};

export function Marquee({
  children,
  speed = 60,
  direction = "left",
  className,
  reverseOnScroll = true,
  repeat = 2,
}: Props) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reduced) return;

    const half = track.scrollWidth / 2;
    const duration = half / speed;
    const from = direction === "left" ? 0 : -half;
    const to = direction === "left" ? -half : 0;

    gsap.set(track, { x: from });
    const tween = gsap.to(track, {
      x: to,
      duration,
      ease: "none",
      repeat: -1,
    });
    tweenRef.current = tween;

    let trig: ScrollTrigger | undefined;
    if (reverseOnScroll) {
      trig = ScrollTrigger.create({
        trigger: track,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = self.getVelocity();
          if (!Number.isFinite(v)) return;
          const targetDir = v > 0 ? 1 : -1;
          const base = direction === "left" ? -1 : 1;
          gsap.to(tween, {
            timeScale: base * targetDir * Math.min(3, 1 + Math.abs(v) / 2500),
            duration: 0.4,
            overwrite: true,
          });
        },
      });
    }

    return () => {
      tween.kill();
      trig?.kill();
    };
  }, [direction, speed, reverseOnScroll, reduced]);

  if (reduced) {
    return (
      <div className={cn("relative w-full overflow-hidden", className)}>
        <div className="inline-flex whitespace-nowrap">{children}</div>
      </div>
    );
  }

  return (
    <div className={cn("relative w-full overflow-hidden mask-fade-x", className)}>
      <div ref={trackRef} className="inline-flex whitespace-nowrap will-change-transform">
        {Array.from({ length: repeat }).map((_, i) => (
          <div key={i} className="inline-flex shrink-0" aria-hidden={i > 0}>
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
