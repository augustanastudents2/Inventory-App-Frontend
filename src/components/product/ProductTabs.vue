<template>
  <div class="product-tabs">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="tab-btn"
      :class="{ active: modelValue === tab.value }"
      @click="$emit('update:modelValue', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ProductTabs",
  props: {
    modelValue: {
      type: String,
      default: "overview",
    },
  },
  data() {
    return {
      tabs: [
        { label: "Overview", value: "overview" },
        { label: "Purchases", value: "purchases" },
        { label: "Adjustments", value: "adjustments" },
        { label: "History", value: "history" },
      ],
    }
  },
}
</script>

<style scoped>
.product-tabs {
  display: flex;
  gap: 0;
  border-bottom: 2px solid #e5e7eb;
}

.tab-btn {
  padding: 12px 24px;
  background: none;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  position: relative;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: #1f2937;
}

.tab-btn.active {
  color: #1f2937;
  font-weight: 600;
}

.tab-btn.active::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background: #1f2937;
}
</style>