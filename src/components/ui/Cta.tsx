"use client";

import Link from "next/link";
import { useRef } from "react";

/** Primary CTA — the only pill in the system. Magnetic within ±6px. */
export function Cta({
  href,
  children,
  ghost = false,
}: {
  href: string;
  children: React.ReactNode;
  ghost?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const dx = ((e.clientX - r.left) / r.width - 0.5) * 12;
    const dy = ((e.clientY - r.top) / r.height - 0.5) * 12;
    el.style.transform = `translate(${Math.max(-6, Math.min(6, dx))}px, ${Math.max(-6, Math.min(6, dy))}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0, 0)";
  };

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-interactive
      className={
        ghost
          ? "instrument link-stroke !text-bone/80 transition-colors hover:!text-bone"
          : "instrument rounded-full bg-ember px-7 py-3.5 !text-void transition-shadow duration-500 hover:shadow-[0_0_24px_rgba(46,134,214,0.45),0_0_80px_rgba(46,134,214,0.2)]"
      }
      style={{ transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)" }}
    >
      {children}
    </Link>
  );
}
