import { PeriodData } from "../types/Contents";

/**
 * Lv 0  1  2  3  total
 *   [1, 2, 3, 4, 10] -> [1, 2, 3, 4]
 * @param studentsRow
 * @returns Array excluding trailing total
 */
export const excludeTotalFromRow = (studentsRow: number[]) => {
  return studentsRow.slice(0, studentsRow.length - 1);
};

/**
 *         Lv 0  1  2  3  total
 * beginAt1 [[1, 2, 3, 4, 10],
 * beginAt2  [0, 1, 2, 3, 6 ]   -> [10, 6]
 * total     [1, 3, 5, 7, 16]]
 * @param students
 * @returns Array of totals for each beginAt
 */
export const getBeginAtTotalArray = (students: number[][]): number[] => {
  return students
    .slice(0, students.length - 1)
    .map((beginAtStudents) => beginAtStudents[beginAtStudents.length - 1]);
};

/**
 *         Lv 0  1  2  3  total
 * beginAt1 [[1, 2, 3, 4, 10],
 * beginAt2  [0, 1, 2, 3, 6 ]   -> [1, 3, 5, 7]
 * total     [1, 3, 5, 7, 16]]
 * @param students
 * @returns Array of totals for each level
 */
export const getLevelTotalArray = (students: number[][]): number[] => {
  return excludeTotalFromRow(students[students.length - 1]);
};

/**
 * Lv 0  1  2  3  total
 *   [1, 2, 3, 4, 10] -> 10
 * @param studentsRow
 * @returns Total number of students in a row
 */
export const getTotalFromRow = (studentsRow: number[]): number =>
  studentsRow[studentsRow.length - 1];

/**
 *         Lv 0  1  2  3  total
 * beginAt1 [[1, 2, 3, 4, 10],
 * beginAt2  [0, 1, 2, 3, 6 ]   -> 16
 * total     [1, 3, 5, 7, 16]]
 * @param students
 * @returns Total number of students
 */
export const getStudentTotal = (students: number[][]): number => {
  return students[students.length - 1][
    students[students.length - 1].length - 1
  ];
};

export const generateWeeklyStudents = (
  weeklyData: PeriodData[],
  currentStudents: number[][],
  updatedAt: string
) => {
  const weeklyStudents = weeklyData.map((v) => {
    const count =
      v.currentStudents[v.currentStudents.length - 1][
        v.currentStudents[0].length - 1
      ];
    const updatedAt = new Date(v.updatedAt);
    return { count, updatedAt };
  });
  weeklyStudents.push({
    count:
      currentStudents[currentStudents.length - 1][
        currentStudents[0].length - 1
      ],
    updatedAt: new Date(updatedAt),
  });
  return weeklyStudents;
};
