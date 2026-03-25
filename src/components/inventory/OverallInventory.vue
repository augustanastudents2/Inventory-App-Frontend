<template>
  <div class="overall-inventory card">
    <h2 class="section-title">Overall Inventory</h2>
    <div class="stats-row">
      <StatCard
        label="Categories"
        labelColor="#1a73e8"
        :values="[{ number: String(data.categories), sub: 'Last 7 days' }]"
      />
      <StatCard
        label="Total Products"
        labelColor="#e8590c"
        :values="[
          { number: String(data.totalProducts), sub: 'Last 7 days' },
          { number: '$' + data.revenue.toLocaleString(), sub: 'Revenue' }
        ]"
      />
      <StatCard
        label="Top Selling"
        labelColor="#7c3aed"
        :values="[
          { number: String(data.topSellingCount), sub: 'Last 7 days' },
          { number: '$' + data.topSellingCost.toLocaleString(), sub: 'Cost' }
        ]"
      />
      <StatCard
        label="Low Stocks"
        labelColor="#dc2626"
        :values="[
          { number: String(data.lowStockOrdered), sub: 'Ordered' },
          { number: String(data.lowStockNotInStock), sub: 'Not in stock' }
        ]"
      />
    </div>
  </div>
</template>

<script>
import StatCard from "../common/StatCard.vue"

export default {
  name: "OverallInventory",
  components: { StatCard },
  props: {
    data: Object,
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

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
}

.stats-row {
  display: flex;
}
</style>