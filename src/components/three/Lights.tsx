"use client";

type Preset = "warm-cafe" | "studio" | "sunset";

const CONFIG: Record<Preset, { key: [number, number, number]; rim: [number, number, number] }> = {
  "warm-cafe": { key: [3.5, 5, 3], rim: [-3, 2, -2] },
  studio: { key: [4, 6, 2], rim: [-2, 4, -4] },
  sunset: { key: [6, 4, 2], rim: [-3, 1.5, -3] },
};

export function Lights({
  preset = "warm-cafe",
  intensity = 1,
}: {
  preset?: Preset;
  intensity?: number;
}) {
  const c = CONFIG[preset];
  return (
    <>
      <ambientLight intensity={0.45 * intensity} color="#fff1d9" />
      <directionalLight
        position={c.key}
        intensity={1.6 * intensity}
        color="#fff3d0"
        castShadow={false}
      />
      <pointLight
        position={c.rim}
        intensity={0.9 * intensity}
        color="#E8A345"
        distance={8}
        decay={2}
      />
      <hemisphereLight args={["#fff3d0", "#2F1F14", 0.3 * intensity]} />
    </>
  );
}
