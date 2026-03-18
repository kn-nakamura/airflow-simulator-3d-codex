import { useUiStore } from '../../store/uiStore';

export const VisualizationPanel = (): JSX.Element => {
  const { showVelocity, showPressure, showParticles, setFlag } = useUiStore((s) => s);

  return (
    <section className="rounded border border-border bg-card p-3 space-y-1 text-xs">
      <h3 className="text-sm text-accent">可視化</h3>
      {[
        ['showVelocity', '速度ヒートマップ', showVelocity],
        ['showPressure', '圧力ヒートマップ', showPressure],
        ['showParticles', 'パーティクル', showParticles],
      ].map(([key, label, checked]) => (
        <label key={key} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checked as boolean}
            onChange={(event) => setFlag(key as any, event.target.checked)}
          />
          {label}
        </label>
      ))}
    </section>
  );
};
