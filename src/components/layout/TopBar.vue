<template>
  <header class="topbar">
    <button
      v-if="showMenuButton"
      class="menu-btn"
      type="button"
      aria-label="Open menu"
      @click="$emit('toggle-menu')"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="20" height="20">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
      </svg>
    </button>
    <div class="search-container">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
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
      <div class="user-profile" v-if="user" @click="toggleDropdown" v-click-outside="closeDropdown">
        <div class="avatar">
          <span class="avatar-icon">👤</span>
        </div>
        
        <transition name="dropdown">
          <div v-if="showDropdown" class="profile-dropdown">
            <div class="dropdown-header">
              <div class="user-info">
                <p class="user-name">{{ user.name }}</p>
                <p class="user-email">{{ user.email }}</p>
              </div>
            </div>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item logout-btn" @click="handleLogout">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16,17 21,12 16,7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Log Out
            </button>
          </div>
        </transition>
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
      default: "Search item, category, storage, vendor",
    },
    showMenuButton: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchQuery: "",
      showDropdown: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user || { name: "ASA User", email: "admin@asa.com" };
    },
  },
  directives: {
    "click-outside": {
      beforeMount(el, binding) {
        el.clickOutsideEvent = (event) => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value(event);
          }
        };
        document.addEventListener("click", el.clickOutsideEvent);
      },
      unmounted(el) {
        document.removeEventListener("click", el.clickOutsideEvent);
      },
    },
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown() {
      this.showDropdown = false;
    },
    handleLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.topbar {
  height: 72px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--apple-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 50;
  gap: 12px;
}

.menu-btn {
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--apple-border);
  background: rgba(0, 0, 0, 0.03);
  color: var(--apple-text-primary);
  align-items: center;
  justify-content: center;
}

.menu-btn:hover {
  background: rgba(0, 0, 0, 0.06);
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

.search-input {
  width: 100%;
  padding: 10px 12px 10px 40px;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  background: rgba(0, 0, 0, 0.05);
  color: var(--apple-text-primary);
  transition: background 0.2s ease;
}

.search-input:focus {
  background: rgba(0, 0, 0, 0.08);
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-profile {
  position: relative;
  cursor: pointer;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--apple-border);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--apple-gray);
  transition: all 0.2s ease;
}

.avatar:hover {
  background: rgba(0, 0, 0, 0.1);
}

.avatar-icon {
  font-size: 20px;
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  width: 240px;
  background: var(--apple-card-bg);
  border-radius: var(--apple-radius-md);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--apple-border);
  padding: 8px;
  transform-origin: top right;
  z-index: 100;
}

.dropdown-header {
  padding: 12px 16px;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--apple-text-primary);
  margin: 0;
}

.user-email {
  font-size: 13px;
  color: var(--apple-text-secondary);
  margin: 0;
}

.dropdown-divider {
  height: 1px;
  background: var(--apple-border);
  margin: 8px 0;
}

.dropdown-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--apple-text-primary);
  background: transparent;
  transition: background 0.2s ease;
  text-align: left;
}

.dropdown-item:hover {
  background: var(--apple-gray);
}

.logout-btn {
  color: var(--apple-red);
}

.logout-btn:hover {
  background: rgba(255, 59, 48, 0.05);
}

/* Transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

@media (max-width: 900px) {
  .topbar {
    padding: 0 16px;
  }
  .menu-btn {
    display: inline-flex;
  }
  .search-container {
    width: 100%;
    max-width: 520px;
  }
}

@media (max-width: 600px) {
  .topbar {
    padding: 0 12px;
    height: 64px;
  }
}
</style>
