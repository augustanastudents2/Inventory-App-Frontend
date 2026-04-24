<template>
  <div class="app-shell">
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from "./components/common/AppFooter.vue"

export default {
  name: "App",
  components: { AppFooter },
};
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.app-shell :deep(.app-layout) {
  flex: 1;
}
</style>
