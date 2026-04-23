"use client";

import type Lenis from "lenis";

/**
 * Shared scroll-lock used by the cart drawer, mobile nav, and command palette.
 *
 * Locks body overflow AND pauses Lenis so the two can't fight. Counted locks —
 * multiple overlays can stack and the body unlocks only once all of them
 * release, which is important because both the mobile nav and the cart can
 * briefly overlap.
 */

let lenisInstance: Lenis | null = null;
let lockCount = 0;
let savedOverflow = "";
let savedPaddingRight = "";

export function registerLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function lock() {
  if (typeof document === "undefined") return;
  lockCount += 1;
  if (lockCount > 1) return;

  const scrollbarGutter = window.innerWidth - document.documentElement.clientWidth;
  savedOverflow = document.body.style.overflow;
  savedPaddingRight = document.body.style.paddingRight;

  document.body.style.overflow = "hidden";
  if (scrollbarGutter > 0) {
    document.body.style.paddingRight = `${scrollbarGutter}px`;
  }

  lenisInstance?.stop();
}

export function unlock() {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0) return;

  document.body.style.overflow = savedOverflow;
  document.body.style.paddingRight = savedPaddingRight;
  savedOverflow = "";
  savedPaddingRight = "";

  lenisInstance?.start();
}
