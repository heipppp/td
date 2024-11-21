<script setup lang="ts">
import { computed, ref } from "vue";
import TdTitle from "@/components/TdTitle/index.vue";

import storage from "@/utils/storage";
import { StorageEnum } from "@/enums/storageKey";
import { AreaAddressType, AreaType, CateType } from "@/types/cnf";
import { generateUUID } from "@/utils/uid";
import { showNotify } from "vant";
import router from "@/router";

const text = ref("");

const columns = computed(() =>
  storage.get<CateType[]>(StorageEnum.CATEGORYKEY, [])
);

function onSubmit(form: AreaAddressType) {
  const idx = columns.value.findIndex(e => e.text === form.text);
  if (idx !== -1) {
    return showNotify({ type: "warning", message: "类目已存在哦" });
  }
  form.id = generateUUID();
  form.value = form.text;
  columns.value.push(form);
  storage.set(StorageEnum.CATEGORYKEY, columns.value);
  showNotify({ type: "success", message: "保存成功啦" });
  router.back();
}
</script>

<template>
  <div>
    <TdTitle />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="text"
          name="text"
          label="类目"
          placeholder="请填写类目"
          :rules="[{ required: true, message: '请填写类目' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
