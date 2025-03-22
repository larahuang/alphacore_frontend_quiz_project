<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(() => {
  // console.log(process.env.DEFAULT_API);
});
</script>
