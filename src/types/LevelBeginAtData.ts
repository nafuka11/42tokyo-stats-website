export type LevelBeginAtData = {
  [beginAt: string]: LevelUserData[];
};

export type LevelUserData = {
  level: number;
  count: number;
};
