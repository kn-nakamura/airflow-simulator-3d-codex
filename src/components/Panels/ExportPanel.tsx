import { useObjectStore } from '../../store/objectStore';
import { useSimulatorStore } from '../../store/simulatorStore';

export const ExportPanel = () => {
  const objects = useObjectStore((s) => s.objects);
  const wind = useSimulatorStore((s) => s.wind);

  const download = (filename: string, data: string): void => {
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="rounded border border-border bg-card p-3 text-xs">
      <h3 className="text-sm text-accent mb-2">エクスポート</h3>
      <button
        className="w-full px-2 py-1 rounded bg-panel"
        onClick={() => download('scene.json', JSON.stringify({ objects, wind }, null, 2))}
      >
        シーン保存(JSON)
      </button>
    </section>
  );
};
