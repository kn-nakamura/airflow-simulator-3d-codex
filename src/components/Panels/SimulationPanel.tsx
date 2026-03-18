import { useSimulatorStore } from '../../store/simulatorStore';

export const SimulationPanel = () => {
  const { running, setRunning } = useSimulatorStore((s) => s);
  return (
    <section className="rounded border border-border bg-card p-3 text-xs">
      <h3 className="text-sm text-accent mb-2">シミュレーション</h3>
      <button className="w-full rounded bg-success text-bg px-2 py-1" onClick={() => setRunning(!running)}>
        {running ? '一時停止 (Space)' : '開始 (Space)'}
      </button>
    </section>
  );
};
