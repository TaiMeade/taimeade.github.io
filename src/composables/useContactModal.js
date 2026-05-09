import { ref } from 'vue'

// Module-level singleton — shared across all components without provide/inject
const show = ref(false)

export function useContactModal() {
  return {
    show,
    open()  { show.value = true },
    close() { show.value = false },
  }
}
