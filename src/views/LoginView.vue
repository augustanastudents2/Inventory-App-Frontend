<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <img src="/assets/asa-logo.png" alt="ASA Logo" class="logo" />
          <h1 class="title">Sign In</h1>
          <p class="subtitle">Access the ASA Inventory Management System</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              v-model="email"
              placeholder="name@example.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" class="btn-primary" :disabled="loading">
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign In</span>
          </button>
        </form>

        <div class="login-footer">
          <router-link to="/public" class="public-link">
            View Public Catalog
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      loading: false,
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        })
        this.$router.push("/dashboard")
      } catch (error) {
        alert("Login failed. Please check your credentials.")
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background-color: var(--apple-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.login-container {
  width: 100%;
  max-width: 440px;
}

.login-card {
  background: var(--apple-card-bg);
  border-radius: var(--apple-radius-lg);
  padding: 48px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--apple-border);
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  width: 120px;
  height: auto;
  margin-bottom: 24px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  color: var(--apple-text-primary);
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 15px;
  color: var(--apple-text-secondary);
  line-height: 1.4;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--apple-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-left: 4px;
}

.form-group input {
  padding: 14px 16px;
  border-radius: 12px;
  border: none;
  background: var(--apple-gray);
  font-size: 16px;
  color: var(--apple-text-primary);
}

.form-group input:focus {
  background: rgba(0, 0, 0, 0.08);
  box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.1);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--apple-text-secondary);
  cursor: pointer;
  user-select: none;
}

.forgot-link {
  color: var(--apple-blue);
  font-weight: 600;
}

.btn-primary {
  padding: 14px;
  background: var(--apple-blue);
  color: #fff;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  margin-top: 8px;
}

.btn-primary:hover:not(:disabled) {
  background: #0077ed;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-footer {
  margin-top: 32px;
  text-align: center;
}

.public-link {
  font-size: 14px;
  color: var(--apple-text-secondary);
  font-weight: 500;
}

.public-link:hover {
  color: var(--apple-blue);
}
</style>
