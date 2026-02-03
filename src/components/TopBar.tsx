import { FiMoon, FiPlay, FiSun, FiTerminal, FiUpload } from "react-icons/fi";
import { useCircuitStore } from "../state/useCircuitStore";

export const TopBar = () => {
  const viewMode = useCircuitStore((state) => state.viewMode);
  const setViewMode = useCircuitStore((state) => state.setViewMode);
  const toggleTheme = useCircuitStore((state) => state.toggleTheme);
  const theme = useCircuitStore((state) => state.theme);
  const toggleSimulation = useCircuitStore((state) => state.toggleSimulation);
  const simulationRunning = useCircuitStore((state) => state.simulation.running);

  return (
    <header className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 px-6 py-4 shadow-card">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">CircuitLab</p>
        <h1 className="text-2xl font-semibold text-white">Studio Workspace</h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setViewMode("circuit")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            viewMode === "circuit"
              ? "bg-sky-500/20 text-sky-200"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          Circuit View
        </button>
        <button
          type="button"
          onClick={() => setViewMode("code")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            viewMode === "code"
              ? "bg-sky-500/20 text-sky-200"
              : "bg-slate-800 text-slate-300"
          }`}
        >
          Code View
        </button>
        <button
          type="button"
          onClick={toggleSimulation}
          className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
            simulationRunning ? "bg-rose-500/20 text-rose-200" : "bg-emerald-500/20 text-emerald-200"
          }`}
        >
          <FiPlay />
          {simulationRunning ? "Stop" : "Run"} Simulation
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
        >
          <FiTerminal /> Serial Monitor
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
        >
          <FiUpload /> Export
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-full bg-slate-800 p-2 text-slate-300 transition hover:bg-slate-700"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </header>
  );
};
