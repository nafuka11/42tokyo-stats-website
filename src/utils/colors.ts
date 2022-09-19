const SEQUENTIAL_LEVEL_COLORS = [
  "#f7fcf0",
  "#e0f3db",
  "#ccebc5",
  "#a8ddb5",
  "#7bccc4",
  "#4eb3d3",
  "#2b8cbe",
  "#0868ac",
  "#2c4a8d",
  "#332160",
];
const HIGH_LEVEL_COLOR = "#fca8c5";

export const getLevelColor = (level: number): string => {
  if (level < SEQUENTIAL_LEVEL_COLORS.length) {
    return SEQUENTIAL_LEVEL_COLORS[level];
  }
  return HIGH_LEVEL_COLOR;
};
