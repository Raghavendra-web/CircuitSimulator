import { ComponentLibrary } from "./ComponentLibrary";

export const Sidebar = () => {
  return (
    <aside className="glass-panel flex h-full w-80 flex-col rounded-3xl p-5">
      <ComponentLibrary />
    </aside>
  );
};
