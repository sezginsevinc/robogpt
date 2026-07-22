"use client";

import { useEffect, useRef } from "react";
import { useQuality } from "@/stores/quality";

/** The ember dot cursor: brightens and grows over anything interactive. Desktop, full tier only. */
export function EmberCursor() {
  const tier = useQuality((s) => s.tier);
  const ready = useQuality((s) => s.ready);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ready || tier !== "full" || !matchMedia("(pointer: fine)").matches) return;
    const dot = dotRef.current;
    if (!dot) return;

    let x = innerWidth / 2;
    let y = innerHeight / 2;
    let tx = x;
    let ty = y;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const interactive = (e.target as Element | null)?.closest?.(
        "a, button, [data-interactive]",
      );
      targetScale = interactive ? 2.6 : 1;
    };

    const tick = () => {
      x += (tx - x) * 0.35;
      y += (ty - y) * 0.35;
      scale += (targetScale - scale) * 0.2;
      dot.style.transform = `translate3d(${x - 5}px, ${y - 5}px, 0) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [ready, tier]);

  if (!ready || tier !== "full") return null;
  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden size-[10px] rounded-full bg-ember mix-blend-screen md:block"
      style={{
        boxShadow:
          "0 0 10px rgba(255,122,26,0.9), 0 0 34px rgba(255,122,26,0.35)",
      }}
    />
  );
}
