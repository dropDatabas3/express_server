# Express Server with Product and User Management

This project is an implementation of a server using Express, designed to manage products and users. The server supports operations such as creation, reading, individual reading, updating, and deletion of resources. Additionally, it includes enhanced features like argument parsing with Commander, variable persistence with a DAO factory, logging with Winston, data mocking with Faker.js, error handling, email functionality with Nodemailer, and authentication with JWT.

## Data Structure

### Product
```json
- **title:** String
- **category:** String
- **price:** Number
- **stock:** Number
- **photo:** String (URL)
```
### User
```json
- **email:** String
- **password:** String
- **name:** String
- **role:** Number (default: 0)
- **photo:** String (URL)
- **age:** Number (default: 18)
- **verify:** Boolean (default: false)
- **verifyCode:** String
```
### Cart
```json
- **user_id:** ObjectId (reference to User)
- **product_id:** ObjectId (reference to Product)
- **quantity:** Number (default: 1)
- **state:** String (default: 'reserved', enum: ['reserved', 'paid', 'delivered'])
```
## Implemented Functionality

### Product Endpoints:

- **POST /api/products:** Implements the `create(data)` method to create a product.
- **GET /api/products:** Implements the `read()` method to fetch all products with optional category filtering.
- **GET /api/products/:pid:** Implements the `readOne(pid)` method to fetch a specific product.
- **PUT /api/products/:pid:** Implements the `update(pid, data)` method to update a product.
- **DELETE /api/products/:pid:** Implements the `destroy(pid)` method to delete a product.

### User Endpoints:

- **POST /api/users:** Implements the `create(data)` method to create a user.
- **GET /api/users:** Implements the `read()` method to fetch all users with optional role filtering.
- **GET /api/users/:uid:** Implements the `readOne(uid)` method to fetch a specific user.
- **PUT /api/users/:uid:** Implements the `update(uid, data)` method to update a user.
- **DELETE /api/users/:uid:** Implements the `destroy(uid)` method to delete a user.

### Cart Endpoints:

- **POST /api/carts:** Implements the `create(data)` method to create a cart.
- **GET /api/carts:** Implements the `read()` method to fetch all carts.
- **GET /api/carts/:cid:** Implements the `readOne(cid)` method to fetch a specific cart.
- **PUT /api/carts/:cid:** Implements the `update(cid, data)` method to update a cart.
- **DELETE /api/carts/:cid:** Implements the `destroy(cid)` method to delete a cart.

## Enhancements and Features

### Argument Parsing with Commander
Allows changing the port, environment, or persistence at runtime using command-line arguments.

### Variable Persistence
Uses a DAO factory to switch between filesystem, memory, or MongoDB based on the environment.

### Logger
Implemented with Winston, supporting levels: FATAL, ERROR, HTTP, INFO.

### Data Mocking with Faker.js
Uses mocks to simulate data in the development environment.

### Error Handling
Enhanced error handling using `errorHandler`, `customError`, and an error library.

### MVC Architecture
Uses a clear MVC architecture with separate layers for Routes, Controllers, Services, Repositories, and DTOs.

### Email Functionality
Email functionality implemented using Nodemailer.

### JWT Authentication
Secures routes using JWT and a custom router with policies.

## Running the Project

### Scripts

The following scripts are configured in `package.json`:
```json
- **start:** `node ./server.js -p 8080`
- **prod:** `nodemon ./server.js -p 9080 --env prod --persistence mongo`
- **dev:** `nodemon ./server.js -p 8080 --env dev --persistence mongo`
- **test_fs:** `node ./server.js -p 8080 --env test --persistence fs`
- **test_memory:** `node ./server.js -p 8080 --env test --persistence memory`
```

### Running in Different Environments

- **Development with MongoDB:**
```bash
  Use `npm run dev` to start the server in development mode with MongoDB persistence.
```
- **Production with MongoDB:**
```bash
  Use `npm run prod` to start the server in production mode with MongoDB persistence.
```
- **Testing with Filesystem Persistence:**
```bash
  Use `npm run test_fs` to start the server in test mode with filesystem persistence.
```
- **Testing with Memory Persistence:**
```bash
  Use `npm run test_memory` to start the server in test mode with memory persistence.
```
## Testing the API

You can use Postman or any other HTTP client tool to test the API.

### Product Endpoints:

- **GET /api/products:** Fetch all products.
- **GET /api/products?category=filter:** Filter by category.
- **GET /api/products/:pid:** Fetch a specific product.
- **POST /api/products:** Create a product.
- **PUT /api/products/:pid:** Update a product.
- **DELETE /api/products/:pid:** Delete a product.

### User Endpoints:

- **GET /api/users:** Fetch all users.
- **GET /api/users?role=filter:** Filter by role.
- **GET /api/users/:uid:** Fetch a specific user.
- **POST /api/users:** Create a user.
- **PUT /api/users/:uid:** Update a user.
- **DELETE /api/users/:uid:** Delete a user.

### Cart Endpoints:

- **GET /api/carts:** Fetch all carts.
- **GET /api/carts/:cid:** Fetch a specific cart.
- **POST /api/carts:** Create a cart.
- **PUT /api/carts/:cid:** Update a cart.
- **DELETE /api/carts/:cid:** Delete a cart.

## Tools and Libraries Integrated

- **Socket.IO:** For real-time communication.
- **Morgan:** For real-time request logging.
- **Handlebars:** Template engine for views.

### Views and Routes:

Views have been developed for the following routes using **Handlebars**:
- `/cart`: View the shopping cart.
- `/home`: Home page.
- `/login`: Login page.
- `/product`: Specific product details.
- `/products`: Product listing.
- `/products/real`: Real-time view of products.
- `/recovery`: Account recovery page.
- `/register`: User registration page.
- `/userInfo`: User information page.
