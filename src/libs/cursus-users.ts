import fs from "fs";
import path, { resolve } from "path";
import { CursusUser } from "../types/CursusUser";

const cursusUsersDir = resolve(process.cwd(), "contents");

export const fetchCursusUsers = (): {
  cursusUsers: CursusUser[];
  updatedAt: string;
} => {
  const files = fs
    .readdirSync(cursusUsersDir)
    .filter((file) => file.endsWith(".json"));
  if (!files) {
    throw Error("Failed to read file");
  }
  const file = files[0];
  const fileContents = fs.readFileSync(resolve(cursusUsersDir, file), "utf8");
  const cursusUsers: CursusUser[] = JSON.parse(fileContents);
  const filteredCursusUsers = cursusUsers.filter((cursusUser) =>
    isStudent(cursusUser)
  );
  return {
    cursusUsers: filteredCursusUsers,
    updatedAt: path.basename(file, ".json"),
  };
};

const isStudent = (cursusUser: CursusUser) => {
  return (
    !cursusUser.user["staff?"] &&
    cursusUser.user.pool_year &&
    cursusUser.user.pool_year >= 2020
  );
};
