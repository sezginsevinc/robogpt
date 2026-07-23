import type Lenis from "lenis";

/** Module-level handle to the active Lenis instance, set by ExperienceProvider. */
let lenis: Lenis | null = null;

export function registerLenis(instance: Lenis | null) {
  lenis = instance;
}

/** Smooth-scroll to an absolute Y, using Lenis when available. */
export function scrollToY(y: number, duration = 1.1) {
  const target = Math.max(0, y);
  if (lenis) {
    lenis.scrollTo(target, { duration });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}
