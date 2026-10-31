# FurniStore — UI Prototype

A premium furniture e-commerce front-end prototype built with **React + Vite + React Router**. No backend is connected — cart, wishlist, and auth are simulated in-memory (persisted to `localStorage` in the browser only, for a realistic feel while you click around).

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build a static production bundle:

```bash
npm run build
npm run preview
```

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/shop` | Product listing (filters, sort, search — try `/shop?category=sofas`) |
| `/product/:id` | Product details |
| `/cart` | Cart |
| `/wishlist` | Wishlist |
| `/login` | Login |
| `/register` | Register |
| `/account` | Account (profile, orders, addresses, wishlist) — sign in first |
| `/admin` | Admin dashboard (stats, sales chart, products, orders, customers) |

## Notes for the next phase

- All product, order, and customer data in `src/data/products.js` and `src/pages/Admin.jsx` / `src/pages/Account.jsx` is mock data — swap in real API calls when the backend is ready.
- `src/state/store.jsx` centralizes cart/wishlist/auth state via React context; this is the natural place to wire up real API/auth calls later.
- Checkout, payment, and admin write actions (add/edit/delete) are UI-only placeholders.
