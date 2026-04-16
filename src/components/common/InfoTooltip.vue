<template>
  <span
    ref="trigger"
    class="info"
    tabindex="0"
    role="button"
    aria-label="Help"
    @mouseenter="open"
    @mouseleave="close"
    @focus="open"
    @blur="close"
  >
    i
  </span>

  <teleport to="body">
    <div
      v-if="visible"
      class="tooltip"
      role="tooltip"
      :style="{ top: `${pos.top}px`, left: `${pos.left}px` }"
      @mouseenter="hoveringTooltip = true"
      @mouseleave="hoveringTooltip = false; close()"
    >
      {{ text }}
    </div>
  </teleport>
</template>

<script>
function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

export default {
  name: "InfoTooltip",
  props: {
    text: { type: String, required: true },
    maxWidth: { type: Number, default: 320 },
  },
  data() {
    return {
      visible: false,
      hoveringTooltip: false,
      pos: { top: 0, left: 0 },
      raf: null,
    }
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.reposition, true)
    window.removeEventListener("resize", this.reposition)
    if (this.raf) cancelAnimationFrame(this.raf)
  },
  methods: {
    open() {
      this.visible = true
      this.reposition()
      window.addEventListener("scroll", this.reposition, true)
      window.addEventListener("resize", this.reposition)
    },
    close() {
      // allow moving mouse from trigger into tooltip
      this.raf = requestAnimationFrame(() => {
        if (!this.hoveringTooltip) {
          this.visible = false
          window.removeEventListener("scroll", this.reposition, true)
          window.removeEventListener("resize", this.reposition)
        }
      })
    },
    reposition() {
      const el = this.$refs.trigger
      if (!el) return

      const rect = el.getBoundingClientRect()
      const padding = 12
      const tooltipWidth = Math.min(this.maxWidth, window.innerWidth - padding * 2)

      const left = clamp(
        rect.left + rect.width / 2 - tooltipWidth / 2,
        padding,
        window.innerWidth - padding - tooltipWidth
      )
      const top = rect.bottom + 10

      this.pos = { top, left }
    },
  },
}
</script>

<style scoped>
.info {
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  color: #6b7280;
  font-size: 12px;
  font-weight: 900;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: help;
  user-select: none;
}

.info:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.18);
  border-color: #1a73e8;
  color: #1a73e8;
}

.tooltip {
  position: fixed;
  z-index: 9999;
  width: min(320px, calc(100vw - 24px));
  max-width: 320px;
  padding: 10px 12px;
  border-radius: 10px;
  background: #111827;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.35;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
}
</style>
