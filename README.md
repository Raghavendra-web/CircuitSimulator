# CircuitLab Studio

A production-ready, browser-based circuit design and simulation studio inspired by the core workflow of Tinkercad. The app provides a Konva-powered canvas for drag-and-drop circuit building, a component library, wiring overview, an Arduino code view powered by Monaco, and a lightweight simulation layer.

## Features

- Grid-based canvas with pan, zoom, and snap-to-grid.
- Component library with Arduino, breadboard, sensors, and basic parts.
- Click-to-wire modeling with right-angle routing and color-coded wires.
- Circuit ↔ Code sync with auto-generated Arduino C/C++ templates.
- Simulation controls with live signal summaries and serial output.
- Project management actions (save/load/duplicate/export).
- Modern UI with a Tinkercad-inspired layout, soft shadows, and rounded panels.

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Canvas:** Konva + React-Konva
- **State:** Zustand
- **Editor:** Monaco
- **Styling:** Tailwind CSS
- **Simulation:** Lightweight JavaScript engine

## Project Structure

```
src/
  components/       # UI building blocks
  data/             # Component catalog metadata
  simulation/       # Simulation engine
  state/            # Zustand store
  utils/            # Code generation helpers
  App.tsx           # App shell and layout
```

## Key Components

- **CircuitCanvas**: Konva stage for drag, zoom, and snapping components onto the grid.
- **ComponentLibrary**: Left sidebar library with categorized component cards.
- **InspectorPanel**: Inline editor for selected component values and rotation.
- **CodeEditorView**: Monaco-powered editor with auto-synced Arduino code.
- **SimulationPanel**: Displays simulation state, live signals, and serial logs.

## Simulation Logic

The simulation engine (`src/simulation/engine.ts`) tracks pin states for all components and supports toggling pin values while the simulation is running. The store triggers the engine when the user starts/stops the simulation and surfaces serial logs to the UI. This structure allows future expansion to full circuit solving, voltage propagation, and component-specific behaviors.

## Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in the browser.

## Notes

- The UI includes placeholders for export and project storage actions.
- Extend `componentCatalog` and `generateArduinoCode` to model deeper behaviors.
