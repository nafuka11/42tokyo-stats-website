import { Duration } from "date-fns";
import sub from "date-fns/sub";
import { downloadCursusUsersJson } from "../repositories/cloud-storage";
import { writeContents } from "../repositories/local-file";
import { aggregateContents } from "../services/cursus-users";
import { CursusUser } from "../types/CursusUser";

const MAX_DOWNLOAD_RETRY_COUNT_CURRENT = 7;
const MAX_DOWNLOAD_RETRY_COUNT_DAILY = 6;
const MAX_DOWNLOAD_RETRY_COUNT_WEEKLY = 4;
const MAX_DOWNLOAD_RETRY_COUNT_MONTHLY = 4;

const downloadCursusUsers = async () => {
  const { cursusUsers, timeCreated } = await downloadLatestData();
  const dailyData = await downloadIntervalData(
    cursusUsers,
    timeCreated,
    { days: 1 },
    MAX_DOWNLOAD_RETRY_COUNT_DAILY
  );
  const weeklyData = await downloadIntervalData(
    cursusUsers,
    timeCreated,
    { days: 7 },
    MAX_DOWNLOAD_RETRY_COUNT_WEEKLY
  );
  const monthlyData = await downloadIntervalData(
    cursusUsers,
    timeCreated,
    { days: 30 },
    MAX_DOWNLOAD_RETRY_COUNT_MONTHLY
  );
  const contents = aggregateContents(
    cursusUsers,
    timeCreated,
    dailyData,
    weeklyData,
    monthlyData
  );
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

const downloadIntervalData = async (
  latestCursusUsers: CursusUser[],
  timeCreated: Date,
  duration: Duration,
  downloadCount: number
) => {
  let date = timeCreated;
  const intervalData = [{ cursusUsers: latestCursusUsers, timeCreated }];

  for (let i = 0; i < downloadCount; i++) {
    date = sub(date, duration);
    try {
      const { cursusUsers, timeCreated } = await downloadCursusUsersJson(date);
      intervalData.push({ cursusUsers, timeCreated });
    } catch (e: any) {
      // do nothing
    }
  }
  return intervalData.reverse();
};

(async () => await downloadCursusUsers())();
