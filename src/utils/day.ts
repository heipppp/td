export default class DayUtil {
  today: Date;
  monday: Date;
  weeks: string[];

  constructor(today: Date) {
    this.today = today;
    this.weeks = this.getWeeks();
    this.monday = this.getWeekMonday();
  }

  getWeekNo() {
    const startOfYear = new Date(this.today.getFullYear(), 0, 1);
    let dayOfYear =
      (this.today.getTime() -
        startOfYear.getTime() +
        (startOfYear.getTimezoneOffset() - this.today.getTimezoneOffset()) *
          60000) /
      86400000;

    const janFirstDayOfWeek =
      new Date(this.today.getFullYear(), 0, 1).getDay() || 7;
    if (
      janFirstDayOfWeek === 4 ||
      janFirstDayOfWeek === 5 ||
      janFirstDayOfWeek === 6
    ) {
      dayOfYear -= janFirstDayOfWeek - 1;
    } else {
      dayOfYear -= janFirstDayOfWeek + 6;
    }

    // Calculate the week number
    const weekNumber = Math.ceil((dayOfYear + 1) / 7);
    return weekNumber;
  }

  getWeekMonday() {
    const dayOfWeek = this.today.getDay(); // 0 is Sunday, 1 is Monday, ... 6 is Saturday
    const monday = new Date(this.today);
    // Subtract the current day of week plus one day (to account for Sunday being 0)
    // from the current date to get to the previous Monday
    monday.setDate(
      this.today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
    );
    // Set hours, minutes, seconds, and milliseconds to 0 to get the start of the day
    monday.setHours(0, 0, 0, 0);
    return monday;
  }

  getWeeks() {
    const dates = [];
    let currentDate = new Date(this.today);
    currentDate.setHours(0, 0, 0, 0); // Set to midnight to avoid time-related issues
    for (let i = 0; i < 7; i++) {
      dates.push(new Date(currentDate)); // Push a copy of the date to the array
      currentDate.setDate(currentDate.getDate() + 1); // Increment the date by one day
    }
    return dates;
  }
}
