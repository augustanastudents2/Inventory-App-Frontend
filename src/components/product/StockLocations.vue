<template>
  <div class="stock-locations">
    <h3 class="section-title">Stock Locations</h3>
    <table class="table" v-if="locations.length">
      <thead>
        <tr>
          <th>Store Name</th>
          <th>Stock in hand</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(loc, idx) in locations" :key="idx">
          <td>{{ loc.storeName }}</td>
          <td>
            <a href="#" class="stock-link">{{ loc.stockInHand }}</a>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="no-data">No stock locations available.</p>
  </div>
</template>

<script>
export default {
  name: "StockLocations",
  props: {
    locations: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.stock-locations {
  margin-bottom: 32px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
}

.table {
  width: 100%;
  max-width: 700px;
  border-collapse: collapse;
}

.table th {
  text-align: left;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 500;
  color: #858d9d;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.table td {
  padding: 14px 16px;
  font-size: 14px;
  color: #1f2937;
  border-bottom: 1px solid #f3f4f6;
}

.stock-link {
  color: #1a73e8;
  font-weight: 500;
}

.no-data {
  font-size: 14px;
  color: #9ca3af;
}
</style>