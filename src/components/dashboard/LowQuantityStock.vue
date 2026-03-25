<template>
  <div class="low-stock card">
    <div class="card-header">
      <h2 class="card-title">Low Quantity Stock</h2>
      <a href="#" class="see-all">See All</a>
    </div>
    <div class="stock-list">
      <div class="stock-item" v-for="(item, idx) in items" :key="idx">
        <div class="stock-image">
          <img v-if="item.image" :src="item.image" :alt="item.name" />
          <div v-else class="image-placeholder">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ccc"
              stroke-width="1"
              width="32"
              height="32"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21,15 16,10 5,21" />
            </svg>
          </div>
        </div>
        <div class="stock-info">
          <span class="stock-name">{{ item.name }}</span>
          <span class="stock-qty"
            >Remaining Quantity : {{ item.remainingQuantity }} {{ item.unit }}</span
          >
        </div>
        <span class="low-badge">Low</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LowQuantityStock",
  props: {
    items: Array,
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

.low-stock {
  flex: 1;
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

.stock-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stock-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stock-image {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.stock-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: #f5f6fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stock-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stock-name {
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
}

.stock-qty {
  font-size: 12px;
  color: #858d9d;
}

.low-badge {
  padding: 4px 10px;
  background: #fef2f2;
  color: #dc2626;
  font-size: 12px;
  font-weight: 500;
  border-radius: 16px;
}
</style>
