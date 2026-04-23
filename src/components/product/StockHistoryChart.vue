<template>
  <div class="card">
    <div class="header">
      <h3 class="title">Stock over time</h3>
      <div class="muted" v-if="hasData">Quantity after each change</div>
    </div>

    <div v-if="hasData" class="chart">
      <Line :data="chartData" :options="options" />
    </div>
    <div v-else class="empty">No stock history to chart yet.</div>
  </div>
</template>

<script>
import { Line } from "vue-chartjs"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

export default {
  name: "StockHistoryChart",
  components: { Line },
  props: {
    events: { type: Array, default: () => [] }, // [{ at, delta, reason }]
    createdAt: { type: String, default: "" },
    currentQuantity: { type: Number, default: 0 },
  },
  computed: {
    series() {
      const raw = Array.isArray(this.events) ? this.events : []
      const parsed = raw
        .map((e) => ({
          at: e?.at,
          delta: Number(e?.delta || 0),
        }))
        .filter((e) => e.at)
        .sort((a, b) => new Date(a.at) - new Date(b.at))

      if (!parsed.length) {
        // Fallback for seeded items without history
        const at = this.createdAt || ""
        if (!at) return []
        return [{ at, qty: Number(this.currentQuantity || 0) }]
      }

      // Convert delta events into absolute quantities.
      // Baseline is: currentQuantity - sum(all deltas).
      // Then we accumulate deltas forward to get quantity after each event.
      const totalDelta = parsed.reduce((acc, e) => acc + Number(e.delta || 0), 0)
      let qty = Number(this.currentQuantity || 0) - totalDelta
      const points = []
      for (const e of parsed) {
        qty += e.delta
        points.push({ at: e.at, qty })
      }
      return points
    },
    hasData() {
      return this.series.length >= 1
    },
    labels() {
      return this.series.map((p) => this.formatLabel(p.at))
    },
    values() {
      return this.series.map((p) => p.qty)
    },
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: "Quantity",
            data: this.values,
            borderColor: "#1a73e8",
            backgroundColor: "rgba(26, 115, 232, 0.12)",
            fill: true,
            tension: 0.25,
            pointRadius: 3,
            pointHoverRadius: 5,
          },
        ],
      }
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
        scales: {
          x: {
            ticks: {
              color: "#6b7280",
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 6,
              font: { size: 12, weight: "600" },
            },
            grid: { display: false },
          },
          y: {
            beginAtZero: true,
            ticks: { precision: 0, color: "#6b7280" },
            grid: { color: "#f3f4f6" },
          },
        },
      }
    },
  },
  methods: {
    formatLabel(iso) {
      const d = new Date(iso)
      if (Number.isNaN(d.getTime())) return String(iso)
      return d.toLocaleDateString(undefined, { month: "short", day: "numeric" })
    },
  },
}
</script>

<style scoped>
.card {
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid #f3f4f6;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 10px;
}

.title {
  font-size: 16px;
  font-weight: 800;
  color: #111827;
}

.muted {
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;
}

.chart {
  height: 260px;
}

.empty {
  padding: 12px;
  color: #6b7280;
  font-size: 13px;
  border: 1px dashed #e5e7eb;
  border-radius: 12px;
}
</style>

