"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = { color?: string; accent?: string };

export function Croissant({ color = "#D69155", accent = "#8E4A2B" }: Props) {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((_, dt) => {
    const g = group.current;
    if (!g || reduced) return;
    g.rotation.y += dt * 0.45;
  });

  const segments = 11;
  return (
    <group ref={group} rotation={[0.3, 0, 0]}>
      {/* curved body */}
      <mesh>
        <torusGeometry args={[0.8, 0.32, 24, 48, Math.PI * 1.35]} />
        <meshStandardMaterial color={color} roughness={0.75} />
      </mesh>
      {/* rolled segment ribs */}
      {new Array(segments).fill(0).map((_, i) => {
        const t = i / (segments - 1);
        const angle = t * Math.PI * 1.25 + Math.PI * 0.075;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.8, 0, Math.sin(angle) * 0.8]}
            rotation={[0, -angle, 0]}
          >
            <torusGeometry args={[0.32, 0.04, 8, 24]} />
            <meshStandardMaterial color={accent} roughness={0.7} />
          </mesh>
        );
      })}
      {/* tips */}
      <mesh position={[0.56, 0, 0.56]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.32, 0.35, 16]} />
        <meshStandardMaterial color={color} roughness={0.75} />
      </mesh>
      <mesh position={[-0.56, 0, 0.56]} rotation={[0, -Math.PI / 4, Math.PI]}>
        <coneGeometry args={[0.32, 0.35, 16]} />
        <meshStandardMaterial color={color} roughness={0.75} />
      </mesh>
    </group>
  );
}
