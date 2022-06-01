import fs from "fs";
import { resolve } from "path";
import { CursusUser } from "../types/CursusUser";

const cursusUsersPath = resolve(process.cwd(), "contents", "cursus_users.json");

export const fetchCursusUsers = (): CursusUser[] => {
  const fileContents = fs.readFileSync(cursusUsersPath, "utf8");
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
