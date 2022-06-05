import fs from "fs";
import { resolve } from "path";

const contentsFile = resolve(process.cwd(), "contents", "contents.json");

export const fetchContents = (): {} => {
  const json = fs.readFileSync(contentsFile, "utf8");
  const contents = JSON.parse(json);
  return contents;
};
