"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/content/locale";
import { scrollToY } from "@/motion/scroll";
import { stops, type Stop } from "@/content/stops";

/**
 * On-screen "advance" control for visitors on slow trackpads. Each press
 * smooth-scrolls to the next meaningful beat (a question, a room, a stat …),
 * not the next raw section — so nothing worth seeing gets skipped. On the last
 * beat it returns to the top; the experience is cyclical.
 */

/** Resolve a stop to an absolute scroll Y, or null if its target isn't mounted. */
function resolveStop(stop: Stop): number | null {
  const el = document.querySelector(stop.sel);
  if (!(el instanceof HTMLElement)) return null;
  const absTop = el.getBoundingClientRect().top + window.scrollY;

  if (stop.kind === "el") {
    if (stop.align === "center") {
      return absTop + el.offsetHeight / 2 - window.innerHeight / 2;
    }
    return absTop;
  }
  // "frac": a fraction of the pinned section's scroll range.
  const range = el.offsetHeight - window.innerHeight;
  return absTop + stop.f * Math.max(0, range);
}

export function ScrollNav({ locale }: { locale: Locale }) {
  const [visible, setVisible] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(y > window.innerHeight * 0.35);
      setAtEnd(max - y < window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goNext = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    // A stop must sit below where we are now to count as "next". Kept small so
    // tightly-spaced beats (the journey stages) are each reachable, never skipped.
    const threshold = y + window.innerHeight * 0.2;

    const next = stops
      .map(resolveStop)
      .filter((t): t is number => t !== null)
      .sort((a, b) => a - b)
      .find((t) => t > threshold);

    if (next !== undefined) {
      scrollToY(Math.min(next, max));
    } else {
      scrollToY(0, 1.3); // past the last beat → wrap back to the core
    }
  };

  const label = locale === "tr" ? "Sonraki durak" : "Next stop";
  const topLabel = locale === "tr" ? "Başa dön" : "Back to start";

  return (
    <button
      type="button"
      onClick={goNext}
      aria-label={atEnd ? topLabel : label}
      title={atEnd ? topLabel : label}
      data-interactive
      className={`glass group fixed bottom-6 right-6 z-[75] flex size-12 items-center justify-center rounded-full text-bone transition-all duration-500 hover:border-ember/60 hover:text-ember md:bottom-8 md:right-8 ${
        visible ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-500 ${atEnd ? "rotate-180" : "group-hover:translate-y-0.5"}`}
        aria-hidden
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}
