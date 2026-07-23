"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import type { Locale } from "@/content/locale";
import { useQuality } from "@/stores/quality";
import { CoreScene } from "./scenes/CoreScene";
import { ParticleScene } from "./scenes/ParticleScene";
import { ArtifactsScene } from "./scenes/ArtifactsScene";
import { ForgeScene } from "./scenes/ForgeScene";
import { CampusScene } from "./scenes/CampusScene";

/**
 * The single persistent canvas behind the DOM. Scenes swap by chapter.
 * Mounts shortly after first paint so the server-rendered hero owns LCP.
 * "Still" tier renders an art-directed poster instead of WebGL.
 */
export default function Experience({ locale }: { locale: Locale }) {
  const tier = useQuality((s) => s.tier);
  const ready = useQuality((s) => s.ready);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 300);
    return () => window.clearTimeout(id);
  }, []);

  // "still" tier renders no WebGL — the Atmosphere layer alone carries the
  // background, so there's nothing to mount here.
  if (!ready || !mounted || tier === "still") return null;

  return (
    <div aria-hidden className="fixed inset-0 z-[1]">
      <Canvas
        dpr={tier === "full" ? [1, 2] : [1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => gl.setClearAlpha(0)}
      >
        <ambientLight intensity={0.95} color="#6c7690" />
        <hemisphereLight args={["#9db0d0", "#12141f", 0.85]} />
        <CoreScene />
        <ParticleScene />
        <ArtifactsScene locale={locale} />
        <ForgeScene />
        <CampusScene />
      </Canvas>
    </div>
  );
}
