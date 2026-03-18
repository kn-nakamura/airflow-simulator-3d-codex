import type { SceneObject } from '../types';

export const rasterizeObjects = (objects: SceneObject[], size: number, cellSize = 0.25): Uint8Array => {
  const mask = new Uint8Array(size * size);
  const half = (size * cellSize) / 2;

  objects.forEach((obj) => {
    const [ox, , oz] = obj.position;
    const [sx, , sz] = obj.scale;
    const minX = Math.max(0, Math.floor((ox - sx / 2 + half) / cellSize));
    const maxX = Math.min(size - 1, Math.ceil((ox + sx / 2 + half) / cellSize));
    const minZ = Math.max(0, Math.floor((oz - sz / 2 + half) / cellSize));
    const maxZ = Math.min(size - 1, Math.ceil((oz + sz / 2 + half) / cellSize));

    for (let z = minZ; z <= maxZ; z += 1) {
      for (let x = minX; x <= maxX; x += 1) {
        mask[z * size + x] = 1;
      }
    }
  });

  return mask;
};
