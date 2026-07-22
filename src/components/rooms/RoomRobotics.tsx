"use client";

import { useEffect, useRef } from "react";

const L1 = 150;
const L2 = 120;
const L3 = 64;
const BASE: [number, number] = [400, 470];

/**
 * Robotics — a six-axis arm's 2D cousin, drawn as a technical schematic.
 * It tracks the pointer inside the room; left alone, it rehearses a pose cycle.
 */
export function RoomRobotics() {
  const hostRef = useRef<HTMLDivElement>(null);
  const armRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const arm = armRef.current;
    if (!host || !arm) return;

    const pointer = { x: 0, y: 0, active: false };
    const current = { x: 320, y: 220 };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const svg = host.querySelector("svg");
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 800;
      pointer.y = ((e.clientY - r.top) / r.height) * 520;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    const seg1 = arm.querySelector<SVGLineElement>("[data-seg1]")!;
    const seg2 = arm.querySelector<SVGLineElement>("[data-seg2]")!;
    const seg3 = arm.querySelector<SVGLineElement>("[data-seg3]")!;
    const j1 = arm.querySelector<SVGCircleElement>("[data-j1]")!;
    const j2 = arm.querySelector<SVGCircleElement>("[data-j2]")!;
    const tip = arm.querySelector<SVGCircleElement>("[data-tip]")!;

    const tick = (time: number) => {
      const t = time / 1000;
      // Idle: a slow rehearsal loop. Active: follow the pointer.
      const target = pointer.active
        ? pointer
        : {
            x: 400 + Math.cos(t * 0.5) * 200,
            y: 240 + Math.sin(t * 0.8) * 90,
          };
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;

      // Reach for a wrist position L3 short of the target, then aim the effector.
      let dx = current.x - BASE[0];
      let dy = current.y - BASE[1];
      const full = Math.hypot(dx, dy) || 1;
      const wx = BASE[0] + (dx / full) * Math.max(40, full - L3);
      const wy = BASE[1] + (dy / full) * Math.max(40, full - L3);

      dx = wx - BASE[0];
      dy = wy - BASE[1];
      const d = Math.min(Math.hypot(dx, dy), L1 + L2 - 2);
      const baseAngle = Math.atan2(dy, dx);
      const inner = Math.acos(
        Math.min(1, Math.max(-1, (d * d + L1 * L1 - L2 * L2) / (2 * d * L1))),
      );
      const a1 = baseAngle - inner;
      const ex = BASE[0] + Math.cos(a1) * L1;
      const ey = BASE[1] + Math.sin(a1) * L1;
      const wx2 = BASE[0] + (dx / (Math.hypot(dx, dy) || 1)) * d;
      const wy2 = BASE[1] + (dy / (Math.hypot(dx, dy) || 1)) * d;
      const aimX = current.x - wx2;
      const aimY = current.y - wy2;
      const aim = Math.hypot(aimX, aimY) || 1;
      const tx = wx2 + (aimX / aim) * L3;
      const ty = wy2 + (aimY / aim) * L3;

      seg1.setAttribute("x2", String(ex));
      seg1.setAttribute("y2", String(ey));
      seg2.setAttribute("x1", String(ex));
      seg2.setAttribute("y1", String(ey));
      seg2.setAttribute("x2", String(wx2));
      seg2.setAttribute("y2", String(wy2));
      seg3.setAttribute("x1", String(wx2));
      seg3.setAttribute("y1", String(wy2));
      seg3.setAttribute("x2", String(tx));
      seg3.setAttribute("y2", String(ty));
      j1.setAttribute("cx", String(ex));
      j1.setAttribute("cy", String(ey));
      j2.setAttribute("cx", String(wx2));
      j2.setAttribute("cy", String(wy2));
      tip.setAttribute("cx", String(tx));
      tip.setAttribute("cy", String(ty));

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={hostRef} className="h-full w-full" data-interactive>
      <svg viewBox="0 0 800 520" className="h-full w-full" aria-hidden>
        <line x1="300" y1="470" x2="500" y2="470" stroke="var(--color-steel)" strokeWidth="2" />
        <rect x="378" y="446" width="44" height="24" rx="3" fill="var(--color-graphite)" stroke="var(--color-steel)" />
        <g ref={armRef} strokeLinecap="round">
          <line data-seg1 x1={BASE[0]} y1={BASE[1]} x2="400" y2="330" stroke="var(--color-steel)" strokeWidth="10" />
          <line data-seg2 x1="400" y1="330" x2="420" y2="240" stroke="var(--color-steel)" strokeWidth="7" />
          <line data-seg3 x1="420" y1="240" x2="440" y2="200" stroke="var(--color-mist)" strokeWidth="4" />
          <circle cx={BASE[0]} cy={BASE[1]} r="10" fill="var(--color-graphite)" stroke="var(--color-ember)" strokeWidth="2" />
          <circle data-j1 cx="400" cy="330" r="7" fill="var(--color-ember)" />
          <circle data-j2 cx="420" cy="240" r="5.5" fill="var(--color-ember)" />
          <circle data-tip cx="440" cy="200" r="4" fill="var(--color-ember-hot)">
            <animate attributeName="opacity" values="1;0.5;1" dur="1.6s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
    </div>
  );
}
