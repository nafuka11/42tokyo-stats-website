import { FortyTwoProfile } from "next-auth/providers/42-school";
import { FORTYTWO_CURSUS_ID } from "../constants/forty-two";
import { CursusUser } from "../types/CursusUser";

export const isStudent = (cursusUser: CursusUser) => {
  const excludeUserIds = process.env.EXCLUDE_USER_IDS;
  const userId = cursusUser.user.id;
  if (excludeUserIds && excludeUserIds.split(",").includes(userId.toString())) {
    return false;
  }
  return (
    !cursusUser.user["staff?"] &&
    cursusUser.user.pool_year &&
    cursusUser.user.pool_year >= 2020
  );
};

export const isCurrentStudent = (
  cursusUser: CursusUser,
  timeCreated: Date
): boolean => {
  const createdStr = timeCreated.toISOString();
  return (
    cursusUser.begin_at < createdStr &&
    (cursusUser.blackholed_at === null || cursusUser.blackholed_at > createdStr)
  );
};

export const is42cursusStudentOrStaff = (profile: FortyTwoProfile): boolean => {
  if (profile["staff?"]) {
    return true;
  }
  const cursusUser = profile.cursus_users.find(
    (cursusUser) => cursusUser.cursus_id === FORTYTWO_CURSUS_ID
  );
  if (cursusUser) {
    return true;
  }
  return false;
};
