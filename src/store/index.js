import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
    products: [
      {
        id: "456567",
        name: "Maggi",
        buyingPrice: 430,
        quantity: 43,
        unit: "Packets",
        thresholdValue: 12,
        expiryDate: "11/12/22",
        availability: "In-stock",
        category: "Instant food",
        image: null,
        supplier: { name: "Ronald Martin", contact: "98789 86757" },
        openingStock: 40,
        remainingStock: 34,
        onTheWay: 15,
        stockLocations: [
          { storeName: "Sulur Branch", stockInHand: 15 },
          { storeName: "Singanallur Branch", stockInHand: 19 },
        ],
      },
      {
        id: "456568",
        name: "Bru",
        buyingPrice: 257,
        quantity: 22,
        unit: "Packets",
        thresholdValue: 12,
        expiryDate: "21/12/22",
        availability: "Out of stock",
        category: "Beverages",
        image: null,
        supplier: { name: "John Doe", contact: "98765 43210" },
        openingStock: 30,
        remainingStock: 0,
        onTheWay: 10,
        stockLocations: [],
      },
      {
        id: "456569",
        name: "Red Bull",
        buyingPrice: 405,
        quantity: 36,
        unit: "Packets",
        thresholdValue: 9,
        expiryDate: "5/12/22",
        availability: "In-stock",
        category: "Beverages",
        image: null,
        supplier: { name: "Jane Smith", contact: "91234 56789" },
        openingStock: 50,
        remainingStock: 36,
        onTheWay: 5,
        stockLocations: [],
      },
      {
        id: "456570",
        name: "Bourn Vita",
        buyingPrice: 502,
        quantity: 14,
        unit: "Packets",
        thresholdValue: 6,
        expiryDate: "8/12/22",
        availability: "Out of stock",
        category: "Beverages",
        image: null,
        supplier: { name: "Mike Johnson", contact: "99876 54321" },
        openingStock: 20,
        remainingStock: 0,
        onTheWay: 8,
        stockLocations: [],
      },
      {
        id: "456571",
        name: "Horlicks",
        buyingPrice: 530,
        quantity: 5,
        unit: "Packets",
        thresholdValue: 5,
        expiryDate: "9/1/23",
        availability: "In-stock",
        category: "Beverages",
        image: null,
        supplier: { name: "Sarah Lee", contact: "98001 23456" },
        openingStock: 15,
        remainingStock: 5,
        onTheWay: 3,
        stockLocations: [],
      },
      {
        id: "456572",
        name: "Harpic",
        buyingPrice: 605,
        quantity: 10,
        unit: "Packets",
        thresholdValue: 5,
        expiryDate: "9/1/23",
        availability: "In-stock",
        category: "Cleaning",
        image: null,
        supplier: { name: "Tom Brown", contact: "97654 32100" },
        openingStock: 25,
        remainingStock: 10,
        onTheWay: 7,
        stockLocations: [],
      },
      {
        id: "456573",
        name: "Ariel",
        buyingPrice: 408,
        quantity: 23,
        unit: "Packets",
        thresholdValue: 7,
        expiryDate: "15/12/23",
        availability: "Out of stock",
        category: "Cleaning",
        image: null,
        supplier: { name: "Lisa White", contact: "96543 21098" },
        openingStock: 30,
        remainingStock: 0,
        onTheWay: 12,
        stockLocations: [],
      },
      {
        id: "456574",
        name: "Scotch Brite",
        buyingPrice: 359,
        quantity: 43,
        unit: "Packets",
        thresholdValue: 8,
        expiryDate: "6/6/23",
        availability: "In-stock",
        category: "Cleaning",
        image: null,
        supplier: { name: "David Green", contact: "95432 10987" },
        openingStock: 50,
        remainingStock: 43,
        onTheWay: 0,
        stockLocations: [],
      },
      {
        id: "456575",
        name: "Coca cola",
        buyingPrice: 205,
        quantity: 41,
        unit: "Packets",
        thresholdValue: 10,
        expiryDate: "11/11/22",
        availability: "Low stock",
        category: "Beverages",
        image: null,
        supplier: { name: "Amy Taylor", contact: "94321 09876" },
        openingStock: 60,
        remainingStock: 41,
        onTheWay: 20,
        stockLocations: [],
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
      const newProduct = {
        ...product,
        id: Date.now().toString(),
        availability:
          product.quantity > product.thresholdValue
            ? "In-stock"
            : product.quantity === 0
              ? "Out of stock"
              : "Low stock",
        openingStock: product.quantity,
        remainingStock: product.quantity,
        onTheWay: 0,
        stockLocations: [],
        supplier: { name: "", contact: "" },
      };
      commit("ADD_PRODUCT", newProduct);
    },
  },
});
