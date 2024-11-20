<script setup lang="ts">
import { CSSProperties, ref } from "vue";
import mdData from "@/config/minutedata";

import { useGenData } from "@/hooks/useGenData";
import { showNotify } from "vant";

const { prev, next, weeks, tableData } = useGenData();

defineOptions({
  name: "Demo"
});

const firstTableWidth = 80;
const baseTableWidth = 80;

const visible = ref(false);

const sheetVisible = ref(false);

const actions = ref([
  { name: "日期", disabled: true },
  { name: "地点", disabled: true },
  { name: "时间", disabled: true },
  { name: "时长", disabled: true },
  { name: "删除", color: "#ee0a24" }
]);

const tableStyled = ref<CSSProperties>({
  width: "100%",
  tableLayout: "fixed",
  borderCollapse: "collapse"
});
function openDialog() {
  showNotify({ type: "success", message: "保存成功" });
}

function onOpenSheet(e: any) {
  actions.value[0].name = e.day;
  actions.value[1].name = e.site;
  actions.value[2].name = e.time;
  actions.value[3].name = `${e.diff * 10}分钟`;
  sheetVisible.value = true;
}

function onSelect() {
  console.log(1);
}
</script>

<template>
  <div class="h-full">
    <!-- dialog -->
    <div>
      <van-popup
        v-model:show="visible"
        position="bottom"
        round
        :style="{ padding: '64px' }"
        >内容</van-popup
      >
    </div>

    <!-- sheet -->
    <van-action-sheet
      v-model:show="sheetVisible"
      :actions="actions as any"
      @select="onSelect"
    />

    <div class="flex gap-2 justify-between p-2">
      <van-button size="small" type="primary" @click="prev">上一周</van-button>
      <van-button size="small" type="warning" @click="next">下一周</van-button>
    </div>

    <!-- Container -->
    <div class="flex gap-2 text-xs text-center h-full">
      <div
        v-for="(t, idx) in tableData"
        :key="t.id"
        :class="[{ 'td-container-bg': idx % 2 === 0 }]"
        class="flex-1"
      >
        <div>
          <div>
            {{ t.text }}
          </div>
          <div>
            {{ t.wk }}
          </div>
        </div>
        <div class="flex gap-2 flex-col">
          <div
            v-for="d in t.list"
            :key="d.id"
            class="rounded-md box-border"
            :style="{
              height: `${d.diff * 2.5}vmin`,
              marginTop: `${d.top * 2.5}vmin`,
              backgroundColor: d.color,
              color: '#FFF'
            }"
            @click="onOpenSheet(d)"
          >
            <div>
              {{ d.time }}
            </div>

            <div>
              {{ d.site }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="overflow-y-scroll">
      <div>
        <table :style="tableStyled">
          <colgroup>
            <col :width="firstTableWidth" />
            <col v-for="i in weeks.length" :key="i" :width="baseTableWidth" />
          </colgroup>

          <thead>
            <tr>
              <td class="table__sticky">
                <div>时间</div>
              </td>
              <td v-for="d in weeks" :key="d.id">{{ d.text }}</td>
            </tr>
          </thead>
        </table>
      </div>

      <div class="h-full">
        <table :style="tableStyled" class="td-table">
          <colgroup>
            <col :width="firstTableWidth" />
            <col v-for="i in weeks.length" :key="i" :width="baseTableWidth" />
          </colgroup>

          <tbody>
            <tr v-for="(i, idx) in mdData" :key="i" class="td-table__row">
              <td class="table__sticky">
                <div v-if="idx % 3 === 0" class="cell">{{ i }}</div>
              </td>

              <td
                v-for="(d, i) in weeks.length"
                :key="i"
                class="table__cell"
                :class="[{ 'td-table__active': !!d }]"
              >
                <div v-if="d">
                  {{ d }}
                </div>
                <div v-else class="cell">-</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> -->
  </div>
</template>

<style scoped>
.table__sticky {
  position: sticky;
  left: 0;
  z-index: 1;
  background: rgba(255, 255, 255, 0.8);
}

.td-table {
  border: 1px solid #e5e7eb;
}

.td-table__row {
  border-bottom: 1px solid #ebeef5;
}

.table__cell {
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  position: relative;
}

.cell {
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  overflow-wrap: break-word;
  line-height: 23px;
  padding: 0 12px;
}

.td-table__active {
  background: red;
}

/*  */

.td-container-bg {
  /* background: #fff; */
}
</style>
