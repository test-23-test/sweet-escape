"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useState, useEffect } from "react";

type LoyaltyState = {
  stamps: number;
  redeemed: number;
  _hasHydrated: boolean;
  addStamp: () => void;
  redeem: () => void;
};

export const useLoyalty = create<LoyaltyState>()(
  persist(
    (set, get) => ({
      stamps: 0,
      redeemed: 0,
      _hasHydrated: false,

      addStamp: () =>
        set((s) => ({ stamps: s.stamps + 1 })),

      redeem: () => {
        const s = get();
        if (s.stamps >= 10) {
          set({ stamps: s.stamps - 10, redeemed: s.redeemed + 1 });
        }
      },
    }),
    {
      name: "sweetescape-loyalty",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ stamps: s.stamps, redeemed: s.redeemed }),
      onRehydrateStorage: () => () => {
        useLoyalty.setState({ _hasHydrated: true });
      },
    },
  ),
);

export function useLoyaltyStamps() {
  const hydrated = useLoyalty((s) => s._hasHydrated);
  const serverStamps = useLoyalty((s) => s.stamps);
  const [stamps, setStamps] = useState(0);
  useEffect(() => {
    if (hydrated) setStamps(serverStamps);
  }, [hydrated, serverStamps]);
  return stamps;
}
