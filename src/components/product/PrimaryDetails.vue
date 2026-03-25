<template>
  <div class="primary-details">
    <h3 class="section-title">Primary Details</h3>
    <div class="detail-grid">
      <div class="detail-row">
        <span class="detail-label">Product name</span>
        <span class="detail-value">{{ product.name }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Product ID</span>
        <span class="detail-value">{{ product.id }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Product category</span>
        <span class="detail-value">{{ product.category }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Expiry Date</span>
        <span class="detail-value">{{ product.expiryDate }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Threshold Value</span>
        <span class="detail-value">{{ product.thresholdValue }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrimaryDetails",
  props: {
    product: Object,
  },
}
</script>

<style scoped>
.primary-details {
  margin-bottom: 32px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
}

.detail-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-row {
  display: flex;
  align-items: center;
}

.detail-label {
  width: 200px;
  font-size: 14px;
  color: #858d9d;
  flex-shrink: 0;
}

.detail-value {
  font-size: 14px;
  color: #1f2937;
  font-weight: 500;
}
</style>