import { Contents } from "../types/Contents";
import { CursusUser } from "../types/CursusUser";
import {
  extractBeginAtList,
  findFutureStudentIndexes,
  findMaxLevel,
  generateAllStudentsTable,
  generateCurrentStudentsTable,
  generateWeeklyData,
  sumEvaluationPoints,
} from "./aggregate";
import { isStudent } from "./filter";

export const aggregateContents = (
  rawCursusUsers: CursusUser[],
  timeCreated: Date,
  rawWeeklyData: { cursusUsers: CursusUser[]; timeCreated: Date }[]
): Contents => {
  const cursusUsers = rawCursusUsers.filter(isStudent);

  const beginAtList = extractBeginAtList(cursusUsers);
  const maxLevel = findMaxLevel(cursusUsers);
  const evaluationPointSum = sumEvaluationPoints(cursusUsers, timeCreated);
  const allStudents = generateAllStudentsTable(
    cursusUsers,
    beginAtList,
    maxLevel
  );
  const currentStudents = generateCurrentStudentsTable(
    cursusUsers,
    beginAtList,
    maxLevel,
    timeCreated
  );
  const futureStudentIndexes = findFutureStudentIndexes(
    beginAtList,
    timeCreated
  );
  const weeklyData = generateWeeklyData(
    rawWeeklyData,
    beginAtList,
    maxLevel,
    evaluationPointSum,
    currentStudents,
    timeCreated
  );

  const contents = {
    updatedAt: timeCreated.toISOString(),
    beginAtList,
    maxLevel,
    evaluationPointSum,
    allStudents,
    currentStudents,
    futureStudentIndexes,
    weeklyData,
  };
  return contents;
};
