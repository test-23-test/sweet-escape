"use client";

import { createPortal } from "react-dom";
import { m, AnimatePresence } from "motion/react";
import { X, CheckCircle, Info, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { useToast, type Toast } from "@/stores/toast";
import { useEffect, useState } from "react";

const ICON: Record<NonNullable<Toast["type"]>, typeof CheckCircle> = {
  success: CheckCircle,
  info: Info,
  error: WarningCircle,
};

const ICON_COLOR: Record<NonNullable<Toast["type"]>, string> = {
  success: "text-[#25D366]",
  info: "text-[var(--color-honey)]",
  error: "text-[var(--color-terracotta)]",
};

export function ToastStack() {
  const toasts = useToast((s) => s.toasts);
  const dismiss = useToast((s) => s.dismiss);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <div
      aria-live="polite"
      aria-relevant="additions removals"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[80] flex flex-col items-center gap-2 px-4"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => {
          const type = t.type ?? "info";
          const Icon = ICON[type];
          return (
            <m.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              role="status"
              className="pointer-events-auto flex max-w-md items-center gap-3 rounded-2xl bg-[var(--color-espresso)] px-5 py-3 text-sm text-[var(--color-cream)] shadow-lift"
            >
              <Icon size={18} weight="fill" className={ICON_COLOR[type]} />
              <span className="flex-1">{t.message}</span>
              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => dismiss(t.id)}
                className="shrink-0 rounded-full p-1 transition-colors hover:bg-[color-mix(in_oklab,var(--color-cream),transparent_85%)]"
              >
                <X size={12} />
              </button>
            </m.div>
          );
        })}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
