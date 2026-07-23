"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { splitIntoShards } from "@/three/lib/shards";
import { createGlowTexture } from "@/three/lib/glow";
import { createCoreMaterial } from "@/three/materials/core";
import { useExperience } from "@/stores/experience";

/**
 * CORE-01 "Kıvılcım" — the machine the visitor wakes.
 * Hero: dormant, notices the pointer, disassembles as scroll begins and the
 * camera passes through the opening shell.
 * Epilogue: the same machine reassembles, faces the visitor, fully awake.
 */
export function CoreScene() {
  const group = useRef<THREE.Group>(null);
  const panelsRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const spriteMatRef = useRef<THREE.SpriteMaterial>(null);

  const coreMaterial = useMemo(createCoreMaterial, []);
  const glowTexture = useMemo(createGlowTexture, []);

  // Warm ember heart, cool halo: the fresnel rim breathes between ion and violet.
  const rimIon = useMemo(() => new THREE.Color("#6fd3e3"), []);
  const rimViolet = useMemo(() => new THREE.Color("#a98cff"), []);

  const shards = useMemo(
    () => splitIntoShards(new THREE.IcosahedronGeometry(1.4, 1)),
    [],
  );
  const panelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#3a4272", // cool violet-steel casing, matched to the halo
        metalness: 0.3,
        roughness: 0.5,
        flatShading: true,
        transparent: true,
        side: THREE.DoubleSide,
        emissive: new THREE.Color("#6fd3e3"),
        emissiveIntensity: 0,
      }),
    [],
  );
  const ringMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#6fd3e3",
        transparent: true,
        opacity: 0.35,
      }),
    [],
  );

  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const fade = useRef(0);
  const openAmount = useRef(0);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const { chapter, progress, pointer, energy } = useExperience.getState();
    const t = state.clock.elapsedTime;

    const isHero = chapter === "hero";
    const isEpilogue = chapter === "epilogue";
    // On the way out, dissolve before the shell reaches the camera — the
    // transform must read as passing through, never as a blowout.
    const heroFade = isHero ? 1 - THREE.MathUtils.smoothstep(progress.hero, 0.62, 0.95) : 0;
    const targetFade = isHero ? heroFade : isEpilogue ? 1 : 0;
    fade.current = THREE.MathUtils.damp(fade.current, targetFade, 4, delta);
    g.visible = fade.current > 0.02;
    if (!g.visible) return;

    // Shell opening: driven by hero scroll going out, or epilogue scroll coming home.
    let open = openAmount.current;
    let z = g.position.z;
    if (isHero) {
      const p = progress.hero;
      open = THREE.MathUtils.smoothstep(p, 0.05, 0.85);
      z = p * p * 3.2; // the camera appears to pass through the opening shell
    } else if (isEpilogue) {
      const p = progress.epilogue;
      open = 1 - THREE.MathUtils.smoothstep(p, 0.1, 0.75);
      z = (1 - p) * -1.2;
    }
    openAmount.current = THREE.MathUtils.damp(openAmount.current, open, 6, delta);
    g.position.z = THREE.MathUtils.damp(g.position.z, z, 6, delta);

    // The machine notices you: damped turn toward the pointer.
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * 0.22 + t * 0.04, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * 0.16, 3, delta);

    // Panels drift along their normals with individual character.
    const o = openAmount.current;
    panelsRef.current?.children.forEach((panel, i) => {
      const shard = shards[i];
      const r = 1.4 + o * o * (2.4 + shard.rand * 2.2);
      panel.position.copy(shard.centroid).multiplyScalar(r / 1.4);
      panel.rotation.setFromVector3(
        new THREE.Vector3(
          shard.spinAxis.x * o * shard.rand * 1.6,
          shard.spinAxis.y * o * shard.rand * 1.6,
          0,
        ),
      );
    });

    const energyU = isEpilogue ? 0.6 + energy * 0.4 : 0.22 + energy * 0.5 + o * 0.35;
    const pointerNear = 1 - Math.min(1, Math.hypot(pointer.x, pointer.y));
    coreMaterial.uniforms.uTime.value = t;
    coreMaterial.uniforms.uEnergy.value = energyU + pointerNear * 0.12;
    coreMaterial.uniforms.uPulse.value = 1 + Math.sin(t * 1.4) * 0.25;
    coreMaterial.uniforms.uOpacity.value = fade.current;
    // Rim drifts ion → violet → ion; pointer proximity nudges it toward violet.
    const rimMix = 0.5 + 0.5 * Math.sin(t * 0.35) * 0.7 + pointerNear * 0.2;
    (coreMaterial.uniforms.uColorB.value as THREE.Color)
      .copy(rimIon)
      .lerp(rimViolet, THREE.MathUtils.clamp(rimMix, 0, 1));
    // Seams glow the same cool tone as the halo, so casing and core breathe together.
    panelMaterial.emissive.copy(coreMaterial.uniforms.uColorB.value as THREE.Color);

    panelMaterial.opacity = fade.current * (1 - o * 0.55);
    // Awake, the machine's warmth leaks through the seams of its shell.
    panelMaterial.emissiveIntensity = isEpilogue ? 0.16 * energyU : 0.04 * energyU;
    ringMaterial.opacity = fade.current * 0.35;
    if (spriteMatRef.current) {
      spriteMatRef.current.opacity =
        fade.current * (0.28 + energyU * 0.4) * (1 - o * 0.55);
    }
    if (lightRef.current) {
      lightRef.current.intensity = fade.current * (6 + energyU * 10 + Math.sin(t * 1.4) * 1.2);
    }
    if (ring1.current) ring1.current.rotation.z = t * 0.12;
    if (ring2.current) ring2.current.rotation.z = -t * 0.09;
  });

  return (
    <group ref={group}>
      {/* Inner core — the living heart */}
      <mesh material={coreMaterial}>
        <icosahedronGeometry args={[0.82, 5]} />
      </mesh>

      {/* Shell panels */}
      <group ref={panelsRef}>
        {shards.map((shard, i) => (
          <mesh
            key={i}
            geometry={shard.geometry}
            material={panelMaterial}
            position={shard.centroid}
          />
        ))}
      </group>

      {/* Instrument rings — machine precision, ion-cool */}
      <mesh ref={ring1} rotation={[Math.PI / 2.4, 0.3, 0]} material={ringMaterial}>
        <torusGeometry args={[2.25, 0.006, 8, 128]} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 1.8, -0.4, 0]} material={ringMaterial}>
        <torusGeometry args={[2.7, 0.004, 8, 128]} />
      </mesh>

      {/* Two-layer glow */}
      <sprite scale={[6.5, 6.5, 1]}>
        <spriteMaterial
          ref={spriteMatRef}
          map={glowTexture}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>

      <pointLight ref={lightRef} color="#2e86d6" distance={12} decay={2} />
      <directionalLight position={[-4, 3, 5]} intensity={1.1} color="#8fb6c9" />
      <directionalLight position={[3, 2, 6]} intensity={0.5} color="#d8cfc0" />
    </group>
  );
}
