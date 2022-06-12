import { format, utcToZonedTime } from "date-fns-tz";
import { TIMEZONE, TIME_FORMAT } from "../constants/time";
import {
  getBeginAtList,
  getStudentStatusData,
  getEvaluationPoints,
  getLevelBeginAtData,
  isCurrentStudent,
} from "./process-cursus-users";
import { CursusUser } from "../types/CursusUser";

export const aggregateContents = (
  rawCursusUsers: CursusUser[],
  timeCreated: Date
) => {
  const cursusUsers = rawCursusUsers.filter(isStudent);

  const beginAtList = getBeginAtList(cursusUsers);
  const studentStatus = getStudentStatusData(cursusUsers, beginAtList);
  const evaluationPoint = getEvaluationPoints(cursusUsers);
  const levelBeginAtCurrent = getLevelBeginAtData(
    cursusUsers.filter(isCurrentStudent),
    beginAtList
  );
  const levelBeginAtAll = getLevelBeginAtData(cursusUsers, beginAtList);
  const updatedAt = getTimeStamp(timeCreated);
  const data = {
    beginAtList,
    studentStatus,
    evaluationPoint,
    levelBeginAtCurrent,
    levelBeginAtAll,
    updatedAt,
  };
  return data;
};

const isStudent = (cursusUser: CursusUser) => {
  return (
    !cursusUser.user["staff?"] &&
    cursusUser.user.pool_year &&
    cursusUser.user.pool_year >= 2020
  );
};

const getTimeStamp = (date: Date) => {
  const timeCreatedLocal = utcToZonedTime(date, TIMEZONE);
  const timeStr = format(timeCreatedLocal, TIME_FORMAT, {
    timeZone: TIMEZONE,
  });
  return timeStr;
};
