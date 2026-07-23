"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildings } from "@/content/campus";
import { useExperience } from "@/stores/experience";

/**
 * Chapter 8 — the miniature campus. Buildings rise from wireframe to solid;
 * the visitor's pointer is a light source that illuminates rooms as it passes.
 */
export function CampusScene() {
  const group = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const markerRef = useRef<THREE.Mesh>(null);
  const buildingRefs = useRef<(THREE.Mesh | null)[]>([]);
  const fade = useRef(0);
  const lightPos = useRef(new THREE.Vector3(0, 1.6, 0));
  const tmp = useMemo(() => new THREE.Vector3(), []);

  const materials = useMemo(
    () =>
      buildings.map(
        () =>
          new THREE.MeshStandardMaterial({
            color: "#161923",
            metalness: 0.35,
            roughness: 0.6,
            transparent: true,
            emissive: new THREE.Color("#2e86d6"),
            emissiveIntensity: 0,
          }),
      ),
    [],
  );
  const groundMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0c0e13",
        metalness: 0.2,
        roughness: 0.9,
        transparent: true,
      }),
    [],
  );
  const edgeMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ color: "#3a4050", transparent: true, opacity: 0.6 }),
    [],
  );
  // Box geometries with the pivot at the base, so rising reads as construction.
  const geometries = useMemo(
    () =>
      buildings.map((b) => {
        const g = new THREE.BoxGeometry(b.w, b.h, b.d);
        g.translate(0, b.h / 2, 0);
        return g;
      }),
    [],
  );
  const edges = useMemo(() => geometries.map((g) => new THREE.EdgesGeometry(g)), [geometries]);

  const setActiveBuilding = useExperience((s) => s.setActiveBuilding);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    const { chapter, progress, activeBuilding } = useExperience.getState();

    fade.current = THREE.MathUtils.damp(fade.current, chapter === "campus" ? 1 : 0, 4, delta);
    g.visible = fade.current > 0.02;
    if (!g.visible) return;

    const p = THREE.MathUtils.smoothstep(progress.campus, 0.05, 0.6);

    buildings.forEach((b, i) => {
      const mesh = buildingRefs.current[i];
      const mat = materials[i];
      if (!mesh) return;
      const rise = THREE.MathUtils.clamp(p * 2.4 - i * 0.18, 0.001, 1);
      mesh.scale.y = THREE.MathUtils.damp(mesh.scale.y, rise, 6, delta);

      const selected = activeBuilding === b.id;
      const dist = tmp.set(b.x, 0, b.z).distanceTo(
        new THREE.Vector3(lightPos.current.x, 0, lightPos.current.z),
      );
      const lit = Math.max(0, 0.55 - dist * 0.22) * fade.current + (selected ? 0.55 : 0);
      mat.emissiveIntensity = THREE.MathUtils.damp(mat.emissiveIntensity, lit, 6, delta);
      mat.opacity = fade.current;

      const lift = selected ? 0.22 : 0;
      mesh.position.y = THREE.MathUtils.damp(mesh.position.y, lift, 6, delta);
    });

    groundMaterial.opacity = fade.current;
    edgeMaterial.opacity = fade.current * 0.55;
    if (lightRef.current) {
      lightRef.current.position.lerp(lightPos.current, 0.15);
      lightRef.current.intensity = fade.current * 10;
    }
    if (markerRef.current) {
      markerRef.current.position.set(lightPos.current.x, 0.04, lightPos.current.z);
      (markerRef.current.material as THREE.MeshBasicMaterial).opacity = fade.current * 0.9;
    }
  });

  return (
    <group ref={group} rotation={[0.52, -0.58, 0]} position={[0.2, -0.7, 0]} scale={0.92}>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        material={groundMaterial}
        onPointerMove={(e) => {
          const g = group.current;
          if (!g || useExperience.getState().chapter !== "campus") return;
          const local = g.worldToLocal(e.point.clone());
          lightPos.current.set(local.x, 1.6, local.z);
        }}
        onClick={() => {
          if (useExperience.getState().chapter === "campus") setActiveBuilding(null);
        }}
      >
        <planeGeometry args={[11, 7]} />
      </mesh>
      <gridHelper args={[11, 22, "#252a36", "#181b23"]} position={[0, 0.01, 0]} />

      {buildings.map((b, i) => (
        <group key={b.id} position={[b.x, 0, b.z]}>
          <mesh
            ref={(el) => {
              buildingRefs.current[i] = el;
            }}
            geometry={geometries[i]}
            material={materials[i]}
            onClick={(e) => {
              if (useExperience.getState().chapter !== "campus") return;
              e.stopPropagation();
              setActiveBuilding(b.id);
            }}
            onPointerOver={(e) => e.stopPropagation()}
          />
          <lineSegments geometry={edges[i]} material={edgeMaterial} />
        </group>
      ))}

      <mesh ref={markerRef} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.12, 24]} />
        <meshBasicMaterial color="#78bef5" transparent />
      </mesh>
      <pointLight ref={lightRef} color="#4fa0e0" distance={4.5} decay={2} />
      <directionalLight position={[-3, 6, 4]} intensity={0.7} color="#8fb6c9" />
    </group>
  );
}
