"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/motion/gsap";

const CX = 300;
const CY = 260;
const SAMPLES = 520;
const TWO_PI = Math.PI * 2;

interface Field {
  a: number; // x frequency
  b: number; // y frequency
  phase: number; // evolving phase
  warp: number; // pointer-driven skew
}

/** One harmonograph trace, sampled into an SVG path string. */
function trace(f: Field, phaseOffset: number, amp: number): string {
  const out: string[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const s = (i / SAMPLES) * TWO_PI;
    // Two nested sinusoids per axis + a gentle decay = living spirograph.
    const decay = 0.72 + 0.28 * Math.cos(s * 0.5);
    const x =
      CX +
      (Math.sin(f.a * s + f.phase + phaseOffset) * 150 +
        Math.sin(f.a * 0.5 * s + f.warp) * 78) *
        decay *
        amp;
    const y =
      CY +
      (Math.sin(f.b * s + phaseOffset) * 150 +
        Math.sin(f.b * 0.5 * s + f.phase * 0.6) * 70) *
        decay *
        amp;
    out.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return out.join("");
}

/** Point on the main trace at parameter s — used to ride glowing nodes along it. */
function pointAt(f: Field, s: number): [number, number] {
  const decay = 0.72 + 0.28 * Math.cos(s * 0.5);
  const x =
    CX + (Math.sin(f.a * s + f.phase) * 150 + Math.sin(f.a * 0.5 * s + f.warp) * 78) * decay;
  const y =
    CY + (Math.sin(f.b * s) * 150 + Math.sin(f.b * 0.5 * s + f.phase * 0.6) * 70) * decay;
  return [x, y];
}

/** Mathematics — living geometry. A harmonograph that breathes with scroll and bends to the pointer. */
export function RoomMath() {
  const hostRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<SVGPathElement>(null);
  const echoIonRef = useRef<SVGPathElement>(null);
  const echoPinkRef = useRef<SVGPathElement>(null);
  const figureRef = useRef<SVGGElement>(null);
  const haloRefs = useRef<(SVGCircleElement | null)[]>([]);
  const coreRefs = useRef<(SVGCircleElement | null)[]>([]);
  const labelRef = useRef<HTMLSpanElement>(null);

  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const trigger = ScrollTrigger.create({
      trigger: host,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      pointer.current.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.current.y = ((e.clientY - r.top) / r.height) * 2 - 1;
      pointer.current.active = true;
    };
    const onLeave = () => {
      pointer.current.active = false;
    };
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    const field: Field = { a: 3, b: 2, phase: 0, warp: 0 };
    let warp = 0;
    let bSmooth = 2;
    let rot = 0;
    let raf = 0;

    const render = (time: number) => {
      const t = time / 1000;
      // Frequency ratio climbs with scroll; the pointer nudges it for a live feel.
      const bTarget = 2 + progress.current * 4.5 + (pointer.current.active ? pointer.current.x * 1.2 : 0);
      bSmooth += (bTarget - bSmooth) * 0.06;
      const warpTarget = pointer.current.active ? pointer.current.y * 1.6 : 0;
      warp += (warpTarget - warp) * 0.06;

      field.a = 3;
      field.b = bSmooth;
      field.phase = reduce ? 0.6 : t * 0.35;
      field.warp = warp;

      mainRef.current?.setAttribute("d", trace(field, 0, 1));
      echoIonRef.current?.setAttribute("d", trace(field, 0.5, 0.9));
      echoPinkRef.current?.setAttribute("d", trace(field, -0.5, 0.8));

      // Glowing nodes ride the trace at staggered offsets.
      const speed = reduce ? 0 : 0.6;
      haloRefs.current.forEach((halo, i) => {
        const core = coreRefs.current[i];
        if (!halo) return;
        const s = ((t * speed + i * (TWO_PI / 3)) % TWO_PI + TWO_PI) % TWO_PI;
        const [x, y] = pointAt(field, s);
        const cx = x.toFixed(1);
        const cy = y.toFixed(1);
        halo.setAttribute("cx", cx);
        halo.setAttribute("cy", cy);
        core?.setAttribute("cx", cx);
        core?.setAttribute("cy", cy);
      });

      // The whole figure drifts slowly — geometry that's alive, not framed.
      if (figureRef.current) {
        rot = reduce ? 0 : Math.sin(t * 0.12) * 3;
        figureRef.current.setAttribute("transform", `rotate(${rot.toFixed(2)} ${CX} ${CY})`);
      }

      if (labelRef.current) {
        labelRef.current.textContent = `x = sin(3t + φ) · y = sin(${bSmooth.toFixed(2)}t)`;
      }

      if (!reduce) raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      trigger.kill();
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const nodeHues = ["#a98cff", "#ff7ab6", "#6fd3e3"];

  return (
    <div ref={hostRef} className="flex h-full w-full flex-col items-center" data-interactive>
      <svg viewBox="0 0 600 520" className="h-full w-full max-w-2xl" aria-hidden>
        <defs>
          <linearGradient id="mathGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a98cff" />
            <stop offset="55%" stopColor="#ff7ab6" />
            <stop offset="100%" stopColor="#6fd3e3" />
          </linearGradient>
          <radialGradient id="mathNode">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#c9b6ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a98cff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Faint polar field — the space the geometry lives in */}
        <g stroke="var(--color-steel-soft)" fill="none">
          {[70, 130, 190].map((r) => (
            <circle key={r} cx={CX} cy={CY} r={r} strokeWidth="1" opacity="0.5" />
          ))}
          {Array.from({ length: 12 }).map((_, i) => {
            const ang = (i / 12) * TWO_PI;
            return (
              <line
                key={i}
                x1={CX}
                y1={CY}
                x2={CX + Math.cos(ang) * 205}
                y2={CY + Math.sin(ang) * 205}
                strokeWidth="0.6"
                opacity="0.28"
              />
            );
          })}
        </g>

        <g ref={figureRef}>
          {/* Echo traces — the harmonic shadows */}
          <path
            ref={echoIonRef}
            fill="none"
            stroke="var(--color-ion)"
            strokeWidth="1"
            opacity="0.35"
            style={{ mixBlendMode: "screen" }}
          />
          <path
            ref={echoPinkRef}
            fill="none"
            stroke="var(--color-pink)"
            strokeWidth="1"
            opacity="0.4"
            style={{ mixBlendMode: "screen" }}
          />
          {/* Main trace — the living figure */}
          <path
            ref={mainRef}
            fill="none"
            stroke="url(#mathGrad)"
            strokeWidth="1.9"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 8px rgba(169,140,255,0.55))" }}
          />
          {/* Nodes riding the curve — soft halo + bright core */}
          {nodeHues.map((c, i) => (
            <g key={i}>
              <circle
                ref={(el) => {
                  haloRefs.current[i] = el;
                }}
                cx={CX}
                cy={CY}
                r="9"
                fill="url(#mathNode)"
              />
              <circle
                ref={(el) => {
                  coreRefs.current[i] = el;
                }}
                cx={CX}
                cy={CY}
                r="2.4"
                fill={c}
                style={{ filter: `drop-shadow(0 0 6px ${c})` }}
              />
            </g>
          ))}
        </g>
      </svg>
      <span ref={labelRef} className="instrument tabular-nums" style={{ textTransform: "none" }} />
    </div>
  );
}
