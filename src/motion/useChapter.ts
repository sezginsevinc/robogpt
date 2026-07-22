"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/motion/gsap";
import { useExperience, type Chapter } from "@/stores/experience";

/**
 * Wires a chapter section into the experience store.
 * mode "traverse" — progress runs while the section (usually a sticky pin)
 * traverses the viewport; "visible" — progress runs from first to last visibility.
 */
export function useChapter<T extends HTMLElement = HTMLElement>(
  chapter: Chapter,
  mode: "traverse" | "visible" = "traverse",
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { setProgress, setChapter } = useExperience.getState();

    const progressTrigger = ScrollTrigger.create({
      trigger: el,
      start: mode === "traverse" ? "top top" : "top bottom",
      end: mode === "traverse" ? "bottom bottom" : "bottom top",
      onUpdate: (self) => setProgress(chapter, self.progress),
    });
    const activeTrigger = ScrollTrigger.create({
      trigger: el,
      start: "top 55%",
      end: "bottom 45%",
      onToggle: (self) => {
        if (self.isActive) setChapter(chapter);
      },
    });
    return () => {
      progressTrigger.kill();
      activeTrigger.kill();
    };
  }, [chapter, mode]);

  return ref;
}

/** Scrub helper: build a timeline pinned to a section's traversal. */
export function useScrub(
  ref: React.RefObject<HTMLElement | null>,
  build: (tl: gsap.core.Timeline) => void,
  deps: unknown[] = [],
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
      },
    });
    build(tl);
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
