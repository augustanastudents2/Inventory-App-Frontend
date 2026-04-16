import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import InventoryView from "../views/InventoryView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";
import SettingsView from "../views/SettingsView.vue";
import PublicCatalogView from "../views/PublicCatalogView.vue";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { requiresAuth: false, title: "Login" },
  },
  {
    path: "/public",
    name: "PublicCatalog",
    component: PublicCatalogView,
    meta: { requiresAuth: false, title: "ASA Inventory" },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: { requiresAuth: true, title: "Dashboard" },
  },
  {
    path: "/inventory",
    name: "Inventory",
    component: InventoryView,
    meta: { requiresAuth: true, title: "Inventory" },
  },
  {
    path: "/inventory/product/:id",
    name: "ProductDetail",
    component: ProductDetailView,
    meta: { requiresAuth: true, title: "Item Details" },
  },
  {
    path: "/settings",
    name: "Settings",
    component: SettingsView,
    meta: { requiresAuth: true, title: "Settings" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("asa_token");
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.path === "/login" && isAuthenticated) {
    next("/dashboard");
  } else {
    next();
  }
});

router.afterEach((to) => {
  let pageTitle = to.meta?.title || "ASA Inventory";

  if (to.name === "ProductDetail") {
    const id = to.params?.id;
    pageTitle = id ? `Item ${id}` : "Item Details";
  }

  document.title =
    pageTitle === "ASA Inventory" ? pageTitle : `${pageTitle} | ASA Inventory`;
});

export default router;
