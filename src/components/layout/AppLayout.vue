<template>
  <div class="app-layout">
    <Sidebar />
    <div class="main-content">
      <TopBar
        :searchPlaceholder="searchPlaceholder"
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

.page-content {
  flex: 1;
  padding: 32px;
}

.content-container {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>
