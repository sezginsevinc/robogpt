import * as THREE from "three";

/** Radial glow texture: tight saturated core + wide soft halo, per the design system. */
export function createGlowTexture(size = 128): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const half = size / 2;

  const wide = ctx.createRadialGradient(half, half, 0, half, half, half);
  wide.addColorStop(0, "rgba(255,122,26,0.55)");
  wide.addColorStop(0.35, "rgba(255,122,26,0.12)");
  wide.addColorStop(1, "rgba(255,122,26,0)");
  ctx.fillStyle = wide;
  ctx.fillRect(0, 0, size, size);

  const core = ctx.createRadialGradient(half, half, 0, half, half, half * 0.28);
  core.addColorStop(0, "rgba(255,181,102,0.95)");
  core.addColorStop(1, "rgba(255,181,102,0)");
  ctx.fillStyle = core;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
