import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

const CURSUS_USERS_DIR = resolve(process.cwd(), "contents");
const CONTENT_FILE = resolve(CURSUS_USERS_DIR, "contents.json");

export const writeContents = async (contents: any) => {
  await writeFileSync(CONTENT_FILE, JSON.stringify(contents));
};

export const readContents = () => {
  const json = readFileSync(CONTENT_FILE, "utf8");
  const contents = JSON.parse(json);
  return contents;
};
