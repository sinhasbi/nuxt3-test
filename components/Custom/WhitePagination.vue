<template>
  <div class="pagination-simple">
    <!-- 上一頁按鈕 -->
    <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
      ◀
    </button>
    <!-- 當前頁碼 / 總頁碼 -->
    <span class="page-info"> {{ currentPage }} / {{ totalPages }} </span>
    <!-- 下一頁按鈕 -->
    <button
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
      ▶
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  totalItems: {
    type: Number,
    required: true
  },
  itemsPerPage: {
    type: Number,
    default: 30
  },
  maxVisiblePages: {
    type: Number,
    default: 5
  },
  currentPage: {
    // 新增這行
    type: Number,
    default: 1
  }
})

// 定義 emits
const emit = defineEmits(["page-change"])

const currentPage = ref(props.currentPage)

watch(
  () => props.currentPage,
  newPage => {
    currentPage.value = newPage
  }
)

const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
)

const visiblePages = computed(() => {
  const pages = []
  const halfVisible = Math.floor(props.maxVisiblePages / 2)
  let startPage = Math.max(1, currentPage.value - halfVisible)
  const endPage = Math.min(
    totalPages.value,
    startPage + props.maxVisiblePages - 1
  )

  // 調整 startPage 確保顯示足夠的頁碼
  if (endPage - startPage + 1 < props.maxVisiblePages) {
    startPage = Math.max(1, endPage - props.maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return pages
})

// 是否顯示第一頁
const shouldShowFirstPage = computed(() => {
  return visiblePages.value[0] > 1
})

// 是否顯示第一個省略符號
const shouldShowFirstEllipsis = computed(() => {
  return visiblePages.value[0] > 2
})

// 是否顯示最後的省略符號
const showEllipsisAfter = computed(
  () => visiblePages.value[visiblePages.value.length - 1] < totalPages.value
)

const changePage = page => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    emit("page-change", currentPage.value)
  }
}
</script>

<style scoped>
.pagination-simple {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;

  border-radius: 4px;
  background-color: #fff;
  width: fit-content;
}
button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 16px;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.page-info {
  padding: 6px 12px;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
  min-width: 60px;
}
</style>
