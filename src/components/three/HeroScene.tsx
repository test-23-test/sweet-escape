"use client";

import { Canvas } from "@/components/three/Canvas";
import { Lights } from "@/components/three/Lights";
import { LayeredCake } from "@/components/three/LayeredCake";
import { FlourParticles } from "@/components/three/FlourParticles";
import { useLowGPU } from "@/hooks/useLowGPU";

export default function HeroScene() {
  const low = useLowGPU();
  return (
    <Canvas camera={{ position: [0, 0.4, 4.6], fov: 38 }} frameloop="demand">
      <Lights preset="warm-cafe" intensity={1.1} />
      <LayeredCake segments={low ? 32 : 64} />
      <FlourParticles count={low ? 40 : 80} spread={4} speed={0.28} />
    </Canvas>
  );
}
