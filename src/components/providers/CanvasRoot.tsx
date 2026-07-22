"use client";

import dynamic from "next/dynamic";
import type { Locale } from "@/content/locale";

/**
 * Client boundary for the WebGL experience: three.js loads lazily after LCP —
 * the server-rendered hero never waits for it.
 */
const Experience = dynamic(() => import("@/three/Experience"), { ssr: false });

export function CanvasRoot({ locale }: { locale: Locale }) {
  return <Experience locale={locale} />;
}
