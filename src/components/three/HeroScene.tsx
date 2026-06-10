"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const PARTICLE_COUNT = 2400;

// Generated once at module load (client-only via dynamic import) —
// a hollow sphere shell so particles frame the core instead of hiding it.
const PARTICLE_POSITIONS = (() => {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = 3.5 + Math.random() * 5.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
})();

/** Drifting data field — one draw call of GPU points. */
function DataField() {
  const points = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.02;
    points.current.rotation.x += delta * 0.004;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[PARTICLE_POSITIONS, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#67e8f9"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Wireframe signal core with a faint inner body. */
function SignalCore() {
  const core = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!core.current) return;
    core.current.rotation.y += delta * 0.12;
    core.current.rotation.z += delta * 0.03;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.02;
    core.current.scale.setScalar(pulse);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
      <group ref={core}>
        <mesh>
          <icosahedronGeometry args={[1.5, 1]} />
          <meshBasicMaterial color="#67e8f9" wireframe transparent opacity={0.35} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial
            color="#0b0b11"
            emissive="#a78bfa"
            emissiveIntensity={0.35}
            roughness={0.25}
            metalness={0.9}
            flatShading
          />
        </mesh>
        <mesh rotation={[Math.PI / 2.6, 0, 0]}>
          <torusGeometry args={[2.4, 0.004, 8, 96]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[Math.PI / 1.8, 0.4, 0]}>
          <torusGeometry args={[2.9, 0.003, 8, 96]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

/** Lerped pointer parallax on the whole scene. */
function Rig() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.12, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.08, 0.04);
  });

  return (
    <group ref={group}>
      <DataField />
      <SignalCore />
    </group>
  );
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 7], fov: 45 }}
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 4, 6]} intensity={40} color="#67e8f9" />
      <pointLight position={[-6, -2, -4]} intensity={25} color="#a78bfa" />
      <Rig />
    </Canvas>
  );
}
