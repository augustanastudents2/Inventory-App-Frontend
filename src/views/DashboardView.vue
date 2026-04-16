<template>
  <AppLayout
    searchPlaceholder="Search item, category, storage, vendor"
    @search="handleSearch"
  >
    <div class="dashboard">
      <div class="card">
        <div class="header-row">
          <div>
            <h2 class="section-title">Stock Dashboard</h2>
            <p class="subtitle">
              Out of stock and low stock materials at a glance.
            </p>
          </div>
          <div class="kpi">
            <div class="kpi-label">Total products</div>
            <div class="kpi-value">{{ totalProducts }}</div>
          </div>
        </div>

        <div class="chart-wrap">
          <div class="chart-card">
            <div class="chart-title">Stock status</div>
            <StockStatusChart
              :inStock="inStockCount"
              :lowStock="lowStockCount"
              :outOfStock="outOfStockCount"
            />
          </div>
          <div class="summary">
            <div class="summary-row">
              <span class="dot dot-green"></span>
              <span>In stock</span>
              <span class="summary-value">{{ inStockCount }}</span>
            </div>
            <div class="summary-row">
              <span class="dot dot-amber"></span>
              <span>Low stock</span>
              <span class="summary-value">{{ lowStockCount }}</span>
            </div>
            <div class="summary-row">
              <span class="dot dot-red"></span>
              <span>Out of stock</span>
              <span class="summary-value">{{ outOfStockCount }}</span>
            </div>
            <div class="summary-row muted">
              <span></span>
              <span>Total</span>
              <span class="summary-value">{{ totalProducts }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid">
        <div class="card">
          <div class="list-header">
            <h3 class="list-title">Out of stock</h3>
            <span class="pill pill-red">{{ outOfStockProducts.length }}</span>
          </div>
          <div v-if="outOfStockProducts.length" class="list">
            <div class="list-row" v-for="p in outOfStockProducts" :key="p.id">
              <div class="name">{{ p.name }}</div>
              <div class="meta">
                <span class="muted">{{ p.category || "Uncategorized" }}</span>
                <span class="qty">0 {{ p.unit }}</span>
              </div>
            </div>
          </div>
          <div v-else class="empty">No out-of-stock materials.</div>
        </div>

        <div class="card">
          <div class="list-header">
            <h3 class="list-title">Low stock</h3>
            <span class="pill pill-amber">{{ lowStockProducts.length }}</span>
          </div>
          <div v-if="lowStockProducts.length" class="list">
            <div class="list-row" v-for="p in lowStockProducts" :key="p.id">
              <div class="name">{{ p.name }}</div>
              <div class="meta">
                <span class="muted">{{ p.category || "Uncategorized" }}</span>
                <span class="qty">
                  {{ p.quantity }} {{ p.unit }}
                  <span class="muted">/ thr {{ p.thresholdValue }}</span>
                </span>
              </div>
            </div>
          </div>
          <div v-else class="empty">No low-stock materials.</div>
        </div>
      </div>

      <div class="card">
        <div class="list-header">
          <h3 class="list-title">Category breakdown</h3>
          <span class="pill pill-neutral">{{ categoryBreakdown.length }}</span>
        </div>
        <CategoryBreakdownChart
          v-if="categoryBreakdown.length"
          :labels="categoryChartLabels"
          :counts="categoryChartCounts"
        />
        <div v-else class="empty">No categories found.</div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "../components/layout/AppLayout.vue"
import StockStatusChart from "../components/dashboard/StockStatusChart.vue"
import CategoryBreakdownChart from "../components/dashboard/CategoryBreakdownChart.vue"

export default {
  name: "DashboardView",
  components: {
    AppLayout,
    StockStatusChart,
    CategoryBreakdownChart,
  },
  data() {
    return {
      searchQuery: "",
    }
  },
  computed: {
    products() {
      const all = this.$store.state.products || []
      const q = String(this.searchQuery || "").trim().toLowerCase()
      if (!q) return all
      return all.filter((p) => {
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
    totalProducts() {
      return this.products.length
    },
    inStockCount() {
      return this.products.filter((p) => p.availability === "In-stock").length
    },
    lowStockCount() {
      return this.products.filter((p) => p.availability === "Low stock").length
    },
    outOfStockCount() {
      return this.products.filter((p) => p.availability === "Out of stock").length
    },
    inStockPct() {
      return this.totalProducts
        ? Math.round((this.inStockCount / this.totalProducts) * 100)
        : 0
    },
    lowStockPct() {
      return this.totalProducts
        ? Math.round((this.lowStockCount / this.totalProducts) * 100)
        : 0
    },
    outOfStockPct() {
      return this.totalProducts
        ? Math.round((this.outOfStockCount / this.totalProducts) * 100)
        : 0
    },
    outOfStockProducts() {
      return this.products
        .filter((p) => p.availability === "Out of stock")
        .slice()
        .sort((a, b) => String(a.name).localeCompare(String(b.name)))
    },
    lowStockProducts() {
      return this.products
        .filter((p) => p.availability === "Low stock")
        .slice()
        .sort((a, b) => Number(a.quantity || 0) - Number(b.quantity || 0))
    },
    categoryBreakdown() {
      const counts = new Map()
      for (const p of this.products) {
        const key = (p.category || "").trim() || "Uncategorized"
        counts.set(key, (counts.get(key) || 0) + 1)
      }
      const total = this.totalProducts || 1
      return Array.from(counts.entries())
        .map(([name, count]) => ({
          name,
          count,
          pct: Math.round((count / total) * 100),
        }))
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    },
    categoryChartLabels() {
      return this.categoryBreakdown.map((c) => c.name)
    },
    categoryChartCounts() {
      return this.categoryBreakdown.map((c) => c.count)
    },
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query
    },
  },
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 14px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.subtitle {
  color: #6b7280;
  font-size: 13px;
}

.kpi {
  min-width: 160px;
  padding: 12px 14px;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  background: #fafafa;
  text-align: right;
}

.kpi-label {
  color: #6b7280;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.kpi-value {
  margin-top: 4px;
  font-size: 24px;
  font-weight: 800;
  color: #111827;
}

.chart-wrap {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 18px;
  align-items: center;
  margin-top: 10px;
}

.chart-card {
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  padding: 14px;
}

.chart-title {
  font-size: 14px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 10px;
}

.summary {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  background: #fafafa;
}

.summary-row {
  display: grid;
  grid-template-columns: 14px 1fr auto;
  gap: 10px;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  color: #111827;
}

.summary-value {
  font-weight: 900;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  display: inline-block;
}

.dot-green {
  background: #16a34a;
}

.dot-amber {
  background: #d97706;
}

.dot-red {
  background: #dc2626;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.list-title {
  font-size: 16px;
  font-weight: 700;
  color: #111827;
}

.pill {
  font-size: 12px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid;
}

.pill-red {
  color: #dc2626;
  border-color: #fecaca;
  background: #fef2f2;
}

.pill-amber {
  color: #b45309;
  border-color: #fde68a;
  background: #fffbeb;
}

.pill-neutral {
  color: #374151;
  border-color: #e5e7eb;
  background: #f9fafb;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-row {
  padding: 12px 12px;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.name {
  font-weight: 700;
  color: #111827;
  font-size: 14px;
}

.meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 13px;
}

.qty {
  font-weight: 700;
  color: #111827;
}

.muted {
  color: #6b7280;
}

.empty {
  padding: 16px 12px;
  color: #6b7280;
  font-size: 13px;
  border: 1px dashed #e5e7eb;
  border-radius: 12px;
}

@media (max-width: 900px) {
  .chart-wrap {
    grid-template-columns: 1fr;
  }
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>