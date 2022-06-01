import { LevelBeginAtData, LevelUserData } from "../types/LevelBeginAtData";
import { CursusUser } from "../types/CursusUser";
import { StudentStatusData } from "../types/StudentStatusData";
import { LevelStudentData } from "../types/LevelStudentData";

const nowDate = new Date();
const nowStr = nowDate.toISOString();

export const getStudentStatusData = (
  cursusUsers: CursusUser[],
  beginAtList: string[]
): StudentStatusData => {
  const studentStatusList = beginAtList.map((beginAt) => ({
    [beginAt]: { current: 0, blackholed: 0, future: 0 },
  }));
  const studentStatusData: StudentStatusData = Object.assign(
    {},
    ...studentStatusList
  );
  cursusUsers.forEach((cursusUser) => {
    const dateStr: keyof LevelBeginAtData = cursusUser.begin_at.replace(
      /^(\d{4}-\d{2}-\d{2})T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
      "$1"
    );

    if (cursusUser.begin_at > nowStr) {
      studentStatusData[dateStr].future++;
    } else if (cursusUser.blackholed_at && cursusUser.blackholed_at < nowStr) {
      studentStatusData[dateStr].blackholed++;
    } else {
      studentStatusData[dateStr].current++;
    }
  });
  return studentStatusData;
};

export const getBeginAtList = (cursusUsers: CursusUser[]): string[] => {
  const beginAtSet = cursusUsers.reduce((results, current) => {
    const dateStr = current.begin_at.replace(
      /^(\d{4}-\d{2}-\d{2})T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      "$1"
    );
    return results.add(dateStr);
  }, new Set<string>());
  return Array.from(beginAtSet).sort();
};

export const getLevelBeginAtData = (
  cursusUsers: CursusUser[],
  beginAtList: string[]
): LevelBeginAtData => {
  const levelBeginAtList = beginAtList.map((beginAt) => ({
    [beginAt]: [] as LevelUserData[],
  }));
  const levelBeginAtData: LevelBeginAtData = Object.assign(
    {},
    ...levelBeginAtList
  );
  cursusUsers.forEach((cursusUser) => {
    const dateStr: keyof LevelBeginAtData = cursusUser.begin_at.replace(
      /^(\d{4}-\d{2}-\d{2})T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      "$1"
    );
    const level = Math.floor(cursusUser.level);
    const levelUser = levelBeginAtData[dateStr].find(
      (lv) => lv.level === level
    );
    if (levelUser) {
      levelUser.count++;
    } else {
      levelBeginAtData[dateStr].push({ level, count: 1 });
    }
  });
  Object.keys(levelBeginAtData).forEach((key) => {
    levelBeginAtData[key].sort((a, b) => a.level - b.level);
  });
  return levelBeginAtData;
};

export const getLevelStudents = (
  levelBeginAtData: LevelBeginAtData
): LevelStudentData => {
  return Object.keys(levelBeginAtData).reduce((results, key) => {
    levelBeginAtData[key].forEach((lv) => {
      results[lv.level] = (results[lv.level] ?? 0) + lv.count;
    });
    return results;
  }, {} as LevelStudentData);
};

export const getEvaluationPoints = (cursusUsers: CursusUser[]): number => {
  return cursusUsers
    .filter(isCurrentStudent)
    .map((cursusUser) => cursusUser.user.correction_point)
    .reduce((prev, current) => prev + current);
};

export const isCurrentStudent = (cursusUser: CursusUser): boolean =>
  cursusUser.begin_at < nowStr &&
  (cursusUser.blackholed_at === null || cursusUser.blackholed_at > nowStr);
