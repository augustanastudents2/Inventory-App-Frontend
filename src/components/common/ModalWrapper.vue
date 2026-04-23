<template>
  <teleport to="body">
    <transition name="modal">
      <div
        v-if="visible"
        class="modal-overlay"
        @click.self="$emit('close')"
      >
        <div class="modal-container" :style="{ maxWidth: maxWidth }">
          <slot />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: "ModalWrapper",
  props: {
    visible: { type: Boolean, default: false },
    maxWidth: { type: String, default: "560px" },
  },
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
}

.modal-container {
  background: var(--apple-card-bg);
  border-radius: var(--apple-radius-lg);
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
  border: 1px solid var(--apple-border);
}

@media (max-width: 600px) {
  .modal-overlay {
    padding: 12px;
    align-items: flex-end;
  }
  .modal-container {
    max-height: 92vh;
    border-radius: 16px;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
