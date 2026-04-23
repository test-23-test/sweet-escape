"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = { pastry?: string; ganache?: string };

export function Eclair({ pastry = "#D69155", ganache = "#1A0F08" }: Props) {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((_, dt) => {
    const g = group.current;
    if (!g || reduced) return;
    g.rotation.y += dt * 0.4;
  });

  return (
    <group ref={group}>
      {/* body */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.3, 1.2, 16, 32]} />
        <meshStandardMaterial color={pastry} roughness={0.8} />
      </mesh>
      {/* ganache strip */}
      <mesh position={[0, 0.22, 0]} rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.18, 1.1, 12, 32]} />
        <meshStandardMaterial color={ganache} roughness={0.2} metalness={0.2} />
      </mesh>
      {/* gold crumble */}
      {new Array(6).fill(0).map((_, i) => (
        <mesh
          key={i}
          position={[-0.5 + i * 0.2, 0.38, (i % 2 === 0 ? 0.05 : -0.05)]}
        >
          <boxGeometry args={[0.04, 0.02, 0.04]} />
          <meshStandardMaterial color="#E8A345" roughness={0.3} metalness={0.35} />
        </mesh>
      ))}
    </group>
  );
}
