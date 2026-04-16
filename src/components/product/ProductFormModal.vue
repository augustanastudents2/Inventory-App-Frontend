<template>
  <ModalWrapper :visible="visible" maxWidth="560px" @close="$emit('close')">
    <div class="product-form-modal">
      <h2 class="modal-title">{{ title }}</h2>

      <form @submit.prevent="handleSubmit" class="product-form">
        <div class="form-row">
          <label class="form-label label-with-info">
            <span>Product Name</span>
            <InfoTooltip text="The material/product name users will search for (e.g. Maggi, Red Bull)." />
          </label>
          <input
            type="text"
            v-model.trim="form.name"
            placeholder="e.g. Maggi"
            class="form-input"
            required
          />
        </div>

        <div class="form-row">
          <label class="form-label label-with-info">
            <span>Category</span>
            <InfoTooltip text="A short group name to organize products (e.g. Beverages, Cleaning, Snacks). Helps searching and reporting." />
          </label>
          <input
            type="text"
            v-model.trim="form.category"
            placeholder="e.g. Beverages"
            class="form-input"
            list="category-options"
          />
          <datalist id="category-options">
            <option v-for="c in categories" :key="c" :value="c" />
          </datalist>
        </div>

        <div class="form-row">
          <label class="form-label label-with-info">
            <span>Description</span>
            <InfoTooltip text="Short notes about the item (what it is used for, size, special handling, etc.)." />
          </label>
          <textarea
            v-model.trim="form.description"
            placeholder="Optional description"
            class="form-input textarea"
            rows="3"
          />
        </div>

        <div class="form-row">
          <label class="form-label label-with-info">
            <span>Use Tags</span>
            <InfoTooltip text="Optional. Comma-separated tags so one item can match multiple uses (e.g. Casino Night, Decor, Kitchen)." />
          </label>
          <input
            type="text"
            v-model.trim="form.tagsInput"
            placeholder="e.g. Casino Night, Decor"
            class="form-input"
          />
          <div class="tag-suggestions" v-if="tags.length">
            <span class="muted-small">Suggestions:</span>
            <button
              v-for="t in tags.slice(0, 8)"
              :key="t"
              type="button"
              class="tag-chip"
              @click="appendTag(t)"
            >
              {{ t }}
            </button>
          </div>
        </div>

        <div class="form-row two-col">
          <div class="col">
            <label class="form-label label-with-info">
              <span>Storage Area</span>
              <InfoTooltip text="Where the item is stored (e.g. Storage Room 1)." />
            </label>
            <input
              type="text"
              v-model.trim="form.storageArea"
              placeholder="e.g. Storage Room 1"
              class="form-input"
              list="storage-area-options"
            />
            <datalist id="storage-area-options">
              <option v-for="a in storageAreas" :key="a" :value="a" />
            </datalist>
          </div>
          <div class="col">
            <label class="form-label label-with-info">
              <span>Storage Sub-location</span>
              <InfoTooltip text="More detail inside the storage area (e.g. Shelf 2, Bin A)." />
            </label>
            <input
              type="text"
              v-model.trim="form.storageSub"
              placeholder="e.g. Shelf 2"
              class="form-input"
              :list="storageSubListId"
            />
            <datalist :id="storageSubListId">
              <option v-for="s in storageSubs" :key="s" :value="s" />
            </datalist>
          </div>
        </div>

        <div class="form-row two-col">
          <div class="col">
            <label class="form-label label-with-info">
              <span>Vendor</span>
              <InfoTooltip text="Where the item was purchased (e.g. Amazon, Staples)." />
            </label>
            <input
              type="text"
              v-model.trim="form.vendorName"
              placeholder="e.g. Amazon"
              class="form-input"
              list="vendor-options"
            />
            <datalist id="vendor-options">
              <option v-for="v in vendors" :key="v.name" :value="v.name" />
            </datalist>
          </div>
          <div class="col">
            <label class="form-label label-with-info">
              <span>Vendor Contact</span>
              <InfoTooltip text="Optional. Any vendor contact info (email/phone/order reference)." />
            </label>
            <input
              type="text"
              v-model.trim="form.vendorContact"
              placeholder="Optional"
              class="form-input"
            />
          </div>
        </div>

        <div class="form-row two-col">
          <div class="col">
            <label class="form-label label-with-info">
              <span>Buying Price</span>
              <InfoTooltip text="Your cost price for one unit. Used for inventory valuation." />
            </label>
            <input
              type="number"
              v-model.number="form.buyingPrice"
              min="0"
              step="0.01"
              placeholder="0"
              class="form-input"
              required
            />
          </div>
          <div class="col">
            <label class="form-label label-with-info">
              <span>Unit</span>
              <InfoTooltip text="The unit you count stock in (e.g. Pieces, Packs, Litres, Kg)." />
            </label>
            <input
              type="text"
              v-model.trim="form.unit"
              placeholder="e.g. Packets"
              class="form-input"
              required
            />
          </div>
        </div>

        <div class="form-row two-col">
          <div class="col">
            <label class="form-label label-with-info">
              <span>Quantity</span>
              <InfoTooltip text="How many units you currently have in stock." />
            </label>
            <input
              type="number"
              v-model.number="form.quantity"
              min="0"
              step="1"
              placeholder="0"
              class="form-input"
              required
            />
          </div>
          <div class="col">
            <label class="form-label label-with-info">
              <span>Low-stock Threshold</span>
              <InfoTooltip text="When quantity is at or below this number, the item will be marked as Low stock." />
            </label>
            <input
              type="number"
              v-model.number="form.thresholdValue"
              min="0"
              step="1"
              placeholder="0"
              class="form-input"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <label class="form-label label-with-info">
            <span>Expiry Date</span>
            <InfoTooltip text="Optional. Use for perishable materials; helps identify items approaching expiry." />
          </label>
          <input type="date" v-model="form.expiryDate" class="form-input" />
        </div>

        <div class="form-actions">
          <button type="button" class="btn-outline" @click="$emit('close')">
            Cancel
          </button>
          <button type="submit" class="btn-primary">
            {{ mode === "edit" ? "Save Changes" : "Add Product" }}
          </button>
        </div>
      </form>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from "../common/ModalWrapper.vue"
import InfoTooltip from "../common/InfoTooltip.vue"

export default {
  name: "ProductFormModal",
  components: { ModalWrapper, InfoTooltip },
  props: {
    visible: { type: Boolean, default: false },
    mode: { type: String, default: "add" }, // add | edit
    initialProduct: { type: Object, default: null },
  },
  data() {
    return {
      form: this.buildInitialForm(),
    }
  },
  computed: {
    title() {
      return this.mode === "edit" ? "Edit Product" : "New Product"
    },
    categories() {
      return this.$store?.state?.categories || []
    },
    tags() {
      return this.$store?.state?.tags || []
    },
    vendors() {
      return this.$store?.state?.vendors || []
    },
    storageLocations() {
      return this.$store?.state?.storageLocations || []
    },
    storageAreas() {
      const areas = new Set()
      for (const l of this.storageLocations) {
        if (l?.area) areas.add(l.area)
      }
      return Array.from(areas).sort((a, b) => a.localeCompare(b))
    },
    storageSubs() {
      const area = String(this.form.storageArea || "").trim()
      const subs = new Set()
      for (const l of this.storageLocations) {
        if (!l?.sub) continue
        if (!area || l.area === area) subs.add(l.sub)
      }
      return Array.from(subs).sort((a, b) => a.localeCompare(b))
    },
    storageSubListId() {
      return "storage-sub-options"
    },
  },
  watch: {
    visible(next) {
      if (next) this.form = this.buildInitialForm()
    },
    initialProduct() {
      if (this.visible) this.form = this.buildInitialForm()
    },
  },
  methods: {
    buildInitialForm() {
      const p = this.initialProduct || {}
      return {
        name: p.name || "",
        category: p.category || "",
        description: p.description || "",
        tagsInput: Array.isArray(p.tags) ? p.tags.join(", ") : "",
        storageArea: p.storage?.area || "",
        storageSub: p.storage?.sub || "",
        vendorName: p.vendor?.name || "",
        vendorContact: p.vendor?.contact || "",
        buyingPrice: typeof p.buyingPrice === "number" ? p.buyingPrice : 0,
        quantity: typeof p.quantity === "number" ? p.quantity : 0,
        unit: p.unit || "Units",
        thresholdValue:
          typeof p.thresholdValue === "number" ? p.thresholdValue : 0,
        expiryDate: this.toDateInputValue(p.expiryDate),
      }
    },
    toDateInputValue(value) {
      if (!value) return ""
      if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value
      return ""
    },
    handleSubmit() {
      const tags = String(this.form.tagsInput || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)

      const payload = {
        ...this.form,
        tags,
        storage: { area: this.form.storageArea || "", sub: this.form.storageSub || "" },
        vendor: { name: this.form.vendorName || "", contact: this.form.vendorContact || "" },
      }
      this.$emit("save", payload)
    },
    appendTag(tag) {
      const t = String(tag || "").trim()
      if (!t) return
      const existing = String(this.form.tagsInput || "")
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean)
      if (existing.includes(t)) return
      existing.push(t)
      this.form.tagsInput = existing.join(", ")
    },
  },
}
</script>

<style scoped>
.product-form-modal {
  padding: 28px 28px 24px;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 13px;
  font-weight: 600;
  color: #344054;
}

.label-with-info {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.form-input {
  padding: 10px 14px;
  border: 1px solid #d0d5dd;
  border-radius: 10px;
  font-size: 14px;
  color: #1f2937;
  background: #fff;
}

.textarea {
  resize: vertical;
  min-height: 92px;
}

.tag-suggestions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.muted-small {
  color: #6b7280;
  font-size: 12px;
  font-weight: 700;
}

.tag-chip {
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #374151;
  font-size: 12px;
  font-weight: 800;
}

.tag-chip:hover {
  background: #f9fafb;
}

.form-input:focus {
  outline: none;
  border-color: #1a73e8;
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.12);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 16px;
  margin-top: 6px;
  border-top: 1px solid #e5e7eb;
}

.btn-primary {
  padding: 10px 18px;
  background: #1a73e8;
  color: #fff;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  border: none;
}

.btn-primary:hover {
  background: #1557b0;
}

.btn-outline {
  padding: 10px 18px;
  background: #fff;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
}

.btn-outline:hover {
  background: #f9fafb;
}

@media (max-width: 640px) {
  .two-col {
    grid-template-columns: 1fr;
  }
}
</style>
