"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/motion/gsap";
import { useGSAP } from "@gsap/react";
import { chapters } from "@/content/chapters";
import type { Locale } from "@/content/locale";
import { useChapter } from "@/motion/useChapter";

/** Chapter 1 — Curiosity. The dark asks questions; sparks wake around them. */
export function Curiosity({ locale }: { locale: Locale }) {
  const sectionRef = useChapter<HTMLElement>("curiosity", "visible");
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-question]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 45%",
              scrub: 0.4,
            },
          },
        );
        gsap.to(el, {
          opacity: 0,
          y: -50,
          ease: "none",
          scrollTrigger: { trigger: el, start: "bottom 42%", end: "bottom 8%", scrub: 0.4 },
        });
      });
      ScrollTrigger.refresh();
    },
    { scope },
  );

  const c = chapters.curiosity;

  return (
    <section ref={sectionRef} id="curiosity" className="pointer-events-auto relative">
      <div ref={scope}>
        <div className="flex h-[70vh] items-end justify-center pb-24">
          <p data-question className="instrument">
            {c.intro[locale]}
          </p>
        </div>
        {c.questions.map((question, i) => (
          <div key={i} data-stop={`q-${i}`} className="flex h-screen items-center justify-center px-6">
            <div data-question className="text-center">
              <span className="instrument mb-4 block text-[10px] !text-ember">
                S.{String(i + 1).padStart(2, "0")}
              </span>
              <p className="display text-[clamp(1.8rem,4.5vw,3.6rem)] text-bone">
                {question[locale]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
