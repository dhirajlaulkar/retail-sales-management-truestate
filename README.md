# Retail Sales Management System

## 1. Overview
A robust Retail Sales Management System designed to handle large datasets with efficiency. It features a responsive dashboard for visualizing sales data, equipped with advanced filtering, searching, and sorting capabilities. The system ensures accurate data processing and provides a seamless user experience through a modular, type-safe architecture.

## 2. Tech Stack
*   **Frontend**: React 19, TypeScript, Vite, React Router, Tailwind CSS.
*   **Backend**: Node.js, Express, SQLite.
*   **Utilities**: `clsx`, `tailwind-merge` for styling; `lucide-react` for icons.

## 3. Search Implementation Summary
Implemented a debounced search (500ms) that targets Customer Name and Phone Number. The search term is synchronized with the URL `searchParams`, allowing for shareable links. On the backend, this translates to parameterized SQL queries using `LIKE` operators to ensure security and performance.

## 4. Filter Implementation Summary
Features a comprehensive filtering system for Region, Gender, Category, Payment Method, Tags, and ranges for Age and Date. Filters are additive, managed via URL parameters, and validated on the frontend (e.g., preventing negative age inputs). The backend dynamically constructs SQL `WHERE` clauses based on active filters.

## 5. Sorting Implementation Summary
Server-side sorting is implemented for key columns: Date, Quantity, Total Amount, and Customer Name. Users can toggle sort direction (ASC/DESC). The state is preserved in the URL, and the backend safely validates sort columns against an allowlist before executing the `ORDER BY` SQL clause.

## 6. Pagination Implementation Summary
Utilizes efficient server-side pagination using SQL `LIMIT` and `OFFSET`. The frontend calculates the total pages based on metadata returned by the API (`total`, `page`, `limit`). This ensures the application remains performant and responsive regardless of the total dataset size.

## 7. Setup Instructions

### Backend
1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The server runs on `http://localhost:5000`.

### Frontend
1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The application runs on `http://localhost:5173`.
