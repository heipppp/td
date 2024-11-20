<script setup lang="ts">
import { computed, ref } from "vue";
const visible = ref(false);
const currentDate = ref(["2022", "06", "01"]);
const currentTime = ref(["12", "00"]);

resetModVal();

import storage from "@/utils/storage";
import { StorageEnum } from "@/enums/storageKey";

import { showNotify } from "vant";
import { generateUUID } from "@/utils/uid";

const offset = ref({
  x: -1,
  y: document.documentElement.clientHeight / 2
});

const columns = computed<any[]>(() => storage.get(StorageEnum.AREAKEY, []));

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
    const [s] = currentTime.value;
    return options.filter(
      h => Number(h.value) >= Number(s) && Number(h.value) < 23
    );
  }

  if (type === "minute") {
    return options.filter(h => Number(h.value) % 10 === 0);
  }
};

function onConfirm(e: any) {
  // 找时间
  const e1 = e[0].selectedValues;
  const e2 = e[1].selectedValues as number[];
  const e3 = e[2].selectedValues as number[];
  const e4 = e[3].selectedValues as number[];
  const e4Color = e[3].selectedOptions[0].color;

  const form = {
    id: generateUUID(),
    key: `${e1[0]}${e1[1]}${e1[2]}`,
    stKey: -1,
    etKey: -1,
    diff: -1,
    top: -1,
    day: "",
    time: "",
    site: "",
    color: e4Color
  };

  form.stKey = genTk(e2[0], e2[1]);
  form.etKey = genTk(e3[0], e3[1]);

  if (form.stKey >= form.etKey) {
    return showNotify({
      type: "warning",
      message: "结束时间不能小于开始时间哦"
    });
  } else {
    form.diff = form.etKey - form.stKey;
  }

  form.time = `${e2[0]}:${e2[1]} - ${e3[0]}:${e3[1]}`;
  form.day = `${currentDate.value[0]}-${currentDate.value[1]}-${
    currentDate.value[2]
  }`;
  form.site = `${e4[0]} ${e4[1] ?? ""}`;

  const dayStorage = storage.get(form.key, []) as any[];

  if (dayStorage) {
    if (
      dayStorage.findIndex(
        e =>
          (form.etKey > e.stKey && form.stKey < e.etKey) ||
          (e.etKey > form.stKey && e.stKey < form.etKey)
      ) !== -1
    ) {
      return showNotify({ type: "warning", message: "当前时间已被占用" });
    }
    dayStorage.push(form);

    // 开始排序
    dayStorage.sort((a, b) => a.stKey - b.stKey);
    for (let i = 0; i < dayStorage.length; i++) {
      if (i == 0) {
        dayStorage[i].top = dayStorage[i].stKey;
      } else {
        dayStorage[i].top =
          dayStorage[i].stKey -
          (dayStorage[i - 1].stKey + dayStorage[i - 1].diff);
      }
    }

    storage.set(form.key, dayStorage);
  } else {
    storage.set(form.key, [form]);
  }
  showNotify({ type: "success", message: "添加成功" });
  visible.value = false;
  setTimeout(() => resetModVal(), 300);
}

function genTk(hour: number, minute: number) {
  return (hour - 8) * 6 + (minute > 0 ? minute / 10 : 0);
}
function onCancel() {
  visible.value = false;
}

function onOpenPopup() {
  visible.value = true;
}

function resetModVal() {
  const nD = new Date();
  currentTime.value = ["12", "00"];
  currentDate.value = [nD.getFullYear(), nD.getMonth() + 1, nD.getDate()].map(
    e => String(e)
  );
}
</script>

<template>
  <div>
    <van-floating-bubble
      v-model:offset="offset"
      icon="plus"
      @click="onOpenPopup"
    />
    <van-popup
      v-model:show="visible"
      position="bottom"
      round
      :style="{ padding: '8px' }"
    >
      <van-picker-group
        title="预约日期"
        :tabs="['选择日期', '选择开始时间', '选择结束时间', '选择地点']"
        @confirm="onConfirm"
        @cancel="onCancel"
      >
        <van-date-picker v-model="currentDate" />
        <van-time-picker v-model="currentTime" :filter="filter" />
        <van-time-picker :filter="endfilter" />
        <van-picker title="标题" :columns="columns" />
      </van-picker-group>
    </van-popup>
  </div>
</template>
