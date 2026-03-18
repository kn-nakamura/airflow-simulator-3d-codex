import { TransformControls } from '@react-three/drei';
import { useMemo, useState } from 'react';
import type { Mesh } from 'three';
import { useObjectStore } from '../../store/objectStore';

const objectGeometry = (type: string) => {
  switch (type) {
    case 'sphere':
      return <sphereGeometry args={[0.75, 24, 24]} />;
    case 'cylinder':
      return <cylinderGeometry args={[0.6, 0.6, 1.6, 24]} />;
    case 'cone':
      return <coneGeometry args={[0.7, 1.7, 24]} />;
    case 'torus':
      return <torusGeometry args={[0.7, 0.25, 16, 32]} />;
    default:
      return <boxGeometry args={[1.4, 1.4, 1.4]} />;
  }
};

export const SceneObjects = () => {
  const { objects, selectedIds, select, updateObject } = useObjectStore((s) => s);
  const selected = useMemo(() => objects.find((o) => o.id === selectedIds[0]), [objects, selectedIds]);
  const [mode, setMode] = useState<'translate' | 'rotate' | 'scale'>('translate');

  return (
    <>
      {objects.map((obj) => (
        <mesh
          key={obj.id}
          position={obj.position}
          rotation={obj.rotation}
          scale={obj.scale}
          onClick={(event) => {
            event.stopPropagation();
            select(obj.id, event.shiftKey);
          }}
        >
          {objectGeometry(obj.type)}
          <meshStandardMaterial color={selectedIds.includes(obj.id) ? '#38bdf8' : '#94a3b8'} />
        </mesh>
      ))}
      {selected ? (
        <TransformControls
          mode={mode}
          position={selected.position}
          onObjectChange={(event) => {
            const mesh = (event as { target?: { object?: Mesh } } | undefined)?.target?.object;
            if (!mesh) return;
            updateObject(selected.id, {
              position: [mesh.position.x, mesh.position.y, mesh.position.z],
              rotation: [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z],
              scale: [mesh.scale.x, mesh.scale.y, mesh.scale.z],
            });
          }}
        />
      ) : null}
      <primitive
        object={
          new (class {
            constructor() {
              window.addEventListener('keydown', (event) => {
                if (event.key.toLowerCase() === 'w') setMode('translate');
                if (event.key.toLowerCase() === 'e') setMode('rotate');
                if (event.key.toLowerCase() === 'r') setMode('scale');
              });
            }
          })()
        }
      />
    </>
  );
};
