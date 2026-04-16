<template>
  <div class="login-page">
    <div class="login-left">
      <img
        src="/assets/asa-logo-large.png"
        alt="ASA"
        class="login-logo-large"
      />
    </div>

    <div class="login-right">
      <div class="login-form-container">
        <div class="login-logo-small">
          <img src="/assets/asa-logo.png" alt="ASA" />
        </div>

        <h1 class="login-title">Log in to your account</h1>
        <p class="login-subtitle">Welcome back! Please enter your details.</p>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              v-model="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input
              type="password"
              v-model="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" v-model="rememberMe" />
              <span>Remember for 30 days</span>
            </label>
            <a href="#" class="forgot-link">Forgot password</a>
          </div>

          <button type="submit" class="btn-signin" :disabled="loading">
            {{ loading ? "Signing in..." : "Sign in" }}
          </button>
        </form>
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
        alert("Login failed")
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.login-page {
  display: flex;
  min-height: 100vh;
}

.login-left {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.login-logo-large {
  max-width: 450px;
  width: 80%;
}

.login-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.login-form-container {
  width: 100%;
  max-width: 400px;
  padding: 40px;
}

.login-logo-small {
  text-align: center;
  margin-bottom: 24px;
}

.login-logo-small img {
  width: 80px;
}

.login-title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
  color: #1f2937;
}

.login-subtitle {
  font-size: 14px;
  text-align: center;
  color: #6b7280;
  margin-bottom: 32px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #344054;
}

.form-group input {
  padding: 10px 14px;
  border: 1px solid #d0d5dd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-group input:focus {
  border-color: #1a73e8;
  box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #344054;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.forgot-link {
  font-size: 14px;
  color: #1a73e8;
  font-weight: 600;
}

.btn-signin {
  padding: 12px;
  background: #1a73e8;
  color: #fff;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-signin:hover:not(:disabled) {
  background: #1557b0;
}

.btn-signin:disabled {
  opacity: 0.7;
}

</style>