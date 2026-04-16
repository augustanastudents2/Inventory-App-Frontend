<template>
  <div class="primary-details">
    <h3 class="section-title">Primary Details</h3>
    <div class="detail-grid">
      <div class="detail-row">
        <span class="detail-label">Item name</span>
        <span class="detail-value">{{ product.name }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Item ID</span>
        <span class="detail-value">{{ product.id }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Description</span>
        <span class="detail-value">{{ product.description || "—" }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Category</span>
        <span class="detail-value">{{ product.category || "—" }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Use tags</span>
        <span class="detail-value">{{ tagsText }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Storage</span>
        <span class="detail-value">{{ storageText }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Vendor</span>
        <span class="detail-value">{{ vendorText }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Expiry date</span>
        <span class="detail-value">{{ product.expiryDate || "—" }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Created</span>
        <span class="detail-value">{{ formatDate(product.createdAt) }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Last updated</span>
        <span class="detail-value">{{ formatDate(product.updatedAt) }}</span>
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
  computed: {
    tagsText() {
      const tags = Array.isArray(this.product?.tags) ? this.product.tags : []
      return tags.length ? tags.join(", ") : "—"
    },
    storageText() {
      const a = this.product?.storage?.area || ""
      const s = this.product?.storage?.sub || ""
      const text = [a, s].filter(Boolean).join(" · ")
      return text || "—"
    },
    vendorText() {
      const n = this.product?.vendor?.name || ""
      const c = this.product?.vendor?.contact || ""
      const text = [n, c].filter(Boolean).join(" · ")
      return text || "—"
    },
  },
  methods: {
    formatDate(iso) {
      if (!iso) return "—"
      const d = new Date(iso)
      if (Number.isNaN(d.getTime())) return String(iso)
      return d.toLocaleString()
    },
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