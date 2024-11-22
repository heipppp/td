<script setup lang="ts">
import { ref } from "vue";
import storage from "@/utils/storage";
import { StorageEnum } from "@/enums/storageKey";
import { AreaType } from "@/types/cnf";
import { showConfirmDialog } from "vant";
const areaList = ref<AreaType[]>(storage.get(StorageEnum.AREAKEY, []));
const active = ref("ba");

function del(idx: number, cdx: number) {
  showConfirmDialog({
    title: "是否删除此条记录"
  }).then(() => {
    areaList.value[idx].children.splice(cdx, 1);
    storage.set(StorageEnum.AREAKEY, areaList.value);
  });
}
</script>

<template>
  <div>
    <van-tabs v-model:active="active">
      <van-tab
        v-for="(item, idx) in areaList"
        :key="item.id"
        :title="item.text"
      >
        <template v-if="item.children && item.children.length > 0">
          <van-cell-group>
            <van-cell v-for="(c, cdx) in item.children" :key="c.id">
              <!-- 使用 title 插槽来自定义标题 -->
              <template #title>
                <div class="flex gap-2 items-center">
                  <div
                    :style="{
                      height: '10px',
                      width: '10px',
                      borderRadius: '50%',
                      backgroundColor: c.color
                    }"
                  />
                  <div>
                    {{ c.text }}
                  </div>
                </div>
              </template>

              <template #right-icon>
                <div @click="del(idx, cdx)">
                  <van-icon name="cross" color="red" />
                </div>
              </template>
            </van-cell>
          </van-cell-group>
        </template>
        <van-empty v-else image="search" description="暂无数据" />
      </van-tab>
    </van-tabs>
  </div>
</template>
