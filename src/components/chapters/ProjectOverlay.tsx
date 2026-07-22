"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { getProject } from "@/content/projects";
import type { Locale } from "@/content/locale";
import { useExperience } from "@/stores/experience";

/** Immersive project view — entered by touching an artifact. */
export function ProjectOverlay({ locale }: { locale: Locale }) {
  const activeProject = useExperience((s) => s.activeProject);
  const setActiveProject = useExperience((s) => s.setActiveProject);
  const project = activeProject ? getProject(activeProject) : null;

  useEffect(() => {
    if (!activeProject) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActiveProject(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeProject, setActiveProject]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={project.name[locale]}
          className="fixed inset-0 z-[75] flex items-center justify-center bg-void/70 p-5 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveProject(null)}
        >
          <motion.article
            className="glass w-full max-w-xl rounded-lg p-8 md:p-10"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-6">
              <div>
                <span className="instrument mb-2 block !text-ember">
                  {locale === "tr" ? "ARTEFAKT" : "ARTIFACT"} · {project.year}
                </span>
                <h3 className="display text-3xl text-bone">{project.name[locale]}</h3>
                <p className="instrument mt-2">
                  {project.builder[locale]} · {project.discipline[locale]}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="instrument shrink-0 !text-bone/70 transition-colors hover:!text-ember"
              >
                {locale === "tr" ? "KAPAT" : "CLOSE"}
              </button>
            </div>

            <p className="mb-7 text-ink">{project.story[locale]}</p>

            <div className="border-t border-steel-soft pt-5">
              <span className="instrument mb-3 block text-[10px]">
                {locale === "tr" ? "İÇ MEKANİK" : "INTERNAL MECHANICS"}
              </span>
              <ul className="flex flex-col gap-2.5">
                {project.mechanics.map((m, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ember" />
                    {m[locale]}
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
