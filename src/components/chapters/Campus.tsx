"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { chapters } from "@/content/chapters";
import { buildings } from "@/content/campus";
import { site } from "@/content/site";
import type { Locale } from "@/content/locale";
import { useChapter } from "@/motion/useChapter";
import { useExperience } from "@/stores/experience";

/** Chapter 8 — the miniature campus. The scene lives in the canvas; this docks the room panel. */
export function Campus({ locale }: { locale: Locale }) {
  const sectionRef = useChapter<HTMLElement>("campus");
  const activeBuilding = useExperience((s) => s.activeBuilding);
  const setActiveBuilding = useExperience((s) => s.setActiveBuilding);
  const building = buildings.find((b) => b.id === activeBuilding);

  const c = chapters.campus;

  return (
    <section ref={sectionRef} className="pointer-events-none relative h-[300vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-between px-6 py-24 md:px-10">
        <div className="max-w-md">
          <span className="instrument mb-4 block !text-ember">
            08 / {c.label[locale].toUpperCase()}
          </span>
          <h2 className="display text-[clamp(1.9rem,3.8vw,3.2rem)] text-bone">
            {c.heading[locale]}
          </h2>
        </div>

        <AnimatePresence>
          {building && (
            <motion.aside
              key={building.id}
              className="glass pointer-events-auto absolute bottom-6 left-1/2 w-[min(92vw,22rem)] -translate-x-1/2 rounded-lg p-6 md:bottom-auto md:left-auto md:right-10 md:top-1/2 md:-translate-y-1/2 md:translate-x-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-3 flex items-start justify-between gap-4">
                <h3 className="display text-xl text-bone">{building.name[locale]}</h3>
                <button
                  type="button"
                  onClick={() => setActiveBuilding(null)}
                  className="instrument !text-bone/70 transition-colors hover:!text-ember"
                  aria-label={locale === "tr" ? "Kapat" : "Close"}
                >
                  ✕
                </button>
              </div>
              <p className="mb-5 text-sm text-ink">{building.reveal[locale]}</p>
              <Link
                href={`/${locale}/visit`}
                className="instrument inline-block rounded-full bg-ember px-5 py-2.5 !text-void"
              >
                {site.cta.visit[locale]}
              </Link>
            </motion.aside>
          )}
        </AnimatePresence>

        <p className="instrument self-center text-center text-[10px]">{c.hint[locale]}</p>
      </div>
    </section>
  );
}
