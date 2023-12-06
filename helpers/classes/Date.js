import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
dayjs.extend(utc);

export class Date {
  getCurrentUTCTime() {
    return dayjs.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  }
  getCurrentLocalTime() {
    return dayjs().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  }
  compareDates(trelloTime, realTime) {
    const trimmedTrelloTime = trelloTime.slice(0, -8);
    const trimmedRealTime = realTime.slice(0, -8);
    return dayjs(trimmedRealTime).isSame(dayjs(trimmedTrelloTime));
  }
}

export const date = new Date();
