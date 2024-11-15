<script setup lang="ts">
import { useStorage } from "@/hooks/useStorage";

defineOptions({
  name: "Demo"
});

const day7 = [11, 12, 13, 14, 15, 16, 17];
</script>

<template>
  <div>
    <!-- header -->
    <header class="flex">
      <div v-for="day in day7" :key="day">
        {{ day }}
      </div>
    </header>
  </div>
</template>
