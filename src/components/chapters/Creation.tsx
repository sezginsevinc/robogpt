"use client";

import { chapters } from "@/content/chapters";
import type { Locale } from "@/content/locale";
import { useChapter } from "@/motion/useChapter";

/**
 * Chapter 3 — Creation. The artifacts float in the WebGL layer beneath;
 * this section is pointer-transparent so hover and click reach the scene.
 */
export function Creation({ locale }: { locale: Locale }) {
  const sectionRef = useChapter<HTMLElement>("creation");
  const c = chapters.creation;

  return (
    <section ref={sectionRef} id="sec-creation" className="pointer-events-none relative h-[340vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-between px-6 py-24 md:px-10">
        <div className="max-w-md">
          <span className="instrument mb-4 block !text-ember">
            03 / {c.label[locale].toUpperCase()}
          </span>
          <h2 className="display text-[clamp(1.9rem,3.8vw,3.2rem)] text-bone">
            {c.heading[locale]}
          </h2>
        </div>
        <p className="instrument self-center text-center text-[10px]">{c.hint[locale]}</p>
      </div>
    </section>
  );
}
