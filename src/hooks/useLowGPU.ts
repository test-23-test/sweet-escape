"use client";

import { useState, useEffect } from "react";

function check() {
  return window.innerWidth < 768 || navigator.hardwareConcurrency <= 2;
}

/**
 * Returns true on narrow viewports or very weak CPUs.
 * Always returns false on the server and on first client render to avoid
 * hydration mismatches — the real value kicks in after mount.
 */
export function useLowGPU() {
  const [low, setLow] = useState(false);

  useEffect(() => {
    setLow(check());
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setLow(check());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return low;
}
