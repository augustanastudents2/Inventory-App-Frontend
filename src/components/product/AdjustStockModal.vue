<template>
  <ModalWrapper :visible="visible" maxWidth="520px" @close="$emit('close')">
    <div class="adjust-stock-modal">
      <h2 class="modal-title">Adjust Stock</h2>
      <p class="modal-sub" v-if="product">
        {{ product.name }} (Current: {{ product.quantity }} {{ product.unit }})
      </p>

      <div class="mode-selector">
        <button 
          class="mode-btn" 
          :class="{ active: mode === 'delta' }" 
          @click="mode = 'delta'"
        >
          Add/Remove
        </button>
        <button 
          class="mode-btn" 
          :class="{ active: mode === 'absolute' }" 
          @click="mode = 'absolute'"
        >
          Set New Total
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="form">
        <div class="row" v-if="mode === 'delta'">
          <label class="label">Change Quantity</label>
          <input
            class="input"
            type="number"
            v-model.number="delta"
            step="1"
            placeholder="e.g. -2 or 10"
            required
          />
          <p class="input-hint">Enter positive to add, negative to subtract.</p>
        </div>

        <div class="row" v-else>
          <label class="label">New Total Quantity</label>
          <input
            class="input"
            type="number"
            v-model.number="absolute"
            min="0"
            step="1"
            :placeholder="`Current: ${product?.quantity || 0}`"
            required
          />
          <p class="input-hint">The stock will be updated to exactly this amount.</p>
        </div>

        <div class="row">
          <label class="label">Reason (optional)</label>
          <input
            class="input"
            type="text"
            v-model.trim="reason"
            placeholder="e.g. Damaged, Stock count, New delivery"
          />
        </div>

        <div class="actions">
          <button type="button" class="btn-secondary" @click="$emit('close')">
            Cancel
          </button>
          <button type="submit" class="btn-primary">Apply</button>
        </div>
      </form>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from "../common/ModalWrapper.vue"

export default {
  name: "AdjustStockModal",
  components: { ModalWrapper },
  props: {
    visible: { type: Boolean, default: false },
    product: { type: Object, default: null },
  },
  data() {
    return {
      mode: "delta", // delta | absolute
      delta: null,
      absolute: null,
      reason: "",
    }
  },
  watch: {
    visible(next) {
      if (next) {
        this.mode = "delta"
        this.delta = null
        this.absolute = null
        this.reason = ""
      }
    },
  },
  methods: {
    handleSubmit() {
      if (!this.product) return

      let finalDelta = 0
      if (this.mode === "delta") {
        finalDelta = Number(this.delta || 0)
      } else {
        const newVal = Number(this.absolute || 0)
        finalDelta = newVal - (this.product.quantity || 0)
      }

      if (finalDelta === 0 && this.mode === "delta") return

      this.$emit("apply", { 
        productId: this.product.id, 
        delta: finalDelta, 
        reason: this.reason || (this.mode === 'absolute' ? 'Stock count update' : '')
      })
    },
  },
}
</script>

<style scoped>
.adjust-stock-modal {
  padding: 40px;
}

.modal-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--apple-text-primary);
  letter-spacing: -0.02em;
}

.modal-sub {
  margin-top: 8px;
  color: var(--apple-text-secondary);
  font-size: 15px;
}

.mode-selector {
  display: flex;
  background: var(--apple-gray);
  padding: 4px;
  border-radius: 12px;
  margin-top: 24px;
}

.mode-btn {
  flex: 1;
  padding: 8px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--apple-text-secondary);
  background: transparent;
  transition: all 0.2s ease;
}

.mode-btn.active {
  background: var(--apple-card-bg);
  color: var(--apple-text-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.form {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 13px;
  font-weight: 600;
  color: var(--apple-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-left: 4px;
}

.input {
  padding: 12px 16px;
  border-radius: 12px;
  border: none;
  background: var(--apple-gray);
  font-size: 16px;
  color: var(--apple-text-primary);
  transition: background 0.2s ease;
}

.input:focus {
  background: rgba(0, 0, 0, 0.08);
}

.input-hint {
  font-size: 12px;
  color: var(--apple-text-secondary);
  padding-left: 4px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
  padding-top: 24px;
  border-top: 1px solid var(--apple-border);
}

.btn-primary {
  padding: 12px 24px;
  background: var(--apple-blue);
  color: #fff;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;
}

.btn-primary:hover {
  background: #0077ed;
}

.btn-secondary {
  padding: 12px 24px;
  background: var(--apple-gray);
  color: var(--apple-text-primary);
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;
}

.btn-secondary:hover {
  background: rgba(0, 0, 0, 0.08);
}
</style>
