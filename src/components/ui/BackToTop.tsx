"use client";

import { useEffect, useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { ArrowUp } from "@phosphor-icons/react/dist/ssr";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function BackToTop() {
  const [show, setShow] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <m.button
          type="button"
          aria-label="Back to top"
          onClick={scrollUp}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          whileHover={reduced ? {} : { scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 left-6 z-[70] flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-espresso)] text-[var(--color-cream)] shadow-soft transition-shadow hover:shadow-lift sm:h-12 sm:w-12"
        >
          <ArrowUp size={18} weight="bold" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
