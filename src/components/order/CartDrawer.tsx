"use client";

import { m, AnimatePresence } from "motion/react";
import { X, Minus, Plus, Trash } from "@phosphor-icons/react/dist/ssr";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart, formatRupees } from "@/stores/cart";
import { Button } from "@/components/ui/Button";
import { lock, unlock } from "@/lib/scrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export function CartDrawer() {
  const router = useRouter();
  const open = useCart((s) => s.isOpen);
  const items = useCart((s) => s.items);
  const setOpen = useCart((s) => s.setOpen);
  const increment = useCart((s) => s.increment);
  const decrement = useCart((s) => s.decrement);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.items.reduce((a, i) => a + i.price * i.qty, 0));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const trapRef = useFocusTrap<HTMLElement>(open);

  useEffect(() => {
    if (!open) return;
    lock();
    return () => {
      unlock();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <m.div
            key="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[70] bg-[color-mix(in_oklab,var(--color-espresso),transparent_35%)] backdrop-blur-sm"
            aria-hidden
          />
          <m.aside
            key="cart-panel"
            ref={trapRef}
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 32 }}
            className="fixed right-0 top-0 z-[71] flex h-[100dvh] w-full flex-col bg-[var(--color-cream)] shadow-lift sm:w-[440px]"
          >
            <header className="flex items-center justify-between border-b border-[color-mix(in_oklab,var(--color-ink),transparent_88%)] px-6 py-5">
              <div>
                <h3 className="font-display text-3xl leading-none">Your bag</h3>
                <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                  {items.length ? `${items.length} unique item${items.length === 1 ? "" : "s"}` : "Still empty"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close bag"
                className="rounded-full p-2 transition-colors hover:bg-[color-mix(in_oklab,var(--color-ink),transparent_92%)]"
              >
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-4" data-lenis-prevent>
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <div className="text-6xl" aria-hidden>🥐</div>
                  <p className="font-display text-2xl">Nothing in here yet.</p>
                  <p className="max-w-xs text-sm text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                    Pick a pastry from the menu — the saffron tres leches is running out fast today.
                  </p>
                </div>
              ) : (
                <ul className="flex flex-col divide-y divide-[color-mix(in_oklab,var(--color-ink),transparent_90%)]">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <m.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 80 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-4 py-4"
                      >
                        <div
                          className="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl"
                          style={{ background: item.accent ?? "var(--color-butter)" }}
                          aria-hidden
                        >
                          🥐
                        </div>
                        <div className="flex-1">
                          <p className="font-display text-lg leading-tight">{item.name}</p>
                          <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                            {item.category}
                          </p>
                          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[color-mix(in_oklab,var(--color-ink),transparent_94%)] px-1 py-1">
                            <button
                              type="button"
                              onClick={() => decrement(item.id)}
                              aria-label={`Remove one ${item.name}`}
                              className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-[color-mix(in_oklab,var(--color-ink),transparent_88%)]"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-6 text-center font-mono text-sm tabular-nums">{item.qty}</span>
                            <button
                              type="button"
                              onClick={() => increment(item.id)}
                              aria-label={`Add one more ${item.name}`}
                              className="flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-[color-mix(in_oklab,var(--color-ink),transparent_88%)]"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="font-mono text-sm">{formatRupees(item.price * item.qty)}</span>
                          <button
                            type="button"
                            onClick={() => remove(item.id)}
                            aria-label={`Remove ${item.name} entirely`}
                            className="text-[color-mix(in_oklab,var(--color-ink),transparent_55%)] transition-colors hover:text-[var(--color-terracotta)]"
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                      </m.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            <footer className="border-t border-[color-mix(in_oklab,var(--color-ink),transparent_88%)] px-6 py-5">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="font-mono text-[0.72rem] uppercase tracking-[0.24em] text-[color-mix(in_oklab,var(--color-ink),transparent_45%)]">
                  Subtotal
                </span>
                <span className="font-display text-2xl">{formatRupees(subtotal)}</span>
              </div>
              <Button
                variant="primary"
                size="lg"
                disabled={items.length === 0}
                onClick={() => {
                  setOpen(false);
                  router.push("/order#checkout");
                }}
                className="w-full justify-center"
              >
                {items.length === 0 ? "Bag is empty" : "Proceed to checkout"}
              </Button>
              <p className="mt-3 text-center font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[color-mix(in_oklab,var(--color-ink),transparent_55%)]">
                Pickup at SCO 114 · Sector 35-B · Chandigarh
              </p>
            </footer>
          </m.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
