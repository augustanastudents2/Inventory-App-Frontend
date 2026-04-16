<template>
  <div class="wrap">
    <Doughnut :data="chartData" :options="options" />
  </div>
</template>

<script>
import { Doughnut } from "vue-chartjs"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend, Title)

export default {
  name: "StockStatusChart",
  components: { Doughnut },
  props: {
    inStock: { type: Number, default: 0 },
    lowStock: { type: Number, default: 0 },
    outOfStock: { type: Number, default: 0 },
  },
  computed: {
    chartData() {
      return {
        labels: ["In stock", "Low stock", "Out of stock"],
        datasets: [
          {
            data: [this.inStock, this.lowStock, this.outOfStock],
            backgroundColor: ["#16a34a", "#d97706", "#dc2626"],
            borderColor: ["#16a34a", "#d97706", "#dc2626"],
            borderWidth: 1,
          },
        ],
      }
    },
    options() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
          title: { display: false },
          tooltip: { enabled: true },
        },
        cutout: "65%",
      }
    },
  },
}
</script>

<style scoped>
.wrap {
  height: 260px;
}
</style>

