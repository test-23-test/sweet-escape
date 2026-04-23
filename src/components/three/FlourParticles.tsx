"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Props = {
  count?: number;
  spread?: number;
  color?: string;
  size?: number;
  speed?: number;
};

const tmpObj = new THREE.Object3D();

export function FlourParticles({
  count = 140,
  spread = 4,
  color = "#F7EFE2",
  size = 0.018,
  speed = 0.35,
}: Props) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const reduced = useReducedMotion();

  const particles = useMemo(() => {
    const ps = new Array(count).fill(0).map((_, i) => ({
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.6,
      radius: 0.2 + Math.random() * spread,
      height: -spread * 0.5 + Math.random() * spread,
      z: -spread * 0.25 + Math.random() * spread * 0.5,
      wobble: 0.1 + Math.random() * 0.3,
      scale: 0.4 + Math.random() * 0.8,
      seed: i,
    }));
    return ps;
  }, [count, spread]);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime * (reduced ? 0 : speed);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const angle = p.phase + t * p.speed * 0.5;
      const x = Math.cos(angle) * p.radius;
      const y = p.height + Math.sin(t * p.speed + p.seed) * p.wobble;
      const z = p.z + Math.sin(angle * 0.5) * 0.3;
      tmpObj.position.set(x, y, z);
      const s = size * p.scale;
      tmpObj.scale.set(s, s, s);
      tmpObj.updateMatrix();
      mesh.setMatrixAt(i, tmpObj.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
    state.invalidate();
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.15}
        roughness={0.9}
        metalness={0}
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
