"use client";

import { Suspense, type ReactNode } from "react";
import { Canvas as R3FCanvas } from "@react-three/fiber";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  camera?: { position?: [number, number, number]; fov?: number };
  fallback?: ReactNode;
  className?: string;
  shadows?: boolean;
  eventSource?: React.MutableRefObject<HTMLElement | null>;
  frameloop?: "always" | "demand" | "never";
};

export function Canvas({
  children,
  camera = { position: [0, 0.6, 4.2], fov: 40 },
  fallback,
  className,
  shadows = false,
  frameloop = "always",
}: Props) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("absolute inset-0", className)}>
      <R3FCanvas
        shadows={shadows}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
          preserveDrawingBuffer: false,
        }}
        camera={camera}
        frameloop={reduced ? "demand" : frameloop}
      >
        <Suspense fallback={fallback ?? null}>{children}</Suspense>
      </R3FCanvas>
    </div>
  );
}
