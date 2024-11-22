import type { TodoForm, TodoItem } from "@/types/todo";
import { nextTick, ref } from "vue";
import { genTdParams, onAddTdI, onUpdateTdI } from "./useTodoHelp";
import { showNotify } from "vant";
import { fm_list } from "@/utils/date";

type TdState = "add" | "edit" | "batch";

interface TodoComponent {
  onOpen: () => void;
  onCancenel: () => void;
  setTodoVal: (e: TodoForm) => void;
  getTodoVal: () => TodoForm;
}

const emptyVal = {
  site: [],
  startTime: ["12", "00"],
  endTime: [],
  category: [],
  day: fm_list(new Date())
};

const fillVal = (e: TodoItem) => {
  return {
    day: e.oDay,
    startTime: e.oSt,
    endTime: e.oEt,
    site: e.oSite,
    category: e.oCate
  };
};

const isadd = (type: TdState) => type === "add";

export function useTodoRef() {
  const oldTd = ref<TodoItem | null>(null);
  const state = ref<TdState>("add");
  const todoRef = ref<TodoComponent>();
  const onOpen = () => todoRef.value?.onOpen();
  const getTdVal = () => todoRef.value?.getTodoVal();
  const onCancenel = () => todoRef.value?.onCancenel();
  const setTdVal = (params = emptyVal) => todoRef.value?.setTodoVal(params);
  function onAdd() {
    state.value = "add";
    setTdVal();
    onOpen();
  }
  function onUpdate(e: TodoItem) {
    state.value = "edit";
    oldTd.value = e;
    setTdVal(fillVal(e));
    onOpen();
  }
  function onBatch() {
    state.value = "batch";
    onOpen();
  }
  function onSumbit(): boolean {
    return onSumbitCallBack(
      isadd(state.value)
        ? onAddTdI(genTdParams(getTdVal()))
        : onUpdateTdI(oldTd.value, genTdParams(getTdVal()))
    );
  }

  function onSumbitCallBack(flag: boolean) {
    if (flag) {
      showNotify({
        type: "success",
        message: isadd(state.value) ? "添加成功" : "修改成功"
      });
      onCancenel();
    }
    return flag;
  }

  nextTick().then(() => setTdVal());

  return {
    todoRef,
    getTdVal,
    onAdd,
    onUpdate,
    onBatch,
    onSumbit,
    onCancenel,
    onOpen
  };
}
