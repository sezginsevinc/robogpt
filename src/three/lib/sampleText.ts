/**
 * Samples a text string into 2D point positions for the particle field —
 * Chapter 6's "numbers emerge from constellations".
 */
export function sampleTextPositions(
  text: string,
  count: number,
  worldWidth = 7,
): Float32Array {
  const out = new Float32Array(count * 3);
  if (typeof document === "undefined") return out;

  const W = 640;
  const H = 220;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.font = `600 170px ${getComputedStyle(document.body).getPropertyValue("--font-clash") || "sans-serif"}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, W / 2, H / 2);

  const data = ctx.getImageData(0, 0, W, H).data;
  const hits: number[] = [];
  for (let y = 0; y < H; y += 2) {
    for (let x = 0; x < W; x += 2) {
      if (data[(y * W + x) * 4 + 3] > 128) hits.push(x, y);
    }
  }
  if (hits.length === 0) return out;

  const scale = worldWidth / W;
  for (let i = 0; i < count; i++) {
    const pick = (Math.floor(Math.random() * (hits.length / 2)) * 2) % hits.length;
    out[i * 3] = (hits[pick] - W / 2) * scale + (Math.random() - 0.5) * 0.04;
    out[i * 3 + 1] = -(hits[pick + 1] - H / 2) * scale + (Math.random() - 0.5) * 0.04;
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.15;
  }
  return out;
}
