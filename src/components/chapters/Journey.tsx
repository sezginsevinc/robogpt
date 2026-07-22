"use client";

import { useRef } from "react";
import { gsap } from "@/motion/gsap";
import { chapters } from "@/content/chapters";
import type { Locale } from "@/content/locale";
import { useChapter, useScrub } from "@/motion/useChapter";

/** Chapter 5 — the learning journey as transformation. Words pass through as the object is forged. */
export function Journey({ locale }: { locale: Locale }) {
  const sectionRef = useChapter<HTMLElement>("journey");
  const stagesRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const c = chapters.journey;
  const n = c.stages.length;

  useScrub(sectionRef, (tl) => {
    const words = stagesRef.current?.querySelectorAll("[data-stage]");
    if (!words) return;
    gsap.set(words, { opacity: 0 });
    words.forEach((word, i) => {
      const at = i / n;
      const span = 1 / n;
      tl.fromTo(
        word,
        { opacity: 0, scale: 0.94, filter: "blur(6px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: span * 0.35, ease: "power2.out" },
        at + span * 0.08,
      );
      tl.to(
        word,
        { opacity: 0, scale: 1.04, duration: span * 0.3, ease: "power2.in" },
        at + span * 0.65,
      );
      tl.call(
        () => {
          if (counterRef.current) {
            counterRef.current.textContent = `${String(i + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
          }
        },
        [],
        at + span * 0.1,
      );
    });
  });

  return (
    <section ref={sectionRef} className="pointer-events-auto relative h-[460vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-between overflow-hidden py-24">
        <div className="max-w-md px-6 text-center">
          <span className="instrument mb-3 block !text-ember">
            05 / {c.label[locale].toUpperCase()}
          </span>
          <h2 className="display text-xl text-mist">{c.heading[locale]}</h2>
        </div>

        <div ref={stagesRef} className="relative flex w-full flex-1 items-center justify-center">
          {c.stages.map((stage, i) => (
            <div key={i} data-stage className="absolute text-center">
              <p
                className="display text-[clamp(2.6rem,8vw,6.5rem)] text-bone"
                style={{ textShadow: "0 2px 28px rgba(7,8,11,0.95), 0 0 10px rgba(7,8,11,0.7)" }}
              >
                {stage[locale]}
              </p>
              {i === 2 && (
                <p className="instrument mt-4 !text-ember">{c.failureNote[locale]}</p>
              )}
            </div>
          ))}
        </div>

        <span ref={counterRef} className="instrument tabular-nums">
          01 / {String(n).padStart(2, "0")}
        </span>
      </div>
    </section>
  );
}
