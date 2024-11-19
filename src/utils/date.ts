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
