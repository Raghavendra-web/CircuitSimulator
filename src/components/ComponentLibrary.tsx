import { ComponentType } from "../types";
import { useCircuitStore } from "../state/useCircuitStore";
import { componentCatalog } from "../data/componentCatalog";

const iconStyles = "text-slate-200 text-lg";

export const ComponentLibrary = () => {
  const addComponent = useCircuitStore((state) => state.addComponent);

  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Library</p>
        <h2 className="mt-1 text-lg font-semibold text-white">Components</h2>
      </div>
      <div className="space-y-2 overflow-y-auto pr-2 scrollbar-thin">
        {componentCatalog.map((item) => (
          <button
            key={item.type}
            type="button"
            onClick={() => addComponent(item.type as ComponentType)}
            className="flex w-full items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-left transition hover:border-slate-600 hover:bg-slate-800/80"
          >
            <div>
              <p className="text-sm font-semibold text-white">{item.label}</p>
              <p className="text-xs text-slate-400">{item.description}</p>
            </div>
            <span className={iconStyles}>{item.icon}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
