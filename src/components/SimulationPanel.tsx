import { FiActivity, FiCpu } from "react-icons/fi";
import { useCircuitStore } from "../state/useCircuitStore";

export const SimulationPanel = () => {
  const simulation = useCircuitStore((state) => state.simulation);
  const components = useCircuitStore((state) => state.components);

  return (
    <div className="glass-panel rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Simulation</p>
          <h3 className="text-sm font-semibold text-white">Live Signals</h3>
        </div>
        <span
          className={`rounded-full px-2 py-1 text-xs ${
            simulation.running ? "bg-emerald-500/20 text-emerald-200" : "bg-slate-700 text-slate-300"
          }`}
        >
          {simulation.running ? "Running" : "Idle"}
        </span>
      </div>
      <div className="mt-3 space-y-2">
        {components.slice(0, 4).map((component) => (
          <div
            key={component.id}
            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2"
          >
            <div className="flex items-center gap-2 text-sm text-slate-200">
              <FiCpu className="text-slate-400" />
              {component.label}
            </div>
            <FiActivity className="text-emerald-400" />
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Serial Output</p>
        <div className="mt-2 max-h-32 space-y-2 overflow-y-auto rounded-lg border border-slate-800 bg-slate-950/70 p-3 text-xs text-slate-300 scrollbar-thin">
          {simulation.logs.map((log, index) => (
            <p key={`${log}-${index}`}>{log}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
