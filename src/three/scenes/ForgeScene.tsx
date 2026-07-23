"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { splitIntoShards } from "@/three/lib/shards";
import { createGlowTexture } from "@/three/lib/glow";
import { useExperience } from "@/stores/experience";

/** Piecewise-linear curve over p ∈ 0..1. */
function curve(p: number, keys: number[]) {
  const x = THREE.MathUtils.clamp(p, 0, 1) * (keys.length - 1);
  const i = Math.min(Math.floor(x), keys.length - 2);
  return THREE.MathUtils.lerp(keys[i], keys[i + 1], x - i);
}

// Seven stages: curiosity, experiment, FAILURE, iteration, confidence, creation, achievement.
const DISORDER = [0.55, 0.2, 1.7, 0.75, 0.1, 0.03, 0, 0];
const GLOW = [0.1, 0.28, 0.18, 0.3, 0.5, 0.75, 1, 1];

/**
 * Chapter 5 — one object forged through the learning journey.
 * At "failure" the pieces scatter and are held for a beat: honored, not hidden.
 */
export function ForgeScene() {
  const group = useRef<THREE.Group>(null);
  const spriteMatRef = useRef<THREE.SpriteMaterial>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const fade = useRef(0);

  const shards = useMemo(
    () => splitIntoShards(new THREE.IcosahedronGeometry(1.15, 1)),
    [],
  );
  const glowTexture = useMemo(createGlowTexture, []);
  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#3a4056",
        metalness: 0.3,
        roughness: 0.5,
        flatShading: true,
        transparent: true,
        side: THREE.DoubleSide,
        emissive: new THREE.Color("#2e86d6"),
        emissiveIntensity: 0,
      }),
    [],
  );
  const ringMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({ color: "#78bef5", transparent: true, opacity: 0 }),
    [],
  );
  const q = useMemo(() => new THREE.Quaternion(), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const { chapter, progress } = useExperience.getState();
    const t = state.clock.elapsedTime;

    fade.current = THREE.MathUtils.damp(fade.current, chapter === "journey" ? 1 : 0, 4, delta);
    g.visible = fade.current > 0.02;
    if (!g.visible) return;

    const p = progress.journey;
    const disorder = curve(p, DISORDER);
    let glow = curve(p, GLOW);
    // Failure flickers warm — an ember refusing to go out.
    if (p > 0.24 && p < 0.4) glow += Math.max(0, Math.sin(t * 16)) * 0.12;

    g.children.forEach((child, i) => {
      const shard = shards[i];
      if (!shard || child.type !== "Mesh") return;
      const spread = disorder * (0.6 + shard.rand * 1.4);
      child.position.copy(shard.centroid).addScaledVector(shard.scatterDir, spread);
      q.setFromAxisAngle(shard.spinAxis, disorder * shard.rand * 1.9);
      child.quaternion.copy(q);
    });

    material.opacity = fade.current;
    material.emissiveIntensity = glow * 1.05;
    if (spriteMatRef.current) spriteMatRef.current.opacity = fade.current * glow * 0.85;
    ringMaterial.opacity = fade.current * THREE.MathUtils.smoothstep(p, 0.72, 0.85) * 0.6;
    if (ringRef.current) ringRef.current.rotation.z = t * 0.1;

    g.rotation.y = t * (0.05 + glow * 0.07);
    g.rotation.x = Math.sin(t * 0.22) * 0.06;
  });

  return (
    <group ref={group}>
      {shards.map((shard, i) => (
        <mesh key={i} geometry={shard.geometry} material={material} position={shard.centroid} />
      ))}
      <mesh ref={ringRef} rotation={[Math.PI / 2.3, 0.2, 0]} material={ringMaterial}>
        <torusGeometry args={[1.9, 0.008, 8, 96]} />
      </mesh>
      <sprite scale={[5, 5, 1]}>
        <spriteMaterial
          ref={spriteMatRef}
          map={glowTexture}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      <pointLight color="#2e86d6" intensity={10} distance={9} decay={2} />
      <directionalLight position={[-4, 3, 5]} intensity={0.9} color="#8fb6c9" />
    </group>
  );
}
