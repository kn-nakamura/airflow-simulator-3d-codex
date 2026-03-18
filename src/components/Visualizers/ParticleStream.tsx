import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { AdditiveBlending, DynamicDrawUsage, InstancedMesh, Matrix4, Object3D } from 'three';
import { useSimulatorStore } from '../../store/simulatorStore';

export const ParticleStream = ({ count = 1500 }: { count?: number }) => {
  const meshRef = useRef<InstancedMesh>(null);
  const frame = useSimulatorStore((s) => s.solverFrame);
  const points = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 30,
        z: (Math.random() - 0.5) * 30,
        y: Math.random() * 4 + 0.3,
      })),
    [count],
  );

  useFrame((_, dt) => {
    if (!meshRef.current || !frame) return;
    const temp = new Object3D();
    const n = frame.size;

    points.forEach((p, i) => {
      const gx = Math.max(0, Math.min(n - 1, Math.floor(((p.x + 16) / 32) * n)));
      const gz = Math.max(0, Math.min(n - 1, Math.floor(((p.z + 16) / 32) * n)));
      const idx = gz * n + gx;
      p.x += frame.velocityX[idx] * dt * 0.2;
      p.z += frame.velocityZ[idx] * dt * 0.2;
      if (Math.abs(p.x) > 16 || Math.abs(p.z) > 16) {
        p.x = -15;
        p.z = (Math.random() - 0.5) * 30;
      }
      temp.position.set(p.x, p.y, p.z);
      temp.scale.setScalar(0.07);
      temp.updateMatrix();
      meshRef.current?.setMatrixAt(i, temp.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#67e8f9" depthTest={false} transparent opacity={0.75} blending={AdditiveBlending} />
    </instancedMesh>
  );
};
