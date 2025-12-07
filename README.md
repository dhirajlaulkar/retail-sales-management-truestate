# Retail Sales Management System

## Overview
A high-performance full-stack application for managing and analyzing retail sales data. It efficiently handles a 1-million-record dataset with advanced search, filtering, and sorting capabilities.

## Tech Stack
- **Frontend**: Vite, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, SQLite, CSV Parser

## Search Implementation Summary
- **Full-Text Search**: SQL `LIKE` queries allow partial matching on Customer Name and Phone Number.
- **Case-Insensitive**: Handled via SQL `lower()` function.
- **Debounced**: Frontend debounces input by 500ms to optimize performance.

## Filter Implementation Summary
- **Multi-Select**: Supports multiple selections for Region, Category, Payment Method, and Gender.
- **Combination**: Filters are combined using `AND` logic, with values within a filter combined using `IN`.
- **Date/Age Range**: numeric range queries handled via SQL comparison (`>=`, `<=`).

## Sorting Implementation Summary
- **Server-Side**: Sorting is performed at the database level (`ORDER BY`) to ensure correctness across paginated data.
- **Fields**: Date, Quantity, Customer Name, Total Amount.

## Pagination Implementation Summary
- **Strategy**: SQL `LIMIT` and `OFFSET` for efficient data retrieval.
- **State**: Current page is persisted in the URL. Reset to page 1 on filter/search change.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- npm

### 1. Backend Setup
```bash
cd backend
npm install
npm run start
```
*Note: On first run, the server will download the 1M record dataset and import it into SQLite. This may take a few minutes.*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Access the application at `http://localhost:5173`.
