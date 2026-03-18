export type ShapeType = 'box' | 'sphere' | 'cylinder' | 'cone' | 'torus' | 'compound';

export interface SceneObject {
  id: string;
  name: string;
  type: ShapeType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  roughness: number;
  hidden?: boolean;
  locked?: boolean;
}

export interface WindSettings {
  speed: number;
  azimuth: number;
  elevation: number;
  turbulence: number;
  profile: 'uniform' | 'boundary';
}

export interface SolverFrame {
  size: number;
  velocityX: Float32Array;
  velocityZ: Float32Array;
  pressure: Float32Array;
}
