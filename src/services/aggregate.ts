import { format } from "date-fns-tz";
import { PeriodData } from "../types/Contents";
import { CursusUser } from "../types/CursusUser";
import { isCurrentStudent, isStudent } from "./filter";
import { getStudentTotal } from "./pick-contents";

export const extractBeginAtList = (cursusUsers: CursusUser[]): string[] => {
  const beginAtSet = cursusUsers.reduce((results, current) => {
    const dateStr = getDateStrFromBeginAt(current.begin_at);
    return results.add(dateStr);
  }, new Set<string>());
  return Array.from(beginAtSet).sort();
};

export const findMaxLevel = (cursusUsers: CursusUser[]): number => {
  return cursusUsers
    .map((cursusUser) => cursusUser.level)
    .reduce((prev, current) => Math.max(Math.floor(prev), Math.floor(current)));
};

export const sumEvaluationPoints = (
  cursusUsers: CursusUser[],
  timeCreated: Date
): number => {
  return cursusUsers
    .filter((cursusUser) => isCurrentStudent(cursusUser, timeCreated))
    .map((cursusUser) => cursusUser.user.correction_point)
    .reduce((prev, current) => prev + current);
};

export const generateAllStudentsTable = (
  cursusUsers: CursusUser[],
  beginAtList: string[],
  maxLevel: number
) => {
  return generateBeginAtLevelTable(cursusUsers, beginAtList, maxLevel);
};

export const generateCurrentStudentsTable = (
  cursusUsers: CursusUser[],
  beginAtList: string[],
  maxLevel: number,
  timeCreated: Date
) => {
  return generateBeginAtLevelTable(
    cursusUsers.filter((cursusUser) =>
      isCurrentStudent(cursusUser, timeCreated)
    ),
    beginAtList,
    maxLevel
  );
};

export const findFutureStudentIndexes = (
  beginAtList: string[],
  timeCreated: Date
): number[] => {
  return beginAtList
    .map((beginAt, index) => ({ beginAt, index }))
    .filter((v) => {
      const dateStr = format(timeCreated, "yyyy-MM-dd");
      return v.beginAt > dateStr;
    })
    .map((v) => v.index);
};

export const generateWeeklyData = (
  rawWeeklyData: { cursusUsers: CursusUser[]; timeCreated: Date }[],
  beginAtList: string[],
  maxLevel: number,
  evaluationPointSum: number,
  currentStudents: number[][],
  timeCreated: Date
): PeriodData[] => {
  const weeklyData = rawWeeklyData.map((v) => {
    const cursusUsers = v.cursusUsers.filter(isStudent);
    const currentStudentsTable = generateCurrentStudentsTable(
      cursusUsers,
      beginAtList,
      maxLevel,
      v.timeCreated
    );
    return {
      currentStudentSum: getStudentTotal(currentStudentsTable),
      evaluationPointSum: sumEvaluationPoints(cursusUsers, v.timeCreated),
      updatedAt: v.timeCreated.toISOString(),
    };
  });
  weeklyData.push({
    currentStudentSum: getStudentTotal(currentStudents),
    evaluationPointSum: evaluationPointSum,
    updatedAt: timeCreated.toISOString(),
  });
  return weeklyData;
};

const generateBeginAtLevelTable = (
  cursusUsers: CursusUser[],
  beginAtList: string[],
  maxLevel: number
) => {
  const table = Array.from({ length: beginAtList.length + 1 }, () =>
    Array.from({ length: maxLevel + 2 }, () => 0)
  );
  cursusUsers.forEach((cursusUser) => {
    const dateStr = getDateStrFromBeginAt(cursusUser.begin_at);
    const beginAtIndex = beginAtList.findIndex((beginAt) => dateStr == beginAt);
    const levelIndex = Math.floor(cursusUser.level);
    table[beginAtIndex][levelIndex] += 1;
    table[beginAtIndex][maxLevel + 1] += 1;
    table[beginAtList.length][levelIndex] += 1;
    table[beginAtList.length][maxLevel + 1] += 1;
  });
  return table;
};

const getDateStrFromBeginAt = (beginAt: string) => {
  return beginAt.replace(
    /^(\d{4}-\d{2}-\d{2})T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    "$1"
  );
};
