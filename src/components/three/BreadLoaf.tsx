"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = { crust?: string; scoreColor?: string };

export function BreadLoaf({ crust = "#C27B52", scoreColor = "#6e3b1d" }: Props) {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((_, dt) => {
    const g = group.current;
    if (!g || reduced) return;
    g.rotation.y += dt * 0.35;
  });

  return (
    <group ref={group}>
      {/* loaf body */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.45, 1.3, 24, 48]} />
        <meshStandardMaterial color={crust} roughness={0.9} />
      </mesh>
      {/* surface dust highlight */}
      <mesh rotation={[0, 0, Math.PI / 2]} scale={[1.02, 0.98, 0.98]}>
        <capsuleGeometry args={[0.45, 1.3, 24, 48]} />
        <meshStandardMaterial color={"#E6C18C"} roughness={0.95} transparent opacity={0.2} />
      </mesh>
      {/* scoring marks */}
      {[-0.35, 0, 0.35].map((x, i) => (
        <mesh key={i} position={[x, 0.44, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.18, 0.015, 6, 24, Math.PI * 0.6]} />
          <meshStandardMaterial color={scoreColor} roughness={0.85} />
        </mesh>
      ))}
      {/* board */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[1.8, 0.08, 0.9]} />
        <meshStandardMaterial color={"#3B2A1A"} roughness={0.8} />
      </mesh>
    </group>
  );
}
