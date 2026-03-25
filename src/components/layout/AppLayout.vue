<template>
  <div class="app-layout">
    <Sidebar />
    <div class="main-content">
      <TopBar
        :searchPlaceholder="searchPlaceholder"
        @search="$emit('search', $event)"
      />
      <main class="page-content">
        <slot />
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
      default: "Search product, supplier, order",
    },
  },
};
</script>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-left: 240px;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  padding: 24px 32px;
  background: #f0f1f3;
}
</style>
