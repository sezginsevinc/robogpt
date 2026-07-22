"use client";

import { useEffect, useRef } from "react";

interface Mote {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  r: number;
  warm: boolean;
}

/** Science — a reaction chamber. The pointer is the catalyst: touch, and it blooms. */
export function RoomScience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const motes: Mote[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const spawn = (x: number, y: number, n: number, burst: boolean) => {
      for (let i = 0; i < n && motes.length < 420; i++) {
        const a = Math.random() * Math.PI * 2;
        const speed = burst ? 1 + Math.random() * 2.4 : 0.2 + Math.random() * 0.5;
        motes.push({
          x,
          y,
          vx: Math.cos(a) * speed,
          vy: Math.sin(a) * speed - (burst ? 0 : 0.4),
          life: 0,
          max: 60 + Math.random() * 80,
          r: 1.5 + Math.random() * 3,
          warm: Math.random() < 0.6,
        });
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      spawn(e.clientX - r.left, e.clientY - r.top, 3, false);
    };
    const onDown = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      spawn(e.clientX - r.left, e.clientY - r.top, 40, true);
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      // Ambient: the chamber simmers even untouched.
      if (Math.random() < 0.3) spawn(Math.random() * w, h + 4, 1, false);

      ctx.globalCompositeOperation = "lighter";
      for (let i = motes.length - 1; i >= 0; i--) {
        const m = motes[i];
        m.life++;
        m.x += m.vx;
        m.y += m.vy;
        m.vy -= 0.005;
        m.vx *= 0.985;
        m.vy *= 0.985;
        const k = 1 - m.life / m.max;
        if (k <= 0) {
          motes.splice(i, 1);
          continue;
        }
        const alpha = 0.5 * k;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * (1 + (1 - k) * 1.6), 0, Math.PI * 2);
        ctx.fillStyle = m.warm
          ? `rgba(255,122,26,${alpha})`
          : `rgba(111,211,227,${alpha * 0.8})`;
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return <canvas ref={canvasRef} className="h-full w-full" data-interactive aria-hidden />;
}
