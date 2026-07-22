"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  createParticleGeometry,
  createParticlesMaterial,
} from "@/three/materials/particles";
import { sampleTextPositions } from "@/three/lib/sampleText";
import { headlineStat } from "@/content/stats";
import { useExperience } from "@/stores/experience";
import { useQuality } from "@/stores/quality";

/**
 * The shared ember field. Serves four chapters:
 * curiosity (waking cloud) → discovery (cloud → circuit lattice) →
 * proof (cloud → the headline number) → epilogue (quiet cloud behind the core).
 */
export function ParticleScene() {
  const points = useRef<THREE.Points>(null);
  const tier = useQuality((s) => s.tier);
  const count = tier === "full" ? 3200 : 800;

  const geometry = useMemo(() => createParticleGeometry(count), [count]);
  const material = useMemo(createParticlesMaterial, []);

  useEffect(() => {
    // Fill the text morph home once fonts are ready, so "500+" is set in Clash.
    const fill = () => {
      const target = geometry.getAttribute("aText") as THREE.BufferAttribute;
      (target.array as Float32Array).set(sampleTextPositions(headlineStat.value, count));
      target.needsUpdate = true;
    };
    if (document.fonts?.ready) {
      let cancelled = false;
      document.fonts.ready.then(() => !cancelled && fill());
      return () => {
        cancelled = true;
      };
    }
    fill();
  }, [geometry, count]);

  const viewport = useThree((s) => s.viewport);

  useFrame((state, delta) => {
    const { chapter, progress, pointer } = useExperience.getState();
    const t = state.clock.elapsedTime;
    const u = material.uniforms;

    let weights: [number, number, number] = [1, 0, 0];
    let wake = 0.15;
    let opacity = 0;

    switch (chapter) {
      case "hero": {
        weights = [1, 0, 0];
        wake = 0.2;
        opacity = progress.hero * 0.5;
        break;
      }
      case "curiosity": {
        weights = [1, 0, 0];
        wake = 0.15 + progress.curiosity * 0.85;
        opacity = 1;
        break;
      }
      case "discovery": {
        const p = THREE.MathUtils.smoothstep(progress.discovery, 0.08, 0.8);
        weights = [1 - p, p, 0];
        wake = 1;
        opacity = 1;
        break;
      }
      case "proof": {
        const p = THREE.MathUtils.smoothstep(progress.proof, 0.12, 0.55);
        weights = [1 - p, 0, p];
        wake = 0.9;
        opacity = 1;
        break;
      }
      case "trust": {
        weights = [1, 0, 0];
        wake = 0.3;
        opacity = 0.35;
        break;
      }
      case "epilogue": {
        weights = [1, 0, 0];
        wake = 0.5;
        opacity = 0.4;
        break;
      }
      default:
        opacity = 0;
    }

    u.uTime.value = t;
    const w = u.uWeights.value as THREE.Vector3;
    w.x = THREE.MathUtils.damp(w.x, weights[0], 3.5, delta);
    w.y = THREE.MathUtils.damp(w.y, weights[1], 3.5, delta);
    w.z = THREE.MathUtils.damp(w.z, weights[2], 3.5, delta);
    u.uWake.value = THREE.MathUtils.damp(u.uWake.value, wake, 3, delta);
    u.uOpacity.value = THREE.MathUtils.damp(u.uOpacity.value, opacity, 4, delta);
    (u.uPointer.value as THREE.Vector3).set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      0,
    );

    if (points.current) points.current.visible = u.uOpacity.value > 0.02;
  });

  return <points ref={points} geometry={geometry} material={material} />;
}
