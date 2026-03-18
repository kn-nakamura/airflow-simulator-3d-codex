import type { WindSettings } from '../types';

export const normalizeWind = (wind: WindSettings): WindSettings => ({
  ...wind,
  speed: Math.max(0, Math.min(50, wind.speed)),
  azimuth: ((wind.azimuth % 360) + 360) % 360,
  elevation: Math.max(-90, Math.min(90, wind.elevation)),
  turbulence: Math.max(0, Math.min(30, wind.turbulence)),
});
