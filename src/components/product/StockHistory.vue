<template>
  <div class="history">
    <div class="header">
      <h3 class="title">Stock history</h3>
      <span class="muted" v-if="events && events.length">
        {{ events.length }} record{{ events.length === 1 ? "" : "s" }}
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
      return d.toLocaleString()
    },
  },
}
</script>

<style scoped>
.history {
  margin-top: 18px;
  border-top: 1px solid #f3f4f6;
  padding-top: 18px;
}

.header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 10px;
}

.title {
  font-size: 16px;
  font-weight: 800;
  color: #111827;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 12px;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.delta {
  font-weight: 900;
  color: #111827;
}

.delta.pos {
  color: #16a34a;
}

.delta.neg {
  color: #dc2626;
}

.reason {
  font-size: 13px;
  font-weight: 700;
  color: #111827;
}

.muted {
  color: #6b7280;
  font-size: 12px;
  font-weight: 600;
}

.empty {
  padding: 12px;
  color: #6b7280;
  font-size: 13px;
  border: 1px dashed #e5e7eb;
  border-radius: 12px;
}
</style>

