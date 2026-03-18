/// <reference lib="webworker" />
import { FluidSolver } from './FluidSolver';
import type { SceneObject, WindSettings } from '../types';
import { rasterizeObjects } from './ObjectSampler';

const solver = new FluidSolver(128);
let wind: WindSettings = { speed: 12, azimuth: 0, elevation: 0, turbulence: 5, profile: 'uniform' };
let objects: SceneObject[] = [];

self.onmessage = (event: MessageEvent) => {
  const data = event.data as
    | { type: 'config'; wind: WindSettings; objects: SceneObject[] }
    | { type: 'step'; dt: number };

  if (data.type === 'config') {
    wind = data.wind;
    objects = data.objects;
    return;
  }

  const solidMask = rasterizeObjects(objects, solver.size);
  solver.step(data.dt, wind, solidMask);

  self.postMessage({
    size: solver.size,
    velocityX: solver.velocityX,
    velocityZ: solver.velocityZ,
    pressure: solver.pressure,
  });
};

export {};
