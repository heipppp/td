<script setup lang="ts">
import TdTitle from "@/components/TdTitle/index.vue";
import { showConfirmDialog } from "vant";

function removeAllCache() {
  showConfirmDialog({
    title: "警告",
    message: "是否清除所有记录？"
  }).then(() => {
    setTimeout(() => {
      showConfirmDialog({
        title: "再次提醒",
        message: "再次提醒是否清除所有记录？"
      }).then(() => {
        localStorage.clear();
        window.location.reload();
      });
    }, 200);
  });
}
</script>

<template>
  <div>
    <TdTitle>内容查看</TdTitle>
    <van-cell-group inset>
      <van-cell title="地址信息" is-link clickable to="/setting/site-view" />
      <van-cell
        title="类目信息"
        is-link
        clickable
        to="/setting/category-view"
      />
    </van-cell-group>
    <TdTitle>内容维护</TdTitle>
    <van-cell-group inset>
      <van-cell title="地址维护" is-link clickable to="/setting/site" />
      <van-cell title="类目维护" is-link clickable to="/setting/category" />
    </van-cell-group>

    <TdTitle>内容新增</TdTitle>
    <van-cell-group inset>
      <van-cell title="数据批量" is-link clickable to="/operate/batch" />
      <van-cell title="数据同步" is-link clickable to="/operate/export" />
    </van-cell-group>

    <TdTitle>清除信息</TdTitle>
    <div class="td-panel">
      <van-button
        block
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        @click="removeAllCache"
        >清除所有信息</van-button
      >
    </div>
  </div>
</template>

<style scoped>
.td-panel {
  padding: 0 var(--van-padding-md);
}
</style>
