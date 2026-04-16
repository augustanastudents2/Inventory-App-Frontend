<template>
  <div class="card">
    <div class="header">
      <h3 class="title">Stock vs threshold</h3>
      <div class="muted">
        {{ quantity }} {{ unit }} (threshold {{ threshold }})
      </div>
    </div>

    <div class="chart">
      <Bar :data="chartData" :options="options" />
    </div>

    <div class="hint" v-if="threshold > 0">
      <span :class="['pill', statusClass]">{{ statusText }}</span>
      <span class="muted">
        {{ deltaText }}
      </span>
    </div>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default {
  name: "StockVsThresholdChart",
  components: { Bar },
  props: {
    quantity: { type: Number, default: 0 },
    threshold: { type: Number, default: 0 },
    unit: { type: String, default: "" },
  },
  computed: {
    chartData() {
      const q = Number(this.quantity || 0)
      const t = Number(this.threshold || 0)
      return {
        labels: ["Quantity", "Threshold"],
        datasets: [
          {
            label: "Units",
            data: [q, t],
            backgroundColor: [this.qtyColor, "#9ca3af"],
            borderRadius: 10,
            maxBarThickness: 44,
          },
        ],
      }
    },
    options() {
      const max = Math.max(Number(this.quantity || 0), Number(this.threshold || 0), 1)
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
        scales: {
          x: {
            beginAtZero: true,
            suggestedMax: max,
            ticks: { precision: 0, color: "#6b7280" },
            grid: { color: "#f3f4f6" },
          },
          y: {
            ticks: { color: "#6b7280", font: { size: 12, weight: "700" } },
            grid: { display: false },
          },
        },
        indexAxis: "y",
      }
    },
    qtyColor() {
      const q = Number(this.quantity || 0)
      const t = Number(this.threshold || 0)
      if (q === 0) return "#dc2626"
      if (t > 0 && q <= t) return "#d97706"
      return "#16a34a"
    },
    statusText() {
      const q = Number(this.quantity || 0)
      const t = Number(this.threshold || 0)
      if (q === 0) return "Out of stock"
      if (t > 0 && q <= t) return "Low stock"
      return "Healthy"
    },
    statusClass() {
      const q = Number(this.quantity || 0)
      const t = Number(this.threshold || 0)
      if (q === 0) return "bad"
      if (t > 0 && q <= t) return "warn"
      return "good"
    },
    deltaText() {
      const q = Number(this.quantity || 0)
      const t = Number(this.threshold || 0)
      if (t <= 0) return "Set a threshold to enable low-stock warnings."
      const d = q - t
      if (d === 0) return "At threshold."
      if (d > 0) return `${d} above threshold.`
      return `${Math.abs(d)} below threshold.`
    },
  },
}
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  border: 1px solid #f3f4f6;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
}

.title {
  font-size: 16px;
  font-weight: 900;
  color: #111827;
}

.muted {
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;
}

.chart {
  height: 180px;
}

.hint {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.pill {
  font-size: 12px;
  font-weight: 900;
  padding: 3px 8px;
  border-radius: 999px;
  border: 1px solid;
  display: inline-block;
}

.good {
  color: #166534;
  border-color: #bbf7d0;
  background: #f0fdf4;
}

.warn {
  color: #92400e;
  border-color: #fde68a;
  background: #fffbeb;
}

.bad {
  color: #991b1b;
  border-color: #fecaca;
  background: #fef2f2;
}
</style>

