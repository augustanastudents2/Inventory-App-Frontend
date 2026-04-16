<template>
  <AppLayout>
    <div class="settings-page">
      <div class="header">
        <div>
          <h2 class="title">Settings</h2>
          <p class="subtitle">
            Manage categories, tags, storage locations, and vendors.
          </p>
        </div>
      </div>

      <div class="grid">
        <section class="card">
          <h3 class="card-title">Categories</h3>
          <form class="row" @submit.prevent="addCategory">
            <input
              v-model.trim="newCategory"
              class="input"
              placeholder="Add category (e.g. Casino Night Event)"
            />
            <button class="btn-primary" type="submit">Add</button>
          </form>
          <div class="list">
            <div class="list-row" v-for="c in categories" :key="c">
              <span class="name">{{ c }}</span>
              <button class="btn-danger" @click="removeCategory(c)">
                Remove
              </button>
            </div>
            <div v-if="!categories.length" class="empty">No categories yet.</div>
          </div>
        </section>

        <section class="card">
          <h3 class="card-title">Use Tags</h3>
          <form class="row" @submit.prevent="addTag">
            <input
              v-model.trim="newTag"
              class="input"
              placeholder="Add tag (e.g. Decor)"
            />
            <button class="btn-primary" type="submit">Add</button>
          </form>
          <div class="list">
            <div class="list-row" v-for="t in tags" :key="t">
              <span class="name">{{ t }}</span>
              <button class="btn-danger" @click="removeTag(t)">Remove</button>
            </div>
            <div v-if="!tags.length" class="empty">No tags yet.</div>
          </div>
        </section>

        <section class="card">
          <h3 class="card-title">Storage Locations</h3>
          <form class="row row-2" @submit.prevent="addStorage">
            <input
              v-model.trim="newStorageArea"
              class="input"
              placeholder="Area (e.g. Storage Room 1)"
            />
            <input
              v-model.trim="newStorageSub"
              class="input"
              placeholder="Sub-location (e.g. Shelf 2)"
            />
            <button class="btn-primary" type="submit">Add</button>
          </form>
          <div class="list">
            <div
              class="list-row"
              v-for="loc in storageLocations"
              :key="loc.area + '|' + loc.sub"
            >
              <span class="name">
                {{ loc.area }}<span v-if="loc.sub" class="muted">
                  &nbsp;· {{ loc.sub }}</span
                >
              </span>
              <button class="btn-danger" @click="removeStorage(loc)">
                Remove
              </button>
            </div>
            <div v-if="!storageLocations.length" class="empty">
              No storage locations yet.
            </div>
          </div>
        </section>

        <section class="card">
          <h3 class="card-title">Vendors</h3>
          <form class="row row-2" @submit.prevent="addVendor">
            <input
              v-model.trim="newVendorName"
              class="input"
              placeholder="Vendor name (e.g. Staples)"
            />
            <input
              v-model.trim="newVendorContact"
              class="input"
              placeholder="Contact (optional)"
            />
            <button class="btn-primary" type="submit">Add</button>
          </form>
          <div class="list">
            <div class="list-row" v-for="v in vendors" :key="v.name">
              <span class="name">
                {{ v.name
                }}<span v-if="v.contact" class="muted"> · {{ v.contact }}</span>
              </span>
              <button class="btn-danger" @click="removeVendor(v.name)">
                Remove
              </button>
            </div>
            <div v-if="!vendors.length" class="empty">No vendors yet.</div>
          </div>
        </section>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "../components/layout/AppLayout.vue"

export default {
  name: "SettingsView",
  components: { AppLayout },
  data() {
    return {
      newCategory: "",
      newTag: "",
      newStorageArea: "",
      newStorageSub: "",
      newVendorName: "",
      newVendorContact: "",
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories || []
    },
    tags() {
      return this.$store.state.tags || []
    },
    storageLocations() {
      return this.$store.state.storageLocations || []
    },
    vendors() {
      return this.$store.state.vendors || []
    },
  },
  methods: {
    addCategory() {
      this.$store.dispatch("addCategory", this.newCategory)
      this.newCategory = ""
    },
    removeCategory(name) {
      this.$store.dispatch("deleteCategory", name)
    },
    addTag() {
      this.$store.dispatch("addTag", this.newTag)
      this.newTag = ""
    },
    removeTag(name) {
      this.$store.dispatch("deleteTag", name)
    },
    addStorage() {
      this.$store.dispatch("addStorageLocation", {
        area: this.newStorageArea,
        sub: this.newStorageSub,
      })
      this.newStorageArea = ""
      this.newStorageSub = ""
    },
    removeStorage(loc) {
      this.$store.dispatch("deleteStorageLocation", loc)
    },
    addVendor() {
      this.$store.dispatch("addVendor", {
        name: this.newVendorName,
        contact: this.newVendorContact,
      })
      this.newVendorName = ""
      this.newVendorContact = ""
    },
    removeVendor(name) {
      this.$store.dispatch("deleteVendor", name)
    },
  },
}
</script>

<style scoped>
.settings-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.title {
  font-size: 20px;
  font-weight: 800;
  color: #111827;
  margin: 0;
}

.subtitle {
  margin-top: 6px;
  color: #6b7280;
  font-size: 13px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.card {
  background: #fff;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  border: 1px solid #f3f4f6;
}

.card-title {
  font-size: 16px;
  font-weight: 800;
  color: #111827;
  margin-bottom: 12px;
}

.row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  align-items: center;
  margin-bottom: 12px;
}

.row-2 {
  grid-template-columns: 1fr 1fr auto;
}

.input {
  padding: 10px 12px;
  border: 1px solid #d0d5dd;
  border-radius: 10px;
  font-size: 14px;
}

.input:focus {
  outline: none;
  border-color: #1a73e8;
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.12);
}

.btn-primary {
  padding: 10px 14px;
  border: none;
  border-radius: 10px;
  background: #1a73e8;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
}

.btn-primary:hover {
  background: #1557b0;
}

.btn-danger {
  padding: 8px 12px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid #fecaca;
  color: #dc2626;
  font-size: 13px;
  font-weight: 700;
}

.btn-danger:hover {
  background: #fef2f2;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
}

.name {
  font-size: 14px;
  font-weight: 700;
  color: #111827;
}

.muted {
  color: #6b7280;
  font-weight: 600;
}

.empty {
  padding: 12px;
  color: #6b7280;
  font-size: 13px;
  border: 1px dashed #e5e7eb;
  border-radius: 12px;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .row-2 {
    grid-template-columns: 1fr;
  }
}
</style>