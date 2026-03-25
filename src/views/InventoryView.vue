<template>
  <AppLayout @search="handleSearch">
    <div class="inventory-page">
      <OverallInventory :data="overallInventory" />
      <ProductsTable
        :products="filteredProducts"
        :currentPage="currentPage"
        :totalPages="totalPages"
        @add-product="showAddModal = true"
        @page-change="currentPage = $event"
        @view-product="viewProduct"
      />

      <AddProductModal
        :visible="showAddModal"
        @close="showAddModal = false"
        @add="handleAddProduct"
      />
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "../components/layout/AppLayout.vue"
import OverallInventory from "../components/inventory/OverallInventory.vue"
import ProductsTable from "../components/inventory/ProductsTable.vue"
import AddProductModal from "../components/inventory/AddProductModal.vue"

export default {
  name: "InventoryView",
  components: {
    AppLayout,
    OverallInventory,
    ProductsTable,
    AddProductModal,
  },
  data() {
    return {
      showAddModal: false,
      currentPage: 1,
      perPage: 10,
      searchQuery: "",
    }
  },
  computed: {
    overallInventory() {
      return this.$store.state.overallInventory
    },
    allProducts() {
      return this.$store.state.products
    },
    filteredProducts() {
      if (!this.searchQuery) return this.allProducts
      const q = this.searchQuery.toLowerCase()
      return this.allProducts.filter(
        (p) => p.name.toLowerCase().includes(q) || p.id.includes(q)
      )
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.perPage) || 1
    },
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query
      this.currentPage = 1
    },
    handleAddProduct(product) {
      this.$store.dispatch("addProduct", product)
      this.showAddModal = false
    },
    viewProduct(product) {
      this.$router.push(`/inventory/product/${product.id}`)
    },
  },
}
</script>

<style scoped>
.inventory-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>