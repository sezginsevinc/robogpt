/**
 * Meaningful "beats" the on-screen advance button steps through — not raw
 * sections, but the points where a visitor can actually read or see something.
 *
 * Two kinds:
 *  - "el":   a real element (a question, a discipline room). Scroll it into view.
 *  - "frac": a fraction of a pinned/scrubbed section's scroll range, tuned so
 *            the beat sits centered (those beats have no scroll-anchored DOM node).
 */
export type Stop =
  | { kind: "el"; sel: string; align?: "top" | "center" }
  | { kind: "frac"; sel: string; f: number };

export const stops: Stop[] = [
  // Chapter 1 — Curiosity: one stop per question
  { kind: "el", sel: "[data-stop='q-0']", align: "top" },
  { kind: "el", sel: "[data-stop='q-1']", align: "top" },
  { kind: "el", sel: "[data-stop='q-2']", align: "top" },
  { kind: "el", sel: "[data-stop='q-3']", align: "top" },

  // Chapter 2 — Discovery: the three sentences forming
  { kind: "frac", sel: "#sec-discovery", f: 0.18 },
  { kind: "frac", sel: "#sec-discovery", f: 0.46 },
  { kind: "frac", sel: "#sec-discovery", f: 0.74 },

  // Chapter 3 — Creation: each artifact drifting to center
  { kind: "frac", sel: "#sec-creation", f: 0.22 },
  { kind: "frac", sel: "#sec-creation", f: 0.5 },
  { kind: "frac", sel: "#sec-creation", f: 0.78 },

  // Chapter 4 — Disciplines: each of the five rooms
  { kind: "el", sel: "[data-stop='room-0']", align: "center" },
  { kind: "el", sel: "[data-stop='room-1']", align: "center" },
  { kind: "el", sel: "[data-stop='room-2']", align: "center" },
  { kind: "el", sel: "[data-stop='room-3']", align: "center" },
  { kind: "el", sel: "[data-stop='room-4']", align: "center" },

  // Chapter 5 — Journey: the seven stages of transformation
  { kind: "frac", sel: "#sec-journey", f: 0.05 },
  { kind: "frac", sel: "#sec-journey", f: 0.19 },
  { kind: "frac", sel: "#sec-journey", f: 0.33 },
  { kind: "frac", sel: "#sec-journey", f: 0.47 },
  { kind: "frac", sel: "#sec-journey", f: 0.61 },
  { kind: "frac", sel: "#sec-journey", f: 0.75 },
  { kind: "frac", sel: "#sec-journey", f: 0.89 },

  // Chapter 6 — Proof: the number and the stats
  { kind: "frac", sel: "#sec-proof", f: 0.45 },

  // Chapter 7 — Trust: each parent's voice coming into focus
  { kind: "frac", sel: "#sec-trust", f: 0.21 },
  { kind: "frac", sel: "#sec-trust", f: 0.5 },
  { kind: "frac", sel: "#sec-trust", f: 0.79 },

  // Chapter 8 — Campus, then the closing line
  { kind: "frac", sel: "#sec-campus", f: 0.4 },
  { kind: "frac", sel: "#sec-epilogue", f: 0.5 },
];
