export function getWeek(date: Date, weeks: -1 | 1) {
  if (!(date instanceof Date)) {
    throw new Error("时间类型传入错误");
  }
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + weeks * 7); // Add or subtract weeks by multiplying with 7
  return newDate;
}

function padZero(number: number) {
  return number.toString().padStart(2, "0");
}

export function fm_date(date: Date, format = "YYYY-MM-DD") {
  if (!(date instanceof Date)) {
    throw new Error("传入的不是日期");
  }

  const map = {
    YYYY: date.getFullYear(),
    MM: padZero(date.getMonth() + 1), // getMonth() is zero-based
    DD: padZero(date.getDate()),
    HH: padZero(date.getHours()),
    mm: padZero(date.getMinutes()),
    ss: padZero(date.getSeconds())
  };

  return format.replace(/(YYYY|MM|DD|HH|mm|ss)/g, match => map[match]);
}

export function fm_week(date: Date) {
  const weekdays = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  return weekdays[date.getDay()];
}

export function fm_list(date: Date) {
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(e =>
    String(e)
  );
}

export function fm_list_to_date(list: string[]) {
  return new Date(list.join("-"));
}

export function get_betwwen(range: Date[]): Date[] {
  // 解析开始和结束时间
  const startDate = new Date(range[0]);
  const endDate = new Date(range[1]);

  // 确保开始日期在结束日期之前
  if (startDate >= endDate) {
    throw new Error("开始时间必须在结束时间之前");
  }

  const dates = []; // 存储每一天的 Date 对象
  let currentDate = new Date(startDate);
  currentDate.setHours(0, 0, 0, 0); // 将时间部分设置为 0，以确保只比较日期部分

  // 循环添加每一天的 Date 对象到数组中
  while (currentDate < endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1); // 增加一天
  }
  // 添加结束日期
  dates.push(new Date(endDate));
  return dates;
}

export function get_betwwen_week(range: Date[], week: number[]) {
  const dkeystr = "YYYYMMDD";
  const dates = get_betwwen(range);
  return week.length == 6
    ? dates.map(e => fm_date(e, dkeystr))
    : dates
        .filter(e => week.includes(e.getDay()))
        .map(e => fm_date(e, dkeystr));
}
