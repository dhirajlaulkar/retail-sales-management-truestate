# System Architecture

## 1. Backend Architecture
The backend is built using **Node.js** with the **Express** framework, utilizing **SQLite** for data persistence. It follows a clean MVC-style layered architecture (minus the 'View').

*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: SQLite (managed via `sqlite3` and `sqlite` wrapper)
*   **Pattern**: Route-Controller-Service

## 2. Frontend Architecture
The frontend is a Single Page Application (SPA) built with **React**, bundled by **Vite**. It uses a modular, component-based architecture with custom hooks for business logic separation.

*   **Framework**: React 19
*   **Build Tool**: Vite
*   **Language**: TypeScript
*   **Routing**: React Router DOM
*   **Styling**: Tailwind CSS (with utility helpers) / Vanilla CSS in `styles/`

## 3. Data Flow

### Request Lifecycle
1.  **User Action**: User interacts with UI (e.g., changes a filter).
2.  **Event Handler**: Component calls a handler function from `useSalesFilters` hook.
3.  **State Update**: `searchParams` are updated in the URL.
4.  **Effect Trigger**: `useSalesData` hook detects `searchParams` change and calls `api.ts` service.
5.  **API Request**: Frontend Service (`fetchSales`) sends HTTP GET request to Backend Route (`/api/sales`).
6.  **Route Dispatch**: Backend Router delegates to `salesController`.
7.  **Controller Logic**: Controller parses query params and constructs SQL parameters.
8.  **Database Query**: `db` service executes SQL against SQLite.
9.  **Response**: Data is returned to Frontend.
10. **Render**: React state updates, re-rendering `Dashboard` and `DataTable`.

## 4. Folder Structure

```
root/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Request handling logic
│   │   ├── models/        # (Reserved for data models)
│   │   ├── routes/        # API route definitions
│   │   ├── services/      # Business logic & DB access
│   │   ├── utils/         # Helper functions
│   │   └── index.ts       # Entry point
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/    # Reusable UI (DataTable, FilterPanel)
│   │   ├── hooks/         # Custom logic (useSalesData)
│   │   ├── routes/        # Page components (Dashboard)
│   │   ├── services/      # API client functions
│   │   ├── styles/        # Global CSS
│   │   ├── utils/         # Helpers (cn, formatting)
│   │   └── App.tsx        # Routing configuration
│   └── package.json
└── docs/
    └── architecture.md    # This file
```

## 5. Module Responsibilities

### Backend
*   **Controllers**: Handle HTTP requests/responses, validate inputs, orchestrate services.
*   **Services**: Encapsulate business logic and direct database interactions.
*   **Routes**: Map HTTP endpoints to controller methods.

### Frontend
*   **Components**: Pure presentational units (ui-centric, no complex business logic).
*   **Routes (Pages)**: Composition roots that assemble components and provide data via hooks.
*   **Hooks**: specific encapsulation of stateful logic (e.g., filter management, data fetching).
*   **Services**: Typed wrappers for HTTP calls to the backend.
*   **Utils**: shared, stateless helper functions.
