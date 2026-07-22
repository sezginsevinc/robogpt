"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/locale";

const bootLines: Record<Locale, string[]> = {
  tr: [
    "> core.boot()",
    "> sensörler ......... 12/12 çevrimiçi",
    "> merak ............. algılandı",
    "> kontrol ........... sana devrediliyor_",
  ],
  en: [
    "> core.boot()",
    "> sensors ........... 12/12 online",
    "> curiosity ......... detected",
    "> control ........... handed to: you_",
  ],
};

/** Technology — a device that wakes up as the visitor arrives. */
export function RoomTech({ locale }: { locale: Locale }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const total = bootLines[locale].length;
        for (let i = 1; i <= total; i++) {
          setTimeout(() => setVisibleLines(i), 450 * i);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, [locale]);

  const booted = visibleLines >= bootLines[locale].length;

  return (
    <div ref={hostRef} className="w-full max-w-md">
      <div className="glass rounded-lg p-6">
        <div className="mb-4 flex items-center justify-between border-b border-steel-soft pb-3">
          <span className="instrument text-[10px]">RK-TERMINAL</span>
          <span
            className={`size-2 rounded-full transition-colors duration-500 ${
              booted ? "bg-pink shadow-[0_0_10px_rgba(255,122,182,0.8)]" : "bg-steel"
            }`}
          />
        </div>
        <div className="min-h-28 font-mono text-[13px] leading-7 text-ink">
          {bootLines[locale].slice(0, visibleLines).map((line, i) => (
            <p key={i} className={i === 2 ? "text-pink" : undefined}>
              {line}
            </p>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-10 rounded-sm border border-steel-soft transition-all duration-700"
              style={{
                transitionDelay: `${i * 180}ms`,
                background: booted
                  ? i === 1
                    ? "rgba(255,122,182,0.18)"
                    : "rgba(111,211,227,0.10)"
                  : "transparent",
                borderColor: booted
                  ? i === 1
                    ? "rgba(255,122,182,0.5)"
                    : "rgba(111,211,227,0.35)"
                  : undefined,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
