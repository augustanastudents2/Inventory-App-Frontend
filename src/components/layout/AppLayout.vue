<template>
  <div class="app-layout">
    <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />
    <div
      v-if="sidebarOpen"
      class="sidebar-backdrop"
      @click="sidebarOpen = false"
    />
    <div class="main-content">
      <TopBar
        :searchPlaceholder="searchPlaceholder"
        :showMenuButton="true"
        @toggle-menu="sidebarOpen = !sidebarOpen"
        @search="$emit('search', $event)"
      />
      <main class="page-content">
        <div class="content-container">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue";
import TopBar from "./TopBar.vue";

export default {
  name: "AppLayout",
  components: { Sidebar, TopBar },
  props: {
    searchPlaceholder: {
      type: String,
      default: "Search item, category, storage, vendor",
    },
  },
  data() {
    return {
      sidebarOpen: false,
    };
  },
  watch: {
    $route() {
      this.sidebarOpen = false;
    },
  },
};
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--apple-bg);
}

.main-content {
  flex: 1;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
}

.sidebar-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 90;
}

.page-content {
  flex: 1;
  padding: 32px;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 900px) {
  .main-content {
    margin-left: 0;
  }
  .page-content {
    padding: 18px;
  }
}

@media (max-width: 600px) {
  .page-content {
    padding: 14px;
  }
}
</style>
