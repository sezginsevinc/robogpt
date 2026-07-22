"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/motion/gsap";
import { useExperience } from "@/stores/experience";
import { useQuality } from "@/stores/quality";

/**
 * Boots the experience: quality tier, Lenis smooth scroll fused with GSAP's
 * ticker, global scroll progress, and normalized pointer tracking.
 */
export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const tier = useQuality((s) => s.tier);
  const ready = useQuality((s) => s.ready);

  useEffect(() => {
    useQuality.getState().detect();
  }, []);

  useEffect(() => {
    if (!ready || tier === "still") return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [ready, tier]);

  useEffect(() => {
    const { setGlobal, setPointer } = useExperience.getState();

    const globalTrigger = ScrollTrigger.create({
      start: 0,
      end: () => ScrollTrigger.maxScroll(window),
      onUpdate: (self) => setGlobal(self.progress),
    });

    const onPointer = (e: PointerEvent) => {
      setPointer(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1),
      );
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      globalTrigger.kill();
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  useEffect(() => {
    if (ready && tier === "full" && matchMedia("(pointer: fine)").matches) {
      document.documentElement.classList.add("has-ember-cursor");
      return () => document.documentElement.classList.remove("has-ember-cursor");
    }
  }, [ready, tier]);

  return <>{children}</>;
}
