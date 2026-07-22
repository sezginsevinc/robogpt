"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/motion/gsap";

/** Mathematics — living geometry. A Lissajous figure whose parameters breathe with scroll. */
export function RoomMath() {
  const hostRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const progress = useRef(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const trigger = ScrollTrigger.create({
      trigger: host,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    let raf = 0;
    const tick = (time: number) => {
      const t = time / 1000;
      const path = pathRef.current;
      if (path) {
        const a = 3;
        const b = 2 + progress.current * 4.5;
        const phase = t * 0.4;
        const points: string[] = [];
        for (let i = 0; i <= 480; i++) {
          const s = (i / 480) * Math.PI * 2;
          const x = 300 + Math.sin(a * s + phase) * 230;
          const y = 260 + Math.sin(b * s) * 200;
          points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
        }
        path.setAttribute("d", points.join(""));
        if (labelRef.current) {
          labelRef.current.textContent = `x = sin(${a}t + φ) · y = sin(${b.toFixed(2)}t)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      trigger.kill();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={hostRef} className="flex h-full w-full flex-col items-center">
      <svg viewBox="0 0 600 520" className="h-full w-full max-w-2xl" aria-hidden>
        <path
          ref={pathRef}
          fill="none"
          stroke="var(--color-ion)"
          strokeWidth="1.4"
          opacity="0.9"
          style={{ filter: "drop-shadow(0 0 6px rgba(111,211,227,0.45))" }}
        />
      </svg>
      <span ref={labelRef} className="instrument tabular-nums" style={{ textTransform: "none" }} />
    </div>
  );
}
