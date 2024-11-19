<script setup lang="ts">
import { computed, ref } from "vue";
const visible = ref(false);
const currentDate = ref(["2022", "06", "01"]);
const currentTime = ref(["12", "00"]);

import storage from "@/utils/storage";
import { StorageEnum } from "@/enums/storageKey";

import minData from "@/config/minutedata";
import { showNotify } from "vant";

const offset = ref({
  x: -1,
  y: document.documentElement.clientHeight / 2
});

const keys = ["day", "time", "site"];

const columns = computed<any[]>(() => storage.get(StorageEnum.AREAKEY, []));

function onConfirm(e: any) {
  // 找时间
  const e1 = e[0].selectedValues;
  const e2 = e[1].selectedValues;
  let form = {
    id: `${e1[0]}${e1[1]}${e1[2]}`,
    tKey: -1,
    day: "",
    time: "",
    site: ""
  };
  for (let i = 0; i < 3; i++) {
    form[keys[i]] =
      i == 1
        ? (e[i].selectedValues as string[]).join(":")
        : (e[i].selectedValues as string[]).join("/");
  }

  let tKey = -1;
  if (e2[1] < 30) {
    tKey = minData.findIndex(e => e.key === `${e2[0]}:00`);
  } else {
    tKey = minData.findIndex(e => e.key === `${e2[0]}:30`);
  }
  form.tKey = tKey;
  const dayStorage = storage.get(form.id, []) as any[];

  if (dayStorage) {
    if (dayStorage.findIndex(e => e.tKey === tKey) !== -1) {
      return showNotify({ type: "warning", message: "当前时间已被占用" });
    }
    dayStorage.push(form);
    storage.set(form.id, dayStorage);
  } else {
    storage.set(form.id, [form]);
  }
  showNotify({ type: "success", message: "添加成功" });
  visible.value = false;
}
function onCancel() {
  visible.value = false;
}

function onOpenPopup() {
  visible.value = true;
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
        :tabs="['选择日期', '选择时间', '选择地点']"
        @confirm="onConfirm"
        @cancel="onCancel"
      >
        <van-date-picker v-model="currentDate" />
        <van-time-picker v-model="currentTime" />
        <van-picker title="标题" :columns="columns" />
      </van-picker-group>
    </van-popup>
  </div>
</template>
