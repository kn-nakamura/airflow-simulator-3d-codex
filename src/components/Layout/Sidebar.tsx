import { ObjectPanel } from '../Panels/ObjectPanel';
import { WindPanel } from '../Panels/WindPanel';
import { VisualizationPanel } from '../Panels/VisualizationPanel';
import { SimulationPanel } from '../Panels/SimulationPanel';
import { PresetPanel } from '../Panels/PresetPanel';

export const Sidebar = () => (
  <aside className="w-[280px] border-r border-border bg-panel p-3 overflow-y-auto space-y-3">
    <PresetPanel />
    <ObjectPanel />
    <WindPanel />
    <VisualizationPanel />
    <SimulationPanel />
  </aside>
);
