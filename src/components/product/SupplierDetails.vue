<template>
  <div class="supplier-details">
    <h3 class="section-title">Supplier Details</h3>
    <div class="detail-grid">
      <div class="detail-row">
        <span class="detail-label">Supplier name</span>
        <span class="detail-value">{{ supplier.name || "N/A" }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Contact Number</span>
        <span class="detail-value">{{ supplier.contact || "N/A" }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SupplierDetails",
  props: {
    supplier: {
      type: Object,
      default: () => ({ name: "", contact: "" }),
    },
  },
}
</script>

<style scoped>
.supplier-details {
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