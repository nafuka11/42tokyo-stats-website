import sub from "date-fns/sub";
import { format } from "date-fns-tz";
import { downloadCursusUsersJson } from "../repositories/cloud-storage";
import { saveContents } from "../repositories/local-file";
import { aggregateContents } from "../services/cursus-users";
import { TIMEZONE } from "../constants/time";

const MAX_DOWNLOAD_RETRY_COUNT = 10;

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

(async () => await downloadCursusUsers())();
