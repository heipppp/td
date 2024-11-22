<script setup lang="ts">
import { ref } from "vue";
import storage from "@/utils/storage";
import { StorageEnum } from "@/enums/storageKey";
import { CateType } from "@/types/cnf";
import { showConfirmDialog } from "vant";
const list = ref<CateType[]>(storage.get(StorageEnum.CATEGORYKEY, []));

function del(idx: number) {
  showConfirmDialog({
    title: "是否删除此条记录"
  }).then(() => {
    list.value.splice(idx, 1);
    storage.set(StorageEnum.CATEGORYKEY, list.value);
  });
}
</script>

<template>
  <div>
    <van-cell-group v-if="list && list.length > 0">
      <van-cell v-for="(item, idx) in list" :key="item.id" :title="item.text">
        <template #right-icon>
          <div @click="del(idx)">
            <van-icon name="cross" color="red" />
          </div>
        </template>
      </van-cell>
    </van-cell-group>

    <van-empty v-else image="search" description="暂无数据" />
  </div>
</template>
