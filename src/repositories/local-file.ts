import { resolve } from "path";
import { writeFileSync } from "fs";

const CURSUS_USERS_DIR = resolve(process.cwd(), "contents");

export const saveContents = async (contents: any) => {
  const file = resolve(CURSUS_USERS_DIR, "contents.json");
  await writeFileSync(file, JSON.stringify(contents));
};
