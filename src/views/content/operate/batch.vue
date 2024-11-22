<script setup lang="ts">
import router from "@/router";
import Todo from "@/components/Todo/index.vue";
import { showNotify } from "vant";
import { reactive, ref } from "vue";
import { useTodoRef } from "@/hooks";
import { TodoForm } from "@/types/todo";
import { genTdParams, onBatchAddTdI } from "@/hooks/useTodoHelp";
import { fm_date, get_betwwen_week } from "@/utils/date";

const { todoRef, onBatch, getTdVal, onCancenel } = useTodoRef();
const weekCheckboxRefs = ref([]);
const showCalendar = ref(false);
const form = reactive({
  tdText: "",
  daysText: ""
});

const todo = ref<TodoForm>();
const week = ref<number[]>();
const days = ref<Date[]>();

const validatorWeek = () => (week.value ? week.value.length > 0 : false);

const weeklist = [
  {
    key: "星期一",
    value: 1
  },
  {
    key: "星期二",
    value: 2
  },
  {
    key: "星期三",
    value: 3
  },
  {
    key: "星期四",
    value: 4
  },
  {
    key: "星期五",
    value: 5
  },
  {
    key: "星期六",
    value: 6
  },
  {
    key: "星期日",
    value: 0
  }
];
function onWeekToggle(index: number) {
  weekCheckboxRefs.value[index].toggle();
}

function onSubmit() {
  const flag = onBatchAddTdI(
    genTdParams(todo.value),
    get_betwwen_week(days.value, week.value)
  );
  if (flag) {
    showNotify({ type: "success", message: "保存成功" });
    router.back();
  }
}
function onTodoSubmit() {
  const td = getTdVal();
  form.tdText = `${td.site[1] ?? td.site[0]}/${td.category[0]}/${td.startTime[0]}:${td.startTime[1]}/${td.endTime[0]}:${td.endTime[1]}`;
  onCancenel();
  todo.value = td;
}
function onCalendarSubmit(values: Date[]) {
  showCalendar.value = false;
  form.daysText = values.map(e => fm_date(e)).join("/");
  days.value = values;
}
</script>

<template>
  <div>
    <!-- todo -->
    <Todo ref="todoRef" batch @on-handle-confirm="onTodoSubmit" />
    <!-- calendar -->
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      @confirm="onCalendarSubmit"
    />
    <!-- form -->
    <div class="vant-pd-y">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
            v-model="form.tdText"
            is-link
            readonly
            name="todo"
            label="内容"
            placeholder="点击配置内容"
            :rules="[{ required: true, message: '请填写内容' }]"
            @click="onBatch()"
          />

          <van-field
            v-model="form.daysText"
            is-link
            readonly
            name="days"
            label="日历"
            placeholder="点击选择日期"
            :rules="[{ required: true, message: '请选择日期' }]"
            @click="showCalendar = true"
          />

          <van-field
            readonly
            name="week"
            label="星期安排"
            :rules="[{ validator: validatorWeek, message: '请选择星期安排' }]"
          />
          <van-checkbox-group v-model="week">
            <van-cell
              v-for="(item, idx) in weeklist"
              :key="item.value"
              clickable
              :title="item.key"
              @click="onWeekToggle(idx)"
            >
              <template #right-icon>
                <van-checkbox
                  :ref="el => (weekCheckboxRefs[idx] = el)"
                  :name="item.value"
                  @click.stop
                />
              </template>
            </van-cell>
          </van-checkbox-group>
        </van-cell-group>

        <div class="vant-pd">
          <van-button round block type="primary" native-type="submit">
            提 交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>
