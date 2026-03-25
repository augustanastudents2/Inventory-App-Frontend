<template>
  <AppLayout>
    <div class="settings-page">
      <div class="settings-card">
        <h2>Settings</h2>
        <p class="coming-soon">Settings page coming soon...</p>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "../components/layout/AppLayout.vue"

export default {
  name: "SettingsView",
  components: { AppLayout },
}
</script>

<style scoped>
.settings-page {
  display: flex;
  justify-content: center;
  padding-top: 60px;
}

.settings-card {
  background: #fff;
  border-radius: 12px;
  padding: 48px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.settings-card h2 {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
}

.coming-soon {
  color: #6b7280;
  font-size: 16px;
}
</style>