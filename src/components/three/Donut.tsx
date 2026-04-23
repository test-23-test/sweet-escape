"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = { color?: string; glaze?: string; sprinkle?: boolean };

const SPRINKLE_COLORS = ["#C8553D", "#E8A345", "#F9E3B3", "#7A8471", "#2F1F14"];

export function Donut({ color = "#A66C3F", glaze = "#E8A345", sprinkle = true }: Props) {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();

  const sprinkles = useMemo(() => {
    return new Array(24).fill(0).map(() => {
      const a = Math.random() * Math.PI * 2;
      const r = 0.68 + Math.random() * 0.1;
      return {
        position: [Math.cos(a) * r, 0.18 + Math.random() * 0.04, Math.sin(a) * r] as [
          number,
          number,
          number,
        ],
        rotation: [Math.random(), Math.random(), Math.random()] as [number, number, number],
        color: SPRINKLE_COLORS[Math.floor(Math.random() * SPRINKLE_COLORS.length)],
      };
    });
  }, []);

  useFrame((_, dt) => {
    const g = group.current;
    if (!g || reduced) return;
    g.rotation.y += dt * 0.5;
    g.rotation.x = Math.sin(performance.now() / 1400) * 0.08;
  });

  return (
    <group ref={group}>
      <mesh>
        <torusGeometry args={[0.7, 0.3, 24, 64]} />
        <meshStandardMaterial color={color} roughness={0.8} />
      </mesh>
      {/* glaze */}
      <mesh position={[0, 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.4, 1, 64]} />
        <meshStandardMaterial color={glaze} roughness={0.25} metalness={0.15} side={THREE.DoubleSide} />
      </mesh>
      {/* glaze dome */}
      <mesh position={[0, 0.05, 0]}>
        <torusGeometry args={[0.7, 0.22, 24, 64]} />
        <meshStandardMaterial color={glaze} roughness={0.25} metalness={0.15} transparent opacity={0.9} />
      </mesh>
      {sprinkle
        ? sprinkles.map((s, i) => (
            <mesh key={i} position={s.position} rotation={s.rotation}>
              <capsuleGeometry args={[0.018, 0.08, 3, 8]} />
              <meshStandardMaterial color={s.color} roughness={0.4} />
            </mesh>
          ))
        : null}
    </group>
  );
}
