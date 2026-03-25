<template>
  <ModalWrapper
    :visible="visible"
    maxWidth="600px"
    @close="$emit('close')"
  >
    <div class="add-product-modal">
      <h2 class="modal-title">New Product</h2>

      <form @submit.prevent="handleSubmit" class="product-form">
        <div class="image-upload">
          <div
            class="upload-area"
            @click="triggerFileInput"
            @dragover.prevent="dragOver = true"
            @dragleave="dragOver = false"
            @drop.prevent="handleDrop"
            :class="{ 'drag-over': dragOver }"
          >
            <img
              v-if="imagePreview"
              :src="imagePreview"
              class="preview-image"
            />
            <div v-else class="upload-placeholder">
              <div class="upload-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ccc"
                  stroke-width="1.5"
                  width="40"
                  height="40"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    ry="2"
                    stroke-dasharray="4,4"
                  />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </div>
            </div>
          </div>

          <div class="upload-text">
            <span>Drag image here</span>
            <span>or</span>
            <a
              href="#"
              @click.prevent="triggerFileInput"
              class="browse-link"
              >Browse image</a
            >
          </div>

          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="hidden-input"
            @change="handleFileChange"
          />
        </div>

        <div class="form-row">
          <label class="form-label">Product Name</label>
          <input
            type="text"
            v-model="form.name"
            placeholder="Enter product name"
            class="form-input"
            required
          />
        </div>

        <div class="form-row">
          <label class="form-label">Product ID</label>
          <input
            type="text"
            v-model="form.productId"
            placeholder="Enter product ID"
            class="form-input"
            required
          />
        </div>

        <div class="form-row">
          <label class="form-label">Category</label>
          <select v-model="form.category" class="form-input" required>
            <option value="" disabled>Select product category</option>
            <option value="Instant food">Instant food</option>
            <option value="Beverages">Beverages</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Snacks">Snacks</option>
            <option value="Personal Care">Personal Care</option>
          </select>
        </div>

        <div class="form-row">
          <label class="form-label">Buying Price</label>
          <input
            type="number"
            v-model.number="form.buyingPrice"
            placeholder="Enter buying price"
            class="form-input"
            required
          />
        </div>

        <div class="form-row">
          <label class="form-label">Quantity</label>
          <input
            type="number"
            v-model.number="form.quantity"
            placeholder="Enter product quantity"
            class="form-input"
            required
          />
        </div>

        <div class="form-row">
          <label class="form-label">Unit</label>
          <input
            type="text"
            v-model="form.unit"
            placeholder="Enter product unit"
            class="form-input"
            required
          />
        </div>

        <div class="form-row">
          <label class="form-label">Expiry Date</label>
          <input
            type="date"
            v-model="form.expiryDate"
            placeholder="Enter expiry date"
            class="form-input"
            required
          />
        </div>

        <div class="form-row">
          <label class="form-label">Threshold Value</label>
          <input
            type="number"
            v-model.number="form.thresholdValue"
            placeholder="Enter threshold value"
            class="form-input"
            required
          />
        </div>

        <div class="form-actions">
          <button type="button" class="btn-discard" @click="handleDiscard">
            Discard
          </button>
          <button type="submit" class="btn-add">Add Product</button>
        </div>
      </form>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from "../common/ModalWrapper.vue"

export default {
  name: "AddProductModal",
  components: { ModalWrapper },
  props: {
    visible: Boolean,
  },
  data() {
    return {
      dragOver: false,
      imagePreview: null,
      imageFile: null,
      form: {
        name: "",
        productId: "",
        category: "",
        buyingPrice: null,
        quantity: null,
        unit: "",
        expiryDate: "",
        thresholdValue: null,
      },
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileChange(e) {
      const file = e.target.files[0]
      if (file) {
        this.imageFile = file
        this.imagePreview = URL.createObjectURL(file)
      }
    },
    handleDrop(e) {
      this.dragOver = false
      const file = e.dataTransfer.files[0]
      if (file && file.type.startsWith("image/")) {
        this.imageFile = file
        this.imagePreview = URL.createObjectURL(file)
      }
    },
    handleSubmit() {
      const product = {
        ...this.form,
        image: this.imagePreview,
      }
      this.$emit("add", product)
      this.resetForm()
    },
    handleDiscard() {
      this.resetForm()
      this.$emit("close")
    },
    resetForm() {
      this.form = {
        name: "",
        productId: "",
        category: "",
        buyingPrice: null,
        quantity: null,
        unit: "",
        expiryDate: "",
        thresholdValue: null,
      }
      this.imagePreview = null
      this.imageFile = null
    },
  },
}
</script>

<style scoped>
.add-product-modal {
  padding: 32px;
}

.modal-title {
  font-size: 22px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 28px;
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.image-upload {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 8px;
}

.upload-area {
  width: 100px;
  height: 100px;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.2s;
  overflow: hidden;
}

.upload-area:hover,
.upload-area.drag-over {
  border-color: #1a73e8;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
  color: #6b7280;
}

.browse-link {
  color: #1a73e8;
  font-weight: 500;
  cursor: pointer;
}

.hidden-input {
  display: none;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 20px;
}

.form-label {
  width: 140px;
  font-size: 14px;
  font-weight: 500;
  color: #344054;
  flex-shrink: 0;
}

.form-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  font-size: 14px;
  color: #1f2937;
  transition: border-color 0.2s;
  background: #fff;
}

.form-input:focus {
  border-color: #1a73e8;
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
}

.form-input::placeholder {
  color: #9ca3af;
}

select.form-input {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  padding-right: 36px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 12px;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.btn-discard {
  padding: 10px 28px;
  background: #fff;
  color: #374151;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-discard:hover {
  background: #f9fafb;
}

.btn-add {
  padding: 10px 28px;
  background: #1a73e8;
  color: #fff;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s;
}

.btn-add:hover {
  background: #1557b0;
}
</style>