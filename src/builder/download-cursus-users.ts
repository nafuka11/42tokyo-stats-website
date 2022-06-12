import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import sub from "date-fns/sub";
import { format } from "date-fns-tz";
import { downloadCursusUsersJson } from "../repositories/cloud-storage";
import { saveContents } from "../repositories/local-file";

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
  let now = new Date();
  for (let i = 0; i < MAX_DOWNLOAD_RETRY_COUNT; i++) {
    const filename = `v1/cursus_users/${format(now, "yyyy-MM-dd", {
      timeZone: TIMEZONE,
    })}.json`;
    try {
      const { cursusUsers, timeCreated } = await downloadCursusUsersJson(
        filename
      );

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

(async () => await downloadCursusUsers())();
