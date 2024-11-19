<script setup lang="ts">
import TdTitle from "@/components/TdTitle/index.vue";
</script>

<template>
  <div>
    <TdTitle>内容查看</TdTitle>
    <van-cell-group inset>
      <van-cell title="地址信息" is-link clickable to="/setting/site-view" />
    </van-cell-group>
    <TdTitle>内容维护</TdTitle>
    <van-cell-group inset>
      <van-cell title="地址维护" is-link clickable to="/setting/site" />
    </van-cell-group>
  </div>
</template>
