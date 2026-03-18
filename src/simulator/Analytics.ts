import type { SolverFrame } from '../types';

export interface Metrics {
  maxSpeed: number;
  avgSpeed: number;
  maxDeltaP: number;
}

export const computeMetrics = (frame: SolverFrame | null): Metrics => {
  if (!frame) return { maxSpeed: 0, avgSpeed: 0, maxDeltaP: 0 };
  const n = frame.velocityX.length;
  let maxSpeed = 0;
  let sumSpeed = 0;
  let minP = Number.POSITIVE_INFINITY;
  let maxP = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < n; i += 1) {
    const speed = Math.hypot(frame.velocityX[i], frame.velocityZ[i]);
    maxSpeed = Math.max(maxSpeed, speed);
    sumSpeed += speed;
    minP = Math.min(minP, frame.pressure[i]);
    maxP = Math.max(maxP, frame.pressure[i]);
  }

  return { maxSpeed, avgSpeed: sumSpeed / n, maxDeltaP: maxP - minP };
};
