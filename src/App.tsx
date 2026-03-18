import { useEffect } from 'react';
import { Layout } from './components/Layout/Layout';
import { useFluidSolver } from './hooks/useFluidSolver';
import { useObjectStore } from './store/objectStore';
import { useSimulatorStore } from './store/simulatorStore';

const App = (): JSX.Element => {
  const removeSelected = useObjectStore((s) => s.removeSelected);
  const running = useSimulatorStore((s) => s.running);
  const setRunning = useSimulatorStore((s) => s.setRunning);

  useFluidSolver();

  useEffect(() => {
    const handler = (event: KeyboardEvent): void => {
      if (event.key === 'Delete') removeSelected();
      if (event.code === 'Space') {
        event.preventDefault();
        setRunning(!running);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [removeSelected, running, setRunning]);

  return <Layout />;
};

export default App;
