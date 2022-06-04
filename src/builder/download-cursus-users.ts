import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import sub from "date-fns/sub";
import { resolve } from "path";
import dotenv from "dotenv";
import { format, utcToZonedTime } from "date-fns-tz";
import { getEnv } from "../utils/getEnv";
import { writeFileSync } from "fs";
import { CursusUser } from "../types/CursusUser";
import {
  getBeginAtList,
  getEvaluationPoints,
  getLevelBeginAtData,
  getStudentStatusData,
  isCurrentStudent,
} from "../libs/process-cursus-users";

const TIMEZONE = "Asia/Tokyo";
const TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
const MAX_DOWNLOAD_RETRY_COUNT = 10;
const CURSUS_USERS_DIR = resolve(process.cwd(), "contents");

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

initializeApp({
  credential: cert(
    JSON.parse(
      Buffer.from(getEnv("FIREBASE_SERVICE_ACCOUNT_BASE64"), "base64").toString(
        "utf-8"
      )
    )
  ),
  storageBucket: getEnv("BUCKET_NAME"),
});

const downloadCursusUsers = async () => {
  const bucket = getStorage().bucket();
  let now = new Date();
  for (let i = 0; i < MAX_DOWNLOAD_RETRY_COUNT; i++) {
    const filename = `v1/cursus_users/${format(now, "yyyy-MM-dd", {
      timeZone: TIMEZONE,
    })}.json`;
    console.log(`try to download: ${filename}`);
    try {
      const file = bucket.file(filename);

      const [metadata] = await file.getMetadata();
      const timeCreated = new Date(metadata.timeCreated);
      const [buffer] = await file.download();
      const cursusUsers: CursusUser[] = JSON.parse(buffer.toString());

      const contents = aggregateContents(cursusUsers, timeCreated);
      await saveContents(contents);

      break;
    } catch (e: any) {
      // do nothing
    }
    now = sub(now, { days: 1 });
  }
};

const getTimeStamp = (date: Date) => {
  const timeCreatedLocal = utcToZonedTime(date, TIMEZONE);
  const timeStr = format(timeCreatedLocal, TIME_FORMAT, {
    timeZone: TIMEZONE,
  });
  return timeStr;
};

const aggregateContents = (rawCursusUsers: CursusUser[], timeCreated: Date) => {
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

const saveContents = async (contents: any) => {
  const file = resolve(CURSUS_USERS_DIR, "contents.json");
  await writeFileSync(file, JSON.stringify(contents));
};

(async () => await downloadCursusUsers())();
