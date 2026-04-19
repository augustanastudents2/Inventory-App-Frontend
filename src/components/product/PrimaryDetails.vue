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
        <div class="tags-row" v-if="product.tags && product.tags.length">
          <span class="tag" v-for="tag in product.tags" :key="tag">#{{ tag }}</span>
        </div>
        <span class="detail-value" v-else>—</span>
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
      return d.toLocaleDateString(undefined, {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    },
  },
}
</script>

<style scoped>
.section-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--apple-text-primary);
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.detail-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-row {
  display: flex;
  align-items: flex-start;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--apple-border);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  width: 180px;
  font-size: 13px;
  font-weight: 600;
  color: var(--apple-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex-shrink: 0;
  padding-top: 2px;
}

.detail-value {
  font-size: 16px;
  color: var(--apple-text-primary);
  font-weight: 500;
  line-height: 1.4;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 13px;
  font-weight: 600;
  color: var(--apple-blue);
  background: rgba(0, 113, 227, 0.05);
  padding: 4px 12px;
  border-radius: 12px;
}
</style>
