import { useMemo, useState } from "react";
import { Circle, Group, Line, Rect, Stage, Text } from "react-konva";
import { useCircuitStore } from "../state/useCircuitStore";
import { Wire } from "../types";

const GRID_SIZE = 24;

export const CircuitCanvas = () => {
  const components = useCircuitStore((state) => state.components);
  const wires = useCircuitStore((state) => state.wires);
  const selectedId = useCircuitStore((state) => state.selectedId);
  const updateComponent = useCircuitStore((state) => state.updateComponent);
  const selectComponent = useCircuitStore((state) => state.selectComponent);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const gridLines = useMemo(() => {
    const lines: number[] = [];
    for (let i = 0; i < 1600 / GRID_SIZE; i += 1) {
      lines.push(i * GRID_SIZE);
    }
    return lines;
  }, []);

  const handleWheel = (event: { evt: WheelEvent }) => {
    event.evt.preventDefault();
    const direction = event.evt.deltaY > 0 ? -1 : 1;
    const nextScale = Math.min(Math.max(scale + direction * 0.1, 0.6), 1.6);
    setScale(nextScale);
  };

  const snap = (value: number) => Math.round(value / GRID_SIZE) * GRID_SIZE;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60">
      <Stage
        width={1600}
        height={900}
        draggable
        onDragEnd={(event) => setPosition(event.target.position())}
        onWheel={handleWheel}
        scaleX={scale}
        scaleY={scale}
        x={position.x}
        y={position.y}
      >
        <Group>
          {gridLines.map((pos) => (
            <Line
              key={`v-${pos}`}
              points={[pos, 0, pos, 900]}
              stroke="#1f2937"
              strokeWidth={1}
            />
          ))}
          {gridLines.map((pos) => (
            <Line
              key={`h-${pos}`}
              points={[0, pos, 1600, pos]}
              stroke="#1f2937"
              strokeWidth={1}
            />
          ))}
        </Group>
        {wires.map((wire) => (
          <WirePath key={wire.id} wire={wire} components={components} />
        ))}
        {components.map((component) => (
          <Group
            key={component.id}
            x={component.x}
            y={component.y}
            rotation={component.rotation}
            draggable
            onDragEnd={(event) =>
              updateComponent(component.id, {
                x: snap(event.target.x()),
                y: snap(event.target.y()),
              })
            }
            onClick={() => selectComponent(component.id)}
            onTap={() => selectComponent(component.id)}
          >
            <Rect
              width={180}
              height={100}
              cornerRadius={18}
              fill={selectedId === component.id ? "#1e293b" : "#0f172a"}
              stroke={selectedId === component.id ? "#38bdf8" : "#334155"}
              strokeWidth={2}
              shadowBlur={selectedId === component.id ? 12 : 6}
              shadowColor="rgba(56, 189, 248, 0.4)"
            />
            <Text
              text={component.label}
              fontSize={16}
              fill="#e2e8f0"
              x={16}
              y={14}
            />
            <Text
              text={component.value ?? ""}
              fontSize={12}
              fill="#94a3b8"
              x={16}
              y={36}
            />
            {component.pins.slice(0, 4).map((pin, index) => (
              <Group key={pin} x={18 + index * 34} y={70}>
                <Circle radius={6} fill="#0ea5e9" />
                <Text text={pin} fontSize={9} fill="#e2e8f0" x={-10} y={10} />
              </Group>
            ))}
          </Group>
        ))}
      </Stage>
      <div className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-slate-900/80 px-4 py-2 text-xs text-slate-300">
        Zoom {Math.round(scale * 100)}% · Drag to pan
      </div>
    </div>
  );
};

const WirePath = ({
  wire,
  components,
}: {
  wire: Wire;
  components: { id: string; x: number; y: number }[];
}) => {
  const from = components.find((component) => component.id === wire.from.componentId);
  const to = components.find((component) => component.id === wire.to.componentId);

  if (!from || !to) {
    return null;
  }

  const startX = from.x + 40;
  const startY = from.y + 80;
  const endX = to.x + 140;
  const endY = to.y + 80;
  const midX = (startX + endX) / 2;

  return (
    <Line
      points={[startX, startY, midX, startY, midX, endY, endX, endY]}
      stroke={wire.color}
      strokeWidth={4}
      lineCap="round"
      lineJoin="round"
      shadowColor={wire.color}
      shadowBlur={8}
    />
  );
};
