"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useMagnetic } from "@/hooks/useMagnetic";

type Variant = "primary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  magnetic?: boolean;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-terracotta)] text-[var(--color-cream)] shadow-[var(--shadow-glow)] hover:bg-[color-mix(in_oklab,var(--color-terracotta),#000_6%)]",
  ghost:
    "bg-transparent text-[var(--color-ink)] ring-1 ring-inset ring-[color-mix(in_oklab,var(--color-ink),transparent_75%)] hover:bg-[color-mix(in_oklab,var(--color-ink),transparent_95%)]",
  dark:
    "bg-[var(--color-espresso)] text-[var(--color-cream)] hover:bg-[color-mix(in_oklab,var(--color-espresso),#000_10%)]",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-8 py-4 text-base",
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "primary", size = "md", icon, magnetic = true, className, children, ...rest },
  forwarded,
) {
  const magRef = useMagnetic<HTMLButtonElement>({ strength: magnetic ? 0.2 : 0, radius: 120 });

  return (
    <button
      ref={(node) => {
        magRef.current = node;
        if (typeof forwarded === "function") forwarded(node);
        else if (forwarded) (forwarded as React.MutableRefObject<HTMLButtonElement | null>).current = node;
      }}
      {...rest}
      className={cn(
        "relative inline-flex items-center gap-2 rounded-full font-[500] tracking-tight",
        "transition-[transform,background-color,box-shadow] ease-cubic duration-300",
        "active:translate-y-px active:scale-[0.985]",
        "focus-visible:outline-[var(--color-terracotta)]",
        "disabled:pointer-events-none disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {icon ? <span aria-hidden className="relative z-10 -mr-1">{icon}</span> : null}
    </button>
  );
});
