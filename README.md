# Full Stack Shopping Cart Challenge

## Overview

This project is a full-stack e-commerce shopping cart application.

The purpose of this challenge is to evaluate your ability to work with an existing codebase, understand the architecture, implement missing features, and improve the application toward production quality.

The application consists of:

- React frontend application
- Node.js backend API
- Axios-based communication
- Layered backend architecture


---

# Technology Stack


## Frontend

| Technology | Purpose |
|---|---|
| React | User interface |
| Vite | Development/build tool |
| Axios | HTTP communication |
| JavaScript | Programming language |


## Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express | REST API server |
| Axios | Backend HTTP client |
| dotenv | Environment configuration |


---

# Application Architecture


The system consists of two independent applications.


```
                    HTTP
React Frontend  ------------->  Node.js Backend


                                  |
                                  |
                                  ↓

                            Service Layer

                                  |
                                  ↓

                          Repository Layer

                                  |
                                  ↓

                              Data Source
```


The frontend communicates with the backend using Axios.

The backend follows a layered architecture:

```
Controller

    ↓

Service

    ↓

Repository

    ↓

Data Source
```


---

# Project Structure


```
fullstack-shopping-cart-challenge


├── backend
│
│   ├── clients
│   │   └── product.client.js
│   │
│   ├── controllers
│   │   ├── product.controller.js
│   │   └── cart.controller.js
│   │
│   ├── data
│   │   └── products.js
│   │
│   ├── models
│   │   ├── product.model.js
│   │   └── cart.model.js
│   │
│   ├── repositories
│   │   ├── product.repository.js
│   │   └── cart.repository.js
│   │
│   ├── routes
│   │   ├── product.routes.js
│   │   ├── cart.routes.js
│   │   └── internal.product.routes.js
│   │
│   ├── services
│   │   ├── product.service.js
│   │   └── cart.service.js
│   │
│   └── server.js
│


└── frontend

    └── src

        ├── api
        │   ├── axios.js
        │   ├── product.api.js
        │   └── cart.api.js
        │
        ├── components
        │
        ├── hooks
        │
        ├── pages
        │
        └── styles

```


---

# Backend Setup


## Requirements

Install:

```
Node.js >= 18
npm >= 9
```


Check installation:

```bash
node -v

npm -v
```


---

## Install Dependencies


Move to backend:


```bash
cd backend
```


Install packages:


```bash
npm install
```


---

## Environment Configuration


Create:


```
backend/.env
```


Example:


```env
PORT=3001

PRODUCT_SERVICE_URL=http://localhost:3001/api/products/internal
```


---

## Start Backend


Development mode:


```bash
npm run dev
```


Expected output:


```
Server running on 3001
```


Backend URL:


```
http://localhost:3001
```


---

# Frontend Setup


Move to frontend:


```bash
cd frontend
```


Install:


```bash
npm install
```


Start:


```bash
npm run dev
```


Frontend URL:


```
http://localhost:5173
```


---

# Current Features


The following features are already implemented.


---

# Product Management


## Get Products


Endpoint:


```
GET /api/products
```


Example:


```json
[
  {
    "id":1,
    "name":"Keyboard",
    "price":50,
    "stock":10
  }
]
```


---

# Cart Management


## Get Cart


Endpoint:


```
GET /api/cart
```


Response:


```json
[
 {
  "productId":1,
  "name":"Keyboard",
  "price":50,
  "quantity":1
 }
]
```


---

## Add Product


Endpoint:


```
POST /api/cart
```


Request:


```json
{
 "productId":1
}
```


---

## Update Quantity


Endpoint:


```
PATCH /api/cart/:id
```


Request:


```json
{
 "quantity":2
}
```


---

## Remove Product


Endpoint:


```
DELETE /api/cart/:id
```


---

# Development Tasks


The current implementation is intentionally incomplete.

You need to improve the application.


---

# Required Implementation


## 1. Product Search


Implement product searching.


Backend:


Create endpoint:


```
GET /api/products/search?q=value
```


Example:


```
GET /api/products/search?q=keyboard
```


Expected:


```json
[
 {
  "id":1,
  "name":"Keyboard"
 }
]
```


Frontend:

Add:

- Search input
- Search button or realtime search
- Search result display


---

# 2. Stock Validation


Current problem:


A product:

```
stock = 5
```


can be added:


```
quantity = 100
```


This must be prevented.


Required:


- Check available stock
- Reject invalid quantity
- Return proper HTTP status


Example:


HTTP 400


```json
{
 "message":"Not enough stock"
}
```


---

# 3. Database Integration


Current implementation stores data in memory.


Example:


```javascript
let cart=[];
```


This means:

- Restart server
- Data disappears


Replace memory storage with database.


Supported:


- PostgreSQL
- MySQL
- SQLite
- MongoDB


---

# 4. User Cart Isolation


Currently all users share one cart.


Implement:


```
User A

Cart A


User B

Cart B
```


The cart must be separated by user.


---

# 5. Error Handling


Improve error handling.


Handle:


- Invalid product ID
- Invalid quantity
- Backend failure
- Database error


Frontend should display meaningful messages.


---

# 6. Testing


Add automated tests.


Backend tests should cover:


- Product service
- Cart service
- API endpoints


Recommended:


```
Jest
Supertest
```


---

# Coding Guidelines


## Write Maintainable Code


Avoid:

- duplicated logic
- large components
- unnecessary complexity


Prefer:

- reusable functions
- clear naming
- separation of responsibility


---

## API Changes


If you modify APIs:

Update documentation.


---

## Git Commit


Use meaningful commit messages.


Example:


Good:

```
Add cart stock validation
```

Bad:

```
fix
```


---

# Submission


Please provide:


## Source Code

A Git repository containing your solution.


## Documentation

Update README with:


- Implementation details
- Architecture decisions
- Database design
- Trade-offs


## Explanation

Describe:


1. What you changed
2. Why you chose this approach
3. Any limitations


---

# Evaluation


We evaluate:


| Area | Description |
|-|-|
| Functionality | Features work correctly |
| Code Quality | Clean and maintainable code |
| Architecture | Proper separation of concerns |
| API Design | REST principles |
| Error Handling | Robust failure handling |
| Testing | Automated verification |
| Documentation | Clear explanation |


---

# Final Goal


The final application should behave like a small production e-commerce system.

Focus not only on making it work, but on demonstrating good engineering decisions.