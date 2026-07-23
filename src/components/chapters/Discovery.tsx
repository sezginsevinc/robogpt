"use client";

import { useRef } from "react";
import { chapters } from "@/content/chapters";
import type { Locale } from "@/content/locale";
import { useChapter, useScrub } from "@/motion/useChapter";
import { gsap } from "@/motion/gsap";

/** Chapter 2 — Discovery. The woken sparks organize into structure. */
export function Discovery({ locale }: { locale: Locale }) {
  const sectionRef = useChapter<HTMLElement>("discovery");
  const blocksRef = useRef<HTMLDivElement>(null);

  useScrub(sectionRef, (tl) => {
    const blocks = blocksRef.current?.querySelectorAll("[data-block]");
    if (!blocks) return;
    blocks.forEach((block, i) => {
      const at = 0.12 + i * 0.28;
      tl.fromTo(
        block,
        { opacity: 0, y: 44 },
        { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" },
        at,
      );
      if (i < blocks.length - 1) {
        tl.to(block, { opacity: 0, y: -30, duration: 0.08, ease: "power2.in" }, at + 0.19);
      }
    });
    gsap.set(blocks, { opacity: 0 });
  });

  const c = chapters.discovery;

  return (
    <section ref={sectionRef} id="sec-discovery" className="pointer-events-auto relative h-[280vh]">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="grid w-full grid-cols-1 gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <span className="instrument mb-4 block !text-ember">
              02 / {c.label[locale].toUpperCase()}
            </span>
            <h2 className="display text-[clamp(2rem,4.4vw,3.6rem)] text-bone">
              {c.heading[locale]}
            </h2>
          </div>
          <div ref={blocksRef} className="relative min-h-40 md:col-span-5 md:col-start-8">
            {c.blocks.map((block, i) => (
              <p
                key={i}
                data-block
                className="absolute inset-x-0 top-1/2 max-w-sm -translate-y-1/2 text-lg text-ink"
              >
                {block[locale]}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
