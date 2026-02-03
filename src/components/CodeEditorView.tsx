import Editor from "@monaco-editor/react";
import { useCircuitStore } from "../state/useCircuitStore";

export const CodeEditorView = () => {
  const code = useCircuitStore((state) => state.code);
  const setCode = useCircuitStore((state) => state.setCode);

  return (
    <div className="h-full rounded-2xl border border-slate-800 bg-slate-950/80 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Code</p>
          <h2 className="text-lg font-semibold text-white">Arduino C/C++</h2>
        </div>
        <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-200">
          Auto-sync enabled
        </span>
      </div>
      <Editor
        height="75vh"
        defaultLanguage="cpp"
        value={code}
        onChange={(value) => setCode(value ?? "")}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          scrollBeyondLastLine: false,
          wordWrap: "on",
        }}
      />
    </div>
  );
};
