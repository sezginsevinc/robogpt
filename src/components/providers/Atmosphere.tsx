"use client";

import { useEffect, useRef } from "react";
import { useExperience, type Chapter } from "@/stores/experience";

/**
 * The living nebula behind the void. Deep, desaturated light-clouds drift
 * slowly so "space" reads as atmosphere, not dead black — while one accent
 * cloud bleeds the current chapter's hue in, tying the background to the
 * discipline colour system. Pure CSS transforms + one lightweight rAF tint.
 */

// Each chapter lets a different hue seep into the void. Kept low-saturation.
const chapterTint: Record<Chapter, string> = {
  hero: "46, 134, 214", // ember
  curiosity: "255, 194, 75", // gold
  discovery: "111, 211, 227", // ion
  creation: "169, 140, 255", // violet
  disciplines: "95, 224, 160", // lime
  journey: "255, 122, 182", // pink
  proof: "46, 134, 214", // ember
  trust: "169, 140, 255", // violet
  campus: "79, 160, 224", // warm amber
  epilogue: "46, 134, 214", // ember
};

// A faint, static starfield baked once — depth without per-frame cost.
function starfield(count: number): string {
  const layers: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const y = (Math.sin(i * 78.233) * 12543.877) % 1;
    const px = (Math.abs(x) * 100).toFixed(2);
    const py = (Math.abs(y) * 100).toFixed(2);
    const bright = 0.1 + (Math.abs(Math.sin(i * 3.7)) * 0.35);
    layers.push(
      `radial-gradient(1px 1px at ${px}% ${py}%, rgba(234,230,221,${bright.toFixed(2)}), transparent 60%)`,
    );
  }
  return layers.join(",");
}

export function Atmosphere() {
  const accentRef = useRef<HTMLDivElement>(null);
  const chapter = useExperience((s) => s.chapter);

  useEffect(() => {
    const el = accentRef.current;
    if (!el) return;
    el.style.setProperty("--tint", chapterTint[chapter] ?? chapterTint.hero);
  }, [chapter]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base nebula — deep indigo / teal / ember, always drifting */}
      <div
        className="absolute motion-safe:animate-[atmo-drift-a_34s_ease-in-out_infinite]"
        style={{
          inset: "-25%",
          background:
            "radial-gradient(38% 42% at 32% 34%, rgba(96, 82, 176, 0.30), transparent 64%)",
        }}
      />
      <div
        className="absolute motion-safe:animate-[atmo-drift-b_46s_ease-in-out_infinite]"
        style={{
          inset: "-25%",
          background:
            "radial-gradient(42% 40% at 72% 66%, rgba(48, 120, 142, 0.24), transparent 62%)",
        }}
      />
      <div
        className="absolute motion-safe:animate-[atmo-drift-c_40s_ease-in-out_infinite]"
        style={{
          inset: "-25%",
          background:
            "radial-gradient(34% 36% at 60% 22%, rgba(44, 110, 180, 0.18), transparent 60%)",
        }}
      />

      {/* Accent cloud — takes the current chapter's hue, eased in */}
      <div
        ref={accentRef}
        className="absolute motion-safe:animate-[atmo-drift-b_52s_ease-in-out_infinite]"
        style={{
          inset: "-25%",
          ["--tint" as string]: chapterTint.hero,
          background:
            "radial-gradient(40% 44% at 48% 58%, rgba(var(--tint), 0.18), transparent 62%)",
          transition: "background 1.4s var(--ease-out-expo)",
        }}
      />

      {/* Starfield — faint depth, gently twinkling */}
      <div
        className="absolute inset-0 motion-safe:animate-[atmo-twinkle_9s_ease-in-out_infinite]"
        style={{ backgroundImage: starfield(70), backgroundSize: "cover" }}
      />

      {/* Grain — kills banding across the deep gradients */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Soft central lift — brightens the middle of the frame */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 50% 42%, rgba(120, 130, 175, 0.10), transparent 70%)",
        }}
      />

      {/* Vignette — keeps the frame cinematic, kept gentle */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 105% at 50% 38%, transparent 62%, rgba(6, 6, 12, 0.45) 100%)",
        }}
      />
    </div>
  );
}
