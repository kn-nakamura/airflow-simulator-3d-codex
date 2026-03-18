import { useMemo } from 'react';
import { Vector3 } from 'three';
import { useSimulatorStore } from '../../store/simulatorStore';

export const WindArrow = () => {
  const wind = useSimulatorStore((s) => s.wind);
  const direction = useMemo(() => {
    const rad = (wind.azimuth * Math.PI) / 180;
    return new Vector3(Math.cos(rad), 0, Math.sin(rad)).normalize();
  }, [wind.azimuth]);

  return <arrowHelper args={[direction, new Vector3(-8, 1, -8), 4, 0x38bdf8]} />;
};
