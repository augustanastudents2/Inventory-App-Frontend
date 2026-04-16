<template>
  <AppLayout>
    <div class="product-detail" v-if="product">
      <ProductHeader
        :product="product"
        @edit="handleEdit"
        @adjust-stock="showAdjustModal = true"
        @delete="handleDelete"
        @back="goBack"
      />

      <div class="product-content">
        <div class="top-grid">
          <div class="product-left">
            <PrimaryDetails :product="product" />
          </div>
          <div class="product-right">
            <StockVsThresholdChart
              :quantity="product.quantity"
              :threshold="product.thresholdValue"
              :unit="product.unit"
            />
          </div>
        </div>

        <div class="full-width">
          <StockHistoryChart
            :events="product.stockHistory"
            :createdAt="product.createdAt"
            :currentQuantity="product.quantity"
          />
          <StockHistory :events="product.stockHistory" />
        </div>
      </div>
    </div>

    <div v-else class="not-found">
      <h2>Product not found</h2>
      <router-link to="/inventory" class="back-link"
        >← Back to Inventory</router-link
      >
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
import ProductHeader from "../components/product/ProductHeader.vue"
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
    ProductHeader,
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
      const ok = window.confirm("Delete this product? This cannot be undone.")
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
.product-detail {
  background: #fff;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.product-content {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.top-grid {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.product-left {
  flex: 2;
}

.product-right {
  flex: 1;
  min-width: 280px;
}

.full-width {
  width: 100%;
}

@media (max-width: 900px) {
  .top-grid {
    flex-direction: column;
  }
  .product-right {
    width: 100%;
    min-width: 0;
  }
}

.not-found {
  text-align: center;
  padding: 60px;
}

.not-found h2 {
  color: #6b7280;
  margin-bottom: 16px;
}

.back-link {
  color: #1a73e8;
  font-weight: 500;
  font-size: 14px;
}
</style>
