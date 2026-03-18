import { useUiStore } from '../../store/uiStore';

export const VisualizationPanel = () => {
  const { showVelocity, showPressure, showParticles, setFlag } = useUiStore((s) => s);
  const visualizationFlags: Array<{
    key: 'showVelocity' | 'showPressure' | 'showParticles';
    label: string;
    checked: boolean;
  }> = [
    { key: 'showVelocity', label: '速度ヒートマップ', checked: showVelocity },
    { key: 'showPressure', label: '圧力ヒートマップ', checked: showPressure },
    { key: 'showParticles', label: 'パーティクル', checked: showParticles },
  ];

  return (
    <section className="rounded border border-border bg-card p-3 space-y-1 text-xs">
      <h3 className="text-sm text-accent">可視化</h3>
      {visualizationFlags.map(({ key, label, checked }) => (
        <label key={key} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checked}
            onChange={(event) => setFlag(key, event.target.checked)}
          />
          {label}
        </label>
      ))}
    </section>
  );
};
