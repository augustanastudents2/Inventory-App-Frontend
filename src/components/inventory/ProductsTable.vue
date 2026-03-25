<template>
  <div class="products-table card">
    <div class="table-header">
      <h2 class="section-title">Products</h2>
      <div class="table-actions">
        <button class="btn-primary" @click="$emit('add-product')">
          Add Product
        </button>
        <button class="btn-outline">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            width="16"
            height="16"
          >
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
          Filters
        </button>
        <button class="btn-outline">Download all</button>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Products</th>
          <th>Buying Price</th>
          <th>Quantity</th>
          <th>Threshold Value</th>
          <th>Expiry Date</th>
          <th>Availability</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="product in paginatedProducts"
          :key="product.id"
          @click="$emit('view-product', product)"
          class="clickable-row"
        >
          <td>{{ product.name }}</td>
          <td>${{ product.buyingPrice }}</td>
          <td>
            {{ product.quantity }} {{ product.unit }}
          </td>
          <td>
            {{ product.thresholdValue }} {{ product.unit }}
          </td>
          <td>{{ product.expiryDate }}</td>
          <td>
            <span
              :class="[
                'availability-badge',
                availabilityClass(product.availability),
              ]"
            >
              {{ product.availability }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @page-change="$emit('page-change', $event)"
    />
  </div>
</template>

<script>
import Pagination from "../common/Pagination.vue"

export default {
  name: "ProductsTable",
  components: { Pagination },
  props: {
    products: Array,
    currentPage: { type: Number, default: 1 },
    totalPages: { type: Number, default: 1 },
  },
  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * 10
      return this.products.slice(start, start + 10)
    },
  },
  methods: {
    availabilityClass(status) {
      switch (status) {
        case "In-stock":
          return "in-stock"
        case "Out of stock":
          return "out-of-stock"
        case "Low stock":
          return "low-stock"
        default:
          return ""
      }
    },
  },
}
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.table-actions {
  display: flex;
  gap: 12px;
}

.btn-primary {
  padding: 10px 20px;
  background: #1a73e8;
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #1557b0;
}

.btn-outline {
  padding: 10px 20px;
  background: #fff;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn-outline:hover {
  background: #f9fafb;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  text-align: left;
  padding: 14px 12px;
  font-size: 13px;
  font-weight: 500;
  color: #858d9d;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
}

.table td {
  padding: 16px 12px;
  font-size: 14px;
  color: #1f2937;
  border-bottom: 1px solid #f3f4f6;
}

.clickable-row {
  cursor: pointer;
  transition: background 0.15s;
}

.clickable-row:hover {
  background: #f5f8ff;
}

.availability-badge {
  font-size: 13px;
  font-weight: 500;
  padding: 4px 0;
}

.in-stock {
  color: #16a34a;
}

.out-of-stock {
  color: #dc2626;
}

.low-stock {
  color: #d97706;
}
</style>