import { PatternColors } from "./types";

export const lightColors: PatternColors = [
  "hsla(0,0%,100%,1)",
  "hsla(258.5,59.4%,59.4%,1)",
  "hsla(339.6,82.2%,51.6%,1)",
  "hsla(198.7,97.6%,48.4%,1)",
  "hsla(47,80.9%,61%,1)",
];
export const darkColors: PatternColors = [
  "hsla(240,6.7%,17.6%,1)",
  "hsla(47,80.9%,61%,1)",
  "hsla(4.1,89.6%,58.4%,1)",
  "hsla(186.8,100%,41.6%,1)",
  "hsla(258.5,59.4%,59.4%,1)",
];

export const joinModes = ["square", "rounded"] as const;
