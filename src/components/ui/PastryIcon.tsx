"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";
import type { PastryKind } from "@/types/pastry";

type Props = {
  kind: PastryKind;
  accent?: string;
  className?: string;
  animate?: boolean;
};

/**
 * Lightweight SVG pastry illustrations.
 *
 * These replace the per-card WebGL canvases previously used — one R3F canvas
 * per card was spawning 18+ simultaneous GL contexts (browsers cap at ~16) and
 * tanked first paint. Each SVG is < 3 KB and paints instantly.
 */
export function PastryIcon({ kind, accent = "#E8A345", className, animate = true }: Props) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const idHl = `hl${uid}`;
  const idGrad = `grad${uid}`;

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <div className={cn("pastry-float relative h-4/5 w-4/5", !animate && "pastry-static")}>
        <svg viewBox="0 0 200 200" className="h-full w-full" style={{ filter: "drop-shadow(0 16px 28px rgba(47, 31, 20, 0.22))" }}>
          <defs>
            <radialGradient id={idHl} cx="35%" cy="30%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            <linearGradient id={idGrad} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={lighten(accent, 12)} />
              <stop offset="100%" stopColor={accent} />
            </linearGradient>
          </defs>
          <Shape kind={kind} accent={accent} gradId={idGrad} />
          <ellipse cx="85" cy="70" rx="60" ry="40" fill={`url(#${idHl})`} opacity="0.9" />
        </svg>
      </div>
    </div>
  );
}

function Shape({
  kind,
  accent,
  gradId,
}: {
  kind: PastryKind;
  accent: string;
  gradId: string;
}) {
  const grad = `url(#${gradId})`;
  const ink = "rgba(47,31,20,0.55)";
  const crumbGold = "#E8A345";
  const cream = "#F7EFE2";

  switch (kind) {
    case "croissant":
      return (
        <g>
          <path
            d="M40 120 Q40 60 100 55 Q160 60 160 120 Q150 145 128 150 Q120 135 115 120 Q108 132 102 150 Q94 135 90 120 Q82 132 76 150 Q56 148 40 120 Z"
            fill={grad}
            stroke={ink}
            strokeWidth="1.5"
          />
          <path d="M72 120 Q80 105 90 118" stroke={darken(accent, 25)} strokeWidth="1.8" fill="none" />
          <path d="M95 110 Q105 95 115 110" stroke={darken(accent, 25)} strokeWidth="1.8" fill="none" />
          <path d="M120 120 Q130 105 140 118" stroke={darken(accent, 25)} strokeWidth="1.8" fill="none" />
          <circle cx="84" cy="106" r="1.2" fill={darken(accent, 35)} />
          <circle cx="110" cy="100" r="1.2" fill={darken(accent, 35)} />
          <circle cx="132" cy="104" r="1.2" fill={darken(accent, 35)} />
        </g>
      );

    case "donut":
      return (
        <g>
          <ellipse cx="100" cy="115" rx="70" ry="55" fill="#C27B52" />
          <ellipse cx="100" cy="105" rx="70" ry="50" fill={grad} />
          <path
            d="M40 108 Q65 80 100 78 Q135 80 160 108 Q152 100 140 100 Q120 105 100 95 Q80 105 60 100 Q48 100 40 108 Z"
            fill={lighten(accent, 18)}
            opacity="0.9"
          />
          <ellipse cx="100" cy="110" rx="22" ry="18" fill="#F7EFE2" />
          <ellipse cx="100" cy="110" rx="22" ry="18" fill="rgba(47,31,20,0.25)" />
          {[
            [70, 92, "#C8553D"],
            [90, 82, "#7A8471"],
            [118, 80, "#E8A345"],
            [135, 95, "#C8553D"],
            [60, 112, "#7A8471"],
            [140, 115, "#F9E3B3"],
          ].map(([x, y, c], i) => (
            <rect
              key={i}
              x={Number(x)}
              y={Number(y)}
              width="5"
              height="2"
              rx="1"
              fill={String(c)}
              transform={`rotate(${(i * 37) % 90} ${x} ${y})`}
            />
          ))}
        </g>
      );

    case "cupcake":
      return (
        <g>
          <path
            d="M56 115 L144 115 L132 175 L68 175 Z"
            fill="#C8553D"
            stroke={ink}
            strokeWidth="1.5"
          />
          <path d="M66 115 L66 175 M82 115 L82 175 M100 115 L100 175 M118 115 L118 175 M134 115 L134 175" stroke="rgba(47,31,20,0.35)" strokeWidth="1" />
          <path
            d="M52 115 Q52 82 82 80 Q92 60 100 76 Q114 58 126 80 Q148 82 148 115 Z"
            fill={grad}
            stroke={ink}
            strokeWidth="1.5"
          />
          <circle cx="90" cy="92" r="6" fill={lighten(accent, 18)} />
          <circle cx="112" cy="88" r="5" fill={lighten(accent, 12)} />
          <circle cx="100" cy="72" r="5" fill="#C8553D" />
          <path d="M100 72 Q100 62 106 60" stroke={darken(accent, 35)} strokeWidth="1.5" fill="none" />
          <circle cx="75" cy="88" r="1.2" fill="#7A8471" />
          <circle cx="130" cy="94" r="1.2" fill="#F9E3B3" />
          <circle cx="98" cy="100" r="1.2" fill="#F7EFE2" />
        </g>
      );

    case "tart":
      return (
        <g>
          <ellipse cx="100" cy="128" rx="70" ry="16" fill="rgba(47,31,20,0.18)" />
          <path
            d="M32 115 A68 30 0 0 1 168 115 L168 125 A68 30 0 0 1 32 125 Z"
            fill="#C27B52"
            stroke={ink}
            strokeWidth="1.5"
          />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * 180;
            const x1 = 100 + Math.cos((angle * Math.PI) / 180) * 68;
            const x2 = 100 + Math.cos((angle * Math.PI) / 180) * 58;
            return (
              <line
                key={i}
                x1={x1}
                y1={115 + Math.sin((angle * Math.PI) / 180) * 30}
                x2={x2}
                y2={115 + Math.sin((angle * Math.PI) / 180) * 28}
                stroke={ink}
                strokeWidth="0.9"
              />
            );
          })}
          <ellipse cx="100" cy="115" rx="62" ry="26" fill={grad} />
          <circle cx="80" cy="108" r="8" fill="#C8553D" />
          <circle cx="120" cy="112" r="7" fill="#7A8471" />
          <circle cx="100" cy="100" r="6" fill={crumbGold} />
          <circle cx="108" cy="118" r="5" fill="#C8553D" />
          <circle cx="90" cy="120" r="4" fill={crumbGold} />
          <circle cx="80" cy="105" r="1.5" fill={cream} opacity="0.7" />
        </g>
      );

    case "eclair":
      return (
        <g>
          <rect x="30" y="100" width="140" height="36" rx="18" fill="#D89866" stroke={ink} strokeWidth="1.5" />
          <path
            d="M32 100 Q32 82 50 82 L150 82 Q168 82 168 100 Q150 96 100 96 Q50 96 32 100 Z"
            fill={grad}
            stroke={ink}
            strokeWidth="1.5"
          />
          <rect x="40" y="86" width="6" height="3" rx="1.5" fill={crumbGold} />
          <rect x="86" y="84" width="6" height="3" rx="1.5" fill={crumbGold} />
          <rect x="130" y="86" width="6" height="3" rx="1.5" fill={crumbGold} />
          <path d="M40 115 Q100 125 160 115" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" />
        </g>
      );

    case "bread":
      return (
        <g>
          <ellipse cx="100" cy="150" rx="75" ry="10" fill="rgba(47,31,20,0.2)" />
          <path
            d="M30 120 Q30 70 100 65 Q170 70 170 120 Q170 148 100 148 Q30 148 30 120 Z"
            fill={grad}
            stroke={ink}
            strokeWidth="1.6"
          />
          <path d="M60 88 L72 112" stroke={darken(accent, 30)} strokeWidth="3" strokeLinecap="round" />
          <path d="M90 80 L102 108" stroke={darken(accent, 30)} strokeWidth="3" strokeLinecap="round" />
          <path d="M120 84 L132 112" stroke={darken(accent, 30)} strokeWidth="3" strokeLinecap="round" />
          <path d="M60 86 L62 96 M59 92 L65 94" stroke={darken(accent, 45)} strokeWidth="1" fill="none" />
          <path d="M88 80 L90 90" stroke={darken(accent, 45)} strokeWidth="1" fill="none" />
          <circle cx="80" cy="100" r="1.5" fill={darken(accent, 45)} />
          <circle cx="110" cy="95" r="1.5" fill={darken(accent, 45)} />
          <circle cx="140" cy="105" r="1.5" fill={darken(accent, 45)} />
        </g>
      );
  }
}

function lighten(hex: string, amount: number) {
  return mix(hex, "#FFFFFF", amount);
}

function darken(hex: string, amount: number) {
  return mix(hex, "#1A0F08", amount);
}

function mix(a: string, b: string, amount: number) {
  const ah = hexToRgb(a);
  const bh = hexToRgb(b);
  if (!ah || !bh) return a;
  const t = Math.min(100, Math.max(0, amount)) / 100;
  const r = Math.round(ah.r + (bh.r - ah.r) * t);
  const g = Math.round(ah.g + (bh.g - ah.g) * t);
  const bl = Math.round(ah.b + (bh.b - ah.b) * t);
  return `rgb(${r}, ${g}, ${bl})`;
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}
