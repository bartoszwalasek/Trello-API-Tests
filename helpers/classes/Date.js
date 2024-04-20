import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
dayjs.extend(utc);

export class Date {
  getCurrentUTCTime() {
    return dayjs.utc().format("YYYY-MM-DDTHH:mm");
  }
  getCurrentLocalTime() {
    return dayjs().format("YYYY-MM-DDTHH:mm");
  }
  compareDates(trelloTime, realTime) {
    const trimmedTrelloTime = trelloTime.slice(0, -8);
    return dayjs(realTime).isSame(dayjs(trimmedTrelloTime));
  }
}