import type { WindSettings } from '../types';

export class FluidSolver {
  size: number;
  velocityX: Float32Array;
  velocityZ: Float32Array;
  pressure: Float32Array;

  constructor(size = 128) {
    this.size = size;
    const count = size * size;
    this.velocityX = new Float32Array(count);
    this.velocityZ = new Float32Array(count);
    this.pressure = new Float32Array(count);
  }

  private idx(x: number, z: number): number {
    return z * this.size + x;
  }

  private windVector(wind: WindSettings): [number, number] {
    const a = (wind.azimuth * Math.PI) / 180;
    return [Math.cos(a) * wind.speed, Math.sin(a) * wind.speed];
  }

  step(dt: number, wind: WindSettings, solidMask?: Uint8Array): void {
    const [wx, wz] = this.windVector(wind);
    const n = this.size;

    for (let z = 0; z < n; z += 1) {
      for (let x = 0; x < n; x += 1) {
        const i = this.idx(x, z);
        const edge = x < 2 ? 1 : 0;
        const turbulence = (Math.random() - 0.5) * (wind.turbulence / 100) * wind.speed;
        this.velocityX[i] = this.velocityX[i] * 0.96 + (edge ? wx : 0) * 0.04 + turbulence * 0.03;
        this.velocityZ[i] = this.velocityZ[i] * 0.96 + (edge ? wz : 0) * 0.04 + turbulence * 0.03;
      }
    }

    // cheap Jacobi-like smoothing (approximation of diffusion/advection)
    const nextX = new Float32Array(this.velocityX);
    const nextZ = new Float32Array(this.velocityZ);
    for (let z = 1; z < n - 1; z += 1) {
      for (let x = 1; x < n - 1; x += 1) {
        const i = this.idx(x, z);
        const lapX =
          this.velocityX[this.idx(x - 1, z)] +
          this.velocityX[this.idx(x + 1, z)] +
          this.velocityX[this.idx(x, z - 1)] +
          this.velocityX[this.idx(x, z + 1)] -
          4 * this.velocityX[i];
        const lapZ =
          this.velocityZ[this.idx(x - 1, z)] +
          this.velocityZ[this.idx(x + 1, z)] +
          this.velocityZ[this.idx(x, z - 1)] +
          this.velocityZ[this.idx(x, z + 1)] -
          4 * this.velocityZ[i];
        nextX[i] += lapX * 0.08 * dt;
        nextZ[i] += lapZ * 0.08 * dt;
      }
    }

    this.velocityX = nextX;
    this.velocityZ = nextZ;

    for (let i = 0; i < this.pressure.length; i += 1) {
      this.pressure[i] = Math.hypot(this.velocityX[i], this.velocityZ[i]) * 0.5;
      if (solidMask?.[i]) {
        this.velocityX[i] = 0;
        this.velocityZ[i] = 0;
      }
    }
  }
}
