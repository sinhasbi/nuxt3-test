<template>
  <div>
    <h1>Home page</h1>
    <p>兩個根元素，頁面無法正常渲染</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth' 
});
</script>