import * as THREE from "three";

export interface Shard {
  geometry: THREE.BufferGeometry;
  centroid: THREE.Vector3;
  normal: THREE.Vector3;
  /** Deterministic pseudo-random 0..1 per shard, for scatter variation. */
  rand: number;
  scatterDir: THREE.Vector3;
  spinAxis: THREE.Vector3;
}

/**
 * Splits a geometry into per-face triangle shards, each centered on its
 * centroid. One system serves CORE-01's shell panels and the forge object.
 */
export function splitIntoShards(source: THREE.BufferGeometry): Shard[] {
  const geo = source.index ? source.toNonIndexed() : source;
  const pos = geo.getAttribute("position");
  const shards: Shard[] = [];

  for (let i = 0; i < pos.count; i += 3) {
    const a = new THREE.Vector3().fromBufferAttribute(pos, i);
    const b = new THREE.Vector3().fromBufferAttribute(pos, i + 1);
    const c = new THREE.Vector3().fromBufferAttribute(pos, i + 2);
    const centroid = a.clone().add(b).add(c).divideScalar(3);
    const normal = new THREE.Vector3()
      .crossVectors(b.clone().sub(a), c.clone().sub(a))
      .normalize();

    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        [
          a.x - centroid.x, a.y - centroid.y, a.z - centroid.z,
          b.x - centroid.x, b.y - centroid.y, b.z - centroid.z,
          c.x - centroid.x, c.y - centroid.y, c.z - centroid.z,
        ],
        3,
      ),
    );
    g.computeVertexNormals();

    const seed = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    const rand = seed - Math.floor(seed);
    shards.push({
      geometry: g,
      centroid,
      normal,
      rand,
      scatterDir: centroid
        .clone()
        .normalize()
        .add(
          new THREE.Vector3(rand - 0.5, ((rand * 7.13) % 1) - 0.5, ((rand * 3.7) % 1) - 0.5),
        )
        .normalize(),
      spinAxis: new THREE.Vector3(rand - 0.5, ((rand * 5.21) % 1) - 0.5, ((rand * 9.4) % 1) - 0.5).normalize(),
    });
  }
  return shards;
}
