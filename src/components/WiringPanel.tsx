import { FiCornerDownRight, FiLink2, FiSlash } from "react-icons/fi";
import { useCircuitStore } from "../state/useCircuitStore";

export const WiringPanel = () => {
  const wires = useCircuitStore((state) => state.wires);

  return (
    <div className="glass-panel rounded-2xl p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Wiring</p>
      <h3 className="text-sm font-semibold text-white">Connections</h3>
      <div className="mt-3 space-y-2">
        {wires.map((wire) => (
          <div
            key={wire.id}
            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-200"
          >
            <div className="flex items-center gap-2">
              <FiLink2 className="text-slate-400" />
              {wire.from.componentId}
            </div>
            <FiCornerDownRight className="text-slate-500" />
            <div className="flex items-center gap-2">
              {wire.to.componentId}
              <span className="h-2 w-2 rounded-full" style={{ background: wire.color }} />
            </div>
          </div>
        ))}
        {wires.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-700 px-3 py-4 text-center text-xs text-slate-400">
            <FiSlash className="mx-auto mb-2 text-lg" />
            No wires yet. Click pins to connect.
          </div>
        ) : null}
      </div>
      <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs text-slate-300">
        Auto-routing enabled · Right-angle wires · Connection validation active
      </div>
    </div>
  );
};
