<template>
  <div class="inventory-summary card">
    <h2 class="card-title">Inventory Summary</h2>
    <div class="summary-stats">
      <div class="summary-item">
        <div class="summary-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e8590c"
            stroke-width="2"
            width="32"
            height="32"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>
        <span class="summary-number">{{ data.quantityInHand }}</span>
        <span class="summary-label">Quantity in Hand</span>
      </div>

      <div class="summary-item">
        <div class="summary-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a73e8"
            stroke-width="2"
            width="32"
            height="32"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
        </div>
        <span class="summary-number">{{ data.numberOfCategories }}</span>
        <span class="summary-label">Number of Categories</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InventorySummary",
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

.inventory-summary {
  flex: 1;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 24px;
}

.summary-stats {
  display: flex;
  justify-content: space-around;
}

.summary-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.summary-number {
  font-size: 22px;
  font-weight: 700;
  color: #1f2937;
}

.summary-label {
  font-size: 13px;
  color: #858d9d;
}
</style>