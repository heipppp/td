<script setup lang="ts">
import { ref } from "vue";
import { showNotify } from "vant";
import { onDelTdI } from "@/hooks/useTodoHelp";
import { useTodoStore } from "@/store/modules/todo";
import { TodoItem } from "@/types/todo";
import Todo from "@/components/Todo/index.vue";

const useTodo = useTodoStore();
useTodo.genTds();

defineOptions({
  name: "Demo"
});

const todoRef = ref();
const visible = ref(false);
const sheetVisible = ref(false);
const activeTd = ref();
const actions = ref([
  { name: "日期", disabled: true },
  { name: "地点", disabled: true },
  { name: "时间", disabled: true },
  { name: "时长", disabled: true },
  { name: "类目", disabled: true },
  { name: "编辑" },
  { name: "删除", color: "#ee0a24" }
]);

function onOpenSheet(e: TodoItem) {
  actions.value[0].name = e.day;
  actions.value[1].name = e.site;
  actions.value[2].name = `${e.stime} - ${e.etime}`;
  actions.value[3].name = `${e.diff * 10}分钟`;
  actions.value[4].name = e.category;
  sheetVisible.value = true;
  activeTd.value = e;
}

function onSelect({ name }: { name: "编辑" | "删除" }) {
  if (name === "删除") {
    const flg = onDelTdI(activeTd.value);
    if (flg) {
      showNotify({ type: "success", message: "删除成功" });
      sheetVisible.value = false;
    } else {
      showNotify({ type: "danger", message: "有点小问题，删除失败了" });
    }
  } else {
    sheetVisible.value = false;
    setTimeout(() => todoRef.value.onOpenEdit(activeTd.value), 300);
  }
}
</script>

<template>
  <div class="h-full">
    <Todo ref="todoRef" />
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

    <div
      class="flex gap-2 justify-between p-2 border-b border-gray-100 bg-white"
    >
      <van-button
        plain
        size="small"
        type="primary"
        icon="arrow-left"
        @click="useTodo.prev"
        >前七天</van-button
      >
      <van-button
        size="small"
        plaintype="warning"
        icon="arrow"
        @click="useTodo.next"
      />
    </div>

    <!-- Container -->
    <div
      class="flex text-xs text-center h-full border-l border-b scroll-y overflow-scroll"
    >
      <div v-for="t in useTodo.todos" :key="t.id" class="flex-1 border-r">
        <van-sticky>
          <div class="overflow-hidden bg-white py-2 border-b border-gray-100">
            <div>
              {{ t.text }}
            </div>

            <div>
              <van-badge :content="t.list.length" :show-zero="false">
                {{ t.wk }}
              </van-badge>
            </div>
          </div>
        </van-sticky>

        <div class="flex gap-2 flex-col">
          <div
            v-for="d in t.list"
            :key="d.id"
            class="rounded-md"
            :style="{
              height: `${d.diff * 2.5}vmin`,
              marginTop: `${d.top * 2.5}vmin`,
              backgroundColor: d.color,

              color: '#FFF'
            }"
            @click="onOpenSheet(d)"
          >
            <div>
              {{ d.stime }}
            </div>

            <div>
              {{ d.etime }}
            </div>

            <div>
              {{ d.site }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*  */
</style>
