<template>
  <div class="pagination">
    <!-- 上一頁按鈕 -->
    <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
      ◀
    </button>

    <!-- 第一頁 -->
    <span
      v-if="shouldShowFirstPage"
      :class="['page-number', { active: 1 === currentPage }]"
      @click="changePage(1)"
    >
      1
    </span>

    <!-- 第一頁之後的省略符號 -->
    <span v-if="shouldShowFirstEllipsis">...</span>

    <!-- 頁碼顯示 -->
    <span
      v-for="page in visiblePages"
      :key="page"
      :class="['page-number', { active: page === currentPage }]"
      @click="changePage(page)"
    >
      {{ page }}
    </span>

    <!-- 最後一頁前的省略符號 -->
    <span v-if="showEllipsisAfter">...</span>

    <!-- 最後一頁 -->
    <span
      v-if="showEllipsisAfter"
      :class="['page-number', { active: totalPages === currentPage }]"
      @click="changePage(totalPages)"
    >
      {{ totalPages }}
    </span>

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
// 定義 props
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

// 使用 props.currentPage 初始化 currentPage
const currentPage = ref(props.currentPage)

// 監聽 currentPage 的變化
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
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.page-number {
  cursor: pointer;
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.page-number.active {
  background: rgba(253, 207, 159, 1);
  border: none;
}

button {
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
