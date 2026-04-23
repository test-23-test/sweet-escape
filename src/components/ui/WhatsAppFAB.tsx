"use client";

import { useState, useEffect } from "react";
import { m, AnimatePresence } from "motion/react";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCart } from "@/stores/cart";

const WA_NUMBER = "911724197326";
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi SweetEscape! I'd like to place an order.")}`;

export function WhatsAppFAB() {
  const reduced = useReducedMotion();
  const cartOpen = useCart((s) => s.isOpen);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setVisible(true), 800);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <m.a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order on WhatsApp"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: cartOpen ? -60 : 0,
          }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          whileHover={reduced ? {} : { scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lift transition-shadow hover:shadow-glow sm:h-16 sm:w-16"
        >
          <WhatsappLogo size={28} weight="fill" className="sm:hidden" />
          <WhatsappLogo size={32} weight="fill" className="hidden sm:block" />
        </m.a>
      )}
    </AnimatePresence>
  );
}
