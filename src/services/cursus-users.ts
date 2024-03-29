import { Contents } from "../types/Contents";
import { CursusUser } from "../types/CursusUser";
import {
  extractBeginAtList,
  findFutureStudentIndexes,
  findMaxLevel,
  generateAllStudentsTable,
  generateCurrentStudentsTable,
  generateIntervalData,
} from "./aggregate";
import { isStudent } from "./filter";

export const aggregateContents = (
  rawCursusUsers: CursusUser[],
  timeCreated: Date,
  rawDailyData: { cursusUsers: CursusUser[]; timeCreated: Date }[],
  rawWeeklyData: { cursusUsers: CursusUser[]; timeCreated: Date }[],
  rawMonthlyData: { cursusUsers: CursusUser[]; timeCreated: Date }[]
): Contents => {
  const cursusUsers = rawCursusUsers.filter(isStudent);

  const beginAtList = extractBeginAtList(cursusUsers);
  const maxLevel = findMaxLevel(cursusUsers);
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
  const dailyData = generateIntervalData(rawDailyData, beginAtList, maxLevel);
  const weeklyData = generateIntervalData(rawWeeklyData, beginAtList, maxLevel);
  const monthlyData = generateIntervalData(
    rawMonthlyData,
    beginAtList,
    maxLevel
  );

  const contents = {
    updatedAt: timeCreated.toISOString(),
    beginAtList,
    maxLevel,
    allStudents,
    currentStudents,
    futureStudentIndexes,
    dailyData,
    weeklyData,
    monthlyData,
  };
  return contents;
};
