import { create } from "zustand";
import { CircuitComponent, ComponentType, SimulationState, Wire } from "../types";
import { generateArduinoCode } from "../utils/codegen";
import { createSimulation } from "../simulation/engine";

const initialComponents: CircuitComponent[] = [
  {
    id: "arduino-1",
    type: "arduino",
    label: "Arduino Uno",
    x: 420,
    y: 260,
    rotation: 0,
    pins: ["D2", "D3", "D4", "D5", "D6", "D7", "GND", "5V"],
  },
  {
    id: "breadboard-1",
    type: "breadboard",
    label: "Breadboard",
    x: 220,
    y: 260,
    rotation: 0,
    pins: ["A1", "A5", "B1", "B5", "Power", "GND"],
  },
];

type ViewMode = "circuit" | "code";

type CircuitState = {
  components: CircuitComponent[];
  wires: Wire[];
  selectedId: string | null;
  viewMode: ViewMode;
  theme: "dark" | "light";
  simulation: SimulationState;
  code: string;
  addComponent: (type: ComponentType) => void;
  updateComponent: (id: string, updates: Partial<CircuitComponent>) => void;
  deleteComponent: (id: string) => void;
  selectComponent: (id: string | null) => void;
  addWire: (wire: Wire) => void;
  setViewMode: (mode: ViewMode) => void;
  toggleTheme: () => void;
  refreshCode: () => void;
  setCode: (code: string) => void;
  toggleSimulation: () => void;
  appendLog: (message: string) => void;
};

const simulationEngine = createSimulation();

export const useCircuitStore = create<CircuitState>((set, get) => ({
  components: initialComponents,
  wires: [
    {
      id: "wire-1",
      from: { componentId: "arduino-1", pin: "D3" },
      to: { componentId: "breadboard-1", pin: "A1" },
      color: "#38bdf8",
    },
  ],
  selectedId: null,
  viewMode: "circuit",
  theme: "dark",
  simulation: {
    running: false,
    pinStates: {},
    logs: ["Simulation idle. Add components to get started."],
  },
  code: generateArduinoCode(initialComponents, []),
  addComponent: (type) => {
    const id = `${type}-${Date.now()}`;
    const meta = getComponentMeta(type);
    const component: CircuitComponent = {
      id,
      type,
      label: meta.label,
      x: 280,
      y: 180,
      rotation: 0,
      value: meta.value,
      pins: meta.pins,
    };
    set((state) => {
      const components = [...state.components, component];
      return {
        components,
        code: generateArduinoCode(components, state.wires),
      };
    });
  },
  updateComponent: (id, updates) => {
    set((state) => {
      const components = state.components.map((component) =>
        component.id === id ? { ...component, ...updates } : component,
      );
      return {
        components,
        code: generateArduinoCode(components, state.wires),
      };
    });
  },
  deleteComponent: (id) => {
    set((state) => {
      const components = state.components.filter((component) => component.id !== id);
      const wires = state.wires.filter(
        (wire) => wire.from.componentId !== id && wire.to.componentId !== id,
      );
      return {
        components,
        wires,
        selectedId: null,
        code: generateArduinoCode(components, wires),
      };
    });
  },
  selectComponent: (id) => set({ selectedId: id }),
  addWire: (wire) =>
    set((state) => ({
      wires: [...state.wires, wire],
      code: generateArduinoCode(state.components, [...state.wires, wire]),
    })),
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "dark" ? "light" : "dark",
    })),
  refreshCode: () =>
    set((state) => ({
      code: generateArduinoCode(state.components, state.wires),
    })),
  setCode: (code) => set({ code }),
  toggleSimulation: () => {
    const { simulation, components, wires } = get();
    if (simulation.running) {
      simulationEngine.stop();
      set({
        simulation: {
          ...simulation,
          running: false,
          logs: [...simulation.logs, "Simulation stopped."],
        },
      });
      return;
    }
    simulationEngine.start({ components, wires });
    set({
      simulation: {
        running: true,
        pinStates: simulationEngine.getPinStates(),
        logs: [...simulation.logs, "Simulation running."],
      },
    });
  },
  appendLog: (message) =>
    set((state) => ({
      simulation: {
        ...state.simulation,
        logs: [...state.simulation.logs, message],
      },
    })),
}));

const getComponentMeta = (
  type: ComponentType,
): { label: string; value?: string; pins: string[] } => {
  switch (type) {
    case "arduino":
      return {
        label: "Arduino Uno",
        pins: ["D2", "D3", "D4", "D5", "D6", "D7", "GND", "5V"],
      };
    case "breadboard":
      return {
        label: "Breadboard",
        pins: ["A1", "A5", "B1", "B5", "Power", "GND"],
      };
    case "led":
      return {
        label: "LED",
        pins: ["Anode", "Cathode"],
      };
    case "resistor":
      return {
        label: "Resistor",
        value: "220Ω",
        pins: ["A", "B"],
      };
    case "button":
      return {
        label: "Push Button",
        pins: ["Pin 1", "Pin 2", "Pin 3", "Pin 4"],
      };
    case "potentiometer":
      return {
        label: "Potentiometer",
        pins: ["VCC", "SIG", "GND"],
      };
    case "ldr":
      return {
        label: "LDR Sensor",
        pins: ["SIG", "GND", "VCC"],
      };
    case "temperature":
      return {
        label: "Temp Sensor",
        pins: ["DATA", "GND", "VCC"],
      };
    case "power":
      return {
        label: "Power Rail",
        pins: ["5V", "GND"],
      };
    default:
      return { label: "Component", pins: [] };
  }
};
