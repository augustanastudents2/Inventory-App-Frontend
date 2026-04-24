<template>
  <div v-if="backendWaking" class="overlay" role="status" aria-live="polite">
    <div class="card">
      <DotLottieVue
        class="anim"
        autoplay
        loop
        src="https://lottie.host/448d1092-1f19-4cb2-8dd6-a5cd8fd44073/7CzzgIlxIm.lottie"
      />
      <div class="title">Waking up the server…</div>
      <div class="sub">
        Render free tier spins down after inactivity. This can take a few seconds.
      </div>
    </div>
  </div>
</template>

<script setup>
import { DotLottieVue } from "@lottiefiles/dotlottie-vue"
import { backendWaking } from "../../utils/backendWake"
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: 16px;
}

.card {
  width: min(520px, 100%);
  background: var(--apple-card-bg);
  border: 1px solid var(--apple-border);
  border-radius: 16px;
  box-shadow: var(--apple-shadow-hover);
  padding: 18px 18px 16px;
  text-align: center;
}

.anim {
  width: min(320px, 85vw);
  height: min(320px, 85vw);
  margin: 0 auto;
}

.title {
  margin-top: 10px;
  font-size: 18px;
  font-weight: 800;
  color: var(--apple-text-primary);
}

.sub {
  margin-top: 6px;
  color: var(--apple-text-secondary);
  font-size: 14px;
  line-height: 1.45;
}
</style>

