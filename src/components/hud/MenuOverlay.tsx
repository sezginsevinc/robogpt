"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/content/site";
import type { Locale } from "@/content/locale";
import { duration, ease } from "@/motion/tokens";

export function MenuOverlay({
  locale,
  open,
  onClose,
}: {
  locale: Locale;
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const otherLocale: Locale = locale === "tr" ? "en" : "tr";
  const switched = pathname.replace(`/${locale}`, `/${otherLocale}`) || `/${otherLocale}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const links = [
    { href: `/${locale}`, label: site.nav.experience[locale] },
    { href: `/${locale}/programs`, label: site.nav.programs[locale] },
    { href: `/${locale}/projects`, label: site.nav.projects[locale] },
    { href: `/${locale}/manifesto`, label: site.nav.manifesto[locale] },
    { href: `/${locale}/visit`, label: site.nav.visit[locale] },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[80] flex flex-col justify-between bg-void/85 px-6 py-6 backdrop-blur-2xl md:px-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration.quick }}
        >
          <div className="flex items-center justify-between">
            <span className="display text-[15px] text-bone">
              ROBO<span className="text-ember">KAMPÜS</span>
            </span>
            <button
              type="button"
              onClick={onClose}
              className="instrument !text-bone/80 transition-colors hover:!text-ember"
            >
              {locale === "tr" ? "KAPAT" : "CLOSE"}
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {links.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: duration.scene,
                  delay: 0.08 + i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="display block text-4xl text-bone transition-colors duration-300 hover:text-ember md:text-6xl"
                  style={{ transitionTimingFunction: ease.cssOutExpo }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex items-center justify-between">
            <span className="instrument">{site.tagline[locale]}</span>
            <Link
              href={switched}
              onClick={onClose}
              className="instrument link-stroke !text-bone/80"
            >
              {otherLocale === "tr" ? "TÜRKÇE" : "ENGLISH"}
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
