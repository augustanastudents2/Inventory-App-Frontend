<template>
  <div class="purchase-overview card">
    <h2 class="card-title">Purchase Overview</h2>
    <div class="overview-stats">
      <div class="overview-item">
        <div class="overview-icon purchase-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a73e8"
            stroke-width="2"
            width="28"
            height="28"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        </div>
        <span class="overview-number">{{ data.purchase }}</span>
        <span class="overview-label">Purchase</span>
      </div>

      <div class="divider"></div>

      <div class="overview-item">
        <div class="overview-icon cost-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#34a853"
            stroke-width="2"
            width="28"
            height="28"
          >
            <line x1="12" y1="1" x2="12" y2="23" />
            <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg>
        </div>
        <span class="overview-number">$ {{ data.cost.toLocaleString() }}</span>
        <span class="overview-label">Cost</span>
      </div>

      <div class="divider"></div>

      <div class="overview-item">
        <div class="overview-icon cancel-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5f6368"
            stroke-width="2"
            width="28"
            height="28"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <span class="overview-number">{{ data.cancel }}</span>
        <span class="overview-label">Cancel</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PurchaseOverview",
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

.purchase-overview {
  flex: 2;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 24px;
}

.overview-stats {
  display: flex;
  align-items: center;
}

.overview-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.overview-icon {
  margin-bottom: 4px;
}

.overview-number {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
}

.overview-label {
  font-size: 13px;
  color: #858d9d;
}

.divider {
  width: 1px;
  height: 60px;
  background: #e5e7eb;
}
</style>