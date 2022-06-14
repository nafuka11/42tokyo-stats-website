import sub from "date-fns/sub";
import { downloadCursusUsersJson } from "../repositories/cloud-storage";
import { writeContents } from "../repositories/local-file";
import { aggregateContents } from "../services/cursus-users";

const MAX_DOWNLOAD_RETRY_COUNT_CURRENT = 5;
const MAX_DOWNLOAD_RETRY_COUNT_WEEKLY = 7;

const downloadCursusUsers = async () => {
  const { cursusUsers, timeCreated } = await downloadLatestData();
  const weeklyData = await downloadWeeklyData(timeCreated);
  const contents = aggregateContents(cursusUsers, timeCreated, weeklyData);
  await writeContents(contents);
};

const downloadLatestData = async () => {
  let now = new Date();
  for (let i = 0; i < MAX_DOWNLOAD_RETRY_COUNT_CURRENT; i++) {
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

const downloadWeeklyData = async (timeCreated: Date) => {
  let date = timeCreated;
  const weeklyData = [];

  for (let i = 0; i < MAX_DOWNLOAD_RETRY_COUNT_WEEKLY; i++) {
    date = sub(date, { days: 7 });
    try {
      const { cursusUsers, timeCreated } = await downloadCursusUsersJson(date);
      weeklyData.push({ cursusUsers, timeCreated });
    } catch (e: any) {
      // do nothing
    }
  }
  return weeklyData.reverse();
};

(async () => await downloadCursusUsers())();
