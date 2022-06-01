import { initializeApp, cert } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { format } from "date-fns";
import sub from "date-fns/sub";
import { resolve } from "path";
import dotenv from "dotenv";

const MAX_DOWNLOAD_RETRY_COUNT = 10;

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

initializeApp({
  credential: cert(
    JSON.parse(
      Buffer.from(
        process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 ?? "",
        "base64"
      ).toString("utf-8")
    )
  ),
  storageBucket: process.env.BUCKET_NAME,
});

const cursusUsersPath = resolve(process.cwd(), "contents", "cursus_users.json");

const downloadCursusUsers = async () => {
  const bucket = getStorage().bucket();
  let now = new Date();
  for (let i = 0; i < MAX_DOWNLOAD_RETRY_COUNT; i++) {
    const filename = `v1/cursus_users/${format(now, "yyyy-MM-dd")}.json`;
    console.log(`try to download: ${filename}`);
    try {
      const file = bucket.file(filename);
      await file.download({ destination: cursusUsersPath });
      break;
    } catch (e: any) {
      // do nothing
    }
    now = sub(now, { days: 1 });
  }
};

(async () => await downloadCursusUsers())();
