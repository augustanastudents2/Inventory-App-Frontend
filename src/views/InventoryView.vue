<template>
  <AppLayout @search="handleSearch">
    <div class="inventory-page">
      <ProductsTable
        :products="sortedProducts"
        :currentPage="currentPage"
        :totalPages="totalPages"
        :sortKey="sortKey"
        :sortDir="sortDir"
        @add-product="showAddModal = true"
        @page-change="currentPage = $event"
        @view-product="viewProduct"
        @sort-change="handleSortChange"
      />

      <ProductFormModal
        :visible="showAddModal"
        mode="add"
        @close="showAddModal = false"
        @save="handleAddProduct"
      />
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "../components/layout/AppLayout.vue"
import ProductsTable from "../components/inventory/ProductsTable.vue"
import ProductFormModal from "../components/product/ProductFormModal.vue"

export default {
  name: "InventoryView",
  components: {
    AppLayout,
    ProductsTable,
    ProductFormModal,
  },
  data() {
    return {
      showAddModal: false,
      currentPage: 1,
      perPage: 10,
      searchQuery: "",
      sortKey: "",
      sortDir: "asc", // asc | desc
    }
  },
  computed: {
    allProducts() {
      return this.$store.state.products
    },
    filteredProducts() {
      if (!this.searchQuery) return this.allProducts
      const q = this.searchQuery.toLowerCase()
      return this.allProducts.filter((p) => {
        const haystack = [
          p.name,
          p.id,
          p.category,
          p.storage?.area,
          p.storage?.sub,
          p.vendor?.name,
          p.vendor?.contact,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
        return haystack.includes(q)
      })
    },
    sortedProducts() {
      const items = this.filteredProducts.slice()
      if (this.sortKey !== "category") return items

      const dir = this.sortDir === "desc" ? -1 : 1
      return items.sort((a, b) => {
        const ac = String(a.category || "Uncategorized").toLowerCase()
        const bc = String(b.category || "Uncategorized").toLowerCase()
        if (ac < bc) return -1 * dir
        if (ac > bc) return 1 * dir
        return String(a.name || "").localeCompare(String(b.name || "")) * dir
      })
    },
    totalPages() {
      return Math.ceil(this.sortedProducts.length / this.perPage) || 1
    },
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query
      this.currentPage = 1
    },
    handleAddProduct(product) {
      // Remove helper-only form fields before storing
      const payload = { ...product }

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
      this.$store.dispatch("addProduct", payload)
      this.showAddModal = false
    },
    viewProduct(product) {
      this.$router.push(`/inventory/product/${product.id}`)
    },
    handleSortChange({ key }) {
      if (this.sortKey === key) {
        this.sortDir = this.sortDir === "asc" ? "desc" : "asc"
      } else {
        this.sortKey = key
        this.sortDir = "asc"
      }
      this.currentPage = 1
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
