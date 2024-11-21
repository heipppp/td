import { defineStore } from "pinia";
import { store } from "@/store";
import DayUtil from "@/utils/day";
import { fm_date, fm_week, getWeek } from "@/utils/date";
import storage from "@/utils/storage";
import type { TodoItem, Todo } from "@/types/todo";

export const useTodoStore = defineStore({
  id: "todo",
  state: () => ({
    nd: new Date(),
    todos: [] as Todo[]
  }),
  actions: {
    prev() {
      this.nd = getWeek(this.nd, -1);
      this.genTds();
    },
    next() {
      this.nd = getWeek(this.nd, 1);
      this.genTds();
    },
    genTds() {
      const du = new DayUtil(this.nd);
      const weeks = du.getWeeks().map(e => {
        return {
          id: fm_date(e, "YYYYMMDD"),
          text: fm_date(e, "MM月DD"),
          wk: fm_week(e),
          list: [] as TodoItem[]
        };
      });
      this.todos = weeks.map(e => {
        e.list = storage.get<TodoItem[]>(e.id, []);
        return e;
      });
    }
  }
});

export function useTodoStoreHook() {
  return useTodoStore(store);
}
