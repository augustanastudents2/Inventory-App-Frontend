<template>
  <div class="stat-card">
    <div class="stat-label" :style="{ color: labelColor }">{{ label }}</div>
    <div class="stat-values">
      <div class="stat-value-item" v-for="(val, idx) in values" :key="idx">
        <span class="stat-number">{{ val.number }}</span>
        <span class="stat-sub" v-if="val.sub">{{ val.sub }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatCard",
  props: {
    label: String,
    labelColor: { type: String, default: "#1a73e8" },
    values: {
      type: Array,
      // [{ number: '14', sub: 'Last 7 days' }]
      default: () => [],
    },
  },
}
</script>

<style scoped>
.stat-card {
  background: #fff;
  padding: 16px 20px;
  flex: 1;
  border-right: 1px solid #e5e7eb;
}

.stat-card:last-child {
  border-right: none;
}

.stat-label {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.stat-values {
  display: flex;
  justify-content: space-between;
}

.stat-value-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.stat-sub {
  font-size: 12px;
  color: #858d9d;
  margin-top: 4px;
}
</style>