<template>
  <AppLayout
    searchPlaceholder="Search item, category, storage, vendor"
    @search="handleSearch"
  >
    <div class="dashboard">
      <div class="card main-overview">
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
          <div class="chart-container">
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
              <span class="label">In stock</span>
              <span class="summary-value">{{ inStockCount }}</span>
            </div>
            <div class="summary-row">
              <span class="dot dot-amber"></span>
              <span class="label">Low stock</span>
              <span class="summary-value">{{ lowStockCount }}</span>
            </div>
            <div class="summary-row">
              <span class="dot dot-red"></span>
              <span class="label">Out of stock</span>
              <span class="summary-value">{{ outOfStockCount }}</span>
            </div>
            <div class="summary-row total-row">
              <span></span>
              <span class="label">Total</span>
              <span class="summary-value">{{ totalProducts }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="grid">
        <div class="card list-card">
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

        <div class="card list-card">
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

      <div class="card chart-card-full">
        <div class="list-header">
          <h3 class="list-title">Category breakdown</h3>
          <span class="pill pill-neutral">{{ categoryBreakdown.length }}</span>
        </div>
        <div class="full-chart-wrap">
          <CategoryBreakdownChart
            v-if="categoryBreakdown.length"
            :labels="categoryChartLabels"
            :counts="categoryChartCounts"
          />
          <div v-else class="empty">No categories found.</div>
        </div>
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
  background: var(--apple-card-bg);
  border-radius: var(--apple-radius-lg);
  padding: 24px;
  box-shadow: var(--apple-shadow);
  border: 1px solid var(--apple-border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: var(--apple-shadow-hover);
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
}

.section-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--apple-text-primary);
  margin-bottom: 4px;
  letter-spacing: -0.02em;
}

.subtitle {
  color: var(--apple-text-secondary);
  font-size: 15px;
}

.kpi {
  padding: 12px 20px;
  border-radius: var(--apple-radius-md);
  background: var(--apple-gray);
  text-align: right;
}

.kpi-label {
  color: var(--apple-text-secondary);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.kpi-value {
  margin-top: 4px;
  font-size: 28px;
  font-weight: 800;
  color: var(--apple-text-primary);
}

.chart-wrap {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;
  align-items: center;
}

.chart-container {
  padding: 20px;
  background: var(--apple-gray);
  border-radius: var(--apple-radius-md);
}

.chart-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--apple-text-primary);
  margin-bottom: 16px;
}

.summary {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: var(--apple-gray);
  border-radius: var(--apple-radius-md);
}

.summary-row {
  display: grid;
  grid-template-columns: 12px 1fr auto;
  gap: 12px;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  color: var(--apple-text-primary);
}

.label {
  color: var(--apple-text-secondary);
}

.summary-value {
  font-weight: 700;
}

.total-row {
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px solid var(--apple-border);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.dot-green { background: var(--apple-green); }
.dot-amber { background: var(--apple-orange); }
.dot-red { background: var(--apple-red); }

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.list-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--apple-text-primary);
}

.pill {
  font-size: 13px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
}

.pill-red {
  color: var(--apple-red);
  background: rgba(255, 59, 48, 0.1);
}

.pill-amber {
  color: var(--apple-orange);
  background: rgba(255, 149, 0, 0.1);
}

.pill-neutral {
  color: var(--apple-text-secondary);
  background: var(--apple-gray);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.list-row {
  padding: 16px;
  background: var(--apple-gray);
  border-radius: var(--apple-radius-md);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.2s ease;
}

.list-row:hover {
  transform: scale(1.02);
}

.name {
  font-weight: 700;
  color: var(--apple-text-primary);
  font-size: 16px;
}

.meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 14px;
}

.qty {
  font-weight: 700;
  color: var(--apple-text-primary);
}

.muted {
  color: var(--apple-text-secondary);
}

.empty {
  padding: 32px;
  color: var(--apple-text-secondary);
  font-size: 15px;
  text-align: center;
  border: 2px dashed var(--apple-border);
  border-radius: var(--apple-radius-md);
}

.full-chart-wrap {
  margin-top: 10px;
}

@media (max-width: 1000px) {
  .chart-wrap {
    grid-template-columns: 1fr;
  }
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 700px) {
  .header-row {
    flex-direction: column;
    align-items: flex-start;
  }
  .kpi {
    width: 100%;
    text-align: left;
  }
  .chart-container,
  .summary {
    padding: 16px;
  }
}
</style>
