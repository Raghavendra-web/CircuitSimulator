import { CircuitCanvas } from "./components/CircuitCanvas";
import { CodeEditorView } from "./components/CodeEditorView";
import { RightPanel } from "./components/RightPanel";
import { Sidebar } from "./components/Sidebar";
import { TopBar } from "./components/TopBar";
import { useCircuitStore } from "./state/useCircuitStore";

const App = () => {
  const viewMode = useCircuitStore((state) => state.viewMode);
  const theme = useCircuitStore((state) => state.theme);

  return (
    <div className={theme === "dark" ? "min-h-screen bg-slate-950 text-white" : "min-h-screen bg-slate-100 text-slate-900"}>
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col gap-6 px-6 py-6">
        <TopBar />
        <div className="grid flex-1 grid-cols-[320px_1fr_320px] gap-6">
          <Sidebar />
          <main className="flex flex-col gap-4">
            {viewMode === "circuit" ? (
              <>
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-sm text-slate-200">
                  <div>
                    <p className="font-semibold text-white">Circuit View</p>
                    <p className="text-xs text-slate-400">
                      Drag components, click pins to wire, scroll to zoom.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="rounded-full bg-slate-800 px-3 py-1">Snap-to-grid</span>
                    <span className="rounded-full bg-slate-800 px-3 py-1">Auto-route</span>
                  </div>
                </div>
                <CircuitCanvas />
              </>
            ) : (
              <CodeEditorView />
            )}
          </main>
          <RightPanel />
        </div>
      </div>
    </div>
  );
};

export default App;
