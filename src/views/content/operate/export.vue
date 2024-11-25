<script setup lang="ts">
import router from "@/router";
import { fm_date, get_betwwen } from "@/utils/date";
import storage from "@/utils/storage";
import { showNotify } from "vant";
import { ref } from "vue";

const text = ref("");
const showCalendar = ref(false);
function getClipboard() {
  navigator.clipboard
    .readText()
    .then(t => {
      try {
        const tds = JSON.parse(t) as {
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

function onSubmit() {
  try {
    const tds = JSON.parse(text.value) as {
      [key: string]: any[];
    };
    Object.keys(tds).forEach(
      e => tds[e] && tds[e].length > 0 && storage.set(e, tds[e])
    );
    showNotify({ type: "success", message: "导入成功" });
    router.back();
  } catch (e) {
    showNotify({ type: "danger", message: "导入失败" });
  }
}
</script>

<template>
  <div>
    <div class="vant-pd-y">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-cell
            title="数据导出"
            is-link
            clickable
            @click="showCalendar = true"
          />

          <van-cell
            title="剪切板导入"
            is-link
            clickable
            @click="getClipboard"
          />

          <van-field v-model="text" label="文本" />

          <div class="vant-pd-y">
            <van-button round block type="primary" native-type="submit">
              手动导入
            </van-button>
          </div>
        </van-cell-group>
      </van-form>
      <van-calendar
        v-model:show="showCalendar"
        type="range"
        @confirm="onCalendarSubmit"
      />
    </div>
  </div>
</template>
