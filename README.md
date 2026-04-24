# ASA Inventory App Frontend (Vue 3)

Vue 3 single-page app for inventory management: **dashboard**, **inventory table**, **product details**, and **settings** (categories/tags/vendors/storage) with **admin user management**.

This frontend talks to the Inventory backend API and includes a “waking up server…” animation for Render free-tier spin-up.

## Stack

- **Vue 3** (Composition / Options API)
- **Vite 7**
- **Vue Router 4** (routes + auth guard via `asa_token` in `localStorage`)
- **Vuex 4** (products, settings, users)
- **Axios** (API client)
- **Chart.js + vue-chartjs** (dashboards + stock charts)
- **EmailJS** (email new-user credentials)
- **Lottie** (`@lottiefiles/dotlottie-vue`) (Render spin-up overlay)

## Requirements

- **Node.js** `^20.19.0` or `>=22.12.0` (see `package.json` → `engines`)

## Setup

```sh
npm install
```

## Environment variables

Create a local `.env` (do **not** commit secrets). On Vercel, set these as Project Environment Variables.

```env
# Backend API base URL
VITE_API_URL=https://<your-backend-host>/api

# App name used in footer + emails
VITE_APP_NAME=ASA Inventory

# API Ninjas (password generator) - used client-side
VITE_API_NINJAS_KEY=<api-ninjas-key>

# EmailJS (public identifiers)
VITE_EMAILJS_PUBLIC_KEY=<emailjs-public-key>
VITE_EMAILJS_SERVICE_ID=<emailjs-service-id>
VITE_EMAILJS_TEMPLATE_ID=<emailjs-template-id>

# Link included in the “account created” email
VITE_APP_LOGIN_URL=https://<your-frontend-host>/login
```

## Scripts

| Command | Description |
|--------|---------------|
| `npm run dev` | Dev server with HMR (default Vite port) |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |

## Project layout

```
src/
  main.js              # App bootstrap, router, store, global CSS
  App.vue
  router/index.js      # Routes + beforeEach auth
  store/index.js       # Vuex state/actions (products, settings, users, auth)
  assets/styles/       # global.css
  views/               # Login, Dashboard, Inventory, Product detail, Settings
  components/
    layout/            # AppLayout, Sidebar, TopBar
    common/            # StatCard, Pagination, ModalWrapper
    dashboard/         # Purchase overview, inventory summary, favorites, low stock
    inventory/         # Overall inventory, products table, add product modal
    product/           # Product detail sections
public/
  assets/              # Static images (logos, avatar, etc.)
```

Replace files under `public/assets/` with your real brand assets when ready.

## Key UX features

- **Render spin-up overlay**: shows “Waking up the server…” when API calls are slow
- **Responsive tables**: inventory and settings adapt for mobile
- **Email onboarding**: admin-created users receive credentials via EmailJS

## Repo setup checklist

### Local dev

- [ ] Install deps: `npm install`
- [ ] Create `.env` with at least `VITE_API_URL` and `VITE_APP_NAME`
- [ ] Run dev server: `npm run dev`
- [ ] Smoke test:
  - Login page loads
  - Inventory list loads products from the backend

### Vercel (deployment)

- [ ] Set Vercel env vars (Project → Settings → Environment Variables):
  - `VITE_API_URL`
  - `VITE_APP_NAME`
  - `VITE_API_NINJAS_KEY`
  - `VITE_EMAILJS_PUBLIC_KEY`
  - `VITE_EMAILJS_SERVICE_ID`
  - `VITE_EMAILJS_TEMPLATE_ID`
  - `VITE_APP_LOGIN_URL`
- [ ] Trigger a redeploy
- [ ] Smoke test:
  - Create product
  - Adjust stock (stock history + chart updates)
  - Create user (password auto-generated + EmailJS email)

## IDE

- [VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur if installed).

## Configuration

See [Vite Configuration Reference](https://vite.dev/config/) — project uses `@vitejs/plugin-vue` and `vite-plugin-vue-devtools` in `vite.config.js`.
