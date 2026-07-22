"use client";

import { useRef } from "react";
import { gsap } from "@/motion/gsap";
import { useGSAP } from "@gsap/react";
import { site } from "@/content/site";
import type { Locale } from "@/content/locale";
import { useChapter, useScrub } from "@/motion/useChapter";
import { Cta } from "@/components/ui/Cta";

/** Prologue — Contact. The dormant core, the thesis, the first scroll. */
export function Hero({ locale }: { locale: Locale }) {
  const sectionRef = useChapter<HTMLElement>("hero");
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Boot sequence: no spinners — loading is the scene.
      gsap.fromTo(
        "[data-boot]",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1.6,
          ease: "expo.out",
          stagger: 0.14,
          delay: 0.5,
        },
      );
    },
    { scope: contentRef },
  );

  useScrub(sectionRef, (tl) => {
    tl.to(contentRef.current, { opacity: 0, y: -80, ease: "none" }, 0.35);
  });

  const [line1, line2] = site.headline[locale].split("\n");

  return (
    <section ref={sectionRef} id="top" className="pointer-events-auto relative h-[260vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-end overflow-hidden">
        <div ref={contentRef} className="px-5 pb-16 md:px-10 md:pb-20">
          <p data-boot className="instrument mb-6 !text-ember">
            {site.tagline[locale]}
          </p>
          <h1 className="display max-w-[16ch] text-[clamp(2.4rem,7.2vw,6rem)] text-bone">
            <span data-boot className="block">
              {line1}
            </span>
            <span data-boot className="block text-mist">
              {line2}
            </span>
          </h1>
          <p data-boot className="mt-7 max-w-md text-[1.05rem] text-ink">
            {site.subline[locale]}
          </p>
          <div data-boot className="mt-9 flex items-center gap-7">
            <Cta href={`/${locale}#curiosity`}>{site.cta.explore[locale]}</Cta>
            <Cta href={`/${locale}/visit`} ghost>
              {site.cta.visit[locale]}
            </Cta>
          </div>
        </div>

        {/* Instrument corners */}
        <div
          data-boot
          className="pointer-events-none absolute bottom-16 right-5 hidden text-right md:right-10 md:block"
        >
          <span className="instrument block">CORE-01 · KIVILCIM</span>
          <span className="instrument block text-[10px]">41.0082°N — 28.9784°E</span>
        </div>
        <div
          data-boot
          className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="instrument text-[10px]">{site.cta.scroll[locale]}</span>
          <span className="block h-8 w-px overflow-hidden bg-steel">
            <span className="block h-3 w-px animate-[scrollcue_1.8s_ease-in-out_infinite] bg-ember" />
          </span>
        </div>
      </div>
    </section>
  );
}
