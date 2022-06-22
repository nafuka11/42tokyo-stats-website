export type Contents = {
  updatedAt: string;
  beginAtList: string[];
  maxLevel: number;
  evaluationPointSum: number;
  allStudents: number[][];
  currentStudents: number[][];
  futureStudentIndexes: number[];
  weeklyData: PeriodData[];
};

export type PeriodData = {
  currentStudentSum: number;
  evaluationPointAverage: number;
  updatedAt: string;
};
