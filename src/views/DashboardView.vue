<template>
  <AppLayout searchPlaceholder="Search product">
    <div class="dashboard">
      <div class="dashboard-top">
        <PurchaseOverview :data="purchaseOverview" />
        <InventorySummary :data="inventorySummary" />
      </div>

      <div class="dashboard-bottom">
        <FavoritesTable :favorites="favorites" />
        <LowQuantityStock :items="lowStock" />
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "../components/layout/AppLayout.vue"
import PurchaseOverview from "../components/dashboard/PurchaseOverview.vue"
import InventorySummary from "../components/dashboard/InventorySummary.vue"
import FavoritesTable from "../components/dashboard/FavoritesTable.vue"
import LowQuantityStock from "../components/dashboard/LowQuantityStock.vue"

export default {
  name: "DashboardView",
  components: {
    AppLayout,
    PurchaseOverview,
    InventorySummary,
    FavoritesTable,
    LowQuantityStock,
  },
  computed: {
    purchaseOverview() {
      return this.$store.state.purchaseOverview
    },
    inventorySummary() {
      return this.$store.state.inventorySummary
    },
    favorites() {
      return this.$store.state.favorites
    },
    lowStock() {
      return this.$store.state.lowStock
    },
  },
}
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.dashboard-top {
  display: flex;
  gap: 24px;
}

.dashboard-bottom {
  display: flex;
  gap: 24px;
}
</style>