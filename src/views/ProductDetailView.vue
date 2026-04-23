<template>
  <AppLayout>
    <div class="product-detail-page" v-if="product">
      <header class="detail-header">
        <div class="left">
          <button class="btn-back" @click="goBack">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
          <h1 class="product-name">{{ product.name }}</h1>
        </div>
        <div class="header-actions">
          <button class="btn-secondary" @click="handleEdit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </button>
          <button class="btn-secondary" @click="showAdjustModal = true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
            Adjust Stock
          </button>
          <button class="btn-danger" @click="handleDelete">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
            Delete
          </button>
        </div>
      </header>

      <div class="detail-content">
        <div class="top-row">
          <div class="card primary-card">
            <PrimaryDetails :product="product" />
          </div>
          <div class="card chart-card">
            <StockVsThresholdChart
              :quantity="product.quantity"
              :threshold="product.thresholdValue"
              :unit="product.unit"
            />
          </div>
        </div>

        <div class="card full-chart-card">
          <StockHistoryChart
            :events="product.stockHistory"
            :createdAt="product.createdAt"
            :currentQuantity="product.quantity"
          />
        </div>

        <div class="card history-card">
          <StockHistory :events="product.stockHistory" />
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <div class="not-found-content">
        <h2>Item not found</h2>
        <p>The item you are looking for doesn't exist or has been removed.</p>
        <button class="btn-primary" @click="goBack">Return to Inventory</button>
      </div>
    </div>

    <ProductFormModal
      :visible="showEditModal"
      mode="edit"
      :initialProduct="product"
      @close="showEditModal = false"
      @save="handleSaveEdit"
    />

    <AdjustStockModal
      :visible="showAdjustModal"
      :product="product"
      @close="showAdjustModal = false"
      @apply="handleAdjustStock"
    />
  </AppLayout>
</template>

<script>
import AppLayout from "../components/layout/AppLayout.vue"
import PrimaryDetails from "../components/product/PrimaryDetails.vue"
import ProductFormModal from "../components/product/ProductFormModal.vue"
import AdjustStockModal from "../components/product/AdjustStockModal.vue"
import StockHistory from "../components/product/StockHistory.vue"
import StockHistoryChart from "../components/product/StockHistoryChart.vue"
import StockVsThresholdChart from "../components/product/StockVsThresholdChart.vue"

export default {
  name: "ProductDetailView",
  components: {
    AppLayout,
    PrimaryDetails,
    StockHistoryChart,
    StockHistory,
    StockVsThresholdChart,
    ProductFormModal,
    AdjustStockModal,
  },
  data() {
    return {
      showEditModal: false,
      showAdjustModal: false,
    }
  },
  computed: {
    product() {
      const id = this.$route.params.id
      return this.$store.getters.getProductById(id)
    },
  },
  methods: {
    handleEdit() {
      this.showEditModal = true
    },
    handleSaveEdit(updates) {
      const payload = { ...updates, id: this.product.id }

      // Upsert Settings data from free-text inputs
      if (payload.category) this.$store.dispatch("addCategory", payload.category)
      if (payload.vendor?.name)
        this.$store.dispatch("addVendor", {
          name: payload.vendor.name,
          contact: payload.vendor.contact || "",
        })
      if (payload.storage?.area || payload.storage?.sub)
        this.$store.dispatch("addStorageLocation", {
          area: payload.storage.area || "",
          sub: payload.storage.sub || "",
        })
      if (Array.isArray(payload.tags)) {
        payload.tags.forEach((t) => this.$store.dispatch("addTag", t))
      }

      delete payload.tagsInput
      delete payload.storageArea
      delete payload.storageSub
      delete payload.vendorName
      delete payload.vendorContact
      this.$store.dispatch("updateProduct", payload)
      this.showEditModal = false
    },
    handleAdjustStock(payload) {
      this.$store.dispatch("adjustStock", payload)
      this.showAdjustModal = false
    },
    handleDelete() {
      const ok = window.confirm("Delete this item? This cannot be undone.")
      if (!ok) return
      this.$store.dispatch("deleteProduct", this.product.id)
      this.$router.push("/inventory")
    },
    goBack() {
      this.$router.push("/inventory")
    },
  },
}
</script>

<style scoped>
.product-detail-page {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btn-back {
  background: transparent;
  color: var(--apple-blue);
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  width: fit-content;
}

.btn-back:hover {
  opacity: 0.8;
}

.product-name {
  font-size: 34px;
  font-weight: 700;
  color: var(--apple-text-primary);
  letter-spacing: -0.02em;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn-primary {
  padding: 10px 20px;
  background: var(--apple-blue);
  color: #fff;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-secondary {
  padding: 10px 20px;
  background: var(--apple-gray);
  color: var(--apple-text-primary);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-secondary:hover {
  background: rgba(0, 0, 0, 0.08);
}

.btn-danger {
  padding: 10px 20px;
  background: rgba(255, 59, 48, 0.1);
  color: var(--apple-red);
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-danger:hover {
  background: rgba(255, 59, 48, 0.2);
}

.detail-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.top-row {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 24px;
}

.card {
  background: var(--apple-card-bg);
  border-radius: var(--apple-radius-lg);
  padding: 32px;
  box-shadow: var(--apple-shadow);
  border: 1px solid var(--apple-border);
}

.not-found {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.not-found-content h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
}

.not-found-content p {
  color: var(--apple-text-secondary);
  margin-bottom: 24px;
}

@media (max-width: 1000px) {
  .top-row {
    grid-template-columns: 1fr;
  }
  .detail-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .header-actions {
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;
  }
  .btn-secondary,
  .btn-danger {
    flex: 1 1 auto;
    justify-content: center;
  }
}

@media (max-width: 600px) {
  .card {
    padding: 18px;
  }
  .product-name {
    font-size: 26px;
  }
  .btn-back {
    padding: 8px 12px;
  }
}
</style>
