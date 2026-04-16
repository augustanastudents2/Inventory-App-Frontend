import { createStore } from "vuex";

function computeAvailability(quantity, thresholdValue) {
  if (quantity === 0) return "Out of stock";
  if (typeof thresholdValue === "number" && quantity <= thresholdValue)
    return "Low stock";
  return "In-stock";
}

function nowIso() {
  return new Date().toISOString();
}

export default createStore({
  state: {
    user: null,
    categories: [
      "Casino Night Event",
      "Art Supplies",
      "Food Service",
      "Cleaning",
      "General",
    ],
    tags: ["Casino Night", "Decor", "Kitchen", "Audio/Visual"],
    storageLocations: [
      { area: "Storage Room 1", sub: "Shelf 1" },
      { area: "Storage Room 1", sub: "Shelf 2" },
      { area: "Storage Room 2", sub: "Shelf 1" },
    ],
    vendors: [{ name: "Amazon", contact: "" }],
    products: [
      {
        id: "456567",
        name: "Maggi",
        description: "Instant noodles for events.",
        buyingPrice: 430,
        quantity: 43,
        unit: "Packets",
        thresholdValue: 12,
        expiryDate: "11/12/22",
        availability: computeAvailability(43, 12),
        category: "Food Service",
        tags: ["Kitchen"],
        image: null,
        vendor: { name: "Ronald Martin", contact: "98789 86757" },
        storage: { area: "Storage Room 1", sub: "Shelf 1" },
        openingStock: 40,
        remainingStock: 34,
        onTheWay: 15,
        stockLocations: [
          { storeName: "Sulur Branch", stockInHand: 15 },
          { storeName: "Singanallur Branch", stockInHand: 19 },
        ],
        createdAt: "2026-01-10T10:15:00.000Z",
        updatedAt: "2026-01-10T10:15:00.000Z",
      },
      {
        id: "456568",
        name: "Bru",
        description: "",
        buyingPrice: 257,
        quantity: 22,
        unit: "Packets",
        thresholdValue: 12,
        expiryDate: "21/12/22",
        availability: computeAvailability(22, 12),
        category: "Beverages",
        tags: [],
        image: null,
        vendor: { name: "John Doe", contact: "98765 43210" },
        storage: { area: "Storage Room 1", sub: "Shelf 2" },
        openingStock: 30,
        remainingStock: 0,
        onTheWay: 10,
        stockLocations: [],
        createdAt: "2026-01-12T09:00:00.000Z",
        updatedAt: "2026-01-12T09:00:00.000Z",
      },
      {
        id: "456569",
        name: "Red Bull",
        description: "",
        buyingPrice: 405,
        quantity: 36,
        unit: "Packets",
        thresholdValue: 9,
        expiryDate: "5/12/22",
        availability: computeAvailability(36, 9),
        category: "Beverages",
        tags: [],
        image: null,
        vendor: { name: "Jane Smith", contact: "91234 56789" },
        storage: { area: "Storage Room 2", sub: "Shelf 1" },
        openingStock: 50,
        remainingStock: 36,
        onTheWay: 5,
        stockLocations: [],
        createdAt: "2026-01-15T13:22:00.000Z",
        updatedAt: "2026-01-15T13:22:00.000Z",
      },
      {
        id: "456570",
        name: "Bourn Vita",
        description: "",
        buyingPrice: 502,
        quantity: 14,
        unit: "Packets",
        thresholdValue: 6,
        expiryDate: "8/12/22",
        availability: computeAvailability(14, 6),
        category: "Beverages",
        tags: [],
        image: null,
        vendor: { name: "Mike Johnson", contact: "99876 54321" },
        storage: { area: "Storage Room 2", sub: "Shelf 1" },
        openingStock: 20,
        remainingStock: 0,
        onTheWay: 8,
        stockLocations: [],
        createdAt: "2026-01-16T08:05:00.000Z",
        updatedAt: "2026-01-16T08:05:00.000Z",
      },
      {
        id: "456571",
        name: "Horlicks",
        description: "",
        buyingPrice: 530,
        quantity: 5,
        unit: "Packets",
        thresholdValue: 5,
        expiryDate: "9/1/23",
        availability: computeAvailability(5, 5),
        category: "Beverages",
        tags: [],
        image: null,
        vendor: { name: "Sarah Lee", contact: "98001 23456" },
        storage: { area: "Storage Room 1", sub: "Shelf 1" },
        openingStock: 15,
        remainingStock: 5,
        onTheWay: 3,
        stockLocations: [],
        createdAt: "2026-01-17T11:45:00.000Z",
        updatedAt: "2026-01-17T11:45:00.000Z",
      },
      {
        id: "456572",
        name: "Harpic",
        description: "",
        buyingPrice: 605,
        quantity: 10,
        unit: "Packets",
        thresholdValue: 5,
        expiryDate: "9/1/23",
        availability: computeAvailability(10, 5),
        category: "Cleaning",
        tags: [],
        image: null,
        vendor: { name: "Tom Brown", contact: "97654 32100" },
        storage: { area: "Storage Room 1", sub: "Shelf 2" },
        openingStock: 25,
        remainingStock: 10,
        onTheWay: 7,
        stockLocations: [],
        createdAt: "2026-01-20T16:00:00.000Z",
        updatedAt: "2026-01-20T16:00:00.000Z",
      },
      {
        id: "456573",
        name: "Ariel",
        description: "",
        buyingPrice: 408,
        quantity: 23,
        unit: "Packets",
        thresholdValue: 7,
        expiryDate: "15/12/23",
        availability: computeAvailability(23, 7),
        category: "Cleaning",
        tags: [],
        image: null,
        vendor: { name: "Lisa White", contact: "96543 21098" },
        storage: { area: "Storage Room 2", sub: "Shelf 1" },
        openingStock: 30,
        remainingStock: 0,
        onTheWay: 12,
        stockLocations: [],
        createdAt: "2026-01-21T10:30:00.000Z",
        updatedAt: "2026-01-21T10:30:00.000Z",
      },
      {
        id: "456574",
        name: "Scotch Brite",
        description: "",
        buyingPrice: 359,
        quantity: 43,
        unit: "Packets",
        thresholdValue: 8,
        expiryDate: "6/6/23",
        availability: computeAvailability(43, 8),
        category: "Cleaning",
        tags: [],
        image: null,
        vendor: { name: "David Green", contact: "95432 10987" },
        storage: { area: "Storage Room 1", sub: "Shelf 2" },
        openingStock: 50,
        remainingStock: 43,
        onTheWay: 0,
        stockLocations: [],
        createdAt: "2026-01-22T14:18:00.000Z",
        updatedAt: "2026-01-22T14:18:00.000Z",
      },
      {
        id: "456575",
        name: "Coca cola",
        description: "",
        buyingPrice: 205,
        quantity: 41,
        unit: "Packets",
        thresholdValue: 10,
        expiryDate: "11/11/22",
        availability: computeAvailability(41, 10),
        category: "Beverages",
        tags: [],
        image: null,
        vendor: { name: "Amy Taylor", contact: "94321 09876" },
        storage: { area: "Storage Room 2", sub: "Shelf 1" },
        openingStock: 60,
        remainingStock: 41,
        onTheWay: 20,
        stockLocations: [],
        createdAt: "2026-01-23T09:40:00.000Z",
        updatedAt: "2026-01-23T09:40:00.000Z",
      },
    ],
    favorites: [
      {
        name: "Surf Excel",
        initialQuantity: 30,
        remainingQuantity: 12,
        price: 100,
      },
      { name: "Rin", initialQuantity: 21, remainingQuantity: 15, price: 207 },
      {
        name: "Parle G",
        initialQuantity: 19,
        remainingQuantity: 17,
        price: 105,
      },
    ],
    lowStock: [
      { name: "Tata Salt", remainingQuantity: 10, unit: "Packet", image: null },
      { name: "Lays", remainingQuantity: 15, unit: "Packet", image: null },
      { name: "Lays", remainingQuantity: 15, unit: "Packet", image: null },
    ],
    overallInventory: {
      categories: 14,
      totalProducts: 868,
      revenue: 25000,
      topSellingCount: 5,
      topSellingCost: 2500,
      lowStockOrdered: 12,
      lowStockNotInStock: 2,
    },
    purchaseOverview: {
      purchase: 82,
      cost: 13573,
      cancel: 5,
    },
    inventorySummary: {
      quantityInHand: 868,
      numberOfCategories: 21,
    },
  },
  getters: {
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
    ADJUST_STOCK(state, { productId, delta }) {
      const product = state.products.find((p) => p.id === productId);
      if (!product) return;

      const nextQty = Math.max(0, Number(product.quantity || 0) + Number(delta));
      product.quantity = nextQty;
      product.remainingStock = nextQty;
      product.availability = computeAvailability(nextQty, product.thresholdValue);
      product.updatedAt = nowIso();
    },
    ADD_STOCK_EVENT(state, { productId, event }) {
      const product = state.products.find((p) => p.id === productId);
      if (!product) return;
      if (!Array.isArray(product.stockHistory)) product.stockHistory = [];
      product.stockHistory.unshift(event);
    },
    ADD_CATEGORY(state, name) {
      const n = String(name || "").trim();
      if (!n) return;
      if (state.categories.includes(n)) return;
      state.categories.push(n);
    },
    DELETE_CATEGORY(state, name) {
      state.categories = state.categories.filter((c) => c !== name);
      state.products.forEach((p) => {
        if (p.category === name) p.category = "";
      });
    },
    ADD_TAG(state, name) {
      const n = String(name || "").trim();
      if (!n) return;
      if (state.tags.includes(n)) return;
      state.tags.push(n);
    },
    DELETE_TAG(state, name) {
      state.tags = state.tags.filter((t) => t !== name);
      state.products.forEach((p) => {
        p.tags = (p.tags || []).filter((t) => t !== name);
      });
    },
    ADD_STORAGE_LOCATION(state, loc) {
      const area = String(loc?.area || "").trim();
      const sub = String(loc?.sub || "").trim();
      if (!area) return;
      const exists = state.storageLocations.some(
        (l) => l.area === area && l.sub === sub
      );
      if (exists) return;
      state.storageLocations.push({ area, sub });
    },
    DELETE_STORAGE_LOCATION(state, loc) {
      state.storageLocations = state.storageLocations.filter(
        (l) => !(l.area === loc.area && l.sub === loc.sub)
      );
    },
    ADD_VENDOR(state, vendor) {
      const name = String(vendor?.name || "").trim();
      const contact = String(vendor?.contact || "").trim();
      if (!name) return;
      const exists = state.vendors.some((v) => v.name === name);
      if (exists) return;
      state.vendors.push({ name, contact });
    },
    DELETE_VENDOR(state, name) {
      state.vendors = state.vendors.filter((v) => v.name !== name);
    },
  },
  actions: {
    login({ commit }, credentials) {
      // Simulate login
      return new Promise((resolve) => {
        setTimeout(() => {
          const user = { email: credentials.email, name: "ASA User" };
          commit("SET_USER", user);
          localStorage.setItem("asa_token", "mock-token-123");
          resolve(user);
        }, 500);
      });
    },
    logout({ commit }) {
      commit("SET_USER", null);
      localStorage.removeItem("asa_token");
    },
    addProduct({ commit }, product) {
      const quantity = Number(product.quantity || 0);
      const thresholdValue = Number(product.thresholdValue || 0);
      const id = `${Date.now()}_${Math.floor(Math.random() * 1e6)}`;

      const newProduct = {
        id,
        name: String(product.name || "").trim(),
        description: String(product.description || "").trim(),
        buyingPrice: Number(product.buyingPrice || 0),
        quantity,
        unit: String(product.unit || "").trim(),
        thresholdValue,
        expiryDate: product.expiryDate || "",
        category: product.category || "",
        tags: Array.isArray(product.tags) ? product.tags : [],
        image: product.image || null,
        vendor: product.vendor || { name: "", contact: "" },
        storage: product.storage || { area: "", sub: "" },
        openingStock: quantity,
        remainingStock: quantity,
        onTheWay: 0,
        stockLocations: [],
        availability: computeAvailability(quantity, thresholdValue),
        createdAt: nowIso(),
        updatedAt: nowIso(),
        stockHistory: [
          {
            id: `evt_${Date.now()}`,
            at: nowIso(),
            delta: quantity,
            reason: "Initial stock",
          },
        ],
      };
      commit("ADD_PRODUCT", newProduct);
    },
    updateProduct({ commit, state }, updates) {
      const existing = state.products.find((p) => p.id === updates.id);
      if (!existing) return;

      const next = {
        ...existing,
        ...updates,
      };

      const quantity = Number(next.quantity || 0);
      const thresholdValue = Number(next.thresholdValue || 0);
      next.quantity = quantity;
      next.remainingStock = quantity;
      next.thresholdValue = thresholdValue;
      next.availability = computeAvailability(quantity, thresholdValue);
      next.description = String(next.description || "").trim();
      next.tags = Array.isArray(next.tags) ? next.tags : [];
      next.vendor = next.vendor || { name: "", contact: "" };
      next.storage = next.storage || { area: "", sub: "" };
      next.updatedAt = nowIso();
      if (!Array.isArray(next.stockHistory)) next.stockHistory = existing.stockHistory || [];

      commit("UPDATE_PRODUCT", next);
    },
    deleteProduct({ commit }, productId) {
      commit("DELETE_PRODUCT", productId);
    },
    adjustStock({ commit, state }, payload) {
      commit("ADJUST_STOCK", payload);
      const product = state.products.find((p) => p.id === payload.productId);
      if (!product) return;
      commit("ADD_STOCK_EVENT", {
        productId: payload.productId,
        event: {
          id: `evt_${Date.now()}`,
          at: nowIso(),
          delta: Number(payload.delta || 0),
          reason: String(payload.reason || "").trim(),
        },
      });
    },
    addCategory({ commit }, name) {
      commit("ADD_CATEGORY", name);
    },
    deleteCategory({ commit }, name) {
      commit("DELETE_CATEGORY", name);
    },
    addTag({ commit }, name) {
      commit("ADD_TAG", name);
    },
    deleteTag({ commit }, name) {
      commit("DELETE_TAG", name);
    },
    addStorageLocation({ commit }, loc) {
      commit("ADD_STORAGE_LOCATION", loc);
    },
    deleteStorageLocation({ commit }, loc) {
      commit("DELETE_STORAGE_LOCATION", loc);
    },
    addVendor({ commit }, vendor) {
      commit("ADD_VENDOR", vendor);
    },
    deleteVendor({ commit }, name) {
      commit("DELETE_VENDOR", name);
    },
  },
});
