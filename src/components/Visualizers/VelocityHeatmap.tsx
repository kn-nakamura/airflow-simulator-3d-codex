import { useMemo } from 'react';
import { DataTexture, FloatType, RGBAFormat } from 'three';
import { useSimulatorStore } from '../../store/simulatorStore';

export const VelocityHeatmap = (): JSX.Element => {
  const frame = useSimulatorStore((s) => s.solverFrame);
  const texture = useMemo(() => {
    if (!frame) return null;
    const data = new Float32Array(frame.size * frame.size * 4);
    for (let i = 0; i < frame.size * frame.size; i += 1) {
      const v = Math.hypot(frame.velocityX[i], frame.velocityZ[i]) / 20;
      data[i * 4 + 0] = v;
      data[i * 4 + 1] = 0.3;
      data[i * 4 + 2] = 1 - v;
      data[i * 4 + 3] = 0.45;
    }
    const tex = new DataTexture(data, frame.size, frame.size, RGBAFormat, FloatType);
    tex.needsUpdate = true;
    return tex;
  }, [frame]);

  if (!texture) return <></>;
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, 0]} renderOrder={999}>
      <planeGeometry args={[32, 32]} />
      <meshBasicMaterial map={texture} transparent depthTest={false} />
    </mesh>
  );
};
