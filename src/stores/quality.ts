import { create } from "zustand";

/**
 * Degradation tiers, chosen once at boot:
 *  full  — every scene, DPR ≤ 2
 *  lite  — DPR ≤ 1.5, particle counts ÷ 4, camera cuts instead of flights
 *  still — no WebGL at all; art-directed poster gradients, opacity-only motion
 */
export type Tier = "full" | "lite" | "still";

interface QualityState {
  tier: Tier;
  ready: boolean;
  detect: () => void;
}

function probe(): Tier {
  if (typeof window === "undefined") return "still";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "still";

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  if (nav.connection?.saveData) return "still";

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return "still";
  } catch {
    return "still";
  }

  const smallScreen = Math.min(window.innerWidth, window.innerHeight) < 720;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const lowMemory = nav.deviceMemory !== undefined && nav.deviceMemory <= 4;
  if (lowMemory || (coarse && smallScreen)) return "lite";

  return "full";
}

export const useQuality = create<QualityState>((set) => ({
  tier: "full",
  ready: false,
  detect: () => set({ tier: probe(), ready: true }),
}));
