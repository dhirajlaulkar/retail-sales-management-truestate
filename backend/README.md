# Backend Application

The backend is a high-performance RESTful API built with **Node.js** and **Express**, utilizing **SQLite** for efficient data storage. It serves as the data layer for the Retail Sales Management System.

## Overview
Designed for speed and simplicity, the backend implements a clean Route-Controller-Service architecture. It handles complex SQL queries for filtering, searching, and sorting while ensuring data integrity and security through parameterized queries.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite (via `sqlite3` and `sqlite`)
- **Language**: TypeScript
- **Utilities**: `csv-parser` for data ingestion, `cors` for security.

## Project Structure
The codebase follows a standard MVC-style layered architecture:

- **`src/controllers`**: Handles incoming HTTP requests, input validation, and response formatting.
- **`src/services`**: Contains business logic and direct database interactions (e.g., executing SQL).
- **`src/routes`**: Defines API endpoints and maps them to controllers.
- **`src/utils`**: Helper functions and constants.
- **`src/models`**: (Reserved for future ORM/Type definitions).
- **`src/index.ts`**: Application entry point and server configuration.

## Key Features
- **Efficient Querying**: Optimized SQL queries with proper indexing.
- **Dynamic Filtering**: dynamically builds `WHERE` clauses based on user inputs.
- **Data Ingestion**: capability to parse and import large CSV datasets on startup.
- **robust Error Handling**: Global error catching and standardized responses.

## Scripts
- `npm run dev`: Starts the development server with hot-reload (`nodemon` or `ts-node`).
- `npm run build`: Compiles TypeScript to JavaScript.
- `npm start`: Runs the compiled production server.
