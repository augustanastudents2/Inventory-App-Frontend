<template>
  <ModalWrapper :visible="visible" maxWidth="520px" @close="$emit('close')">
    <div class="adjust-stock-modal">
      <h2 class="modal-title">Adjust Stock</h2>
      <p class="modal-sub" v-if="product">
        {{ product.name }} (Current: {{ product.quantity }} {{ product.unit }})
      </p>

      <form @submit.prevent="handleSubmit" class="form">
        <div class="row">
          <label class="label">Change</label>
          <input
            class="input"
            type="number"
            v-model.number="delta"
            step="1"
            placeholder="e.g. -2 or 10"
            required
          />
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
          <button type="button" class="btn-outline" @click="$emit('close')">
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
      delta: 0,
      reason: "",
    }
  },
  watch: {
    visible(next) {
      if (next) {
        this.delta = 0
        this.reason = ""
      }
    },
  },
  methods: {
    handleSubmit() {
      const delta = Number(this.delta || 0)
      if (!delta || !this.product) return
      this.$emit("apply", { productId: this.product.id, delta, reason: this.reason })
    },
  },
}
</script>

<style scoped>
.adjust-stock-modal {
  padding: 24px 24px 20px;
}

.modal-title {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
}

.modal-sub {
  margin-top: 6px;
  color: #6b7280;
  font-size: 13px;
}

.form {
  margin-top: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label {
  font-size: 13px;
  font-weight: 600;
  color: #344054;
}

.input {
  padding: 10px 14px;
  border: 1px solid #d0d5dd;
  border-radius: 10px;
  font-size: 14px;
}

.input:focus {
  outline: none;
  border-color: #1a73e8;
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.12);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.btn-primary {
  padding: 10px 18px;
  background: #1a73e8;
  color: #fff;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  border: none;
}

.btn-primary:hover {
  background: #1557b0;
}

.btn-outline {
  padding: 10px 18px;
  background: #fff;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
}

.btn-outline:hover {
  background: #f9fafb;
}
</style>
