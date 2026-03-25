<template>
  <header class="topbar">
    <div class="search-container">
      <svg
        class="search-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9aa0a6"
        stroke-width="2"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        :placeholder="searchPlaceholder"
        v-model="searchQuery"
        class="search-input"
        @input="$emit('search', searchQuery)"
      />
    </div>

    <div class="topbar-right">
      <button class="notification-btn">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5f6368"
          stroke-width="2"
          width="22"
          height="22"
        >
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
      </button>
      <div class="avatar">
        <img src="/assets/avatar.png" alt="User" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "TopBar",
  props: {
    searchPlaceholder: {
      type: String,
      default: "Search product, supplier, order",
    },
  },
  data() {
    return {
      searchQuery: "",
    };
  },
};
</script>

<style scoped>
.topbar {
  height: 64px;
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 50;
}

.search-container {
  display: flex;
  align-items: center;
  background: #f5f6fa;
  border-radius: 8px;
  padding: 8px 16px;
  width: 320px;
}

.search-icon {
  width: 18px;
  height: 18px;
  margin-right: 8px;
  flex-shrink: 0;
}

.search-input {
  border: none;
  background: none;
  font-size: 14px;
  color: #333;
  width: 100%;
}

.search-input::placeholder {
  color: #9aa0a6;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.notification-btn {
  background: none;
  border: none;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
