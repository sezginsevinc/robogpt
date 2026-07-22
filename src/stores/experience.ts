import { create } from "zustand";

export const chapterOrder = [
  "hero",
  "curiosity",
  "discovery",
  "creation",
  "disciplines",
  "journey",
  "proof",
  "trust",
  "campus",
  "epilogue",
] as const;

export type Chapter = (typeof chapterOrder)[number];

interface ExperienceState {
  chapter: Chapter;
  /** 0..1 scroll progress inside each chapter. Written by ScrollTriggers, read by scenes via getState() — never re-renders React per frame. */
  progress: Record<Chapter, number>;
  /** 0..1 through the whole page. */
  global: number;
  /** Accumulated "core energy": the visit's high-water mark. Never decreases. */
  energy: number;
  /** Normalized pointer, -1..1, y up. */
  pointer: { x: number; y: number };
  activeProject: string | null;
  activeBuilding: string | null;
  menuOpen: boolean;
  setChapter: (chapter: Chapter) => void;
  setProgress: (chapter: Chapter, value: number) => void;
  setGlobal: (value: number) => void;
  setPointer: (x: number, y: number) => void;
  setActiveProject: (slug: string | null) => void;
  setActiveBuilding: (id: string | null) => void;
  setMenuOpen: (open: boolean) => void;
}

const zeroProgress = Object.fromEntries(
  chapterOrder.map((c) => [c, 0]),
) as Record<Chapter, number>;

export const useExperience = create<ExperienceState>((set, get) => ({
  chapter: "hero",
  progress: { ...zeroProgress },
  global: 0,
  energy: 0,
  pointer: { x: 0, y: 0 },
  activeProject: null,
  activeBuilding: null,
  menuOpen: false,
  setChapter: (chapter) => {
    if (get().chapter !== chapter) set({ chapter });
  },
  setProgress: (chapter, value) => {
    // Mutate in place: scenes read via getState() each frame; React subscribers
    // watch `chapter`, not per-frame progress, so no notification is needed here.
    get().progress[chapter] = value;
  },
  setGlobal: (value) => {
    const state = get();
    state.global = value;
    if (value > state.energy) state.energy = value;
  },
  setPointer: (x, y) => {
    const p = get().pointer;
    p.x = x;
    p.y = y;
  },
  setActiveProject: (activeProject) => set({ activeProject }),
  setActiveBuilding: (activeBuilding) => set({ activeBuilding }),
  setMenuOpen: (menuOpen) => set({ menuOpen }),
}));
