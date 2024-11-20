import { defineStore } from "pinia"
import { ref, computed } from "vue"

export const useUserStore = defineStore("user", () => {
  // state
  const loginStatus = ref<boolean>(false)
  const profile = ref<object>({})
  const userId = ref<string>("")

  // Actions
  const updateLoginStatus = (status: boolean): void => {
    loginStatus.value = status
  }

  const setUserData = (id: string): void => {
    userId.value = id
    // profile.value = data;
  }

  const clearLoginData = (): void => {
    loginStatus.value = false
    profile.value = {}
    userId.value = ""
  }

  // Getters
  const isLogin = computed(() => loginStatus.value)
  const storeProfile = computed(() => profile.value)
  const currentUserId = computed(() => userId.value)

  return {
    loginStatus,
    profile,
    userId,
    updateLoginStatus,
    setUserData,
    clearLoginData,
    isLogin,
    storeProfile,
    currentUserId
  }
})
