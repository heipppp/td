<script setup lang="ts">
import { computed, ref } from "vue";
import TdTitle from "@/components/TdTitle/index.vue";

import storage from "@/utils/storage";
import { StorageEnum } from "@/enums/storageKey";
import { AreaAddressType, AreaType } from "@/types/cnf";
import { generateUUID } from "@/utils/uid";
import { showNotify } from "vant";
import router from "@/router";

const area = ref("");
const text = ref("");

const showPicker = ref(false);

const columns = computed(() =>
  storage.get<AreaType[]>(StorageEnum.AREAKEY, []).map(e => {
    return { value: e.value, text: e.text };
  })
);

function onSubmit(form: AreaAddressType) {
  const idx = columns.value.findIndex(e => e.text === form.area);
  if (idx !== -1) {
    const columnsStorage = storage.get<AreaType[]>(StorageEnum.AREAKEY, []);
    form.id = generateUUID();
    form.value = form.text;
    columnsStorage[idx].children.push(form);
    storage.set(StorageEnum.AREAKEY, columnsStorage);
    showNotify({ type: "success", message: "保存成功" });
    router.back();
  } else {
    showNotify({ type: "danger", message: "保存失败" });
  }
}

function onConfirm({ selectedOptions }: any) {
  area.value = selectedOptions[0].text;
  showPicker.value = false;
}
</script>

<template>
  <div>
    <TdTitle />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="area"
          is-link
          readonly
          label="地区"
          placeholder="选择地区"
          name="area"
          :rules="[{ required: true, message: '请选择地区' }]"
          @click="showPicker = true"
        />

        <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>

        <van-field
          v-model="text"
          name="text"
          label="教室"
          placeholder="教室"
          :rules="[{ required: true, message: '请填写教室' }]"
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
