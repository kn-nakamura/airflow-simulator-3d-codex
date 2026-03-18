import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GridFloor } from './GridFloor';
import { SceneObjects } from './SceneObjects';
import { WindArrow } from './WindArrow';
import { useUiStore } from '../../store/uiStore';
import { VelocityHeatmap } from '../Visualizers/VelocityHeatmap';
import { PressureHeatmap } from '../Visualizers/PressureHeatmap';
import { ParticleStream } from '../Visualizers/ParticleStream';
import { FpsCounter } from './FpsCounter';

export const Viewport = (): JSX.Element => {
  const { showVelocity, showPressure, showParticles } = useUiStore((s) => s);

  return (
    <Canvas camera={{ position: [15, 12, 15], fov: 50 }}>
      <color attach="background" args={['#070b14']} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[8, 12, 4]} intensity={1.1} />
      <GridFloor />
      <SceneObjects />
      <WindArrow />
      {showVelocity ? <VelocityHeatmap /> : null}
      {showPressure ? <PressureHeatmap /> : null}
      {showParticles ? <ParticleStream /> : null}
      <OrbitControls makeDefault />
      <FpsCounter />
    </Canvas>
  );
};
