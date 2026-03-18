import { useSimulatorStore } from '../../store/simulatorStore';

export const WindPanel = () => {
  const { wind, setWind } = useSimulatorStore((s) => s);

  return (
    <section className="rounded border border-border bg-card p-3 space-y-2">
      <h3 className="text-sm text-accent">風設定</h3>
      {[
        ['speed', '風速', 0, 50],
        ['azimuth', '方位角', 0, 360],
        ['elevation', '仰角', -90, 90],
        ['turbulence', '乱流%', 0, 30],
      ].map(([key, label, min, max]) => (
        <label key={key} className="block text-xs">
          {label}: {(wind as any)[key].toFixed(1)}
          <input
            className="w-full"
            type="range"
            min={min}
            max={max}
            step="0.1"
            value={(wind as any)[key]}
            onChange={(event) => setWind({ [key]: Number(event.target.value) } as any)}
          />
        </label>
      ))}
    </section>
  );
};
