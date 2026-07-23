import * as THREE from "three";

/**
 * ParticleField — one GPU system, four narrative states.
 * uWeights morphs every point between three homes:
 *   x: free cloud (curiosity)  y: circuit lattice (discovery)  z: text glyphs (proof)
 * uWake is accumulated brightness; the pointer wakes nearby embers.
 */

const vertexShader = /* glsl */ `
attribute vec3 aCloud;
attribute vec3 aLattice;
attribute vec3 aText;
attribute float aSeed;
uniform float uTime;
uniform vec3 uWeights;
uniform float uWake;
uniform vec3 uPointer;
uniform float uSize;
varying float vAlpha;
varying float vTint;
void main() {
  vec3 w = uWeights / max(uWeights.x + uWeights.y + uWeights.z, 0.001);
  vec3 pos = aCloud * w.x + aLattice * w.y + aText * w.z;
  float drift = 0.15 + w.x;
  pos.x += sin(uTime * 0.28 + aSeed * 17.0) * 0.22 * drift;
  pos.y += cos(uTime * 0.21 + aSeed * 29.0) * 0.18 * drift;

  float twinkle = 0.5 + 0.5 * sin(uTime * (0.8 + aSeed * 2.2) + aSeed * 40.0);
  float near = smoothstep(2.4, 0.0, distance(pos.xy, uPointer.xy));
  vAlpha = 0.05 + uWake * (0.2 + 0.7 * twinkle) + near * 0.75;
  vTint = fract(aSeed * 7.31);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = uSize * (0.7 + 0.7 * twinkle + near * 1.2) * (140.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`;

const fragmentShader = /* glsl */ `
uniform vec3 uEmber;
uniform vec3 uGold;
uniform vec3 uLime;
uniform vec3 uIon;
uniform vec3 uViolet;
uniform vec3 uPink;
uniform float uWarmth; // 1 = ember-dominant (proof/number), 0 = full playful spectrum
uniform float uOpacity;
varying float vAlpha;
varying float vTint;

// The spark spectrum: ember stays dominant, colourful sparks sprinkled through.
vec3 spark(float t) {
  if (t < 0.44) return uEmber;
  if (t < 0.60) return uGold;
  if (t < 0.74) return uLime;
  if (t < 0.86) return uIon;
  if (t < 0.94) return uViolet;
  return uPink;
}

void main() {
  float m = smoothstep(0.5, 0.06, length(gl_PointCoord - 0.5));
  vec3 col = mix(spark(vTint), uEmber, uWarmth * step(0.44, vTint) * 0.8);
  gl_FragColor = vec4(col, m * vAlpha * uOpacity);
}
`;

export function createParticlesMaterial() {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uWeights: { value: new THREE.Vector3(1, 0, 0) },
      uWake: { value: 0 },
      uPointer: { value: new THREE.Vector3(999, 999, 0) },
      uSize: { value: 0.16 },
      uOpacity: { value: 0 },
      uWarmth: { value: 0 },
      uEmber: { value: new THREE.Color("#2e86d6") },
      uGold: { value: new THREE.Color("#ffc24b") },
      uLime: { value: new THREE.Color("#5fe0a0") },
      uIon: { value: new THREE.Color("#6fd3e3") },
      uViolet: { value: new THREE.Color("#a98cff") },
      uPink: { value: new THREE.Color("#ff7ab6") },
    },
  });
}

/** Builds the particle geometry with its three morph homes. */
export function createParticleGeometry(count: number) {
  const geometry = new THREE.BufferGeometry();
  const cloud = new Float32Array(count * 3);
  const lattice = new Float32Array(count * 3);
  const seeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 13;
    const y = (Math.random() - 0.5) * 7;
    const z = (Math.random() - 0.5) * 3.5;
    cloud[i * 3] = x;
    cloud[i * 3 + 1] = y;
    cloud[i * 3 + 2] = z;

    // Circuit lattice: snap most points to a 0.55 grid; some become "traces"
    // that keep one free axis, reading as routed circuit lines.
    const grid = 0.55;
    const trace = Math.random();
    const sx = Math.round(x / grid) * grid;
    const sy = Math.round(y / grid) * grid;
    lattice[i * 3] = trace < 0.35 ? x : sx + (Math.random() - 0.5) * 0.03;
    lattice[i * 3 + 1] = trace >= 0.35 && trace < 0.7 ? y : sy + (Math.random() - 0.5) * 0.03;
    lattice[i * 3 + 2] = 0;

    seeds[i] = Math.random();
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(cloud.slice(), 3));
  geometry.setAttribute("aCloud", new THREE.BufferAttribute(cloud, 3));
  geometry.setAttribute("aLattice", new THREE.BufferAttribute(lattice, 3));
  geometry.setAttribute("aText", new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 12);
  return geometry;
}
