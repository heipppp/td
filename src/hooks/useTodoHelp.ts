import type { TodoItem } from "@/types/todo";
import storage from "@/utils/storage";
import { generateUUID } from "@/utils/uid";
import { showNotify } from "vant";
import { useTodoStoreHook } from "@/store/modules/todo";
import { useColorHelp } from "./useColorHelp";

export function onUpdateTdI(otd: TodoItem, nTd: TodoItem): boolean {
  const aflg = onDelTdI(otd);
  if (aflg) {
    const dflg = onAddTdI(nTd);
    if (dflg) {
      return true;
    } else {
      onDelTdI(nTd);
      return false;
    }
  } else {
    return false;
  }
}

export function onAddTdI(td: TodoItem): boolean {
  const tds = storage.get(td.key, []) as TodoItem[];
  onGentodoDiffK(td);
  if (tds && tds.length > 0) {
    const flat = onHasTdI(td, tds);
    if (flat) {
      tds.push(td);
      onResetorderTds(tds);
      storage.set(td.key, tds);
      onReGenTodos();
      return true;
    } else {
      return false;
    }
  } else {
    tds.push(td);
    onResetorderTds(tds);
    storage.set(td.key, tds);
    onReGenTodos();
    return true;
  }
}

export function onDelTdI(td: TodoItem): boolean {
  const tds = storage.get(td.key, []) as TodoItem[];
  const idx = tds.findIndex(e => e.id === td.id);
  if (idx !== -1) {
    tds.splice(idx, 1);
    onResetorderTds(tds);
    storage.set(td.key, tds);
    onReGenTodos();
    return true;
  } else {
    return false;
  }
}

export function onHasTdI(td: TodoItem, target: TodoItem[]): boolean {
  if (td.stKey >= td.etKey) {
    showNotify({
      type: "warning",
      message: "结束时间不能小于开始时间哦"
    });
    return false;
  }

  if (
    target.findIndex(
      e =>
        (td.etKey > e.stKey && td.stKey < e.etKey) ||
        (e.etKey > td.stKey && e.stKey < td.etKey)
    ) !== -1
  ) {
    showNotify({ type: "warning", message: "当前时间已被占用" });
    return false;
  }

  return true;
}

export function onResetorderTds(tds: TodoItem[]) {
  tds.sort((a, b) => a.stKey - b.stKey);
  for (let i = 0; i < tds.length; i++) {
    if (i == 0) {
      tds[i].top = tds[i].stKey;
    } else {
      tds[i].top = tds[i].stKey - (tds[i - 1].stKey + tds[i - 1].diff);
    }
  }
}

function onGentodoDiffK(td: TodoItem) {
  td.diff = td.etKey - td.stKey;
}

function onGentodoTdK(hour: string, minute: string) {
  return (
    (Number(hour) - 8) * 6 + (Number(minute) > 0 ? Number(minute) / 10 : 0)
  );
}

function onReGenTodos() {
  useTodoStoreHook().genTds();
}

export function genTdParams({
  day,
  startTime,
  endTime,
  site,
  category
}: {
  day: number[];
  startTime: string[];
  endTime: string[];
  site: string[];
  category: string[];
}): TodoItem {
  const useColor = useColorHelp();
  return {
    id: generateUUID(),
    key: `${day[0]}${day[1]}${day[2]}`,
    stKey: onGentodoTdK(startTime[0], startTime[1]),
    etKey: onGentodoTdK(endTime[0], endTime[1]),
    diff: 0,
    top: 0,
    day: `${day[0]}-${day[1]}-${day[2]}`,
    stime: `${startTime[0]}:${startTime[1]}`,
    etime: `${endTime[0]}:${endTime[1]}`,
    site: site[1] ?? site[0],
    area: site[1],
    color: useColor.get(`${site[0]}/${site[1] || ""}`),
    oDay: day,
    oSite: site,
    oSt: startTime,
    oEt: endTime,
    oCate: category,
    category: category[0]
  };
}
