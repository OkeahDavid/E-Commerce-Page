# Fullstack React + Express Application

This is a minimal fullstack application that uses Express for the backend and React for the frontend. It is bundled using Webpack. The frontend communicates with the backend via an API.

## Project Structure

```
project-folder/
│
├── client/                # React app folder
│   ├── public/
│   │   ├── index.html     # HTML template
│   ├── src/               # React source files
│   │   ├── App.tsx        # Main React component
│   │   ├── index.tsx      # Entry point for React
│   └── package.json       # Dependencies and scripts
│   └── tsconfig.json      # TypeScript configuration
│   └── webpack.config.js  # Webpack configuration for React
│
├── server/                # Express server folder
│   ├── src/              # Source files
│   │   ├── data/
│   │   │   └── products.ts    # Product data and helper functions
│   │   ├── routes/
│   │   │   └── products.ts    # Product routes
│   │   ├── middleware/
│   │   │   └── validators.ts  # Request validation
│   │   ├── tests/
│   │   │   └── products.test.ts # API endpoint tests
│   │   └── server.ts     # Express server entry point
│   └── package.json      # Express dependencies and scripts
│   └── tsconfig.json     # TypeScript configuration
│
└── package.json          # Root package.json to manage both client and server
```

## Prerequisites

Ensure that you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (npm is used in this guide)

## Getting Started

### 1. Install Dependencies

To install dependencies for both the client and server, run the following commands:

```bash
# Install npm-run-all globaly
npm install npm-run-all -g

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

### 2. Running the Application

You can run the application in development mode to launch both the client and server concurrently.

```bash
cd ..
npm run dev
```

- The **React frontend** will be running at `http://localhost:3001`
- The **Express backend** API will be running at `http://localhost:3000`

The frontend fetches data from the backend API through the `/api/hello` endpoint.

### 3. Running Tests
To run the API tests, navigate to the server directory and run:

```bash
cd server
npm test
```

### 4. Building the Client for Production

If you want to build the React app for production, run the following command inside the `client` folder:

```bash
npm run build
```

The bundled files will be available in the `client/dist` folder.

### 5. Running Only the Server

If you'd like to run just the server (without the React frontend), navigate to the `server` directory and start the server:

```bash
cd server
npm run start
```

The server will be available at `http://localhost:3000`.

## Folder Overview

- `client`: Contains the React frontend.
- `server`: Contains the Express backend.

## API Endpoint
# Hello Endpoint

- `GET /api/hello`: Returns a JSON object with a `message` field saying "Hello from Flink!".

## Tasks before the live coding interview

# Product Endpoints

- `GET /api/products`: Returns a list of all products
```json
  {
    "id": 1,
    "name": "Product A",
    "description": "Product A description",
    "price": 20,
    "createdAt": "2024-...",
    "updatedAt": "2024-..."
  }
```

-  `GET /api/products/:id`: Returns a single product by ID
```json
  {
  "id": 1,
  "name": "Product A",
  "description": "Product A description",
  "price": 20,
  "createdAt": "2024-...",
  "updatedAt": "2024-..."
  }
```


## Error Responses
The API handles various error cases:

- 400 Bad Request: Invalid product ID format
```json
{
  "error": "Invalid product ID. Must be a positive integer."
}
```

- 404 Not Found: Product not found
```json
{
  "error": "Product not found"
}
```

- 500 Internal Server Error: Server-side errors
```json
{
  "error": "Internal server error"
}
```
## Data Layer

The `products.ts` file in the `data` folder provides an in-memory store of products. This allows the application to handle product data without an actual database, making it simpler to set up and run for development or demonstration purposes.

> **Note**: This setup is not intended for production, as data will reset every time the server restarts. For a production environment, consider integrating a persistent database such as PostgreSQL, MongoDB, or MySQL.


### 6. Implementation Details

TypeScript implementation for type safety
In-memory product storage
Comprehensive error handling
Input validation middleware
Full test coverage for API endpoints
Clean architecture with separation of concerns

### 7. Development Notes

The project uses TypeScript for both frontend and backend
Tests are implemented using Jest and Supertest
Error handling includes validation for product IDs and proper HTTP status codes
Data persistence is handled in-memory as per requirements