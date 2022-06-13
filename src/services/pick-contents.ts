export const excludeTotalFromRow = (studentsRow: number[]) => {
  return studentsRow.slice(0, studentsRow.length - 1);
};

export const getBeginAtTotal = (students: number[][]): number[] => {
  return students
    .slice(0, students.length - 1)
    .map((beginAtStudents) => beginAtStudents[beginAtStudents.length - 1]);
};

export const getLevelTotal = (students: number[][]): number[] => {
  return excludeTotalFromRow(students[students.length - 1]);
};

export const getTotalFromRow = (studentsRow: number[]): number =>
  studentsRow[studentsRow.length - 1];
