<template>
  <div class="products-table card">
    <div class="table-header">
      <h2 class="section-title">Items</h2>
      <div class="table-actions">
        <button class="btn-primary" @click="$emit('add-product')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Item
        </button>
      </div>
    </div>

    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>Item</th>
            <th class="sortable" @click.stop="$emit('sort-change', { key: 'category' })">
              Category <span class="sort-indicator">{{ sortIndicator('category') }}</span>
            </th>
            <th>Storage</th>
            <th>Vendor</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in paginatedProducts"
            :key="product.id"
            @click="$emit('view-product', product)"
            class="clickable-row"
          >
            <td class="name-cell">{{ product.name }}</td>
            <td>{{ product.category || "—" }}</td>
            <td>{{ storageText(product) }}</td>
            <td>{{ product.vendor?.name || "—" }}</td>
            <td class="qty-cell">{{ product.quantity }} {{ product.unit }}</td>
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
            <td class="date-cell">{{ formatDate(product.updatedAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-footer">
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        @page-change="$emit('page-change', $event)"
      />
    </div>
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
    sortKey: { type: String, default: "" },
    sortDir: { type: String, default: "asc" },
  },
  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * 10
      return this.products.slice(start, start + 10)
    },
  },
  methods: {
    sortIndicator(key) {
      if (this.sortKey !== key) return ""
      return this.sortDir === "desc" ? " ↓" : " ↑"
    },
    formatDate(iso) {
      if (!iso) return "—"
      const d = new Date(iso)
      if (Number.isNaN(d.getTime())) return String(iso)
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    },
    storageText(p) {
      const a = p?.storage?.area || ""
      const s = p?.storage?.sub || ""
      const text = [a, s].filter(Boolean).join(" · ")
      return text || "—"
    },
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
  background: var(--apple-card-bg);
  border-radius: var(--apple-radius-lg);
  box-shadow: var(--apple-shadow);
  border: 1px solid var(--apple-border);
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid var(--apple-border);
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--apple-text-primary);
  letter-spacing: -0.02em;
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

.btn-primary:hover {
  background: #0077ed;
}

.table-wrap {
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  text-align: left;
  padding: 16px 32px;
  font-size: 13px;
  font-weight: 600;
  color: var(--apple-text-secondary);
  background: var(--apple-gray);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}

.table td {
  padding: 18px 32px;
  font-size: 15px;
  color: var(--apple-text-primary);
  border-bottom: 1px solid var(--apple-border);
  vertical-align: middle;
}

.name-cell {
  font-weight: 600;
}

.qty-cell {
  font-weight: 500;
}

.date-cell {
  color: var(--apple-text-secondary);
  font-size: 14px;
}

.clickable-row {
  cursor: pointer;
  transition: background 0.2s ease;
}

.clickable-row:hover {
  background: rgba(0, 0, 0, 0.02);
}

.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  color: var(--apple-text-primary);
}

.sort-indicator {
  font-weight: 700;
  color: var(--apple-blue);
}

.availability-badge {
  font-size: 13px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 12px;
  display: inline-block;
}

.in-stock {
  color: var(--apple-green);
  background: rgba(52, 199, 89, 0.1);
}

.out-of-stock {
  color: var(--apple-red);
  background: rgba(255, 59, 48, 0.1);
}

.low-stock {
  color: var(--apple-orange);
  background: rgba(255, 149, 0, 0.1);
}

.table-footer {
  padding: 16px 32px;
  background: var(--apple-gray);
}

@media (max-width: 900px) {
  .table-header {
    padding: 18px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .btn-primary {
    width: 100%;
    justify-content: center;
  }
  .table th,
  .table td {
    padding: 14px 18px;
  }
  .table-footer {
    padding: 14px 18px;
  }
}

@media (max-width: 600px) {
  .table th,
  .table td {
    padding: 12px 14px;
    font-size: 14px;
  }
  .date-cell {
    font-size: 13px;
  }
}
</style>
