"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Options = {
  strength?: number;
  radius?: number;
};

type Target = {
  el: HTMLElement;
  qX: gsap.QuickToFunc;
  qY: gsap.QuickToFunc;
  strength: number;
  radius: number;
  cx: number;
  cy: number;
};

const targets = new Map<HTMLElement, Target>();

function updateCachedPositions() {
  targets.forEach((t) => {
    const rect = t.el.getBoundingClientRect();
    t.cx = rect.left + rect.width / 2;
    t.cy = rect.top + rect.height / 2;
  });
}

function sharedMove(ev: PointerEvent) {
  const px = ev.clientX;
  const py = ev.clientY;

  targets.forEach((t) => {
    const roughDist = Math.abs(px - t.cx) + Math.abs(py - t.cy);
    if (roughDist > t.radius * 3) {
      t.qX(0);
      t.qY(0);
      return;
    }

    const rect = t.el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    t.cx = cx;
    t.cy = cy;
    const dx = px - cx;
    const dy = py - cy;
    if (Math.hypot(dx, dy) > t.radius) {
      t.qX(0);
      t.qY(0);
    } else {
      t.qX(dx * t.strength);
      t.qY(dy * t.strength);
    }
  });
}

let listenerActive = false;

function ensureListener() {
  if (listenerActive) return;
  window.addEventListener("pointermove", sharedMove, { passive: true });
  window.addEventListener("scroll", updateCachedPositions, { passive: true });
  listenerActive = true;
}

function maybeRemoveListener() {
  if (targets.size === 0 && listenerActive) {
    window.removeEventListener("pointermove", sharedMove);
    window.removeEventListener("scroll", updateCachedPositions);
    listenerActive = false;
  }
}

export function useMagnetic<T extends HTMLElement = HTMLElement>({
  strength = 0.35,
  radius = 140,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || strength === 0) return;

    const qX = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const qY = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });

    const rect = el.getBoundingClientRect();
    const target: Target = {
      el, qX, qY, strength, radius,
      cx: rect.left + rect.width / 2,
      cy: rect.top + rect.height / 2,
    };
    targets.set(el, target);
    ensureListener();

    const onLeave = () => {
      qX(0);
      qY(0);
    };
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointerleave", onLeave);
      targets.delete(el);
      maybeRemoveListener();
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [reduced, strength, radius]);

  return ref;
}
