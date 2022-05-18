import { LevelBeginAtData, LevelUserData } from "../types/LevelUserData";
import { CursusUser } from "../types/CursusUser";
import { StudentSummaryData } from "../types/StudentSummaryData";

const now = new Date().toISOString();

export const getStudentSummary = (
  cursusUsers: CursusUser[]
): StudentSummaryData => {
  return cursusUsers.reduce(
    (results, current) => {
      if (current.begin_at > now) {
        results.future++;
      } else if (current.blackholed_at < now) {
        results.blackholed++;
      } else {
        results.current++;
      }
      return results;
    },
    { current: 0, blackholed: 0, future: 0 }
  );
};

export const getBeginAtList = (cursusUsers: CursusUser[]): string[] => {
  const beginAtSet = cursusUsers.reduce((results, current) => {
    const dateStr = current.begin_at.replace(
      /^(\d{4}-\d{2}-\d{2})T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
      "$1"
    );
    return results.add(dateStr);
  }, new Set<string>());
  return Array.from(beginAtSet).sort();
};

export const getLevelBeginAtList = (
  cursusUsers: CursusUser[],
  beginAtList: string[]
): LevelBeginAtData => {
  const now = new Date().toISOString();
  const levelBeginAtList = beginAtList.map((beginAt) => ({
    [beginAt]: [] as LevelUserData[],
  }));
  const levelBeginAtData: LevelBeginAtData = Object.assign(
    {},
    ...levelBeginAtList
  );
  cursusUsers.filter(isCurrentStudent).forEach((cursusUser) => {
    const dateStr: keyof LevelBeginAtData = cursusUser.begin_at.replace(
      /^(\d{4}-\d{2}-\d{2})T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
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
  return levelBeginAtData;
};

export const getEvaluationPoints = (cursusUsers: CursusUser[]): number => {
  return cursusUsers
    .filter(isCurrentStudent)
    .map((cursusUser) => cursusUser.user.correction_point)
    .reduce((prev, current) => prev + current);
};

const isCurrentStudent = (cursusUser: CursusUser): boolean =>
  cursusUser.begin_at < now && cursusUser.blackholed_at > now;
