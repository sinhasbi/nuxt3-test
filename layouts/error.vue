<template>
  <div>
    <h2>qe232rf{{ error.statusCode }}</h2>
    <p>{{ error.message }}</p>
    <NuxtLink to="/">回首頁</NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
});
</script>