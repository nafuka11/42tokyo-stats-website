const SEQUENTIAL_LEVEL_COLORS = [
  "#f7fcf0",
  "#e2f4dd",
  "#d0edc9",
  "#b3e1ba",
  "#8dd3be",
  "#65c0cc",
  "#40a3cb",
  "#2181b9",
  "#0860a3",
  "#163a7a",
];
const HIGH_LEVEL_COLOR = "#93003a";

export const getLevelColor = (level: number): string => {
  if (level < SEQUENTIAL_LEVEL_COLORS.length) {
    return SEQUENTIAL_LEVEL_COLORS[level];
  }
  return HIGH_LEVEL_COLOR;
};
