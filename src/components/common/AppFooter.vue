<template>
  <footer class="footer">
    <p class="copy">&copy; {{ year }} {{ appName }}.</p>
    <a
      href="https://linktr.ee/chisomchiobi"
      target="_blank"
      rel="noopener noreferrer"
      class="trademark"
    >
      Built by jasonthe_dev
    </a>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",
  computed: {
    year() {
      return new Date().getFullYear()
    },
    appName() {
      return import.meta.env.VITE_APP_NAME || "ASA App"
    },
  },
}
</script>

<style scoped>
.footer {
  padding: 18px 16px;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  border-top: 1px solid var(--apple-border);
  color: var(--apple-text-secondary);
  font-size: 14px;
}

.copy {
  margin: 0;
}

.trademark {
  color: var(--apple-blue);
  font-weight: 700;
}
</style>

