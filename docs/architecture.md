# Architecture Documentation

## 1. Overview
The Retail Sales Management System is a full-stack web application designed to handle large datasets (1 million records) of sales transactions. It provides advanced search, filtering, sorting, and pagination capabilities.
- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript + SQLite

## 2. Technical Architecture

### 2.1 Backend Architecture
The backend is structured as a REST API using Express.js.
- **Database**: SQLite is used for its self-contained, serverless, and transactional SQL engine, allowing efficient querying (indexing, LIMIT/OFFSET) without external dependencies.
- **Data Import**: Upon server start, the system checks for `data/sales_data.csv`. If missing, it downloads it. If the DB is empty, it streams the CSV and bulk inserts records into SQLite within a transaction.
- **Controller Layer**: Handles HTTP requests, extracting query parameters for filtering, sorting, and pagination.
- **Service Layer**:
    - `db.ts`: Manages SQLite connection and schema initialization.
    - `importService.ts`: Handles CSV downloading and parsing.

### 2.2 Frontend Architecture
The frontend is a Single Page Application (SPA) built with React.
- **State Management**: URL Search Params (`react-router-dom`) are the source of truth for application state (search, filter, page). This ensures shareable URLs and browser history support.
- **Components**:
    - `App.tsx`: Main controller, synchronizes URL state with API requests.
    - `DataTable`: Presentational component for the grid.
    - `FilterPanel`: Handles multi-select filters using checkboxes.
    - `SearchBar`: Debounced input for text search.
- **Styling**: Utility-first CSS with Tailwind.

### 2.3 Data Flow
1. **User Action**: User types in search or selects a filter.
2. **URL Update**: `App.tsx` updates the URL query parameters (e.g., `?region=North&page=1`).
3. **API Request**: A `useEffect` hook triggers `fetchSales(params)` when URL changes.
4. **Backend Processing**: Express parses params -> builds SQL query -> SQLite returns paginated results.
5. **UI Update**: Frontend receives JSON response and updates the `sales` state.

## 3. Folder Structure
```
root/
├── backend/
│   ├── src/
│   │   ├── controllers/ (Request handling)
│   │   ├── services/ (DB logic, Import logic)
│   │   ├── routes/ (API definitions)
│   │   └── index.ts (Entry point)
├── frontend/
│   ├── src/
│   │   ├── components/ (UI building blocks)
│   │   ├── services/ (API fetchers)
│   │   ├── types/ (TS interfaces)
│   │   └── App.tsx (Main logic)
```

## 4. Design Decisions
- **Why SQLite?**: Handling 1M records in-memory in Node.js can cause GC pauses and high RAM usage. SQLite allows efficient disk-based querying with indices, keeping the Node.js process lightweight.
- **Why URL State?**: Essential for deep-linking and "maintain state" requirement across reloads.
- **Debouncing**: Search input is debounced (500ms) to prevent excessive API calls.
