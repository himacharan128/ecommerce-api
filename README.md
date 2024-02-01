# Ecommerce API

This repository contains a simple Ecommerce API for managing products and variants. The API is built using Node.js, Express, and MongoDB.

## Getting Started

Follow the steps below to run the project locally:

1. Clone the repository:

```bash
git clone https://github.com/your-username/ecommerce-api.git
```
2. Install dependencies:
```bash
cd ecommerce-api
npm install
```
3. Create a .env file in the root directory and set the MongoDB connection URI:

```bash
MONGODB_URI=your_mongodb_connection_uri
```
4. Start the server:

```bash
node index.js
```
The server will be running at http://localhost:3000.

## API Documentation
Endpoints

  - POST /products: Create a new product.
  - GET /products: Get all products.
  - GET /products/:productId: Get a specific product by ID.
  - GET /products/search?query=example: Search products by name, description, or variant name.
  - PUT /products/:productId: Update a product by ID.
  - DELETE /products/:productId: Delete a product by ID.
  - POST /products/:productId/variants: Create a variant for a specific product.
  - PUT /products/:productId/variants/:variantId: Update a variant for a specific product.
  - DELETE /products/:productId/variants/:variantId: Delete a variant for a specific product.

## Project Structure

  - src/controllers: Contains the controllers for handling API requests.
  - src/models: Defines the Mongoose schemas for products and variants.
  - src/routes: Defines the API routes.
  - src/tests: Contains test files (not implemented in this example).
  - index.js: Main entry point for the application.
  - .env: Environment variable configuration file .

## Dependencies
  - Express: A fast, unopinionated, minimalist web framework for Node.js.
    ```bash
    npm install express
    ```
  - Mongoose: MongoDB object modeling tool designed to work in an asynchronous environment.
    ```bash
    npm install mongoose

  - Body-Parser: Node.js body parsing middleware to parse incoming request bodies.
      ```bash
      npm install body-parser

  - Dotenv: Zero-dependency module that loads environment variables from a .env file.
      ```bash
      npm install dotenv
      ```
## Contributing

Contributions  are welcome! If you have any ideas for improvement or would like to report an issue, please open an issue or submit a pull request.