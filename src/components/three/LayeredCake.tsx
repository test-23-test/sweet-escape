"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SPONGE = "#C27B52";
const CREAM = "#F6E5C7";
const GLAZE = "#E8A345";
const DRIP = "#B64722";
const MINT = "#7A8471";

type Props = {
  autoRotate?: boolean;
  tiltFromPointer?: boolean;
  segments?: number;
};

export function LayeredCake({ autoRotate = true, tiltFromPointer = true, segments = 64 }: Props) {
  const group = useRef<THREE.Group>(null);
  const targetRot = useRef({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  const { viewport } = useThree();

  const drips = useMemo(
    () =>
      new Array(14).fill(0).map((_, i) => {
        const a = (i / 14) * Math.PI * 2;
        return {
          angle: a,
          length: 0.14 + Math.random() * 0.22,
          scale: 0.8 + Math.random() * 0.6,
        };
      }),
    [],
  );

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;

    if (autoRotate && !reduced) {
      g.rotation.y += dt * 0.18;
    }

    if (tiltFromPointer && !reduced) {
      const pointer = state.pointer;
      targetRot.current.x = pointer.y * -0.22;
      targetRot.current.y = g.rotation.y + pointer.x * 0.18;
      g.rotation.x += (targetRot.current.x - g.rotation.x) * 0.06;
      if (!autoRotate) {
        g.rotation.y += (targetRot.current.y - g.rotation.y) * 0.06;
      }
    }

    const hover = Math.sin(state.clock.elapsedTime * 0.8) * (reduced ? 0 : 0.025);
    g.position.y = -0.3 + hover;
    g.scale.setScalar(Math.min(1.15, 1 + Math.min(viewport.width, viewport.height) / 18));
    state.invalidate();
  });

  return (
    <group ref={group} position={[0, -0.3, 0]}>
      {/* stand */}
      <mesh position={[0, -0.95, 0]} receiveShadow>
        <cylinderGeometry args={[1.3, 1.35, 0.1, segments]} />
        <meshStandardMaterial color="#2F1F14" roughness={0.4} metalness={0.35} />
      </mesh>
      <mesh position={[0, -0.9, 0]}>
        <torusGeometry args={[1.35, 0.04, 12, segments]} />
        <meshStandardMaterial color={GLAZE} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* bottom tier */}
      <Tier
        y={-0.6}
        radiusTop={1.1}
        radiusBottom={1.12}
        height={0.6}
        sponge={SPONGE}
        cream={CREAM}
        segments={segments}
      />

      {/* mid tier */}
      <Tier
        y={0.05}
        radiusTop={0.82}
        radiusBottom={0.85}
        height={0.55}
        sponge="#8E4A2B"
        cream={CREAM}
        decorate="berries"
        segments={segments}
      />

      {/* top tier */}
      <Tier
        y={0.6}
        radiusTop={0.54}
        radiusBottom={0.56}
        height={0.45}
        sponge={SPONGE}
        cream={CREAM}
        decorate="leaves"
        segments={segments}
      />

      {/* drips from top-tier glaze */}
      {drips.map((d, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(d.angle) * 0.57,
            0.82 - d.length * 0.5,
            Math.sin(d.angle) * 0.57,
          ]}
          scale={[d.scale, 1, d.scale]}
        >
          <capsuleGeometry args={[0.035, d.length, 6, 10]} />
          <meshStandardMaterial color={DRIP} roughness={0.3} metalness={0.1} />
        </mesh>
      ))}

      {/* honey crown */}
      <mesh position={[0, 0.86, 0]}>
        <cylinderGeometry args={[0.45, 0.52, 0.08, segments]} />
        <meshStandardMaterial color={GLAZE} roughness={0.18} metalness={0.35} />
      </mesh>

      {/* top sphere (pearl) */}
      <Float speed={2} rotationIntensity={reduced ? 0 : 0.5} floatIntensity={reduced ? 0 : 0.5}>
        <mesh position={[0, 1.15, 0]}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshPhysicalMaterial
            color={"#FFE4B5"}
            roughness={0.18}
            metalness={0.25}
            clearcoat={0.7}
            clearcoatRoughness={0.15}
          />
        </mesh>
      </Float>

      {/* candle */}
      <mesh position={[0, 1.55, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.22, 16]} />
        <meshStandardMaterial color="#efe6d6" roughness={0.8} />
      </mesh>
      <mesh position={[0, 1.72, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#ffb84a" />
      </mesh>
      <pointLight position={[0, 1.72, 0]} intensity={0.35} color="#ffb84a" distance={1.6} decay={2} />

      {/* mint sprig on top tier */}
      <group position={[0.3, 1, 0.1]} rotation={[0.2, 0.5, 0]}>
        <mesh>
          <cylinderGeometry args={[0.01, 0.01, 0.18, 6]} />
          <meshStandardMaterial color={MINT} />
        </mesh>
        <mesh position={[0.04, 0.08, 0]} rotation={[0, 0, 0.6]}>
          <sphereGeometry args={[0.07, 16, 8]} />
          <meshStandardMaterial color={MINT} roughness={0.7} />
        </mesh>
        <mesh position={[-0.03, 0.06, 0]} rotation={[0, 0, -0.6]}>
          <sphereGeometry args={[0.06, 16, 8]} />
          <meshStandardMaterial color={MINT} roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

function Tier({
  y,
  radiusTop,
  radiusBottom,
  height,
  sponge,
  cream,
  decorate,
  segments = 64,
}: {
  y: number;
  radiusTop: number;
  radiusBottom: number;
  height: number;
  sponge: string;
  cream: string;
  decorate?: "berries" | "leaves";
  segments?: number;
}) {
  const berries = useMemo(() => {
    if (decorate !== "berries") return [];
    return new Array(8).fill(0).map((_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      r: 0.4 + Math.random() * 0.15,
    }));
  }, [decorate]);

  return (
    <group position={[0, y, 0]}>
      {/* sponge */}
      <mesh castShadow>
        <cylinderGeometry args={[radiusTop, radiusBottom, height, segments]} />
        <meshStandardMaterial color={sponge} roughness={0.75} />
      </mesh>
      {/* cream layer (bottom) */}
      <mesh position={[0, -height / 2 + 0.015, 0]}>
        <cylinderGeometry args={[radiusBottom + 0.02, radiusBottom + 0.02, 0.06, segments]} />
        <meshStandardMaterial color={cream} roughness={0.35} />
      </mesh>
      {/* cream layer (top) */}
      <mesh position={[0, height / 2 + 0.02, 0]}>
        <cylinderGeometry args={[radiusTop + 0.02, radiusTop + 0.02, 0.06, segments]} />
        <meshStandardMaterial color={cream} roughness={0.35} />
      </mesh>
      {/* piped collar */}
      <mesh position={[0, height / 2 + 0.055, 0]}>
        <torusGeometry args={[radiusTop + 0.03, 0.04, 12, segments]} />
        <meshStandardMaterial color={cream} roughness={0.3} />
      </mesh>

      {berries.map((b, i) => (
        <mesh
          key={i}
          position={[Math.cos(b.angle) * b.r, height / 2 + 0.08, Math.sin(b.angle) * b.r]}
        >
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#7a0e18" roughness={0.2} metalness={0.1} />
        </mesh>
      ))}

      {decorate === "leaves"
        ? new Array(6).fill(0).map((_, i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <mesh
                key={i}
                position={[Math.cos(a) * 0.3, height / 2 + 0.08, Math.sin(a) * 0.3]}
                rotation={[0, -a, 0.4]}
              >
                <sphereGeometry args={[0.09, 12, 6]} />
                <meshStandardMaterial color={MINT} roughness={0.7} />
              </mesh>
            );
          })
        : null}
    </group>
  );
}
