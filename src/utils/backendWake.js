import { ref } from "vue"

// Global reactive state for "backend is waking up" overlay
export const backendWaking = ref(false)

let pendingCount = 0
let showTimer = null

export function startBackendRequest({ delayMs = 900 } = {}) {
  pendingCount += 1

  if (pendingCount === 1) {
    if (showTimer) clearTimeout(showTimer)
    showTimer = setTimeout(() => {
      backendWaking.value = true
    }, delayMs)
  }
}

export function endBackendRequest() {
  pendingCount = Math.max(0, pendingCount - 1)

  if (pendingCount === 0) {
    if (showTimer) clearTimeout(showTimer)
    showTimer = null
    backendWaking.value = false
  }
}

