# Full Stack Shopping Cart

A full-stack e-commerce shopping cart application: a React frontend backed by a layered Express/MySQL API, with product search, stock-aware cart operations, per-user carts, and automated backend tests.

---

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [API Reference](#api-reference)
- [Database Design](#database-design)
- [User Identification](#user-identification)
- [Testing](#testing)
- [Technical Decisions & Trade-offs](#technical-decisions--trade-offs)
- [Known Limitations](#known-limitations)

---

## Overview

The application lets a user browse products, search by name, and manage a cart — with server-side stock validation, persistent storage, per-user isolation, and consistent error handling across the API.

Implemented features:

- Case-insensitive, partial-match product search
- Stock validation on add/update (rejects over-allocation with `400`)
- Persistent storage in MySQL (products + cart survive backend restarts)
- Per-user cart isolation via an `X-USER-ID` header
- Consistent error responses (`404` invalid product/cart item, `400` invalid input, `500` sanitized fallback for anything unexpected)
- Frontend loading/error/empty states for both products and cart, with inputs disabled while a request is in flight
- Backend test suite (Jest + Supertest) covering services and API routes

---

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React | UI |
| Vite | Dev server / build tool |
| Axios | HTTP client |

### Backend

| Technology | Purpose |
|---|---|
| Node.js / Express | REST API server |
| MySQL (`mysql2`) | Persistent storage |
| Axios | Internal HTTP client (backend → internal product route) |
| dotenv | Environment configuration |
| Jest / Supertest | Automated testing |

---

## Architecture

The frontend talks to the backend exclusively over HTTP (Axios). The backend follows a standard layered architecture:

```
Route → Controller → Service → Repository → MySQL
```

- **Routes** wire URLs to controllers and apply middleware (`user.middleware.js` for `X-USER-ID`, `asyncHandler` for error propagation).
- **Controllers** parse the request, call the service, and shape the response — no business logic.
- **Services** hold business rules: stock validation, quantity validation, product-lookup checks.
- **Repositories** are the only layer that talks to MySQL (or, for products, an internal HTTP-backed "product service").

One deliberate quirk: product reads go through an extra hop — `product.repository.js` calls `product.client.js` (Axios) which hits `GET /api/products/internal`, a second route in the same process backed directly by the `products` table (`internal.product.routes.js` → `config/db.js`). This simulates calling an external product microservice without actually standing one up, and was inherited from the starter codebase rather than introduced during this work — kept as-is since replacing it wasn't in scope for any of the priorities implemented.

Errors are centralized: any thrown `AppError(message, statusCode)` is caught by `middleware/error.middleware.js` and serialized with its own status/message; anything else (a real bug, a dropped DB connection, a JSON parse failure) is sanitized to a generic `500 { "message": "Internal server error" }` so internal details never leak to the client.

---

## Project Structure

```
backend/
├── app.js                       # Express app (routes + middleware), no listen/DB init — importable by tests
├── server.js                    # Entry point: initDb() then app.listen()
├── config/db.js                 # MySQL connection pool
├── db/init.js                   # Creates database/tables and seeds products on first run
├── clients/product.client.js    # Axios client for the internal product route
├── controllers/                 # cart.controller.js, product.controller.js
├── services/                    # cart.service.js, product.service.js — business rules
├── repositories/                # cart.repository.js, product.repository.js — data access
├── routes/                      # cart.routes.js, product.routes.js, internal.product.routes.js
├── middleware/                  # error.middleware.js, user.middleware.js
├── models/                      # cart.model.js, product.model.js
├── utils/                       # app-error.js, async-handler.js
├── data/products.js             # Seed data for the products table
└── __tests__/
    ├── services/                # ProductService / CartService unit tests
    └── api/                     # Supertest API tests (repositories mocked)

frontend/src/
├── api/                         # axios.js, product.api.js, cart.api.js
├── components/                  # Header, SearchBar, ProductsPanel, ProductList, ProductCard,
│                                 # CartPanel, CartItem
├── hooks/                       # useProducts.js, useCart.js
├── pages/HomePage.jsx
└── utils/user.js                # Generates/persists a per-browser user id
```

---

## Setup

### Requirements

```
Node.js >= 18
npm >= 9
A reachable MySQL server
```

### Backend

```bash
cd backend
npm install
```

Create `backend/.env` (see `backend/.env.example`):

```env
PORT=3001
PRODUCT_SERVICE_URL=http://localhost:3001/api/products/internal

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=shopping_cart
```

`backend/.env` is gitignored — it holds real credentials and must never be committed. Fill in your own MySQL host/user/password.

```bash
npm run dev
```

On startup the backend creates the database and `products`/`cart_items` tables if they don't exist, and seeds `products` from `data/products.js` on first run. Expected output:

```
Server running on 3001
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173` and expects the backend at `http://localhost:3001` (see `frontend/src/api/axios.js`).

---

## API Reference

All cart endpoints require an `X-USER-ID` header identifying the caller; requests without it fall back to a shared `"guest"` cart.

### `GET /api/products`

Returns all products.

```json
[{ "id": 1, "name": "Keyboard", "price": 50, "stock": 10 }]
```

### `GET /api/products/search?q=keyboard`

Case-insensitive, partial name match. An empty/missing `q` returns the full product list.

```json
[{ "id": 1, "name": "Keyboard", "price": 50, "stock": 10 }]
```

### `GET /api/cart`

Returns the cart for the requesting user.

```json
[{ "productId": 1, "name": "Keyboard", "price": 50, "quantity": 1 }]
```

### `POST /api/cart`

Adds one unit of a product (or increments if already in the cart).

Request:

```json
{ "productId": 1 }
```

Errors:

| Status | Condition | Body |
|---|---|---|
| 404 | Product doesn't exist | `{ "message": "Product not found" }` |
| 400 | Resulting quantity exceeds stock | `{ "message": "Not enough stock" }` |

### `PATCH /api/cart/:id`

Sets the quantity for a cart item. Setting `quantity` to `0` removes the item (used by the "-" button decrementing to zero).

Request:

```json
{ "quantity": 3 }
```

Errors:

| Status | Condition | Body |
|---|---|---|
| 400 | Quantity is negative or not a number | `{ "message": "Invalid quantity" }` |
| 404 | Item isn't in the cart | `{ "message": "Cart item not found" }` |
| 400 | Quantity exceeds stock | `{ "message": "Not enough stock" }` |

### `DELETE /api/cart/:id`

Removes a cart item. Returns `{ "success": true }`.

### Unhandled errors

Anything unexpected (a bug, a dropped DB connection) returns:

```
500
{ "message": "Internal server error" }
```

Malformed JSON request bodies return `400 { "message": "Invalid request body" }` rather than leaking the raw parser error.

---

## Database Design

Two tables, created and seeded automatically by `backend/db/init.js`:

```sql
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL
);

CREATE TABLE cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    quantity INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

`cart_items` denormalizes `product_name`/`price` at insert time (a snapshot of the product at add-to-cart time) rather than joining against `products` on every read — simple and matches the minimum schema given in the original spec. A price change after an item is already in the cart won't retroactively update the cart line, which is standard e-commerce behavior (the cart reflects the price at the time of adding, not a live join).

---

## User Identification

Priority 4 asked for independent per-user carts without building a full auth system. The implementation:

- Backend: `middleware/user.middleware.js` reads `X-USER-ID` from the request and attaches it as `req.userId`, defaulting to `"guest"` if absent. Every cart repository query is scoped by `user_id`.
- Frontend: `utils/user.js` generates a UUID on first load and persists it in `localStorage`, and `api/axios.js` attaches it as `X-USER-ID` on every request — so each browser gets its own durable cart with no login step.

This is intentionally not authentication (see [Known Limitations](#known-limitations)) — real login/JWT is listed as an optional advanced task in the original spec and wasn't implemented.

---

## Testing

Backend tests live in `backend/__tests__/` and run with:

```bash
cd backend
npm test
```

This runs `jest --forceExit` (24 tests across 4 suites):

- **`services/product.service.test.js`** — product listing, and search (empty query falls back to full list, non-empty delegates to the repository with a trimmed query).
- **`services/cart.service.test.js`** — add (new item, quantity increment, invalid product → `404`, stock exceeded → `400`), remove, update (invalid quantity → `400`, item not found → `404`, quantity `0` removes, stock exceeded → `400`, valid update).
- **`api/products.api.test.js`** / **`api/cart.api.test.js`** — Supertest requests against the real Express `app` (from `app.js`) covering `GET /api/products`, `POST /api/cart`, `PATCH /api/cart/:id`, `DELETE /api/cart/:id`, including their error paths.

All tests mock the repository layer (`jest.mock(...)`) rather than hitting a real database — see [Technical Decisions](#technical-decisions--trade-offs) for why.

`server.js` was split from `app.js` specifically to make this possible: `app.js` exports the configured Express app with no `listen()` or `initDb()` call, so Supertest can exercise real routing/controller/middleware behavior without a live server or database connection.

There is no frontend test suite; frontend behavior was verified manually in-browser during development (see commit history).

---

## Technical Decisions & Trade-offs

**MySQL over SQLite/Postgres/Mongo.** The four options were all valid per the spec; MySQL was chosen to match an already-available server, avoiding new infrastructure.

**Repositories are mocked in tests, not a real/test database.** The project's only MySQL instance is a shared remote server, which is slow and occasionally flaky over the network (observed during development: transient `ETIMEDOUT`s). Unit/API tests mock the repository layer instead, so the suite is fast, deterministic, and runs the same whether or not that server is reachable. The trade-off is that these tests don't catch SQL-level bugs (a wrong column name, a bad query) — they verify business logic and HTTP wiring, not the repository-to-MySQL boundary itself.

**`X-USER-ID` + localStorage UUID instead of real auth.** Satisfies "independent per-user carts" (Priority 4) with the least machinery, matching the spec's suggested "request header" approach. Full authentication is explicitly an optional/advanced task in the original spec.

**Cart denormalizes product name/price instead of joining.** Simpler queries, matches the schema given in the spec, and means a cart line reflects the price at add-time rather than silently changing if the product's price changes later.

**`asyncHandler` + centralized error middleware over per-controller try/catch.** Originally every controller method had its own try/catch/`next(error)` boilerplate; this was extracted into a single `asyncHandler` wrapper applied at route registration, and error shaping (status code + safe message) centralized in `error.middleware.js`. Keeps controllers as thin orchestration and ensures no error path can accidentally leak an internal message.

---

## Known Limitations

- **`X-USER-ID` is not authentication.** Any client can claim any user id — there's no verification. This is acceptable for the scope implemented (Priority 4 asked for cart isolation via a header, not login) but would need real auth (JWT/session) before this could be a real multi-tenant system.
- **The "product service" is a same-process HTTP hop, not a real microservice.** `product.repository.js` calls out over HTTP to `/api/products/internal` in the same Express app — this simulates an external service boundary but doesn't provide real isolation or independent scaling. This structure predates the work done in this repo and wasn't restructured, since none of the implemented priorities required it.
- **No pagination, caching, or DB indexing tuning.** Product/cart lists are small (a handful of rows) for this exercise; performance optimization was an optional task and wasn't pursued.
- **No frontend automated tests.** Only the backend has a Jest/Supertest suite; frontend correctness was verified manually.
