import { create } from 'zustand';

interface UiState {
  showVelocity: boolean;
  showPressure: boolean;
  showParticles: boolean;
  setFlag: (key: 'showVelocity' | 'showPressure' | 'showParticles', value: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  showVelocity: true,
  showPressure: false,
  showParticles: true,
  setFlag: (key, value) => set({ [key]: value }),
}));
