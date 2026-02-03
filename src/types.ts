export type ComponentType =
  | "arduino"
  | "breadboard"
  | "led"
  | "resistor"
  | "button"
  | "potentiometer"
  | "ldr"
  | "temperature"
  | "power";

export type CircuitComponent = {
  id: string;
  type: ComponentType;
  label: string;
  x: number;
  y: number;
  rotation: number;
  value?: string;
  pins: string[];
};

export type Wire = {
  id: string;
  from: { componentId: string; pin: string };
  to: { componentId: string; pin: string };
  color: string;
};

export type SimulationState = {
  running: boolean;
  pinStates: Record<string, "high" | "low">;
  logs: string[];
};
