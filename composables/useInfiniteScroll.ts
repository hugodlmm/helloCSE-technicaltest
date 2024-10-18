import { ref, onMounted, onUnmounted } from "vue";

export const useInfiniteScroll = (loadMore: () => Promise<void>, options = {}) => {
  const loading = ref(false);
  const finished = ref(false);
  const error = ref();

  const defaultOptions = {
    threshold: 100,
    immediate: true,
  };

  const { threshold, immediate } = { ...defaultOptions, ...options };

  const checkScroll = async () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (!loading.value && !finished.value && scrollPosition + threshold >= documentHeight) {
      try {
        loading.value = true;
        await loadMore();
      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    }
  };

  onMounted(() => {
    window.addEventListener("scroll", checkScroll);
    if (immediate) {
      checkScroll();
    }
  });

  onUnmounted(() => {
    window.removeEventListener("scroll", checkScroll);
  });

  return {
    loading,
    finished,
    error,
  };
};
