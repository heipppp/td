<script setup lang="ts">
import { CSSProperties, ref } from "vue";

import { useGenData } from "@/hooks/useGenData";
import { showNotify } from "vant";

const { prev, next, weeks, tableData } = useGenData();

defineOptions({
  name: "Demo"
});

const firstTableWidth = 80;
const baseTableWidth = 80;

const visible = ref(false);

const tableStyled = ref<CSSProperties>({
  width: "100%",
  tableLayout: "fixed",
  borderCollapse: "collapse"
});
function openDialog() {
  showNotify({ type: "success", message: "保存成功" });
}
</script>

<template>
  <div>
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

    <div class="flex gap-2 justify-between p-2">
      <van-button size="small" type="primary" @click="prev">上一周</van-button>
      <van-button size="small" type="warning" @click="next">下一周</van-button>
    </div>

    <!-- container -->
    <div class="overflow-y-scroll">
      <div>
        <!-- Header -->
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

      <!-- Body -->
      <div class="h-full">
        <table :style="tableStyled" class="td-table">
          <colgroup>
            <col :width="firstTableWidth" />
            <col v-for="i in weeks.length" :key="i" :width="baseTableWidth" />
          </colgroup>

          <tbody>
            <tr v-for="t in tableData" :key="t.key" class="td-table__row">
              <td class="table__sticky">
                <div class="cell">{{ t.key }}</div>
              </td>

              <td v-for="(d, i) in t.list" :key="i" class="table__cell">
                <div v-if="d">
                  {{ d.site }}
                </div>
                <div v-else class="cell">-</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
  padding: 8px 0;
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
</style>
