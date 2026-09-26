"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const cameraPath = [
  { position: [0, 0.5, 9.8], lookAt: [0, 0.6, 0] },
  { position: [2.4, 0.8, 8.2], lookAt: [1.2, 0.4, 0] },
  { position: [-1.8, 0.5, 7.8], lookAt: [-0.8, 0.3, 0] },
  { position: [0.6, 0.7, 7.2], lookAt: [0.7, -0.2, 0] },
  { position: [1.6, 1.1, 6.8], lookAt: [1.1, 0.6, -0.2] },
  { position: [-1.5, 1.2, 7.6], lookAt: [-1, 0.2, 0.8] },
  { position: [0.8, 1.4, 9.1], lookAt: [0.3, 0.2, 0] },
  { position: [0, 0, 10], lookAt: [0, 0, 0] },
] as const;

function SceneBackdrop() {
  return (
    <group>
      <mesh position={[0, 0, -6]}>
        <planeGeometry args={[24, 18]} />
        <meshBasicMaterial color="#1c72d9" transparent opacity={0.12} />
      </mesh>
      <mesh position={[0, 1.2, -6.8]}>
        <planeGeometry args={[18, 12]} />
        <meshBasicMaterial color="#f18d7b" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function IntroCluster() {
  return (
    <group>
      <Float speed={1.4} rotationIntensity={0.9} floatIntensity={1.2}>
        <mesh rotation={[0.9, 0.3, 0.15]}>
          <icosahedronGeometry args={[1.9, 1]} />
          <meshPhysicalMaterial color="#6bc9ff" transparent opacity={0.18} wireframe roughness={0.2} metalness={0.4} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={1.1} floatIntensity={1.7}>
        <mesh position={[1.8, -0.6, 0]} rotation={[0.2, 1.1, 0.5]}>
          <octahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial color="#f9b794" emissive="#ef6a67" emissiveIntensity={0.45} roughness={0.4} metalness={0.35} />
        </mesh>
      </Float>
      <Float speed={1.6} rotationIntensity={1.2} floatIntensity={1.5}>
        <mesh position={[-1.9, 0.7, -0.2]} rotation={[0.4, -0.7, 0.7]}>
          <torusKnotGeometry args={[1.2, 0.12, 120, 12]} />
          <meshStandardMaterial color="#a997ff" emissive="#7f7fff" emissiveIntensity={0.25} roughness={0.24} metalness={0.68} />
        </mesh>
      </Float>
    </group>
  );
}

function AboutSystem() {
  return (
    <group>
      <Float speed={1.3} rotationIntensity={0.7} floatIntensity={1}>
        <mesh position={[-2.1, 0.8, 0.2]}>
          <boxGeometry args={[0.45, 3.6, 0.45]} />
          <meshStandardMaterial color="#f0d2b9" emissive="#e59c62" emissiveIntensity={0.25} roughness={0.5} metalness={0.2} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[2.4, -0.5, 0.3]}>
          <boxGeometry args={[0.6, 2.7, 0.6]} />
          <meshStandardMaterial color="#7ad7f5" emissive="#3d8ef8" emissiveIntensity={0.22} roughness={0.4} metalness={0.3} />
        </mesh>
      </Float>
      <Line points={[[-2.1, 0.8, 0.2], [-0.8, 0.3, 0.3], [0.4, 1.1, 0.2], [2.4, -0.5, 0.3]]} color="#e6f2ff" transparent opacity={0.35} lineWidth={1.2} />
      {[-1.2, -0.2, 0.8, 1.8].map((x, index) => (
        <mesh key={x} position={[x, index % 2 === 0 ? 1.2 : -0.8, 0.5]}>
          <sphereGeometry args={[0.16 + index * 0.02, 22, 22]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#f8a866" : "#7bd5f5"} emissive={index % 2 === 0 ? "#df6b4d" : "#5c8cff"} emissiveIntensity={0.42} />
        </mesh>
      ))}
    </group>
  );
}

function ExperienceArchitecture() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[2.6, 2.4, 0.3, 48]} />
        <meshStandardMaterial color="#9ccff8" emissive="#1c6bdb" emissiveIntensity={0.22} roughness={0.42} metalness={0.25} />
      </mesh>
      {[-1.4, -0.5, 0.4, 1.3].map((x, index) => (
        <mesh key={x} position={[x, 0.8 + (index % 2) * 0.9, 0.6]}>
          <boxGeometry args={[0.72, 0.72, 0.72]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#8fe2d0" : "#74b6ff"} emissive={index % 2 === 0 ? "#2ec2aa" : "#607dff"} emissiveIntensity={0.3} />
        </mesh>
      ))}
      <Line points={[[-2.5, 0.2, 0], [-1.2, 1.1, 0.5], [0.2, 0.9, 0.2], [1.8, 0.3, 0.3]]} color="#d8f6ff" transparent opacity={0.45} lineWidth={1.4} />
      <Line points={[[-1.7, -0.7, 0.3], [0, -0.2, 0.5], [1.8, -1.1, 0.2]]} color="#a6d5ff" transparent opacity={0.4} lineWidth={1.2} />
    </group>
  );
}

function ProjectLab() {
  const nodes = [
    { position: [-2.7, 1.4, 0.6], color: "#7ee1ff", accent: "#ffffff" },
    { position: [-0.1, 2.1, 0.2], color: "#8d8cff", accent: "#c7d5ff" },
    { position: [2.5, 1.2, 0.4], color: "#96ebb7", accent: "#effff3" },
    { position: [1.2, -1.4, 0.7], color: "#ffd6b8", accent: "#fff2dd" },
    { position: [-1.2, -2.1, 0.5], color: "#ff9ad6", accent: "#ffe9f5" },
  ] as const;

  return (
    <group>
      {nodes.map((node, index) => (
        <group key={node.position.join("-")} position={node.position as [number, number, number]} rotation={[0.3 * index, index * 0.9, 0.2]}>
          <mesh>
            <octahedronGeometry args={[0.64, 0]} />
            <meshStandardMaterial color={node.color} emissive={node.accent} emissiveIntensity={0.35} roughness={0.32} metalness={0.5} />
          </mesh>
        </group>
      ))}
      <Line points={[[-2.7, 1.4, 0.6], [0.4, 1.2, 0.2], [2.5, 1.2, 0.4]]} color="#dfe9ff" transparent opacity={0.25} lineWidth={1.1} />
      <Line points={[[-0.1, 2.1, 0.2], [1.2, -1.4, 0.7], [-1.2, -2.1, 0.5]]} color="#7fe4d2" transparent opacity={0.28} lineWidth={1.1} />
    </group>
  );
}

function SkillsEcosystem() {
  const nodes = [
    [-2.8, 1.0, -0.1], [-1.1, 1.8, 0.4], [0.5, 1.1, -0.2], [2.3, 0.8, 0.2], [1.6, -1.2, 0.5], [-0.9, -1.6, 0.3], [2.8, -0.8, 0.8],
  ] as const;

  return (
    <group>
      <Line points={nodes} color="#9fe9ff" transparent opacity={0.4} lineWidth={1.3} />
      {nodes.map((node, index) => (
        <mesh key={`${node[0]}-${index}`} position={node}>
          <sphereGeometry args={[0.18 + (index % 3) * 0.04, 18, 18]} />
          <meshStandardMaterial color={index % 2 === 0 ? "#8ef0ff" : "#af9aff"} emissive={index % 2 === 0 ? "#43baf4" : "#7e79ff"} emissiveIntensity={0.42} />
        </mesh>
      ))}
      <mesh position={[0, 0, -0.8]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.03, 12, 150]} />
        <meshBasicMaterial color="#d9efff" transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function EducationArchive() {
  return (
    <group>
      <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.7}>
        <mesh position={[-2.2, 0.4, 0]} rotation={[0.3, 0.1, 0]}>
          <boxGeometry args={[1.2, 2.2, 0.18]} />
          <meshStandardMaterial color="#edf5ff" emissive="#b8d8ff" emissiveIntensity={0.12} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh position={[0, 1.3, 0.2]} rotation={[0.15, -0.2, 0.1]}>
          <boxGeometry args={[1.5, 0.18, 0.18]} />
          <meshStandardMaterial color="#91edd5" emissive="#49c0ab" emissiveIntensity={0.3} />
        </mesh>
      </Float>
      <Float speed={1.35} rotationIntensity={0.6} floatIntensity={1}>
        <mesh position={[2.1, -0.3, 0]} rotation={[0.2, -0.5, 0.2]}>
          <boxGeometry args={[1.4, 1.8, 0.2]} />
          <meshStandardMaterial color="#9cc6ff" emissive="#5868ff" emissiveIntensity={0.2} />
        </mesh>
      </Float>
      <Line points={[[-1.5, 0.5, 0.2], [0, 0.8, 0.3], [1.5, -0.1, 0.2]]} color="#d1ecff" transparent opacity={0.4} lineWidth={1.3} />
    </group>
  );
}

function ContactSignal() {
  return (
    <group>
      <mesh position={[0, 0, -0.4]}>
        <torusGeometry args={[2.4, 0.06, 18, 180]} />
        <meshStandardMaterial color="#d3ecff" emissive="#75d6ff" emissiveIntensity={0.25} roughness={0.15} metalness={0.55} />
      </mesh>
      <mesh position={[0, 0, 0.2]}>
        <icosahedronGeometry args={[0.82, 0]} />
        <meshStandardMaterial color="#f7d4c7" emissive="#ff7d6d" emissiveIntensity={0.3} roughness={0.28} metalness={0.2} />
      </mesh>
      {[-2.6, -1.6, -0.6, 0.4, 1.5, 2.4].map((x) => (
        <mesh key={x} position={[x, 0.7 + Math.abs(x) * 0.18, 0.3]}>
          <boxGeometry args={[0.18, 1.1 + (Math.abs(x) / 5), 0.18]} />
          <meshStandardMaterial color="#d9f0ff" emissive="#89d5ff" emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function JourneyWorld() {
  const world = useRef<THREE.Group>(null);
  const reducedMotion = useRef(false);
  const progressRef = useRef(0);
  const desiredPosition = useMemo(() => new THREE.Vector3(), []);
  const desiredLookAt = useMemo(() => new THREE.Vector3(), []);
  const currentLookAt = useMemo(() => new THREE.Vector3(), []);
  const particles = useMemo(() => {
    const values = new Float32Array(180 * 3);
    for (let i = 0; i < 180; i += 1) {
      const angle = i * 2.15;
      const radius = 2.5 + ((i * 13) % 100) / 18;
      values[i * 3] = Math.cos(angle) * radius;
      values[i * 3 + 1] = Math.sin(angle * 1.7) * (1.7 + (i % 17) * 0.08);
      values[i * 3 + 2] = -((i * 11) % 90) / 14;
    }
    return values;
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reducedMotion.current = motionQuery.matches;
    };
    const updateProgress = () => {
      const value = Number.parseFloat(document.documentElement.style.getPropertyValue("--journey-progress"));
      progressRef.current = Number.isFinite(value) ? value : 0;
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

    const smoothing = reducedMotion.current ? 1 : 1 - Math.exp(-delta * 2.6);
    state.camera.position.lerp(desiredPosition, smoothing);
    currentLookAt.lerp(desiredLookAt, smoothing);
    state.camera.lookAt(currentLookAt);

    if (world.current) {
      const drift = Math.sin(state.clock.elapsedTime * 0.25) * 0.18;
      world.current.rotation.y = THREE.MathUtils.lerp(
        world.current.rotation.y,
        (progress - 0.5) * 0.7 + drift,
        reducedMotion.current ? 1 : 1 - Math.exp(-delta * 2),
      );
      world.current.rotation.x = THREE.MathUtils.lerp(
        world.current.rotation.x,
        (Math.sin(state.clock.elapsedTime * 0.35) * 0.15) - 0.15,
        reducedMotion.current ? 1 : 1 - Math.exp(-delta * 2),
      );
    }
  });

  return (
    <group ref={world}>
      <color attach="background" args={["#081526"]} />
      <ambientLight intensity={0.9} color="#dfeeff" />
      <directionalLight position={[2, 3, 4]} intensity={1.7} color="#f4f3ff" />
      <pointLight position={[4, 2, 3]} intensity={18} distance={16} color="#51d6ff" />
      <pointLight position={[-2, 1, 4]} intensity={12} distance={14} color="#ffae7c" />
      <pointLight position={[0, -2, 3]} intensity={12} distance={16} color="#8b77ff" />

      <SceneBackdrop />

      <group scale={1.2}>
        <IntroCluster />
      </group>

      <group position={[0, 0.1, 0]} scale={1.06}>
        <AboutSystem />
      </group>

      <group position={[0, 0.2, -0.7]} scale={1.15}>
        <ExperienceArchitecture />
      </group>

      <group position={[0.1, -0.3, -0.4]} scale={1.1}>
        <ProjectLab />
      </group>

      <group position={[0, 0.1, 0.2]} scale={1.08}>
        <SkillsEcosystem />
      </group>

      <group position={[0, 0, -0.3]} scale={1.1}>
        <EducationArchive />
      </group>

      <group position={[0, 0.2, 0.2]} scale={1.16}>
        <ContactSignal />
      </group>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#cbe9ff" size={0.024} sizeAttenuation transparent opacity={0.72} depthWrite={false} />
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
        camera={{ position: [0, 0, 9.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        fallback={<FallbackEnvironment />}
      >
        <JourneyWorld />
      </Canvas>
      <div className="scene-vignette" />
    </div>
  );
}
