"use client";

import { create } from "zustand";

export type Toast = {
  id: string;
  message: string;
  type?: "success" | "info" | "error";
  duration?: number;
};

type ToastState = {
  toasts: Toast[];
  add: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
};

let counter = 0;

export const useToast = create<ToastState>((set) => ({
  toasts: [],

  add: (toast) => {
    const id = `toast-${++counter}`;
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }));
    const dur = toast.duration ?? 3500;
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, dur);
  },

  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
