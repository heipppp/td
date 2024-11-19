import DayUtil from "@/utils/day";
import mD from "@/config/minutedata";
import storage from "@/utils/storage";
import { reactive, toRefs } from "vue";
import { fm_date, getWeek } from "@/utils/date";
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
  const du = new DayUtil(today);

  const weeks = du.getWeeks().map(e => {
    return {
      id: fm_date(e, "YYYYMMDD"),
      text: fm_date(e, "MM月DD日")
    };
  });
  mD.forEach(e => (e.list.length = weeks.length));
  const nMd = JSON.parse(JSON.stringify(mD));
  const weekData = [];
  weeks.forEach(e => {
    storage.get<ReserverType[]>(e.id, []).forEach(se => weekData.push(se));
  });

  weekData.forEach((e, i) => {
    nMd[e.tKey].list[i] = e;
  });

  console.log(nMd);
  return {
    tableData: nMd,
    d1: du.monday,
    weeks: weeks
  };
}
