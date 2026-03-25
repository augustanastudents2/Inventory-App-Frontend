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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-container {
  background: #fff;
  border-radius: 12px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>