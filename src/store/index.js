import { createStore } from "vuex";
import api from "../api";

function computeAvailability(quantity, thresholdValue) {
  if (quantity === 0) return "Out of stock";
  if (typeof thresholdValue === "number" && quantity <= thresholdValue)
    return "Low stock";
  return "In-stock";
}

export default createStore({
  state: {
    user: null,
    users: [],
    categories: [],
    tags: [],
    storageLocations: [],
    vendors: [],
    products: [],
  },
  getters: {
    isAdmin: (state) => state.user?.role === "Admin",
    getProductById: (state) => (id) => {
      return state.products.find((p) => p.id === id);
    },
    totalProducts: (state) => state.products.length,
    inStockProducts: (state) =>
      state.products.filter((p) => p.availability === "In-stock"),
    outOfStockProducts: (state) =>
      state.products.filter((p) => p.availability === "Out of stock"),
    lowStockProducts: (state) =>
      state.products.filter((p) => p.availability === "Low stock"),
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories.map(c => c.name);
    },
    SET_TAGS(state, tags) {
      state.tags = tags.map(t => t.name);
    },
    SET_STORAGE_LOCATIONS(state, locations) {
      state.storageLocations = locations;
    },
    SET_VENDORS(state, vendors) {
      state.vendors = vendors;
    },
    ADD_PRODUCT(state, product) {
      state.products.push(product);
    },
    UPDATE_PRODUCT(state, updatedProduct) {
      const index = state.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        state.products.splice(index, 1, updatedProduct);
      }
    },
    DELETE_PRODUCT(state, productId) {
      state.products = state.products.filter((p) => p.id !== productId);
    },
  },
  actions: {
    async init({ dispatch }) {
      const token = localStorage.getItem("asa_token");
      const user = JSON.parse(localStorage.getItem("asa_user"));
      if (token && user) {
        this.commit("SET_USER", user);
        await Promise.all([
          dispatch("fetchProducts"),
          dispatch("fetchUsers"),
          dispatch("fetchSettings"),
        ]);
      }
    },
    async login({ commit, dispatch }, credentials) {
      try {
        const response = await api.post("/auth/login", credentials);
        const user = response.data;
        commit("SET_USER", user);
        localStorage.setItem("asa_token", user.token);
        localStorage.setItem("asa_user", JSON.stringify(user));
        await Promise.all([
          dispatch("fetchProducts"),
          dispatch("fetchUsers"),
          dispatch("fetchSettings"),
        ]);
        return user;
      } catch (error) {
        throw error;
      }
    },
    logout({ commit }) {
      commit("SET_USER", null);
      localStorage.removeItem("asa_token");
      localStorage.removeItem("asa_user");
    },
    async fetchProducts({ commit }) {
      try {
        const response = await api.get("/products/");
        commit("SET_PRODUCTS", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async fetchUsers({ commit, getters }) {
      if (!getters.isAdmin) return;
      try {
        const response = await api.get("/users/");
        commit("SET_USERS", response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async fetchSettings({ commit }) {
      try {
        const [cats, tags, locs, vendors] = await Promise.all([
          api.get("/settings/categories"),
          api.get("/settings/tags"),
          api.get("/settings/storage-locations"),
          api.get("/settings/vendors"),
        ]);
        commit("SET_CATEGORIES", cats.data);
        commit("SET_TAGS", tags.data);
        commit("SET_STORAGE_LOCATIONS", locs.data);
        commit("SET_VENDORS", vendors.data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    },
    async addProduct({ commit }, product) {
      try {
        const response = await api.post("/products/", product);
        commit("ADD_PRODUCT", response.data);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    },
    async updateProduct({ commit }, updates) {
      try {
        const response = await api.put(`/products/${updates.id}`, updates);
        commit("UPDATE_PRODUCT", response.data);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
    async deleteProduct({ commit }, productId) {
      try {
        await api.delete(`/products/${productId}`);
        commit("DELETE_PRODUCT", productId);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    async adjustStock({ dispatch }, payload) {
      try {
        await api.post("/products/adjust-stock", payload);
        await dispatch("fetchProducts");
      } catch (error) {
        console.error("Error adjusting stock:", error);
      }
    },
    async addUser({ dispatch }, user) {
      try {
        await api.post("/users/", user);
        await dispatch("fetchUsers");
      } catch (error) {
        console.error("Error adding user:", error);
      }
    },
    async updateUserRole({ dispatch }, { userId, role }) {
      try {
        await api.patch(`/users/${userId}/role`, null, { params: { role } });
        await dispatch("fetchUsers");
      } catch (error) {
        console.error("Error updating user role:", error);
      }
    },
    async deleteUser({ dispatch }, userId) {
      try {
        await api.delete(`/users/${userId}`);
        await dispatch("fetchUsers");
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
    async addCategory({ dispatch }, name) {
      try {
        await api.post("/settings/categories", { name });
        await dispatch("fetchSettings");
      } catch (error) {
        console.error("Error adding category:", error);
      }
    },
    async deleteCategory({ dispatch }, name) {
      try {
        await api.delete(`/settings/categories/${name}`);
        await dispatch("fetchSettings");
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    },
    async addTag({ dispatch }, name) {
      try {
        await api.post("/settings/tags", { name });
        await dispatch("fetchSettings");
      } catch (error) {
        console.error("Error adding tag:", error);
      }
    },
    async addStorageLocation({ dispatch }, loc) {
      try {
        await api.post("/settings/storage-locations", loc);
        await dispatch("fetchSettings");
      } catch (error) {
        console.error("Error adding storage location:", error);
      }
    },
    async addVendor({ dispatch }, vendor) {
      try {
        await api.post("/settings/vendors", vendor);
        await dispatch("fetchSettings");
      } catch (error) {
        console.error("Error adding vendor:", error);
      }
    },
    async updateCategory({ dispatch }, { oldName, newName }) {
      try {
        await api.patch(`/settings/categories/${oldName}`, { name: newName });
        await dispatch("fetchSettings");
        await dispatch("fetchProducts");
      } catch (error) {
        console.error("Error updating category:", error);
      }
    },
    async updateTag({ dispatch }, { oldName, newName }) {
      try {
        await api.patch(`/settings/tags/${oldName}`, { name: newName });
        await dispatch("fetchSettings");
        await dispatch("fetchProducts");
      } catch (error) {
        console.error("Error updating tag:", error);
      }
    },
    async updateStorageLocation({ dispatch }, { oldLoc, newLoc }) {
      try {
        await api.patch("/settings/storage-locations", { oldLoc, newLoc });
        await dispatch("fetchSettings");
        await dispatch("fetchProducts");
      } catch (error) {
        console.error("Error updating storage location:", error);
      }
    },
    async updateVendor({ dispatch }, { oldName, newVendor }) {
      try {
        await api.patch(`/settings/vendors/${oldName}`, newVendor);
        await dispatch("fetchSettings");
        await dispatch("fetchProducts");
      } catch (error) {
        console.error("Error updating vendor:", error);
      }
    },
  },
});
