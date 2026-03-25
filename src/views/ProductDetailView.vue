<template>
  <AppLayout>
    <div class="product-detail" v-if="product">
      <ProductHeader
        :product="product"
        @edit="handleEdit"
        @download="handleDownload"
      />

      <ProductTabs v-model="activeTab" />

      <div class="product-content">
        <div class="product-left" v-if="activeTab === 'overview'">
          <PrimaryDetails :product="product" />
          <SupplierDetails :supplier="product.supplier" />
          <StockLocations :locations="product.stockLocations" />
        </div>

        <div class="product-left" v-else-if="activeTab === 'purchases'">
          <div class="placeholder-content">
            <p>Purchases content will be displayed here.</p>
          </div>
        </div>

        <div class="product-left" v-else-if="activeTab === 'adjustments'">
          <div class="placeholder-content">
            <p>Adjustments content will be displayed here.</p>
          </div>
        </div>

        <div class="product-left" v-else-if="activeTab === 'history'">
          <div class="placeholder-content">
            <p>History content will be displayed here.</p>
          </div>
        </div>

        <ProductImageStock :product="product" class="product-right" />
      </div>
    </div>

    <div v-else class="not-found">
      <h2>Product not found</h2>
      <router-link to="/inventory" class="back-link"
        >← Back to Inventory</router-link
      >
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "../components/layout/AppLayout.vue"
import ProductHeader from "../components/product/ProductHeader.vue"
import ProductTabs from "../components/product/ProductTabs.vue"
import PrimaryDetails from "../components/product/PrimaryDetails.vue"
import SupplierDetails from "../components/product/SupplierDetails.vue"
import StockLocations from "../components/product/StockLocations.vue"
import ProductImageStock from "../components/product/ProductImageStock.vue"

export default {
  name: "ProductDetailView",
  components: {
    AppLayout,
    ProductHeader,
    ProductTabs,
    PrimaryDetails,
    SupplierDetails,
    StockLocations,
    ProductImageStock,
  },
  data() {
    return {
      activeTab: "overview",
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
      console.log("Edit product:", this.product.id)
    },
    handleDownload() {
      console.log("Download product:", this.product.id)
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
  display: flex;
  gap: 40px;
  margin-top: 24px;
}

.product-left {
  flex: 2;
}

.product-right {
  flex: 1;
}

.placeholder-content {
  padding: 40px;
  text-align: center;
  color: #9ca3af;
  font-size: 16px;
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
