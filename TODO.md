# Full Stack Shopping Cart Challenge - TODO

## Introduction

The current application provides basic shopping cart functionality.

Your task is to improve the system and make it closer to a production-ready e-commerce application.

You are free to make technical decisions regarding:

- Architecture
- Database selection
- API design
- State management
- Error handling approach
- Testing strategy


The important point is not only making the feature work, but also demonstrating good engineering practices.

---

# Priority 1 - Product Search

## Objective

Users should be able to search products by name.

---

## Backend Requirements

Create a new API endpoint:

```
GET /api/products/search
```

Query parameter:

```
q
```

Example:

```
GET /api/products/search?q=keyboard
```


Expected behavior:

- Search should be case-insensitive
- Partial matches should be supported


Example:

Existing products:

```
Keyboard
Gaming Keyboard
Mouse
Monitor
```


Request:

```
?q=key
```


Response:

```json
[
  {
    "id":1,
    "name":"Keyboard",
    "price":50
  },
  {
    "id":5,
    "name":"Gaming Keyboard",
    "price":100
  }
]
```


---

## Frontend Requirements

Add a search UI.

Requirements:

- User can enter search keyword
- Search result should update correctly
- Empty search should restore all products
- Loading state should be handled
- API errors should be displayed


---

# Priority 2 - Cart Validation

## Objective

Prevent invalid cart operations.


Currently:

```
Product Stock = 5

Cart Quantity = 100
```

is possible.


This behavior must be fixed.


---

## Requirements


When adding a product:

Validate:

```
requested quantity <= available stock
```


When increasing quantity:

Validate again.


Invalid request example:


HTTP Status:

```
400 Bad Request
```


Response:

```json
{
    "message":
    "Not enough stock"
}
```


---

# Priority 3 - Database Integration

## Objective

Replace temporary memory storage with persistent storage.


Current implementation:

```javascript
let cart = [];
```


Problem:

Restarting backend removes all cart data.


---

## Requirements


Implement persistent storage.

Supported databases:

- PostgreSQL
- MySQL
- SQLite
- MongoDB


The database should store:

```
Products

Cart Items

Users (if implemented)
```


---

## Minimum Cart Table


Example:


```
cart_items

----------------

id

user_id

product_id

product_name

price

quantity

created_at

updated_at

```


---

# Priority 4 - User Based Cart


## Objective


Each user must have an independent shopping cart.


Example:


User:

```
1001
```


Cart:

```
Keyboard x2
Mouse x1
```


Another user:

```
1002
```


Cart:

```
Monitor x1
```


The two carts must not affect each other.


---

## Requirements


Implement a way to identify users.


Possible approaches:

- Request header
- JWT authentication
- Session


Example:


Header:

```
X-USER-ID: 1001
```


---

# Priority 5 - Backend Error Handling


## Objective


Improve API reliability.


The backend should handle:


## Invalid Product


Example:

Request:

```json
{
 "productId":9999
}
```


Expected:


HTTP:

```
404
```


Response:

```json
{
 "message":"Product not found"
}
```


---

## Invalid Quantity


Example:


```json
{
 "quantity":-5
}
```


Expected:


HTTP:

```
400
```


---

## Unexpected Error


Return:


HTTP:

```
500
```


Response:

```json
{
 "message":"Internal server error"
}
```


---

# Priority 6 - Frontend User Experience


Improve the current UI.


---

## Loading State


Implement better loading indicators.


Examples:

- Product loading
- Cart loading
- API request


---

## Error Display


When API fails:


The user should see:

```
Unable to load products.

Please try again.
```


A blank screen is not acceptable.


---

## Empty State


When cart is empty:


Display:

```
Your cart is empty.
```


---

# Priority 7 - Code Quality Improvement


Review the existing code.


Improve:


## Frontend


Consider:

- Component responsibility
- Reusable components
- State management
- Avoid duplicated logic


---

## Backend


Consider:

- Controller responsibility
- Service responsibility
- Repository responsibility
- Validation
- Error handling


---

# Priority 8 - Automated Testing


## Backend Tests


Add tests for:


## Product Service


Cases:

- Product list retrieval
- Product search


---

## Cart Service


Cases:

- Add item
- Remove item
- Update quantity
- Invalid product
- Stock validation


---

## API Tests


Test:

```
GET /api/products

POST /api/cart

PATCH /api/cart/:id

DELETE /api/cart/:id
```


---

# Optional Advanced Tasks


These tasks are optional.

They will be considered additional value.

---

# Authentication


Implement:

- User registration
- Login
- JWT authentication


---

# Docker


Add:


```
Dockerfile

docker-compose.yml
```


Expected:


```
Frontend Container

        |

Backend Container

        |

Database Container
```


---

# API Documentation


Create:


```
docs/API.md
```


Include:

- Endpoint description
- Request format
- Response format
- Error cases


---

# Performance Improvement


Consider:

- API response optimization
- Database indexing
- Caching strategy


---

# Submission Requirements


Your submission should include:


## 1. Source Code


Complete implementation.


---

## 2. Documentation


Update README with:


- Architecture explanation
- Technical decisions
- Database design
- Trade-offs


---

## 3. Testing


Include:


- Test instructions
- Test coverage information


---

# Evaluation Focus


We evaluate:


| Category | Description |
|---|---|
| Functionality | Requirements implemented correctly |
| Code Quality | Clean and maintainable code |
| Architecture | Good separation of concerns |
| API Design | Clear and consistent APIs |
| Error Handling | Handles edge cases |
| Testing | Confidence through tests |
| Documentation | Clear technical communication |


---

# Important Notes


There are multiple correct solutions.

We are not looking for a specific implementation.

We are evaluating your ability to:

- Understand an existing system
- Make engineering decisions
- Write maintainable software
- Deliver production-quality features
