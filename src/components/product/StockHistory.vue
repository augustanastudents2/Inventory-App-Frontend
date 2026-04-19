<template>
  <div class="history">
    <div class="header">
      <h3 class="title">Stock history</h3>
      <span class="pill pill-neutral" v-if="events && events.length">
        {{ events.length }} records
      </span>
    </div>

    <div v-if="events && events.length" class="list">
      <div class="row" v-for="e in events" :key="e.id">
        <div class="left">
          <div class="delta" :class="{ pos: e.delta > 0, neg: e.delta < 0 }">
            {{ e.delta > 0 ? "+" : "" }}{{ e.delta }}
          </div>
          <div class="reason">
            {{ e.reason || "Stock adjustment" }}
          </div>
        </div>
        <div class="right muted">{{ formatDate(e.at) }}</div>
      </div>
    </div>
    <div v-else class="empty">No stock changes recorded yet.</div>
  </div>
</template>

<script>
export default {
  name: "StockHistory",
  props: {
    events: { type: Array, default: () => [] },
  },
  methods: {
    formatDate(iso) {
      if (!iso) return "—"
      const d = new Date(iso)
      if (Number.isNaN(d.getTime())) return String(iso)
      return d.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    },
  },
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.title {
  font-size: 20px;
  font-weight: 700;
  color: var(--apple-text-primary);
  letter-spacing: -0.02em;
}

.pill {
  font-size: 13px;
  font-weight: 700;
  padding: 4px 12px;
  border-radius: 20px;
}

.pill-neutral {
  color: var(--apple-text-secondary);
  background: var(--apple-gray);
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: var(--apple-gray);
  border-radius: var(--apple-radius-md);
  transition: transform 0.2s ease;
}

.row:hover {
  transform: scale(1.01);
}

.left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.delta {
  font-size: 18px;
  font-weight: 800;
  min-width: 60px;
}

.delta.pos {
  color: var(--apple-green);
}

.delta.neg {
  color: var(--apple-red);
}

.reason {
  font-size: 15px;
  font-weight: 600;
  color: var(--apple-text-primary);
}

.muted {
  color: var(--apple-text-secondary);
  font-size: 14px;
  font-weight: 500;
}

.empty {
  padding: 40px;
  color: var(--apple-text-secondary);
  font-size: 15px;
  text-align: center;
  border: 2px dashed var(--apple-border);
  border-radius: var(--apple-radius-md);
}
</style>
