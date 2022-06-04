import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import sub from "date-fns/sub";
import { resolve } from "path";
import dotenv from "dotenv";
import { format, utcToZonedTime } from "date-fns-tz";
import { getEnv } from "../utils/getEnv";

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
      const timeStamp = getTimeStamp(timeCreated);
      const cursusUsersPath = resolve(CURSUS_USERS_DIR, `${timeStamp}.json`);

      await file.download({ destination: cursusUsersPath });
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

(async () => await downloadCursusUsers())();
