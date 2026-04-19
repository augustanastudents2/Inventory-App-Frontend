<template>
  <div class="public-page">
    <header class="public-header">
      <div>
        <h1 class="title">ASA Inventory</h1>
        <p class="subtitle">Public, view-only searchable catalog.</p>
      </div>
      <div class="actions">
        <div class="search-container">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            class="search"
            type="text"
            v-model.trim="q"
            placeholder="Search items (name, category, tags)"
          />
        </div>
        <router-link class="btn" to="/login">Council login</router-link>
      </div>
    </header>

    <div class="meta-row">
      <div class="muted">
        Showing <b>{{ filtered.length }}</b> of <b>{{ items.length }}</b> items
      </div>
    </div>

    <main class="item-grid">
      <div class="item-card" v-for="p in filtered" :key="p.id">
        <div class="card-top">
          <div class="category-pill" v-if="p.category">{{ p.category }}</div>
          <span :class="['status-dot', badgeClass(p.availability)]"></span>
        </div>
        
        <div class="card-content">
          <h3 class="item-name">{{ p.name }}</h3>
          <p class="item-description" v-if="p.description">{{ p.description }}</p>
          
          <div class="tags-row" v-if="p.tags && p.tags.length">
            <span class="tag" v-for="tag in p.tags" :key="tag">#{{ tag }}</span>
          </div>
        </div>

        <div class="card-footer">
          <div class="qty-wrap">
            <span class="qty-label">Quantity</span>
            <span class="qty-value">{{ p.quantity }} {{ p.unit }}</span>
          </div>
          <div :class="['availability-text', badgeClass(p.availability)]">
            {{ p.availability }}
          </div>
        </div>
      </div>
    </main>

    <div v-if="!filtered.length" class="empty-state">
      <p>No items found matching your search.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublicCatalogView",
  data() {
    return { q: "" }
  },
  computed: {
    items() {
      return this.$store.state.products || []
    },
    filtered() {
      const q = this.q.toLowerCase()
      if (!q) return this.items
      return this.items.filter((p) => {
        const parts = [
          p.name,
          p.id,
          p.category,
          (p.tags || []).join(" "),
          p.description,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
        return parts.includes(q)
      })
    },
  },
  created() {
    this.$store.dispatch("fetchProducts");
  },
  methods: {
    badgeClass(status) {
      if (status === "In-stock") return "good"
      if (status === "Low stock") return "warn"
      if (status === "Out of stock") return "bad"
      return ""
    },
  },
}
</script>

<style scoped>
.public-page {
  min-height: 100vh;
  background: var(--apple-bg);
  padding: 40px 24px;
}

.public-header {
  max-width: 1200px;
  margin: 0 auto 32px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
}

.title {
  font-size: 34px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--apple-text-primary);
  margin: 0;
}

.subtitle {
  margin-top: 8px;
  color: var(--apple-text-secondary);
  font-size: 17px;
  font-weight: 400;
}

.actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.search-container {
  position: relative;
  width: 400px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  color: var(--apple-text-secondary);
  pointer-events: none;
}

.search {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  background: rgba(0, 0, 0, 0.05);
  color: var(--apple-text-primary);
  transition: background 0.2s ease;
}

.search:focus {
  outline: none;
  background: rgba(0, 0, 0, 0.08);
}

.btn {
  padding: 10px 20px;
  border-radius: 20px;
  background: var(--apple-blue);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease;
}

.btn:hover {
  background: #0077ed;
}

.meta-row {
  max-width: 1200px;
  margin: 0 auto 16px;
}

.muted {
  color: var(--apple-text-secondary);
  font-size: 14px;
}

.item-grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.item-card {
  background: var(--apple-card-bg);
  border-radius: var(--apple-radius-lg);
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--apple-shadow);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
  border: 1px solid var(--apple-border);
}

.item-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--apple-shadow-hover);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.category-pill {
  font-size: 12px;
  font-weight: 600;
  color: var(--apple-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.card-content {
  flex: 1;
  margin-bottom: 24px;
}

.item-name {
  font-size: 20px;
  font-weight: 600;
  color: var(--apple-text-primary);
  margin: 0 0 8px;
  line-height: 1.2;
}

.item-description {
  font-size: 14px;
  color: var(--apple-text-secondary);
  line-height: 1.5;
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  font-size: 12px;
  color: var(--apple-blue);
  font-weight: 500;
}

.card-footer {
  padding-top: 16px;
  border-top: 1px solid var(--apple-border);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.qty-wrap {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.qty-label {
  font-size: 11px;
  color: var(--apple-text-secondary);
  text-transform: uppercase;
  font-weight: 600;
}

.qty-value {
  font-size: 16px;
  font-weight: 600;
  color: var(--apple-text-primary);
}

.availability-text {
  font-size: 13px;
  font-weight: 600;
}

.good { color: var(--apple-green); background-color: var(--apple-green); }
.warn { color: var(--apple-orange); background-color: var(--apple-orange); }
.bad { color: var(--apple-red); background-color: var(--apple-red); }

.availability-text.good { background: none; }
.availability-text.warn { background: none; }
.availability-text.bad { background: none; }

.empty-state {
  text-align: center;
  padding: 80px 24px;
  color: var(--apple-text-secondary);
  font-size: 17px;
}

@media (max-width: 850px) {
  .public-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .actions {
    width: 100%;
  }
  .search-container {
    width: 100%;
    flex: 1;
  }
}
</style>
