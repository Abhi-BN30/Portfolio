"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const cameraPath = [
  { position: [0, 0, 9], lookAt: [0, 0, 0] },
  { position: [1.6, 0.25, 8.4], lookAt: [0.6, 0, 0] },
  { position: [-1.2, 0.2, 8], lookAt: [-0.4, 0, 0] },
  { position: [0.7, -0.3, 7.7], lookAt: [0, 0, 0] },
  { position: [0, 0.5, 8.7], lookAt: [0, 0, 0] },
  { position: [0, 0, 10], lookAt: [0, 0, 0] },
  { position: [0, 0, 11], lookAt: [0, 0, 0] },
] as const;

function JourneyWorld() {
  const world = useRef<THREE.Group>(null);
  const reducedMotion = useRef(false);
  const progressRef = useRef(0);
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredLookAt = useMemo(() => new THREE.Vector3(), []);
  const currentLookAt = useMemo(() => new THREE.Vector3(), []);
  const particles = useMemo(() => {
    const values = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i += 1) {
      const angle = i * 2.399;
      const radius = 2 + ((i * 17) % 100) / 21;
      values[i * 3] = Math.cos(angle) * radius;
      values[i * 3 + 1] = Math.sin(angle * 1.7) * 2.2;
      values[i * 3 + 2] = -((i * 13) % 60) / 10;
    }
    return values;
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => { reducedMotion.current = motionQuery.matches; };
    const updateProgress = () => {
      const progress = Number.parseFloat(document.documentElement.style.getPropertyValue("--journey-progress"));
      progressRef.current = Number.isFinite(progress) ? progress : 0;
    };
    updateMotionPreference();
    updateProgress();
    motionQuery.addEventListener("change", updateMotionPreference);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      motionQuery.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  useFrame((state, delta) => {
    const progress = progressRef.current;
    const segment = Math.min(cameraPath.length - 1.001, progress * (cameraPath.length - 1));
    const index = Math.floor(segment);
    const blend = segment - index;
    const from = cameraPath[index];
    const to = cameraPath[index + 1] ?? from;
    desiredPosition.set(
      THREE.MathUtils.lerp(from.position[0], to.position[0], blend),
      THREE.MathUtils.lerp(from.position[1], to.position[1], blend),
      THREE.MathUtils.lerp(from.position[2], to.position[2], blend),
    );
    desiredLookAt.set(
      THREE.MathUtils.lerp(from.lookAt[0], to.lookAt[0], blend),
      THREE.MathUtils.lerp(from.lookAt[1], to.lookAt[1], blend),
      THREE.MathUtils.lerp(from.lookAt[2], to.lookAt[2], blend),
    );

    const motionPreference = reducedMotion.current;
    reducedMotion.current = motionPreference;
    const smoothing = motionPreference ? 1 : 1 - Math.exp(-delta * 2.6);
    state.camera.position.lerp(desiredPosition, smoothing);
    currentLookAt.lerp(desiredLookAt, smoothing);
    state.camera.lookAt(currentLookAt);

    if (world.current) {
      const ambient = motionPreference ? 0 : Math.sin(state.clock.elapsedTime * 0.13) * 0.035;
      world.current.rotation.y = THREE.MathUtils.lerp(
        world.current.rotation.y,
        (progress - 0.5) * 0.32 + ambient,
        motionPreference ? 1 : 1 - Math.exp(-delta * 1.5),
      );
      world.current.rotation.x = motionPreference ? 0 : Math.sin(state.clock.elapsedTime * 0.11) * 0.025;
    }
  });

  return (
    <group ref={world}>
      <ambientLight intensity={0.65} />
      <pointLight position={[4, 3, 4]} color="#53d7ff" intensity={16} distance={18} />
      <pointLight position={[-4, -1, 2]} color="#8965ff" intensity={13} distance={15} />
      <pointLight position={[0, 4, -4]} color="#f36ecb" intensity={7} distance={14} />

      <group rotation={[0.28, 0.25, 0]}>
        <mesh>
          <icosahedronGeometry args={[1.48, 1]} />
          <meshBasicMaterial color="#6ccfff" wireframe transparent opacity={0.25} />
        </mesh>
        <mesh rotation={[0.5, 0.7, -0.3]}>
          <torusGeometry args={[1.92, 0.006, 6, 120]} />
          <meshBasicMaterial color="#9a81ff" transparent opacity={0.64} />
        </mesh>
        <mesh rotation={[1.1, -0.35, 0.5]}>
          <torusGeometry args={[2.18, 0.004, 6, 120]} />
          <meshBasicMaterial color="#55d6c2" transparent opacity={0.48} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.76, 2]} />
          <meshStandardMaterial color="#121c3a" emissive="#3445a2" emissiveIntensity={0.68} metalness={0.72} roughness={0.28} />
        </mesh>
        <mesh scale={0.48}>
          <octahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#a3eaff" wireframe transparent opacity={0.78} />
        </mesh>
        <mesh position={[0.85, 0.24, 0.45]}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <mesh position={[-0.72, -0.55, 0.32]}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial color="#66e5ce" />
        </mesh>
      </group>

      <Line points={[[-3.5, 1.4, -1], [-2.1, 0.5, -0.4], [-0.7, 0.7, 0]]} color="#55c8f5" transparent opacity={0.3} lineWidth={1} />
      <Line points={[[3.2, -1.35, -2], [1.8, -0.5, -0.8], [0.72, -0.45, 0]]} color="#9a81ff" transparent opacity={0.3} lineWidth={1} />
      <Line points={[[-2.5, -1.9, -3], [-1.1, -1.2, -1.1], [-0.45, -0.6, -0.15]]} color="#55d6c2" transparent opacity={0.25} lineWidth={1} />

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#9fcff3" size={0.022} sizeAttenuation transparent opacity={0.62} depthWrite={false} />
      </points>
    </group>
  );
}

function FallbackEnvironment() {
  return (
    <div className="scene-fallback" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

export default function Scene() {
  return (
    <div className="scene-shell" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 42 }}
        dpr={[1, 1.35]}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        fallback={<FallbackEnvironment />}
      >
        <JourneyWorld />
      </Canvas>
      <div className="scene-vignette" />
    </div>
  );
}
