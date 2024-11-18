<template>
  <div>
    <AppHeader />

    <slot />

    <AppFooter />
  </div>
</template>

<style scoped>
.header {
  /* 設定 header 樣式 */
  padding: 1rem;
  background-color: #f8f9fa;
}

.footer {
  /* 設定 footer 樣式 */
  padding: 1rem;
  background-color: #f8f9fa;
  text-align: center;
}
</style>
