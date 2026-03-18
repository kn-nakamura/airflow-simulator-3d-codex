import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useSimulatorStore } from '../../store/simulatorStore';

export const VelocityChart = (): JSX.Element => {
  const frame = useSimulatorStore((s) => s.solverFrame);
  const size = frame?.size ?? 0;
  const mid = Math.floor(size / 2);
  const data =
    frame && size
      ? Array.from({ length: size }, (_, x) => ({
          x,
          speed: Math.hypot(frame.velocityX[mid * size + x], frame.velocityZ[mid * size + x]),
        }))
      : [];

  return (
    <section className="rounded border border-border bg-card p-3">
      <h3 className="text-sm text-accent mb-2">速度プロファイル</h3>
      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="x" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip />
            <Line type="monotone" dataKey="speed" stroke="#38bdf8" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
