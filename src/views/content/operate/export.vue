<script setup lang="ts">
import { fm_date, get_betwwen } from "@/utils/date";
import storage from "@/utils/storage";
import { showNotify } from "vant";
import { ref } from "vue";

const showCalendar = ref(false);
function getClipboard() {
  navigator.clipboard
    .readText()
    .then(text => {
      try {
        const tds = JSON.parse(text) as {
          [key: string]: any[];
        };
        Object.keys(tds).forEach(
          e => tds[e] && tds[e].length > 0 && storage.set(e, tds[e])
        );
        showNotify({ type: "success", message: "导入成功" });
      } catch (e) {
        showNotify({ type: "danger", message: "导入失败" });
      }
    })
    .catch(err => {
      showNotify({ type: "danger", message: "无法获取剪切板内容：" });
    });
}

function onCalendarSubmit(values: Date[]) {
  showCalendar.value = false;
  const exportval = {};
  get_betwwen(values).forEach(e => {
    const key = fm_date(e, "YYYYMMDD");
    exportval[key] = storage.get(key, []);
  });
  navigator.clipboard
    .writeText(JSON.stringify(exportval))
    .then(() => showNotify({ type: "success", message: "导出成功" }));
}
</script>

<template>
  <div>
    <div class="vant-pd-y">
      <van-cell-group inset>
        <van-cell title="数据导入" is-link clickable @click="getClipboard" />
        <van-cell
          title="数据导出"
          is-link
          clickable
          @click="showCalendar = true"
        />
      </van-cell-group>

      <van-calendar
        v-model:show="showCalendar"
        type="range"
        @confirm="onCalendarSubmit"
      />
    </div>
  </div>
</template>
