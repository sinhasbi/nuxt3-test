export const useMainStore = defineStore(
  "main",
  () => {
    const counter = ref(0);
    const doubleCounter = computed(() => counter.value * 2);
    const increment = () => {
      counter.value++;
    };

    const reset = () => {
      console.log("click rest");
      counter.value = 0;
    };

    return {
      counter,
      doubleCounter,
      increment,
      reset,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
