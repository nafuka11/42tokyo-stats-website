import fs from "fs";
import { CursusUser } from "../types/CursusUser";

const CURSUS_USERS_PATH = "cursus_users.json";

export const fetchCursusUsers = (): CursusUser[] => {
  const fileContents = fs.readFileSync(CURSUS_USERS_PATH, "utf8");
  const cursusUsers: CursusUser[] = JSON.parse(fileContents);
  const filteredCursusUsers = cursusUsers.filter((cursusUser) =>
    isStudent(cursusUser)
  );
  return filteredCursusUsers;
};

const isStudent = (cursusUser: CursusUser) => {
  return (
    !cursusUser.user["staff?"] &&
    cursusUser.user.pool_year &&
    cursusUser.user.pool_year >= 2020
  );
};
