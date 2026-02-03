import { InspectorPanel } from "./InspectorPanel";
import { ProjectPanel } from "./ProjectPanel";
import { SimulationPanel } from "./SimulationPanel";
import { WiringPanel } from "./WiringPanel";

export const RightPanel = () => {
  return (
    <aside className="flex h-full w-80 flex-col gap-4">
      <ProjectPanel />
      <InspectorPanel />
      <WiringPanel />
      <SimulationPanel />
    </aside>
  );
};
