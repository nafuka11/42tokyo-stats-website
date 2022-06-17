import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";
import { Contents } from "../types/Contents";

const CONTENTS_DIR = resolve(process.cwd(), "contents");
const CONTENTS_FILE = resolve(CONTENTS_DIR, "contents.json");
const DEMO_FILE = resolve(CONTENTS_DIR, "demo-contents.json");

export const writeContents = async (contents: any) => {
  await writeFileSync(CONTENTS_FILE, JSON.stringify(contents));
};

export const readContents = (): Contents => {
  return readLocalContents(CONTENTS_FILE);
};

export const readDemoContents = (): Contents => {
  return readLocalContents(DEMO_FILE);
};

const readLocalContents = (fileName: string): Contents => {
  const json = readFileSync(fileName, "utf8");
  const contents: Contents = JSON.parse(json);
  return contents;
};
