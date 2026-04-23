"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useEffect, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  qty: number;
  accent?: string;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  _hasHydrated: boolean;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      _hasHydrated: false,

      add: (item, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, qty: i.qty + qty } : i,
              ),
              isOpen: true,
            };
          }
          return { items: [...state.items, { ...item, qty }], isOpen: true };
        }),

      remove: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      increment: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, qty: i.qty + 1 } : i,
          ),
        })),

      decrement: (id) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
            .filter((i) => i.qty > 0),
        })),

      clear: () => set({ items: [] }),

      setOpen: (isOpen) => set({ isOpen }),

      toggle: () => set((state) => ({ isOpen: !state.isOpen })),

      count: () => get().items.reduce((acc, i) => acc + i.qty, 0),

      subtotal: () => get().items.reduce((acc, i) => acc + i.price * i.qty, 0),
    }),
    {
      name: "sweetescape-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => () => {
        useCart.setState({ _hasHydrated: true });
      },
    },
  ),
);

/** Safe hook that returns 0 during SSR / before localStorage rehydration. */
export function useCartCount() {
  const hydrated = useCart((s) => s._hasHydrated);
  const serverCount = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (hydrated) setCount(serverCount);
  }, [hydrated, serverCount]);
  return count;
}

export function formatRupees(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}
