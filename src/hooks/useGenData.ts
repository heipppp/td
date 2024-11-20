import DayUtil from "@/utils/day";
import storage from "@/utils/storage";
import { reactive, toRefs } from "vue";
import { fm_date, fm_week, getWeek } from "@/utils/date";
import type { ReserverType } from "@/types/cnf";

export const useGenData = () => {
  let nd = new Date();
  const data = reactive(genday(nd));
  const prev = () => {
    nd = getWeek(nd, -1);
    const d = genday(nd);
    data.d1 = d.d1;
    data.tableData = d.tableData;
    data.weeks = d.weeks;
  };
  const next = () => {
    nd = getWeek(nd, 1);
    const d = genday(nd);
    data.d1 = d.d1;
    data.tableData = d.tableData;
    data.weeks = d.weeks;
  };
  return {
    ...toRefs(data),
    prev,
    next
  };
};

function genday(today: Date) {
  console.time("code");
  const du = new DayUtil(today);
  const weeks = du.getWeeks().map(e => {
    return {
      id: fm_date(e, "YYYYMMDD"),
      text: fm_date(e, "MM月DD"),
      wk: fm_week(e),
      list: []
    };
  });
  const tableData = weeks.map(e => {
    e.list = storage.get<ReserverType[]>(e.id, []);
    return e;
  });

  console.log(tableData);
  console.timeEnd("code");

  return {
    tableData,
    d1: du.monday,
    weeks: weeks
  };
}
