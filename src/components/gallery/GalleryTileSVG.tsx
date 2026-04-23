"use client";

type Pattern = "loaf" | "croissant" | "cake" | "tart" | "coffee" | "candle";

type Props = {
  pattern: Pattern;
  accent: string;
  caption: string;
};

export function GalleryTileSVG({ pattern, accent, caption }: Props) {
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      role="img"
      aria-label={caption}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`${pattern}-grad`} cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#FAF1E1" />
          <stop offset="100%" stopColor={accent} />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${pattern}-grad)`} />
      {renderPattern(pattern)}
    </svg>
  );
}

function renderPattern(pattern: Pattern) {
  switch (pattern) {
    case "loaf":
      return (
        <g>
          <ellipse cx="200" cy="230" rx="150" ry="70" fill="#8E4A2B" />
          <ellipse cx="200" cy="215" rx="155" ry="70" fill="#C27B52" />
          <path d="M100 215 q100 -40 200 0 M120 200 q80 -30 160 0 M140 185 q60 -20 120 0" stroke="#6e3b1d" strokeWidth="4" fill="none" strokeLinecap="round" />
        </g>
      );
    case "croissant":
      return (
        <g transform="translate(200 210)">
          <path
            d="M -130 0 C -100 -80 100 -80 130 0 C 100 60 -100 60 -130 0 Z"
            fill="#D69155"
          />
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse key={i} cx={-110 + i * 32} cy={-30 + (i % 2) * 15} rx="18" ry="26" fill="#8E4A2B" opacity="0.7" />
          ))}
        </g>
      );
    case "cake":
      return (
        <g>
          <rect x="120" y="180" width="160" height="100" rx="20" fill="#C27B52" />
          <rect x="140" y="120" width="120" height="70" rx="16" fill="#D69155" />
          <rect x="170" y="80" width="60" height="50" rx="12" fill="#F7EFE2" />
          <circle cx="200" cy="66" r="10" fill="#C8553D" />
          <rect x="118" y="280" width="164" height="20" rx="10" fill="#2F1F14" />
        </g>
      );
    case "tart":
      return (
        <g transform="translate(200 210)">
          <circle r="140" fill="#C98E55" />
          <circle r="120" fill="#F7EFE2" />
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i / 10) * Math.PI * 2;
            return <circle key={i} cx={Math.cos(a) * 70} cy={Math.sin(a) * 70} r="18" fill="#7a0e18" />;
          })}
          <circle r="18" fill="#C8553D" />
        </g>
      );
    case "coffee":
      return (
        <g transform="translate(200 200)">
          <ellipse cx="0" cy="10" rx="120" ry="95" fill="#F7EFE2" />
          <ellipse cx="0" cy="0" rx="100" ry="80" fill="#2F1F14" />
          <path d="M -60 -10 C -20 -40 20 -40 60 -10" stroke="#C27B52" strokeWidth="6" fill="none" />
          <path d="M -40 20 C -10 0 10 0 40 20" stroke="#C27B52" strokeWidth="5" fill="none" />
        </g>
      );
    case "candle":
      return (
        <g>
          <ellipse cx="200" cy="300" rx="140" ry="50" fill="#C27B52" />
          <ellipse cx="200" cy="280" rx="140" ry="50" fill="#D69155" />
          <rect x="190" y="160" width="20" height="120" rx="6" fill="#F9E3B3" />
          <path d="M200 120 Q210 140 200 160 Q190 140 200 120 Z" fill="#E8A345" />
        </g>
      );
  }
}
