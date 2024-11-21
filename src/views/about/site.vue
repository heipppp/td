<script setup lang="ts">
import router from "@/router";
import storage from "@/utils/storage";
import TdTitle from "@/components/TdTitle/index.vue";
import { computed, ref } from "vue";
import { genHexColor } from "@/utils/color";
import { StorageEnum } from "@/enums/storageKey";
import { AreaAddressType, AreaType } from "@/types/cnf";
import { generateUUID } from "@/utils/uid";
import { showNotify } from "vant";
import { useColorHelp } from "@/hooks/useColorHelp";

const useColor = useColorHelp();

const area = ref("");
const text = ref("");
const color = ref("");

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

    const fidx = columnsStorage[idx].children.findIndex(
      e => e.text === form.text
    );
    if (fidx !== -1) {
      return showNotify({ type: "warning", message: "地址已存在哦" });
    }
    form.id = generateUUID();
    form.value = form.text;
    columnsStorage[idx].children.push(form);
    storage.set(StorageEnum.AREAKEY, columnsStorage);
    useColor.set(form.color, `${form.area}/${form.text}`);
    showNotify({ type: "success", message: "保存成功啦" });
    router.back();
  } else {
    showNotify({ type: "danger", message: "有点小问题，保存失败了" });
  }
}

function onConfirm({ selectedOptions }: any) {
  area.value = selectedOptions[0].text;
  showPicker.value = false;
}

function genColor() {
  color.value = genHexColor();
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

        <van-field
          v-model="color"
          name="color"
          label="颜色"
          placeholder="颜色"
          :rules="[{ required: true, message: '请填写颜色' }]"
        />

        <van-cell title="点我自动生成颜色" is-link @click="genColor" />
      </van-cell-group>

      <template v-if="color">
        <TdTitle> 颜色展示 </TdTitle>

        <div class="td-panel">
          <div
            class="rounded-md p-2 text-white"
            :style="{
              backgroundColor: color
            }"
          >
            这里是文字
          </div>
        </div>
      </template>

      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>
.td-panel {
  padding: 0 var(--van-padding-md);
}
</style>
