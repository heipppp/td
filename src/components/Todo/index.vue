<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { StorageEnum } from "@/enums/storageKey";

import storage from "@/utils/storage";
import { TodoForm } from "@/types/todo";
import { fm_list_to_date } from "@/utils/date";

const emits = defineEmits(["onHandleConfirm"]);
const props = defineProps({
  batch: {
    type: Boolean,
    default: false
  }
});

const activeTab = ref(0);
const visible = ref(false);

const tabs = [
  "选择日期",
  "选择开始时间",
  "选择结束时间",
  "选择地点",
  "选择类目"
];

const form = ref<TodoForm>({
  category: [],
  site: [],
  day: [],
  startTime: [],
  endTime: []
});

const columns = computed<any[]>(() => storage.get(StorageEnum.AREAKEY, []));
const categoryColumns = computed<any[]>(() =>
  storage.get(StorageEnum.CATEGORYKEY, [])
);

const minDate = new Date();

const filter = (type: "hour" | "minute", options: any[]) => {
  if (type === "hour") {
    return options.filter(h => Number(h.value) > 7 && Number(h.value) < 23);
  }

  if (type === "minute") {
    return options.filter(h => Number(h.value) % 10 === 0);
  }
};

const endfilter = (type: "hour" | "minute", options: any[]) => {
  if (type === "hour") {
    const [s] = form.value.startTime;
    return options.filter(
      h => Number(h.value) >= Number(s) && Number(h.value) < 23
    );
  }

  if (type === "minute") {
    return options.filter(h => Number(h.value) % 10 === 0);
  }
};

const dayformatter = (type, option) => {
  if (type === "year") {
    option.text += "年";
  }
  if (type === "month") {
    option.text += "月";
  }
  if (type === "day") {
    option.text += "日";
  }

  return option;
};

const daytimeformatter = (type, option) => {
  if (type === "hour") {
    option.text += "时";
  }
  if (type === "minute") {
    option.text += "分";
  }
  return option;
};

// function
function onOpen() {
  visible.value = true;
}

function onCancenel() {
  visible.value = false;
}

function getTodoVal() {
  return form.value;
}

function setTodoVal(val?: TodoForm) {
  val && (form.value = val);
  activeTab.value = 0;
}

function onConfirm() {
  emits("onHandleConfirm");
}

defineExpose({
  onOpen,
  onCancenel,
  getTodoVal,
  setTodoVal
});
</script>

<template>
  <van-popup
    v-model:show="visible"
    position="bottom"
    round
    :style="{ padding: '8px' }"
  >
    <van-picker-group
      v-model:active-tab="activeTab"
      title="预定信息"
      :tabs="props.batch ? tabs.slice(1, 5) : tabs"
      @confirm="onConfirm"
      @cancel="onCancenel"
    >
      <van-date-picker
        v-if="!props.batch"
        v-model="form.day"
        :formatter="dayformatter"
      />
      <van-time-picker
        v-model="form.startTime"
        :filter="filter"
        :formatter="daytimeformatter"
      />
      <van-time-picker
        v-model="form.endTime"
        :filter="endfilter"
        :formatter="daytimeformatter"
      />
      <van-picker v-model="form.site" :columns="columns" />
      <van-picker v-model="form.category" :columns="categoryColumns" />
    </van-picker-group>
  </van-popup>
</template>
