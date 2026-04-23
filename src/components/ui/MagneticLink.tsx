"use client";

import Link, { type LinkProps } from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useMagnetic } from "@/hooks/useMagnetic";

type Props = LinkProps & {
  className?: string;
  children: ReactNode;
  strength?: number;
};

export function MagneticLink({ className, children, strength = 0.2, ...linkProps }: Props) {
  const ref = useMagnetic<HTMLAnchorElement>({ strength, radius: 100 });

  return (
    <Link
      {...linkProps}
      ref={ref}
      className={cn(
        "relative inline-block transition-colors duration-300 ease-cubic",
        "hover:text-[var(--color-terracotta)]",
        className,
      )}
    >
      {children}
    </Link>
  );
}
