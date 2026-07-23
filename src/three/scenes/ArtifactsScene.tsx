"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { projects } from "@/content/projects";
import type { Locale } from "@/content/locale";
import { useExperience } from "@/stores/experience";

type PartKind = "body" | "ember" | "ion" | "paper";
interface Part {
  geo: "box" | "cyl" | "sphere";
  args: number[];
  pos: [number, number, number];
  rot?: [number, number, number];
  kind: PartKind;
}

/** Procedural artifact geometry — each a real project from the campus archive. */
const artifactParts: Part[][] = [
  // Line-Trace Rover
  [
    { geo: "box", args: [1.3, 0.28, 0.8], pos: [0, 0, 0], kind: "body" },
    { geo: "box", args: [0.9, 0.12, 0.58], pos: [0, 0.22, 0], kind: "body" },
    { geo: "cyl", args: [0.26, 0.26, 0.12, 20], pos: [0.45, -0.16, 0.42], rot: [Math.PI / 2, 0, 0], kind: "body" },
    { geo: "cyl", args: [0.26, 0.26, 0.12, 20], pos: [-0.45, -0.16, 0.42], rot: [Math.PI / 2, 0, 0], kind: "body" },
    { geo: "cyl", args: [0.26, 0.26, 0.12, 20], pos: [0.45, -0.16, -0.42], rot: [Math.PI / 2, 0, 0], kind: "body" },
    { geo: "cyl", args: [0.26, 0.26, 0.12, 20], pos: [-0.45, -0.16, -0.42], rot: [Math.PI / 2, 0, 0], kind: "body" },
    { geo: "box", args: [0.85, 0.05, 0.1], pos: [0, -0.12, 0.46], kind: "body" },
    ...[-0.32, -0.16, 0, 0.16, 0.32].map<Part>((x) => ({
      geo: "sphere", args: [0.028, 10, 10], pos: [x, -0.16, 0.5], kind: "ember",
    })),
    { geo: "box", args: [0.22, 0.07, 0.03], pos: [0, 0.12, 0.41], kind: "ion" },
    { geo: "cyl", args: [0.008, 0.008, 0.5, 6], pos: [0.38, 0.5, -0.25], kind: "body" },
    { geo: "sphere", args: [0.035, 10, 10], pos: [0.38, 0.76, -0.25], kind: "ember" },
  ],
  // Vertical Garden Station
  [
    { geo: "cyl", args: [0.34, 0.44, 0.22, 24], pos: [0, -0.95, 0], kind: "body" },
    { geo: "cyl", args: [0.07, 0.07, 1.9, 12], pos: [0, 0, 0], kind: "body" },
    { geo: "cyl", args: [0.58, 0.58, 0.06, 28], pos: [0, -0.5, 0], kind: "body" },
    { geo: "cyl", args: [0.5, 0.5, 0.06, 28], pos: [0, 0.08, 0], kind: "body" },
    { geo: "cyl", args: [0.42, 0.42, 0.06, 28], pos: [0, 0.62, 0], kind: "body" },
    { geo: "box", args: [0.26, 0.42, 0.26], pos: [0.62, -0.72, 0], kind: "body" },
    { geo: "box", args: [0.07, 0.07, 0.07], pos: [0.35, -0.42, 0.3], kind: "ion" },
    { geo: "box", args: [0.07, 0.07, 0.07], pos: [-0.3, 0.16, -0.28], kind: "ion" },
    { geo: "box", args: [0.07, 0.07, 0.07], pos: [0.22, 0.7, 0.24], kind: "ion" },
    { geo: "sphere", args: [0.05, 12, 12], pos: [0, 1.05, 0], kind: "ember" },
  ],
  // The Drawing Machine
  [
    { geo: "cyl", args: [0.72, 0.8, 0.14, 32], pos: [0, -0.62, 0], kind: "body" },
    { geo: "cyl", args: [0.55, 0.55, 0.02, 32], pos: [0, -0.53, 0], kind: "paper" },
    { geo: "box", args: [0.14, 1.25, 0.14], pos: [-0.62, 0, 0], kind: "body" },
    { geo: "box", args: [1.05, 0.08, 0.1], pos: [-0.1, 0.56, 0], kind: "body" },
    { geo: "box", args: [0.5, 0.06, 0.08], pos: [0.28, 0.44, 0], kind: "body" },
    { geo: "cyl", args: [0.025, 0.025, 0.5, 10], pos: [0.42, 0.18, 0], kind: "body" },
    { geo: "sphere", args: [0.035, 10, 10], pos: [0.42, -0.1, 0], kind: "ember" },
    { geo: "box", args: [0.1, 0.1, 0.03], pos: [-0.62, 0.34, 0.09], kind: "ion" },
  ],
];

interface ArtifactMaterials {
  body: THREE.MeshStandardMaterial;
  ember: THREE.MeshBasicMaterial;
  ion: THREE.MeshBasicMaterial;
  paper: THREE.MeshBasicMaterial;
  wire: THREE.MeshBasicMaterial;
}

/** Each artifact glows in its own discipline's hue. */
const artifactAccents = ["#2e86d6", "#5fe0a0", "#a98cff"];

function makeMaterials(accent: string): ArtifactMaterials {
  return {
    body: new THREE.MeshStandardMaterial({
      color: "#454f68", metalness: 0.2, roughness: 0.52, transparent: true,
    }),
    ember: new THREE.MeshBasicMaterial({ color: accent, transparent: true }),
    ion: new THREE.MeshBasicMaterial({ color: "#6fd3e3", transparent: true }),
    paper: new THREE.MeshBasicMaterial({ color: "#eae6dd", transparent: true }),
    wire: new THREE.MeshBasicMaterial({
      color: "#6fd3e3", wireframe: true, transparent: true, opacity: 0,
    }),
  };
}

function PartMesh({ part, material }: { part: Part; material: THREE.Material }) {
  return (
    <mesh position={part.pos} rotation={part.rot ?? [0, 0, 0]} material={material}>
      {part.geo === "box" && <boxGeometry args={part.args as [number, number, number]} />}
      {part.geo === "cyl" && (
        <cylinderGeometry args={part.args as [number, number, number, number]} />
      )}
      {part.geo === "sphere" && (
        <sphereGeometry args={part.args as [number, number, number]} />
      )}
    </mesh>
  );
}

const SPREAD = 5.6;

/** Chapter 3 — children's projects as floating museum artifacts. */
export function ArtifactsScene({ locale }: { locale: Locale }) {
  const group = useRef<THREE.Group>(null);
  const itemRefs = useRef<(THREE.Group | null)[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const hoverAmounts = useRef([0, 0, 0]);
  const fade = useRef(0);
  const chapter = useExperience((s) => s.chapter);

  const materials = useMemo(
    () => artifactParts.map((_, i) => makeMaterials(artifactAccents[i])),
    [],
  );

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const { chapter: ch, progress } = useExperience.getState();
    const t = state.clock.elapsedTime;

    fade.current = THREE.MathUtils.damp(fade.current, ch === "creation" ? 1 : 0, 4, delta);
    g.visible = fade.current > 0.02;
    if (!g.visible) return;

    const p = THREE.MathUtils.smoothstep(progress.creation, 0.08, 0.92);
    g.position.x = 1.6 - p * (SPREAD * 2 + 3.2);

    itemRefs.current.forEach((item, i) => {
      if (!item) return;
      item.position.y = Math.sin(t * 0.5 + i * 2.1) * 0.14;
      item.rotation.y = 0.35 + Math.sin(t * 0.24 + i * 1.7) * 0.22;

      const target = hovered === i ? 1 : 0;
      hoverAmounts.current[i] = THREE.MathUtils.damp(hoverAmounts.current[i], target, 8, delta);
      const h = hoverAmounts.current[i];
      const m = materials[i];
      m.body.opacity = fade.current * (1 - h * 0.88);
      m.paper.opacity = fade.current * (1 - h * 0.88);
      m.ember.opacity = fade.current * (1 - h * 0.4);
      m.ion.opacity = fade.current * (1 - h * 0.4);
      m.wire.opacity = fade.current * h * 0.9;
    });
  });

  const setActiveProject = useExperience((s) => s.setActiveProject);

  return (
    <group ref={group}>
      <directionalLight position={[3, 4, 6]} intensity={2.4} color="#c9d4e0" />
      <directionalLight position={[-4, -2, 4]} intensity={0.8} color="#78bef5" />
      <pointLight position={[0, -2, 3]} intensity={6} color="#2e86d6" distance={10} />
      {artifactParts.map((parts, i) => (
        <group
          key={projects[i].slug}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          position={[i * SPREAD, 0, 0]}
        >
          {parts.map((part, j) => (
            <PartMesh key={j} part={part} material={materials[i][part.kind]} />
          ))}
          {parts.map((part, j) => (
            <PartMesh key={`w${j}`} part={part} material={materials[i].wire} />
          ))}
          {/* Interaction envelope */}
          <mesh
            onPointerOver={(e) => {
              // The raycaster ignores `visible`; only react in our own chapter.
              if (useExperience.getState().chapter !== "creation") return;
              e.stopPropagation();
              setHovered(i);
            }}
            onPointerOut={() => setHovered((h) => (h === i ? null : h))}
            onClick={(e) => {
              if (useExperience.getState().chapter !== "creation") return;
              e.stopPropagation();
              setActiveProject(projects[i].slug);
            }}
          >
            <sphereGeometry args={[1.5, 12, 12]} />
            <meshBasicMaterial transparent opacity={0} depthWrite={false} />
          </mesh>
          {chapter === "creation" && (
            <Html position={[0, -1.75, 0]} center wrapperClass="pointer-events-none">
              <div className="instrument w-max text-center leading-relaxed">
                <span className="block text-bone">{projects[i].name[locale]}</span>
                <span className="block text-[10px]">
                  {projects[i].builder[locale]} · {projects[i].year}
                </span>
              </div>
            </Html>
          )}
        </group>
      ))}
    </group>
  );
}
