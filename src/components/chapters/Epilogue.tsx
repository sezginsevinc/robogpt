"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap } from "@/motion/gsap";
import { chapters } from "@/content/chapters";
import { site } from "@/content/site";
import type { Locale } from "@/content/locale";
import { useChapter, useScrub } from "@/motion/useChapter";
import { Cta } from "@/components/ui/Cta";

/** Epilogue — Return. The campus condenses back into the core; the cycle closes. The anti-footer. */
export function Epilogue({ locale }: { locale: Locale }) {
  const sectionRef = useChapter<HTMLElement>("epilogue");
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);

  useScrub(sectionRef, (tl) => {
    gsap.set(line1Ref.current, { opacity: 0, y: 24 });
    gsap.set(line2Ref.current, { opacity: 0, y: 30 });
    tl.to(line1Ref.current, { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" }, 0.12);
    tl.to(line1Ref.current, { opacity: 0, y: -20, duration: 0.1, ease: "power2.in" }, 0.38);
    tl.to(line2Ref.current, { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" }, 0.55);
  });

  const c = chapters.epilogue;

  const links = [
    { href: `/${locale}/programs`, label: site.nav.programs[locale] },
    { href: `/${locale}/projects`, label: site.nav.projects[locale] },
    { href: `/${locale}/manifesto`, label: site.nav.manifesto[locale] },
    { href: `/${locale}/visit`, label: site.nav.visit[locale] },
    { href: `/${locale}/kvkk`, label: "KVKK" },
  ];

  return (
    <section ref={sectionRef} id="sec-epilogue" className="pointer-events-auto relative h-[240vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6">
        <p ref={line1Ref} className="instrument absolute max-w-sm text-center leading-relaxed">
          {c.line1[locale]}
        </p>
        <div ref={line2Ref} className="flex flex-col items-center text-center">
          <h2 className="display max-w-[18ch] text-[clamp(1.9rem,4.4vw,3.6rem)] text-bone">
            {c.line2[locale]}
          </h2>
          <div className="mt-10">
            <Cta href={`/${locale}/visit`}>{site.cta.visit[locale]}</Cta>
          </div>
        </div>
      </div>

      {/* The anti-footer: one quiet instrument line. */}
      <footer className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-6 pb-8 md:flex-row md:justify-between md:px-10">
        <span className="instrument text-[10px]">{site.footerLine[locale]}</span>
        <nav className="flex flex-wrap justify-center gap-5">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="instrument link-stroke text-[10px]">
              {link.label}
            </Link>
          ))}
        </nav>
      </footer>
    </section>
  );
}
