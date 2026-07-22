"use client";

import { useEffect, useRef } from "react";
import { chapters } from "@/content/chapters";
import { testimonials } from "@/content/testimonials";
import type { Locale } from "@/content/locale";
import { useChapter } from "@/motion/useChapter";
import { useExperience } from "@/stores/experience";

/**
 * Chapter 7 — Trust. Parents' voices are points of light in a depth field;
 * scrolling moves the camera through them, bringing each into focus.
 */
export function Trust({ locale }: { locale: Locale }) {
  const sectionRef = useChapter<HTMLElement>("trust");
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = useExperience.getState().progress.trust;
      const travel = p * (testimonials.length + 0.4) - 0.2;
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        // d: how far this voice is from the focal plane. 0 = in focus.
        const d = testimonials[i].depth - travel + 0.5;
        const scale = Math.max(0.4, 1.15 - Math.abs(d) * 0.35 - Math.max(0, d) * 0.25);
        const opacity = Math.max(0, 1 - Math.abs(d) * 1.15);
        const blur = Math.min(14, Math.abs(d) * 10);
        const y = d * -6;
        card.style.opacity = String(opacity);
        card.style.filter = `blur(${blur.toFixed(1)}px)`;
        card.style.transform = `translate(-50%, -50%) translateY(${y}vh) scale(${scale.toFixed(3)})`;
        card.style.zIndex = String(100 - Math.round(Math.abs(d) * 10));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const c = chapters.trust;
  const offsets = ["46%", "54%", "48%"];

  return (
    <section ref={sectionRef} className="pointer-events-auto relative h-[340vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="max-w-md px-6 pt-24 md:px-10">
          <span className="instrument mb-4 block !text-ember">
            07 / {c.label[locale].toUpperCase()}
          </span>
          <h2 className="display text-[clamp(1.8rem,3.4vw,2.8rem)] text-bone">
            {c.heading[locale]}
          </h2>
        </div>

        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute top-[56%] w-[min(88vw,34rem)] px-4 text-center will-change-transform"
            style={{ left: offsets[i % offsets.length], opacity: 0 }}
          >
            <span
              className="mx-auto mb-6 block size-2 rounded-full bg-ember"
              style={{ boxShadow: "0 0 12px rgba(255,122,26,0.9), 0 0 48px rgba(255,122,26,0.4)" }}
            />
            <blockquote className="display text-[clamp(1.3rem,2.6vw,2rem)] leading-snug text-bone">
              “{testimonial.quote[locale]}”
            </blockquote>
            <p className="instrument mt-6">
              {testimonial.name} · {testimonial.relation[locale]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
