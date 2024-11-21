<script setup lang="ts">
import { showNotify } from "vant";
import { computed, reactive, ref } from "vue";
import { StorageEnum } from "@/enums/storageKey";
import { genTdParams, onAddTdI, onUpdateTdI } from "@/hooks/useTodoHelp";

import storage from "@/utils/storage";
import { TodoItem } from "@/types/todo";
import { fm_list } from "@/utils/date";

const activeTab = ref(0);
const visible = ref(false);
const edit = ref(false);

const oform = ref<TodoItem>();

const form = reactive({
  category: [],
  site: [],
  day: [],
  startTime: [],
  endTime: []
});

const offset = ref({
  x: -1,
  y: document.documentElement.clientHeight / 2
});

const columns = computed<any[]>(() => storage.get(StorageEnum.AREAKEY, []));
const categoryColumns = computed<any[]>(() =>
  storage.get(StorageEnum.CATEGORYKEY, [])
);

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
    const [s] = form.startTime;
    return options.filter(
      h => Number(h.value) >= Number(s) && Number(h.value) < 23
    );
  }

  if (type === "minute") {
    return options.filter(h => Number(h.value) % 10 === 0);
  }
};

function onConfirm() {
  if (edit.value) {
    // 找时间
    const upf = onUpdateTdI(oform.value, genTdParams(form));
    if (upf) {
      showNotify({ type: "success", message: "修改成功" });
      onCancel();
    }
  } else {
    // 找时间
    const adf = onAddTdI(genTdParams(form));
    if (adf) {
      showNotify({ type: "success", message: "添加成功" });
      onCancel();
    }
  }
}

function onCancel() {
  oform.value = null;
  visible.value = false;
  setTimeout(() => resetDateVal(), 300);
}

function onOpenPopup() {
  edit.value = false;
  visible.value = true;
}

function onOpenEdit(old: TodoItem) {
  edit.value = true;
  form.day = old.oDay;
  form.startTime = old.oSt;
  form.endTime = old.oEt;
  form.site = old.oSite;
  form.category = old.oCate;
  oform.value = old;
  visible.value = true;
}

function resetDateVal() {
  activeTab.value = 0;
  form.site = [];
  form.startTime = ["12", "00"];
  form.endTime = [];
  form.category = [];
  form.day = fm_list(new Date());
}

resetDateVal();

defineExpose({
  onOpenEdit
});
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
        v-model:active-tab="activeTab"
        title="预定信息"
        :tabs="[
          '选择日期',
          '选择开始时间',
          '选择结束时间',
          '选择地点',
          '选择类目'
        ]"
        @confirm="onConfirm"
        @cancel="onCancel"
      >
        <van-date-picker v-model="form.day" />
        <van-time-picker v-model="form.startTime" :filter="filter" />
        <van-time-picker v-model="form.endTime" :filter="endfilter" />
        <van-picker v-model="form.site" :columns="columns" />
        <van-picker v-model="form.category" :columns="categoryColumns" />
      </van-picker-group>
    </van-popup>
  </div>
</template>
