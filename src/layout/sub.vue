<template>
  <van-nav-bar
    :title="navTitle"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <router-view />
</template>

<script setup lang="ts">
import router from "@/router";
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const navTitle = computed(() => (route.meta.title as string) || "-");
function onClickLeft() {
  router.back();
}
</script>
