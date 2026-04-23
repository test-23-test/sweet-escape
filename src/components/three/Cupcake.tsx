"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = { wrapper?: string; cream?: string; cherry?: string };

export function Cupcake({ wrapper = "#C8553D", cream = "#F9E3B3", cherry = "#7a0e18" }: Props) {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  useFrame((_, dt) => {
    const g = group.current;
    if (!g || reduced) return;
    g.rotation.y += dt * 0.4;
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      {/* ridged wrapper */}
      <mesh>
        <cylinderGeometry args={[0.52, 0.42, 0.7, 32, 1]} />
        <meshStandardMaterial color={wrapper} roughness={0.8} />
      </mesh>
      {/* ridges */}
      {new Array(16).fill(0).map((_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.52, 0, Math.sin(a) * 0.52]} rotation={[0, -a, 0]}>
            <boxGeometry args={[0.02, 0.7, 0.02]} />
            <meshStandardMaterial color={"#8a2b1e"} roughness={0.8} />
          </mesh>
        );
      })}
      {/* cake top (peeks out) */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.12, 32]} />
        <meshStandardMaterial color={"#C27B52"} roughness={0.85} />
      </mesh>
      {/* frosting swirl */}
      <group position={[0, 0.48, 0]}>
        <mesh position={[0, 0.08, 0]}>
          <sphereGeometry args={[0.48, 32, 16]} />
          <meshStandardMaterial color={cream} roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.32, 0]}>
          <sphereGeometry args={[0.36, 32, 16]} />
          <meshStandardMaterial color={cream} roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.52, 0]}>
          <sphereGeometry args={[0.22, 32, 16]} />
          <meshStandardMaterial color={cream} roughness={0.45} />
        </mesh>
      </group>
      {/* cherry */}
      <mesh position={[0, 1.15, 0]}>
        <sphereGeometry args={[0.12, 20, 20]} />
        <meshStandardMaterial color={cherry} roughness={0.25} metalness={0.15} />
      </mesh>
      <mesh position={[0.04, 1.26, 0]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 6]} />
        <meshStandardMaterial color={"#4a6b32"} />
      </mesh>
    </group>
  );
}
