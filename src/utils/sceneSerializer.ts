import type { SceneObject, WindSettings } from '../types';

export const serializeScene = (objects: SceneObject[], wind: WindSettings): string =>
  JSON.stringify({ objects, wind }, null, 2);
