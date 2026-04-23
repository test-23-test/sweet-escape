"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = { crust?: string; filling?: string };

const FRUIT_COLORS = ["#7a0e18", "#c8553d", "#E8A345", "#3b2e6c"];

export function Tart({ crust = "#C98E55", filling = "#F6E5C7" }: Props) {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  const fruits = useMemo(
    () =>
      new Array(12).fill(0).map(() => {
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * 0.45;
        return {
          position: [Math.cos(a) * r, 0.1, Math.sin(a) * r] as [number, number, number],
          color: FRUIT_COLORS[Math.floor(Math.random() * FRUIT_COLORS.length)],
          scale: 0.6 + Math.random() * 0.7,
        };
      }),
    [],
  );

  useFrame((_, dt) => {
    const g = group.current;
    if (!g || reduced) return;
    g.rotation.y += dt * 0.3;
  });

  return (
    <group ref={group}>
      {/* crust */}
      <mesh>
        <cylinderGeometry args={[0.7, 0.65, 0.22, 48]} />
        <meshStandardMaterial color={crust} roughness={0.8} />
      </mesh>
      {/* fluted edge */}
      {new Array(20).fill(0).map((_, i) => {
        const a = (i / 20) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.7, 0, Math.sin(a) * 0.7]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={crust} roughness={0.8} />
          </mesh>
        );
      })}
      {/* filling */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 48]} />
        <meshStandardMaterial color={filling} roughness={0.35} metalness={0.15} />
      </mesh>
      {/* fruits */}
      {fruits.map((f, i) => (
        <mesh key={i} position={f.position} scale={f.scale}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={f.color} roughness={0.3} metalness={0.15} />
        </mesh>
      ))}
    </group>
  );
}
