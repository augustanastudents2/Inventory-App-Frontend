<template>
  <aside class="sidebar" :class="{ open }">
    <div class="sidebar-logo">
      <img src="/assets/asa-logo.png" alt="ASA Logo" class="logo-img" />
    </div>

    <nav class="sidebar-nav">
      <router-link
        to="/dashboard"
        class="nav-item"
        :class="{ active: $route.path === '/dashboard' }"
        @click="$emit('close')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
        <span>Dashboard</span>
      </router-link>

      <router-link
        to="/inventory"
        class="nav-item"
        :class="{ active: $route.path.startsWith('/inventory') }"
        @click="$emit('close')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        <span>Inventory</span>
      </router-link>

      <router-link
        to="/settings"
        class="nav-item"
        :class="{ active: $route.path === '/settings' }"
        @click="$emit('close')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
        </svg>
        <span>Settings</span>
      </router-link>
    </nav>

    <div class="sidebar-bottom">
      <router-link
        to="/"
        class="nav-item public-link"
        :class="{ active: $route.path === '/' }"
        @click="$emit('close')"
      >
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 010 20" />
          <path d="M12 2a15.3 15.3 0 000 20" />
        </svg>
        <span>Public View</span>
      </router-link>

      <button class="nav-item logout" @click="handleLogout">
        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
          <polyline points="16,17 21,12 16,7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        <span>Log Out</span>
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: "SidebarComponent",
  props: {
    open: { type: Boolean, default: false },
  },
  emits: ["close"],
  methods: {
    handleLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.sidebar {
  width: 260px;
  height: 100vh;
  background: var(--apple-card-bg);
  border-right: 1px solid var(--apple-border);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  padding: 20px 12px;
  transition: transform 0.25s ease;
}

.sidebar-logo {
  padding: 20px 12px 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.logo-img {
  width: 120px;
  height: auto;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  color: var(--apple-text-primary);
  font-size: 15px;
  font-weight: 500;
  border-radius: var(--apple-radius-md);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.nav-item:hover {
  background: var(--apple-gray);
}

.nav-item.active {
  color: #fff;
  background: var(--apple-blue);
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.sidebar-bottom {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid var(--apple-border);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.logout {
  color: var(--apple-red);
}

.logout:hover {
  background: rgba(255, 59, 48, 0.1);
}

.public-link {
  color: var(--apple-blue);
}

.public-link:hover {
  background: rgba(0, 113, 227, 0.1);
}

@media (max-width: 900px) {
  .sidebar {
    transform: translateX(-100%);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  }
  .sidebar.open {
    transform: translateX(0);
  }
}
</style>
