"use client";

import { useRef } from "react";
import { gsap } from "@/motion/gsap";
import { chapters } from "@/content/chapters";
import { headlineStat, stats, statsFootnote } from "@/content/stats";
import type { Locale } from "@/content/locale";
import { useChapter, useScrub } from "@/motion/useChapter";

/** Chapter 6 — Proof. The headline number condenses out of the particle field beneath. */
export function Proof({ locale }: { locale: Locale }) {
  const sectionRef = useChapter<HTMLElement>("proof");
  const labelRef = useRef<HTMLParagraphElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useScrub(sectionRef, (tl) => {
    gsap.set(labelRef.current, { opacity: 0, y: 20 });
    const items = rowRef.current?.querySelectorAll("[data-stat]");
    if (items) gsap.set(items, { opacity: 0, y: 30, filter: "blur(8px)" });

    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.1, ease: "power2.out" }, 0.5);
    items?.forEach((item, i) => {
      tl.to(
        item,
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.1, ease: "power2.out" },
        0.58 + i * 0.07,
      );
    });
  });

  const c = chapters.proof;

  return (
    <section ref={sectionRef} className="pointer-events-auto relative h-[260vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-between px-6 py-24 md:px-10">
        <div className="max-w-md">
          <span className="instrument mb-4 block !text-ember">
            06 / {c.label[locale].toUpperCase()}
          </span>
          <h2 className="display text-[clamp(1.8rem,3.4vw,2.8rem)] text-bone">
            {c.heading[locale]}
          </h2>
        </div>

        {/* The number itself is drawn by the particle field in the canvas. */}
        <p ref={labelRef} className="instrument self-center text-center">
          {headlineStat.label[locale]}
        </p>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div ref={rowRef} className="flex flex-col gap-8 md:flex-row md:gap-16">
            {stats.map((stat, i) => (
              <div key={i} data-stat>
                <span className="display block text-4xl text-bone tabular-nums md:text-5xl">
                  {stat.value}
                </span>
                <span className="instrument mt-2 block">{stat.label[locale]}</span>
              </div>
            ))}
          </div>
          <span className="instrument text-[10px]">* {statsFootnote[locale]}</span>
        </div>
      </div>
    </section>
  );
}
