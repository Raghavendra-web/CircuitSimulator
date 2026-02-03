import { FiCpu, FiGrid, FiZap, FiRadio, FiSliders, FiPower } from "react-icons/fi";

export const componentCatalog = [
  {
    type: "arduino",
    label: "Arduino Uno",
    description: "Microcontroller board with digital + analog IO.",
    icon: <FiCpu />,
  },
  {
    type: "breadboard",
    label: "Breadboard",
    description: "Quick prototyping area with power rails.",
    icon: <FiGrid />,
  },
  {
    type: "led",
    label: "LED",
    description: "Light emitting diode indicator.",
    icon: <FiZap />,
  },
  {
    type: "resistor",
    label: "Resistor",
    description: "Default 220Ω with editable value.",
    icon: <FiRadio />,
  },
  {
    type: "button",
    label: "Push Button",
    description: "Momentary digital input.",
    icon: <FiRadio />,
  },
  {
    type: "potentiometer",
    label: "Potentiometer",
    description: "Analog dial input.",
    icon: <FiSliders />,
  },
  {
    type: "ldr",
    label: "Light Sensor",
    description: "Photoresistor for ambient light.",
    icon: <FiRadio />,
  },
  {
    type: "temperature",
    label: "Temp Sensor",
    description: "Analog temperature sensing.",
    icon: <FiRadio />,
  },
  {
    type: "power",
    label: "Power Rail",
    description: "5V and GND rails.",
    icon: <FiPower />,
  },
];
