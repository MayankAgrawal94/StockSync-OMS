## Overview

This project implements a **simplified Inventory and Order Management System** using Node.js, Express, and MongoDB. The system provides APIs for managing stock levels (SKUs), allocating SKUs to orders, adding stock to the inventory, and auditing the stock and order allocations. It includes several essential features for real-world use cases in e-commerce or retail inventory management.

### Features Implemented:

1. **Retrieve SKUs by Name**: API to fetch SKUs starting with a specified letter.
2. **Allocate SKU to an Order**: API to allocate SKUs to an order if stock is available.
3. **Add Stock to Inventory**: API to add stock to the SKU inventory.
4. **Audit System**: API to audit stock inwarding and order allocations, including SKU-level audits.

### Tech Stack

- **Node.js**
- **Express**
- **MongoDB (Mongoose)**
- **Docker**
- **Jest** (for testing)
- **Concurrently & Nodemon** (for development)
- **Supertest** (for API testing)

---

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Populate Data](#populate-data)
- [Running the Project](#running-the-project)
- [Audit](#audit)

---

## Installation

### Clone the repository

To get started, clone this repository to your local machine:

```bash
git clone https://github.com/MayankAgrawal94/StockSync-OMS.git
cd StockSync-OMS
```

### Install dependencies

Ensure you have **Node.js** and **npm** installed on your machine. Install the project dependencies using:

```bash
npm install
```

### Docker Setup

The project is configured to use Docker for running a MongoDB instance locally. Run the following command to start the MongoDB container:

```bash
docker-compose up -d
```

This will start a MongoDB container accessible at `mongodb://localhost:27017`.

---

## Environment Variables

Before running the project, make sure to configure your environment variables. Create a `.env` file in the root directory of the project and add the following:

```bash
PORT=3001
DB_CONNECTION_STRING=mongodb://localhost:27017
DB_NAME=inventoryDB
API_KEY=your_secure_api_key 
```

Ensure the `DB_CONNECTION_STRING` matches the connection string of your MongoDB instance, and set the `API_KEY` for API security.

---

## Running the Project

To run the project locally, use the following command:

```bash
npm start
```

This will start the server on the specified `PORT` (default: 3001). You can now access the API endpoints at `http://localhost:3001`.

Alternatively, for a development environment with automatic reloads, use:

```shell
npm run dev
```

### API Security

All API requests require an API key passed in the request headers for security. Add the following header to your requests:

```shell
x-api-key: your_secure_api_key
```

---

## API Endpoints

### 1. **GET /api/v1/sku**

Retrieve all SKUs starting with a specific letter.

- **URL**: `/api/v1/sku?name=A`
- **Method**: `GET`
- **Query Parameters**: `name` (letter to search by)
- **Response**:
```json
{
  "message": "SKUs retrieved successfully",
  "data": [
    {
      "skuId": "SKU001",
      "name": "Apple",
      "quantity": 50
    }
  ]
}
```

### 2. **POST /api/v1/order/allocate**

Allocate a SKU to an order if sufficient stock is available.

- **URL**: `/api/v1/order/allocate`
- **Method**: `POST`
- **Request Body**:
```json
{
  "skuId": "SKU001",
  "orderNumber": "ORD001",
  "quantity": 5
}
```

- **Response**:
```json
{
  "message": "Allocation successful"
}
```

### 3. **POST /api/v1/sku/add**

Add stock to the inventory.

- **URL**: `/api/v1/sku/add`
- **Method**: `POST`
- **Request Body**:
```json
{
  "skuId": "SKU001",
  "quantity": 20
}
```

- **Response**:
```json
{
  "message": "Stock added successfully"
}
```

### 4. **GET /api/v1/audit**

Perform an audit of stock and order allocations.

- **URL**: `/api/v1/audit`
- **Method**: `GET`
- **Optional Query Parameter**: `skuId` (to audit a specific SKU)
- **Response**:
```json
{
  "message": "Audit completed",
  "totalInwarded": 100,
  "totalAllocated": 25,
  "availableStock": 75
}
```

---

## API Documentation

The API is fully documented in Postman. You can view and interact with the API using the following Postman collection link:

**Postman Documentation**: [Published Postman Documentation](https://documenter.getpostman.com/view/8109669/2sAXxS9Bou)

This documentation provides detailed information about all the available endpoints, parameters, and example requests/responses for easy testing and integration.
_ _ _

## Testing

This project uses **Jest** and **Supertest** for unit and integration testing.

### Running Tests

To run the test suite, use the following command:

```shell
npm test
```

This will execute all the unit tests and integration tests in the `test` directory. Tests cover various API functionalities, including edge cases.

---

## Populate Data

You can populate the database with initial dummy data for SKUs by running the following command:

```shell
npm run populate
```

This script will insert a set of predefined SKUs into the database for testing purposes. These SKUs will be used to test allocation, stock management, and auditing features.

---

## Running in Docker

You can run the project in Docker to ensure it works in an isolated environment.

1. **Build the Docker image**:

```shell
docker build -t inventory-management .
```

2. **Run the container**:

```shell
docker run -p 3001:3001 --env-file .env inventory-management
```


The application will be accessible on `http://localhost:3001`.

---

## Audit

The `audit` API provides a summary of the inventory system, including the total number of inwarded products, allocated products, and the current available stock. You can also pass a `skuId` query parameter to audit a specific SKU.

---

## Conclusion

This project demonstrates a robust Inventory and Order Management System with a clean, maintainable code structure and proper use of testing and security. The system is suitable for real-world use cases like retail or e-commerce platforms, where stock and order allocation are critical.

Feel free to clone and test this project locally or extend it as needed!

## Contact
If you have any feedback, questions, or suggestions, feel free to reach out.
connect me at `mnk.agrawal94@gmail.com` or can DM me on [LinkedIn](https://www.linkedin.com/in/er-mayank/).