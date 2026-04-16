<template>
  <div class="product-image-stock">
    <div class="image-container">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="product.name"
        class="product-image"
      />
      <div v-else class="image-placeholder">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ccc"
          stroke-width="1"
          width="60"
          height="60"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            ry="2"
            stroke-dasharray="4,4"
          />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21,15 16,10 5,21" />
        </svg>
      </div>
    </div>

    <div class="stock-summary">
      <div class="stock-row">
        <span class="stock-label">Quantity</span>
        <span class="stock-value">{{ product.quantity }} {{ product.unit }}</span>
      </div>
      <div class="stock-row">
        <span class="stock-label">Status</span>
        <span class="stock-value">{{ product.availability }}</span>
      </div>
      <div class="stock-row">
        <span class="stock-label">Threshold value</span>
        <span class="stock-value">{{ product.thresholdValue }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductImageStock",
  props: {
    product: Object,
  },
}
</script>

<style scoped>
.product-image-stock {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.image-container {
  width: 180px;
  height: 180px;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}

.stock-summary {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stock-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.stock-label {
  font-size: 14px;
  color: #858d9d;
}

.stock-value {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}
</style>