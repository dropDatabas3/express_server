# Express Server with Product and User Management

Implementation of a server using Express, for managing products and users. Handlers have been developed to handle product and user data, allowing for the creation, reading, individual reading, updating, and deletion of resources.


## Data Structure

Each product and user has specific properties:

**Product:**
- **id:** 12-byte hexadecimal identifier code.
- **title:** Product title.
- **photo:** Product image path.
- **category:** Product category.
- **price:** Product price.
- **stock:** Available units of the product.

**User:**
- **id:** 12-byte hexadecimal identifier code.
- **photo:** User image path.
- **email:** User email address.
- **password:** User password.
- **role:** User role (default is zero).

## Functionality Implemented

The following functionalities have been developed using Express:

### Endpoints for Products:

- **POST /api/products:** Implements the `create(data)` method to create a product and save it with fs.
  - If created successfully:
    - **statusCode:** 201
    - **response:** id (of the new product)
    - **message:** (descriptive message)
  - Error handling with errorHandler.

- **GET /api/products:** Implements the `read()` method to fetch all products from fs. Add the necessary query to filter by category.
  - If the array has products, send the client an object with properties:
    - **statusCode:** 200
    - **response:** (the array)
  - Error handling with errorHandler.

- **GET /api/products/:pid:** Implements the `readOne(pid)` method to fetch a product from fs:
  - If the product is found, send the client an object with properties:
    - **statusCode:** 200
    - **response:** (the object)
  - Error handling with errorHandler.

- **PUT /api/products/:pid:** Implements the `update(pid,data)` method to fetch a product from fs and update it:
  - If the product is updated, send the client an object with properties:
    - **statusCode:** 200
    - **response:** (the modified object)
  - Error handling with errorHandler.

- **DELETE /api/products/:pid:** Implements the `destroy(pid)` method to fetch a product from fs and delete it:
  - If the product is deleted, send the client an object with properties:
    - **statusCode:** 200
    - **response:** (the object)
  - Error handling with errorHandler.

### Endpoints for Users:

- **POST /api/users:** Implements the `create(data)` method to create a user and save it with fs. Add the corresponding middleware to validate mandatory and default properties.
  - If created successfully:
    - **statusCode:** 201
    - **response:** id (of the new user)
    - **message:** (descriptive message)
  - Error handling with errorHandler.

- **GET /api/users:** Implements the `read()` method to fetch all users from fs. Add the necessary query to filter by role.
  - If the array has users, send the client an object with properties:
    - **statusCode:** 200
    - **response:** (the array)
  - Error handling with errorHandler.

- **GET /api/users/:uid:** Implements the `readOne(uid)` method to fetch a user from fs:
  - If the user is found, send the client an object with properties:
    - **statusCode:** 200
    - **response:** (the object)
  - Error handling with errorHandler.

- **PUT /api/users/:uid:** Implements the `update(uid,data)` method to fetch a user from fs and update it:
  - If the user is updated, send the client an object with properties:
    - **statusCode:** 200
    - **response:** (the modified object)
  - Error handling with errorHandler.

- **DELETE /api/users/:pid:** Implements the `destroy(pid)` method to fetch a user from fs and delete it:
  - If the user is deleted, send the client an object with properties:
    - **statusCode:** 200
    - **response:** (the object)
  - Error handling with errorHandler.
 
## Additional Information

This project is a continuation of the development done in [Sprint 3](https://github.com/juanp1996/express_server/tree/sprint3). For more details about the functionalities implemented in that sprint, we recommend checking out the corresponding branch.

Furthermore, for a complete understanding of the handlers developed in this project, it is recommended to read the [Sprint 2](https://github.com/juanp1996/express_server/tree/sprint2) branch.


## Testing the API

To test the API, you can use Postman or any other HTTP client tool.

### Products Endpoints:

- **GET /api/products:** To get all products: `http://localhost:8080/api/products`
- **GET /api/products?category=filter:** To filter by category (replace 'filter' with the desired category).
- **GET /api/products/:pid:** To get a specific product (replace ':pid' with the product ID).
- **POST /api/products:** To create a product.
- **PUT /api/products/:pid:** To update a product.
- **DELETE /api/products/:pid:** To delete a product.

### Users Endpoints:

- **GET /api/users:** To get all products: `http://localhost:8080/api/products`
- **GET /api/users?role=filter:** To filter by role (replace 'filter' with the desired role).
- **GET /api/users/:uid:** To get a specific user (replace ':uid' with the user ID).
- **POST /api/users:** To create a user.
- **PUT /api/users/:uid:** To update a users.
- **DELETE /api/users/:uid:** To delete a user.

### Tools and Libraries Integrated:

- **Socket.IO:** Integrated Socket.IO library for real-time communication between server and client, enhancing user experience by displaying changes instantly without page reloads.

- **HTTP Library (createServer):** Configured the server using the HTTP library's createServer function to complement Socket.IO with Express, ensuring seamless integration of real-time communication features with the rest of the Express-based application.

- **Morgan Library:** Utilized the Morgan library to generate real-time logs of all client requests, providing a live view of application traffic for monitoring and debugging purposes.


### Views and Routes:

- **Views:** Developed views for **`/home`**, **`/products/real`**, **`/products`**, **`/users/register`**, and **`/users/:uid`**, along with their corresponding routes in `./routers/views` using **Handlebars**. These views and routes provide the necessary infrastructure for user interaction with the application.


### Form Implementations:

- **Product Registration Form:** Created a form enabling users to register new products. This form is designed to update in real-time, reflecting changes made by one user instantly in the interface of other connected users, thanks to the functionality provided by Socket.IO.

- **User Registration Form (Functionality Not Yet Implemented):** Created the structure of a form for user registration, although the associated functionality has not been implemented yet.


