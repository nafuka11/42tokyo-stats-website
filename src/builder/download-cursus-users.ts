import sub from "date-fns/sub";
import { downloadCursusUsersJson } from "../repositories/cloud-storage";
import { writeContents } from "../repositories/local-file";
import { aggregateContents } from "../services/cursus-users";

const MAX_DOWNLOAD_RETRY_COUNT = 10;

const downloadCursusUsers = async () => {
  const { cursusUsers, timeCreated } = await downloadLatestData();
  const contents = aggregateContents(cursusUsers, timeCreated);
  await writeContents(contents);
};

const downloadLatestData = async () => {
  let now = new Date();
  for (let i = 0; i < MAX_DOWNLOAD_RETRY_COUNT; i++) {
    try {
      const { cursusUsers, timeCreated } = await downloadCursusUsersJson(now);
      return { cursusUsers, timeCreated };
    } catch (e: any) {
      // do nothing
    }
    now = sub(now, { days: 1 });
  }
  throw new Error("Failed to download cursusUsers from Google Cloud Storage");
};

(async () => await downloadCursusUsers())();
