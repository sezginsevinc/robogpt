"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { chapters as chapterCopy } from "@/content/chapters";
import type { Locale } from "@/content/locale";
import { useExperience, chapterOrder, type Chapter } from "@/stores/experience";
import { MenuOverlay } from "./MenuOverlay";

const chapterLabels: Partial<Record<Chapter, { tr: string; en: string }>> = {
  curiosity: chapterCopy.curiosity.label,
  discovery: chapterCopy.discovery.label,
  creation: chapterCopy.creation.label,
  disciplines: chapterCopy.disciplines.label,
  journey: chapterCopy.journey.label,
  proof: chapterCopy.proof.label,
  trust: chapterCopy.trust.label,
  campus: chapterCopy.campus.label,
  epilogue: chapterCopy.epilogue.label,
};

/** Live schematic of CORE-01: a ring that fills with global progress. */
function CoreIndicator({ locale }: { locale: Locale }) {
  const chapter = useExperience((s) => s.chapter);
  const ringRef = useRef<SVGCircleElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let raf = 0;
    const C = 2 * Math.PI * 9;
    const tick = () => {
      const { global, energy } = useExperience.getState();
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = String(C * (1 - global));
      }
      if (statusRef.current) {
        const status =
          energy > 0.85 ? site.core.awake : energy > 0.08 ? site.core.waking : site.core.dormant;
        statusRef.current.textContent = status[locale];
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [locale]);

  const index = chapterOrder.indexOf(chapter);
  const label = chapterLabels[chapter];

  return (
    <div className="pointer-events-none hidden items-center gap-3 md:flex">
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="9" fill="none" stroke="var(--color-steel)" strokeWidth="1" />
        <circle
          ref={ringRef}
          cx="12"
          cy="12"
          r="9"
          fill="none"
          stroke="var(--color-ember)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 9}
          strokeDashoffset={2 * Math.PI * 9}
          transform="rotate(-90 12 12)"
        />
        <circle cx="12" cy="12" r="2.5" fill="var(--color-ember)" opacity="0.9" />
      </svg>
      <div className="instrument leading-tight">
        <span className="block text-bone/80">
          {label ? label[locale] : "CORE-01"}
          {index > 0 && (
            <span className="text-mist"> · {String(index).padStart(2, "0")}/09</span>
          )}
        </span>
        <span className="block text-[10px]">
          CORE-01 · <span ref={statusRef} className="text-ember" />
        </span>
      </div>
    </div>
  );
}

export function Hud({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const chapter = useExperience((s) => s.chapter);
  const isHome = pathname === `/${locale}`;
  const showVisit = !isHome || chapter !== "hero";

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[70] flex items-center justify-between px-5 py-4 md:px-8 md:py-6">
        <Link
          href={`/${locale}`}
          className="display pointer-events-auto text-[15px] tracking-[0.02em] text-bone"
          aria-label="ROBOKAMPÜS"
        >
          ROBO<span className="text-ember">KAMPÜS</span>
        </Link>

        {isHome && <CoreIndicator locale={locale} />}

        <div className="pointer-events-auto flex items-center gap-3 md:gap-5">
          <Link
            href={`/${locale}/visit`}
            className={`instrument rounded-full border border-ember/60 px-4 py-2 !text-ember transition-all duration-500 hover:bg-ember hover:!text-void ${
              showVisit ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          >
            {site.cta.visit[locale]}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="instrument !text-bone/80 transition-colors hover:!text-ember"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
          >
            {locale === "tr" ? "MENÜ" : "MENU"}
          </button>
        </div>
      </header>
      <MenuOverlay locale={locale} open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
