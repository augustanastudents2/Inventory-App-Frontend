<template>
  <div class="product-header">
    <h1 class="product-name">{{ product.name }}</h1>
    <div class="header-actions">
      <button class="btn-edit" @click="$emit('edit')">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          width="16"
          height="16"
        >
          <path
            d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
          />
          <path
            d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
          />
        </svg>
        Edit
      </button>
      <button class="btn-download" @click="$emit('download')">
        Download
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductHeader",
  props: {
    product: Object,
  },
}
</script>

<style scoped>
.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.product-name {
  font-size: 22px;
  font-weight: 600;
  color: #1f2937;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn-edit {
  padding: 8px 20px;
  background: #fff;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn-edit:hover {
  background: #f5f6fa;
}

.btn-download {
  padding: 8px 20px;
  background: #fff;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-download:hover {
  background: #f5f6fa;
}
</style>