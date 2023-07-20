export type PatternMode = "stroke-join" | "stroke" | "fill";
export type JoinMode = "square" | "rounded";
export type PatternColors = [string, string, string, string, string];

export interface Pattern {
  title: string;
  slug: string;
  mode: PatternMode;
  colors: number;
  maxStroke: number;
  maxScale: number;
  maxSpacing: [number, number];
  width: number;
  height: number;
  vHeight: number;
  tags: string[];
  path: string;
  creationDate: string;
}

export interface PatternConfig {
  colors: PatternColors;
  colorCounts: IntRange<1, 6>;
  stroke: number;
  scale: number;
  spacing: [number, number];
  angle: number;
  join: JoinMode;
  moveLeft: number;
  moveTop: number;
}

type Enumerate<N extends number, Acc extends number[] = []> = Acc["length"] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc["length"]]>;

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
