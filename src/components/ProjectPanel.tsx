import { FiCopy, FiDownload, FiFolder, FiSave } from "react-icons/fi";

export const ProjectPanel = () => {
  return (
    <div className="glass-panel rounded-2xl p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Project</p>
      <h3 className="text-sm font-semibold text-white">My Prototype</h3>
      <div className="mt-4 space-y-2">
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-200"
        >
          <FiSave /> Save Project
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-200"
        >
          <FiFolder /> Load Project
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-200"
        >
          <FiCopy /> Duplicate
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-sm text-slate-200"
        >
          <FiDownload /> Export Code
        </button>
      </div>
      <p className="mt-4 text-xs text-slate-400">
        Projects are stored locally in your browser until connected to a backend.
      </p>
    </div>
  );
};
