import { ref, computed } from 'vue'

export const showToast = ref(false)
export const totalCount = 1
export const triggerToast = () => (showToast.value = true)
export const duplicateCount = () => (totalCount+1)