import { useEffect, useRef } from 'react';
import { useObjectStore } from '../store/objectStore';
import { useSimulatorStore } from '../store/simulatorStore';

export const useFluidSolver = (): void => {
  const workerRef = useRef<Worker | null>(null);
  const objects = useObjectStore((s) => s.objects);
  const { wind, running, setSolverFrame } = useSimulatorStore((s) => s);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../simulator/FluidWorker.ts', import.meta.url), {
      type: 'module',
    });

    workerRef.current.onmessage = (event: MessageEvent) => {
      setSolverFrame(event.data);
    };

    return () => workerRef.current?.terminate();
  }, [setSolverFrame]);

  useEffect(() => {
    workerRef.current?.postMessage({ type: 'config', wind, objects });
  }, [wind, objects]);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (time: number): void => {
      const dt = Math.min((time - last) / 1000, 0.033);
      last = time;
      if (running) workerRef.current?.postMessage({ type: 'step', dt });
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);
};
