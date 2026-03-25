# ASA Inventory App (Frontend)

Vue 3 single-page app for inventory management: dashboard, product catalog, product detail, and settings. Uses mock data in Vuex and a simulated login (localStorage token).

## Stack

- **Vue 3** (Composition / Options API)
- **Vite 7**
- **Vue Router 4** (routes + auth guard via `asa_token` in `localStorage`)
- **Vuex 4** (products, favorites, dashboard stats)

## Requirements

- **Node.js** `^20.19.0` or `>=22.12.0` (see `package.json` → `engines`)

## Setup

```sh
npm install
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
  store/index.js       # Vuex state, getters, login/addProduct actions
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

## IDE

- [VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur if installed).

## Configuration

See [Vite Configuration Reference](https://vite.dev/config/) — project uses `@vitejs/plugin-vue` and `vite-plugin-vue-devtools` in `vite.config.js`.
