import { computeMetrics } from '../../simulator/Analytics';
import { useSimulatorStore } from '../../store/simulatorStore';
import { ExportPanel } from '../Panels/ExportPanel';
import { VelocityChart } from '../Charts/VelocityChart';

export const InfoPanel = (): JSX.Element => {
  const frame = useSimulatorStore((s) => s.solverFrame);
  const metrics = computeMetrics(frame);

  return (
    <aside className="w-[260px] border-l border-border bg-panel p-3 overflow-y-auto space-y-3">
      <div className="rounded border border-border bg-card p-3">
        <h3 className="text-sm text-accent mb-2">数値パネル</h3>
        <p className="text-xs">最大風速: {metrics.maxSpeed.toFixed(2)} m/s</p>
        <p className="text-xs">平均風速: {metrics.avgSpeed.toFixed(2)} m/s</p>
        <p className="text-xs">最大圧力差: {metrics.maxDeltaP.toFixed(2)} Pa</p>
      </div>
      <VelocityChart />
      <ExportPanel />
    </aside>
  );
};
