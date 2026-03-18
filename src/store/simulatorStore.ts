import { create } from 'zustand';
import type { SolverFrame, WindSettings } from '../types';

interface SimulatorState {
  running: boolean;
  wind: WindSettings;
  solverFrame: SolverFrame | null;
  setRunning: (running: boolean) => void;
  setWind: (wind: Partial<WindSettings>) => void;
  setSolverFrame: (frame: SolverFrame) => void;
}

export const useSimulatorStore = create<SimulatorState>((set) => ({
  running: true,
  wind: { speed: 12, azimuth: 0, elevation: 0, turbulence: 5, profile: 'uniform' },
  solverFrame: null,
  setRunning: (running) => set({ running }),
  setWind: (wind) => set((s) => ({ wind: { ...s.wind, ...wind } })),
  setSolverFrame: (solverFrame) => set({ solverFrame }),
}));
