// Ref: https://github.com/amrlabib/react-timer-hook/blob/master/src/utils/Time.js#L1

export type TimeFromSecondsReturnType = ReturnType<
  typeof Time.getTimeFromSeconds
>;

export default class Time {
  static getTimeFromSeconds(secs: number) {
    const totalSeconds = Math.ceil(secs);
    const hours = Math.floor(totalSeconds / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const formattedTime = `${this.padTime(hours)}:${this.padTime(minutes)}:${this.padTime(seconds)}`;

    return {
      totalSeconds,
      seconds,
      minutes,
      hours,
      formattedTime,
    };
  }

  static getSecondsFromExpiry(expiry: number, shouldRound: boolean) {
    const now = new Date().getTime();
    const milliSecondsDistance = expiry - now;
    if (milliSecondsDistance > 0) {
      const val = milliSecondsDistance / 1000;
      return shouldRound ? Math.round(val) : val;
    }
    return 0;
  }

  static getSecondsFromPrevTime(prevTime: Date, shouldRound: boolean) {
    const now = new Date().getTime();
    const milliSecondsDistance = now - prevTime.getTime();
    if (milliSecondsDistance > 0) {
      const val = milliSecondsDistance / 1000;
      return shouldRound ? Math.round(val) : val;
    }
    return 0;
  }

  static getSecondsFromTimeNow() {
    const now = new Date();
    const currentTimestamp = now.getTime();
    const offset = now.getTimezoneOffset() * 60;
    return currentTimestamp / 1000 - offset;
  }

  static getFormattedTimeFromSeconds(totalSeconds: number, format: string) {
    const {
      seconds: secondsValue,
      minutes,
      hours,
    } = Time.getTimeFromSeconds(totalSeconds);
    let ampm = "";
    let hoursValue = hours;

    if (format === "12-hour") {
      ampm = hours >= 12 ? "pm" : "am";
      hoursValue = hours % 12;
    }

    return {
      seconds: secondsValue,
      minutes,
      hours: hoursValue,
      ampm,
    };
  }

  static padTime(time: number) {
    return time.toString().padStart(2, "0");
  }
}
