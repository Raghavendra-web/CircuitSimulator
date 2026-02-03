import { useCircuitStore } from "../state/useCircuitStore";

export const InspectorPanel = () => {
  const components = useCircuitStore((state) => state.components);
  const selectedId = useCircuitStore((state) => state.selectedId);
  const updateComponent = useCircuitStore((state) => state.updateComponent);
  const deleteComponent = useCircuitStore((state) => state.deleteComponent);

  const selected = components.find((component) => component.id === selectedId);

  if (!selected) {
    return (
      <div className="glass-panel rounded-2xl p-4">
        <h3 className="text-sm font-semibold text-white">Inspector</h3>
        <p className="mt-2 text-sm text-slate-400">
          Select a component on the canvas to edit its properties.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-4">
      <h3 className="text-sm font-semibold text-white">Inspector</h3>
      <div className="mt-4 space-y-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Component</p>
          <p className="text-base font-semibold text-white">{selected.label}</p>
        </div>
        {selected.value ? (
          <label className="block text-sm text-slate-300">
            Value
            <input
              type="text"
              value={selected.value}
              onChange={(event) => updateComponent(selected.id, { value: event.target.value })}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white"
            />
          </label>
        ) : null}
        <label className="block text-sm text-slate-300">
          Rotation
          <input
            type="range"
            min="0"
            max="360"
            value={selected.rotation}
            onChange={(event) =>
              updateComponent(selected.id, { rotation: Number(event.target.value) })
            }
            className="mt-2 w-full accent-sky-400"
          />
        </label>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Pins</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {selected.pins.map((pin) => (
              <span
                key={pin}
                className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-200"
              >
                {pin}
              </span>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => deleteComponent(selected.id)}
          className="w-full rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm font-semibold text-rose-200"
        >
          Delete Component
        </button>
      </div>
    </div>
  );
};
