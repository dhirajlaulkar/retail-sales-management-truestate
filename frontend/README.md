# Frontend Application

The frontend is a robust Single Page Application (SPA) built with **React 19** and **TypeScript**, bundled using **Vite**. It provides an interactive dashboard for managing and visualizing large-scale retail sales data.

## Overview
The application focuses on performance and user experience, featuring server-side pagination, sorting, and filtering to handle large datasets efficiently. The UI is built with **Tailwind CSS** for responsiveness and a modern aesthetic.

## Tech Stack
- **Core**: React 19, TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS, `clsx`, `tailwind-merge`
- **Icons**: Lucide React

## Project Structure
The codebase follows a modular architecture:

- **`src/routes`**: Top-level page components (e.g., `Dashboard`).
- **`src/components`**: Reusable UI blocks (e.g., `DataTable`, `FilterPanel`).
- **`src/hooks`**: Encapsulated business logic (e.g., `useSalesData`).
- **`src/services`**: Type-safe API client functions.
- **`src/utils`**: Shared helper functions.
- **`src/styles`**: Global CSS configurations.

## Key Features
- **Dynamic DataTable**: Supports sorting by multiple columns.
- **Advanced Filtering**: Filter by multiple criteria (Region, Gender, Date, etc.) simultaneously.
- **Debounced Search**: Optimized search functionality to reduce API calls.
- **State Management**: URL-based state synchronization for shareable inputs.

## Scripts
- `npm run dev`: Starts the development server.
- `npm run build`: Compiles the application for production.
- `npm run lint`: Runs ESLint for code quality checks.
