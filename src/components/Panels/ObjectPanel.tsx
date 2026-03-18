import { useObjectStore } from '../../store/objectStore';
import type { ShapeType } from '../../types';

const shapeList: ShapeType[] = ['box', 'sphere', 'cylinder', 'cone', 'torus'];

export const ObjectPanel = () => {
  const { objects, selectedIds, addObject, select, removeSelected } = useObjectStore((s) => s);

  const add = (type: ShapeType): void => {
    const id = crypto.randomUUID();
    addObject({
      id,
      name: `${type}-${objects.length + 1}`,
      type,
      position: [0, 0.75, 0],
      rotation: [0, 0, 0],
      scale: [1.5, 1.5, 1.5],
      roughness: 0.5,
    });
  };

  return (
    <section className="rounded border border-border bg-card p-3">
      <h3 className="text-sm text-accent mb-2">物体管理</h3>
      <div className="flex flex-wrap gap-1 mb-2">
        {shapeList.map((shape) => (
          <button key={shape} className="px-2 py-1 text-xs rounded bg-panel" onClick={() => add(shape)}>
            + {shape}
          </button>
        ))}
      </div>
      <ul className="space-y-1">
        {objects.map((obj) => (
          <li key={obj.id}>
            <button
              className={`w-full text-left px-2 py-1 text-xs rounded ${
                selectedIds.includes(obj.id) ? 'bg-accent text-bg' : 'bg-panel'
              }`}
              onClick={() => select(obj.id)}
            >
              {obj.name}
            </button>
          </li>
        ))}
      </ul>
      <button className="mt-2 w-full px-2 py-1 text-xs rounded bg-warning text-bg" onClick={removeSelected}>
        選択削除 (Del)
      </button>
    </section>
  );
};
