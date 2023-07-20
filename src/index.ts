export { generateSVG } from "./core";
import { generateSVG } from "./core";
import patterns from "./patterns";
import { Pattern, PatternConfig } from "./types";
import { randomConfig, randomNumber } from "./utils";

export const getRandomPattern = () => {};

export function getSVG(index: number, config?: Partial<PatternConfig>): string;
export function getSVG(
  index: (typeof patterns)[number]["slug"],
  config?: Partial<PatternConfig>
): string;
export function getSVG(index: any, config?: Partial<PatternConfig>): string {
  let idx = index;
  if (typeof index !== "number") {
    idx = patterns.findIndex((p) => p.slug === index);
  }
  idx = idx < 0 ? 0 : idx;

  const pattern = patterns[idx % patterns.length] as unknown as Pattern;

  return generateSVG(pattern, config);
}

const getPatternByIndex = (index: number) =>
  patterns[index % patterns.length] as unknown as Pattern;

export const getRandomSVG = (isRandomConfig?: boolean) => {
  const pattern = getPatternByIndex(randomNumber(0, patterns.length - 1));
  return generateSVG(
    pattern,
    isRandomConfig
      ? randomConfig(pattern.maxStroke, pattern.maxScale, pattern.maxSpacing)
      : undefined
  );
};
