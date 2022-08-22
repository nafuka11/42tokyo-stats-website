export type Contents = {
  updatedAt: string;
  beginAtList: string[];
  maxLevel: number;
  allStudents: number[][];
  currentStudents: number[][];
  futureStudentIndexes: number[];
  dailyData: PeriodData[];
  weeklyData: PeriodData[];
  monthlyData: PeriodData[];
};

export type PeriodData = {
  currentStudentSum: number;
  evaluationPointAverage: number;
  updatedAt: string;
};
