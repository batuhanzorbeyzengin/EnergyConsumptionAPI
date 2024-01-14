# EnergyConsumptionAPI

This project was created as a template for users to perform operations on issues such as ``registration``, ``login``, ``logout`` and ``endeks``.

## Requirements

- [Node](https://nodejs.org/en)
- [Docker](https://www.docker.com/products/docker-desktop/)
- npm

## Setup

```bash
git clone https://github.com/batuhanzorbeyzengin/EnergyConsumptionAPI.git
cd EnergyConsumptionAPI
npm run setup
npm run dev
```

[http://localhost:3010](http://localhost:3010) will start working on this address.

# API Usage

This section outlines the basic API endpoints of the EnergyConsumptionAPI and how to use them.

## Base URL

The base URL for the API is:

```bash
http://18.194.180.127/api/v1
```

## API Endpoints

1. User Registration (Register)
- URL: `/register`
- Method: `POST`
- Data Example:
```json
{
  "email": "batuhanzorbeyzengin@gmail.com",
  "password": "test123",
  "company": "apolloo"
}
```
- Description: Creates a new user registration.

2. User Login (Login)
- URL: `/login`
- Method: `POST`
- Data Example:
```json
{
  "email": "batuhanzorbeyzengin@gmail.com",
  "password": "test123"
}
```
- Description: Allows the user to log in to the system.

3. User Logout (Logout)
- URL: `/logout`
- Method: `GET`
- Description: Allows the user to log out of the system. This operation requires the user to send their token.

4. Index Creation (Endeks Create)
- URL: `/endeks`
- Method: `POST`
- Data Example:
```json
{
  "date": "2024-02-03",
  "value": 500
}
```
- Description: Adds a new index data entry. This endpoint is token-protected.

5. Index Deletion (Endeks Delete)
- URL: `/endeks/:id`
- Method: `DELETE`
- Description: Deletes the index with the specified ID. This endpoint is token-protected.

## Security and Authentication
### Authorization
- The `Index Creation` and `Index Deletion` endpoints are protected with a token.
- To access these protected endpoints, a valid token must be provided in the `Authorization` header using the `Bearer` schema.
- Example of Authorization header:
```bash
Authorization: Bearer YOUR_ACCESS_TOKEN
```
### Token Validity
- The access tokens have a validity period of 60 minutes.
- Once expired, you will need to log in again to obtain a new access token.

# Local Testing with Postman
To facilitate local testing of the API, a Postman collection has been provided. You can import this collection into your Postman application to test the API endpoints.
## Importing the Postman Collection
1. Download the Postman collection from the following link:
[Download Postman Collection](https://drive.google.com/file/d/1EvcJTG9WVRcNJqMj2_QtBN8-yYZmrozl/view?usp=sharing)
2. Open Postman on your computer.
3. In Postman, click on `Import` button.
4. Choose the downloaded collection file or drag and drop it into the dialog box.
5. Once imported, you will see the collection on the left-hand side in Postman. From here, you can select an endpoint to test.