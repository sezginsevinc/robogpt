/** Motion tokens — the only durations and easings used anywhere. */
export const duration = {
  instant: 0.12,
  quick: 0.24,
  scene: 0.8,
  cinematic: 1.6,
} as const;

export const ease = {
  outExpo: "expo.out",
  inOutQuint: "power4.inOut",
  /** CSS equivalents for DOM transitions. */
  cssOutExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  cssInOutQuint: "cubic-bezier(0.83, 0, 0.17, 1)",
} as const;

/** The "spark" spring for pointer-reactive elements. */
export const spark = { stiffness: 180, damping: 22 } as const;

export const stagger = { tight: 0.04, loose: 0.08 } as const;
