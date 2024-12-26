# Movie-Lobby-API

This repository contains a Movie Lobby API built with TypeScript, Express, and MongoDB.
It provides endpoints to list, search, add, update, and delete movies in a lobby.

Additionally:

Test cases have been added to validate all functionalities.
Caching is implemented for faster data retrieval.
ESLint is configured to enforce proper code formatting and maintain code quality.
---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [Running the API](#running-the-api)
- [API Documentation](#api-documentation)
  - [1. `GET /movies`](#1-get-movies)
  - [2. `GET /search?q={query}`](#2-get-searchqquery)
  - [3. `POST /movies` (Admin Only)](#3-post-movies-admin-only)
  - [4. `PUT /movies/:id` (Admin Only)](#4-put-moviesid-admin-only)
  - [5. `DELETE /movies/:id` (Admin Only)](#5-delete-moviesid-admin-only)
- [Running ESLint](#running-eslint)
- [Running Test Cases](#running-test-cases)

---

## Prerequisites

1. Install Node.js (mentioned in .npmrc file)  
2. npm (comes with Node.js)  
3. MongoDB installed and running locally (or a remote connection string)  

---

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/priyankawadle/Movie-Lobby-API.git
   cd movie-lobby-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables (see Environment Variables mentioned below).

4. Start MongoDB (locally or ensure your remote MongoDB instance is running).

---

## Environment Variables

Create a `.env` file in the project root with the following variables:

```
PORT=3000
NODE_ENV=development #test or development
MONGODB_URI=mongodb://127.0.0.1:27017/movie-lobby-api
MONGODB_URI_TEST=mongodb://127.0.0.1:27017/movie-lobby-test

```

- `MONGODB_URI`: Points to your MongoDB connection string for dev enviornment
- `MONGODB_URI_TEST`: Points to your MongoDB connection string  to run test cases
- `PORT`: The port on which your API will run (default `3000`)
- `NODE_ENV`: to run api's use its value as development and to execute test cases use it as test


*(Adjust these values according to your setup.)*

---

## Running the API

### Development Mode

```bash
npm run dev
```

Typically listens on `http://localhost:3000` (or whatever port is specified in your `.env`).


## API Documentation

All requests and responses are JSON-formatted. Below are the main endpoints with sample requests and responses.

### 1. `GET /movies`
- Description: Retrieves all movies in the lobby.
- Sample Request:
  ```http
  GET /movies
  ```
- Sample Response:
  ```json
  [
    {
      "_id": "63fb1f4d1c9a1a45fbc12345",
      "title": "Inception",
      "genre": "Sci-Fi",
      "rating": 9,
      "streamingLink": "https://example.com/inception",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    },
    ...
  ]
  ```

### 2. `GET /search?q={query}`
- Description: Searches for movies by title or genre.
- Query Param: `q` - the search string  
- Sample Request:
  ```http
  GET /search?q=inception
  ```
- Sample Response:
  ```json
  [
    {
      "_id": "63fb1f4d1c9a1a45fbc12345",
      "title": "Inception",
      "genre": "Sci-Fi",
      "rating": 9,
      "streamingLink": "https://example.com/inception"
    }
  ]
  ```

### 3. `POST /movies` (Admin Only)
- Description: Adds a new movie to the lobby.
- Headers: `x-role: admin`
- Sample Request:
  ```http
  POST /movies
  Header: x-role=admin
  Body:
  {
    "title": "Avatar",
    "genre": "Adventure",
    "rating": 8,
    "streamingLink": "https://example.com/avatar"
  }
  ```
- Sample Response:
  ```json
  {
    "_id": "63fb2a4d2c1b2b99abc45678",
    "title": "Avatar",
    "genre": "Adventure",
    "rating": 8,
    "streamingLink": "https://example.com/avatar",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

### 4. `PUT /movies/:id` (Admin Only)
- Description: Updates an existing movie’s information (title, genre, rating, streaming link).
- Headers: `x-role: admin`
- Sample Request:
  ```http
  PUT /movies/63fb2a4d2c1b2b99abc45678
  Header: x-role=admin
  Body:
  {
    "rating": 10
  }
  ```
- Sample Response:
  ```json
  {
    "_id": "63fb2a4d2c1b2b99abc45678",
    "title": "Avatar",
    "genre": "Adventure",
    "rating": 10,
    "streamingLink": "https://example.com/avatar",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-02T00:00:00.000Z"
  }
  ```

### 5. `DELETE /movies/:id` (Admin Only)
- Description: Deletes a movie from the lobby.
- Headers: `x-role: admin`
- Sample Request:
  ```http
  DELETE /movies/63fb2a4d2c1b2b99abc45678
  Header: x-role=admin
  ```
- Sample Response:
  ```json
  {
    "message": "Movie deleted successfully"
  }
  ```

---

## Running ESLint

The project is configured with **ESLint** to ensure proper code formatting and maintain code quality. Follow the steps below:

1. **Lint the Code**:
   To check for any linting issues, run:
   ```bash
   npm run lint
   ```

2. **Fix Linting Issues Automatically**:
   To automatically fix linting issues (where possible), run:
   ```bash
   npm run lint:fix
   ```

3. **Add ESLint Scripts**:
   Ensure the following scripts are added to your `package.json`:
   ```json
   {
     "scripts": {
       "lint": "eslint 'src/**/*.{js,ts}'",
       "lint:fix": "eslint 'src/**/*.{js,ts}' --fix"
     }
   }
   ```

4. **Install ESLint**:
   If ESLint is not already installed, run:
   ```bash
   npm install --save-dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
   ```

---

## Running Test Cases

We have a suite of unit and integration tests using Mocha and Chai.

### 1. Setup Test Environment

Ensure you have a separate test database to prevent affecting your development or production data. update a `.env` varible :

```
NODE_ENV=test
```

### 2. Install Test Dependencies

Ensure the following dev dependencies are installed:

```bash
npm install --save-dev mocha chai supertest @types/mocha @types/chai @types/supertest ts-node
```

### 3. Add Test Scripts to `package.json`

Add the following scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "test": "mocha --require ts-node/register 'tests/**/*.test.ts'",
  }
}
```

### 4. Run the Tests

Execute the following command to run all test cases:

```bash
npm test
```

- Output: Mocha will display the results of your test suites, indicating which tests passed or failed.

---

