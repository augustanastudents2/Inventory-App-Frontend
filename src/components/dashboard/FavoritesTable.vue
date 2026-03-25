<template>
  <div class="favorites-table card">
    <div class="card-header">
      <h2 class="card-title">Favorites</h2>
      <a href="#" class="see-all">See All</a>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Initial Quantity</th>
          <th>Remaining Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in favorites" :key="idx">
          <td>{{ item.name }}</td>
          <td>{{ item.initialQuantity }}</td>
          <td>{{ item.remainingQuantity }}</td>
          <td>$ {{ item.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "FavoritesTable",
  props: {
    favorites: Array,
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

.favorites-table {
  flex: 2;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.see-all {
  font-size: 14px;
  color: #1a73e8;
  font-weight: 500;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  text-align: left;
  padding: 12px 8px;
  font-size: 13px;
  font-weight: 500;
  color: #858d9d;
  border-bottom: 1px solid #e5e7eb;
}

.table td {
  padding: 14px 8px;
  font-size: 14px;
  color: #1f2937;
  border-bottom: 1px solid #f3f4f6;
}
</style>