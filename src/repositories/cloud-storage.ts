import { formatInTimeZone } from "date-fns-tz";
import dotenv from "dotenv";
import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { resolve } from "path";
import { TIMEZONE_GCS } from "../constants/time";
import { CursusUser } from "../types/CursusUser";
import { getEnv } from "../utils/getEnv";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

initializeApp({
  credential: cert({
    projectId: getEnv("FIREBASE_PROJECT_ID"),
    clientEmail: getEnv("FIREBASE_CLIENT_EMAIL"),
    privateKey: getEnv("FIREBASE_PRIVATE_KEY"),
  }),
  storageBucket: getEnv("BUCKET_NAME"),
});

export const downloadCursusUsersJson = async (date: Date) => {
  const bucket = getStorage().bucket();
  const fileName = generateFileName(date);
  const file = bucket.file(fileName);

  console.log(`try to download: ${fileName}`);
  const [metadata] = await file.getMetadata();
  const timeCreated = new Date(metadata.timeCreated);
  const [buffer] = await file.download();
  const cursusUsers: CursusUser[] = JSON.parse(buffer.toString());

  return { cursusUsers, timeCreated };
};

const generateFileName = (date: Date) =>
  `v1/cursus_users/${formatInTimeZone(date, TIMEZONE_GCS, "yyyy-MM-dd")}.json`;
