import { CursusUser } from "../types/CursusUser";

export const isStudent = (cursusUser: CursusUser) => {
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
