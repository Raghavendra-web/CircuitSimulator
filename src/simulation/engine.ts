import { CircuitComponent, Wire } from "../types";

type SimulationInput = {
  components: CircuitComponent[];
  wires: Wire[];
};

export const createSimulation = () => {
  let running = false;
  let pinStates: Record<string, "high" | "low"> = {};

  const start = ({ components }: SimulationInput) => {
    running = true;
    pinStates = {};
    components.forEach((component) => {
      component.pins.forEach((pin) => {
        pinStates[`${component.id}:${pin}`] = "low";
      });
    });
  };

  const stop = () => {
    running = false;
  };

  const togglePin = (key: string) => {
    if (!running) {
      return;
    }
    pinStates[key] = pinStates[key] === "high" ? "low" : "high";
  };

  const getPinStates = () => pinStates;

  return {
    start,
    stop,
    togglePin,
    getPinStates,
    get running() {
      return running;
    },
  };
};
