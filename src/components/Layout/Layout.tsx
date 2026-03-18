import { Sidebar } from './Sidebar';
import { InfoPanel } from './InfoPanel';
import { Viewport } from '../Viewport/Viewport';

export const Layout = (): JSX.Element => (
  <div className="flex h-full w-full bg-bg text-text font-mono">
    <Sidebar />
    <main className="flex-1 relative">
      <Viewport />
    </main>
    <InfoPanel />
  </div>
);
