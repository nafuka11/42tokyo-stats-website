export type Contents = {
  updatedAt: string;
  beginAtList: string[];
  maxLevel: number;
  allStudents: number[][];
  currentStudents: number[][];
  futureStudentIndexes: number[];
  weeklyData: PeriodData[];
  dailyData: PeriodData[];
};

export type PeriodData = {
  currentStudentSum: number;
  evaluationPointAverage: number;
  updatedAt: string;
};
