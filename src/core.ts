import { lightColors } from "./constants";
import { PatternConfig, Pattern } from "./types";

const defaultConfig: PatternConfig = {
  colors: lightColors,
  colorCounts: 5,
  stroke: 1,
  scale: 2,
  spacing: [0, 0],
  angle: 0,
  join: "square",
  moveLeft: 0,
  moveTop: 0,
};

export const generateSVG = (pattern: Pattern, config: Partial<PatternConfig> = defaultConfig) => {
  const patternConfig = { ...defaultConfig, ...config };
  const maxColors = pattern.path.split("~").length + 1;
  let strokeFill = "",
    joinMode = "",
    strokeGroup = "";

  function multiStroke(i: number) {
    let defColor = patternConfig.colors[i + 1];
    if (pattern.vHeight === 0 && maxColors > 2) {
      if (patternConfig.colorCounts === 3 && maxColors === 4 && i === 2)
        defColor = patternConfig.colors[1];
      else if (patternConfig.colorCounts === 4 && maxColors === 5 && i === 3)
        defColor = patternConfig.colors[1];
      else if (patternConfig.colorCounts === 3 && maxColors === 5 && i === 3)
        defColor = patternConfig.colors[1];
      else if (patternConfig.colorCounts === 3 && maxColors === 5 && i === 2)
        defColor = patternConfig.colors[1];
      else if (patternConfig.colorCounts === 2) defColor = patternConfig.colors[1];
    }

    if (pattern.mode === "stroke-join") {
      strokeFill = " stroke='" + defColor + "' fill='none'";
      joinMode =
        patternConfig.join == "rounded"
          ? "stroke-linejoin='round' stroke-linecap='round' "
          : "stroke-linecap='square' ";
    } else if (pattern.mode === "stroke") {
      strokeFill = " stroke='" + defColor + "' fill='none'";
    } else strokeFill = " stroke='none' fill='" + defColor + "'";

    return pattern.path
      .split("~")
      [i]!.replace(
        "/>",
        " transform='translate(" +
          patternConfig.spacing[0] / 2 +
          ",0)' " +
          joinMode +
          "stroke-width='" +
          patternConfig.stroke +
          "'" +
          strokeFill +
          "/>"
      )
      .replace("transform='translate(0,0)' ", " ");
  }

  if (pattern.vHeight === 0 && maxColors > 2) {
    for (let i = 0; i < maxColors - 1; i++) {
      strokeGroup += multiStroke(i);
    }
  } else {
    for (let i = 0; i < patternConfig.colorCounts - 1; i++) {
      strokeGroup += multiStroke(i);
    }
  }

  const patternNew =
    "<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs>" +
    "<pattern id='a' patternUnits='userSpaceOnUse' width='" +
    (pattern.width + patternConfig.spacing[0]) +
    "' height='" +
    (pattern.height -
      pattern.vHeight * (maxColors - patternConfig.colorCounts) +
      patternConfig.spacing[1]) +
    "' patternTransform='scale(" +
    patternConfig.scale +
    ") rotate(" +
    patternConfig.angle +
    ")'><rect x='0' y='0' width='100%' height='100%' fill='" +
    patternConfig.colors[0] +
    "'/>" +
    strokeGroup +
    "</pattern></defs><rect width='800%' height='800%' transform='translate(" +
    patternConfig.scale * patternConfig.moveLeft +
    "," +
    patternConfig.scale * patternConfig.moveTop +
    ")' fill='url(#a)'/></svg>";
  // return patternNew
  return patternNew.replace("#", "%23");
};
