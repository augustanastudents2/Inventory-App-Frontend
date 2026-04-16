<template>
  <div class="wrap">
    <Bar :data="chartData" :options="options" />
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
  name: "CategoryBreakdownChart",
  components: { Bar },
  props: {
    labels: { type: Array, default: () => [] },
    counts: { type: Array, default: () => [] },
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: "Items",
            data: this.counts,
            backgroundColor: "#1a73e8",
            borderRadius: 8,
            maxBarThickness: 38,
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
              font: { size: 12, weight: "600" },
            },
            grid: { display: false },
          },
          y: {
            beginAtZero: true,
            ticks: { precision: 0, color: "#6b7280", font: { size: 12 } },
            grid: { color: "#f3f4f6" },
          },
        },
      }
    },
  },
}
</script>

<style scoped>
.wrap {
  height: 320px;
}
</style>

