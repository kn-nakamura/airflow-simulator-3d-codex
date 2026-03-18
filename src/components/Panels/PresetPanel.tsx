import { useObjectStore } from '../../store/objectStore';

export const PresetPanel = (): JSX.Element => {
  const addObject = useObjectStore((s) => s.addObject);

  const loadBuilding = (): void => {
    addObject({
      id: crypto.randomUUID(),
      name: 'tower',
      type: 'box',
      position: [0, 3, 0],
      rotation: [0, 0, 0],
      scale: [2, 6, 2],
      roughness: 0.4,
    });
  };

  return (
    <section className="rounded border border-border bg-card p-3 text-xs">
      <h3 className="text-sm text-accent mb-2">プリセット</h3>
      <button className="w-full px-2 py-1 rounded bg-panel" onClick={loadBuilding}>
        ビル風
      </button>
    </section>
  );
};
