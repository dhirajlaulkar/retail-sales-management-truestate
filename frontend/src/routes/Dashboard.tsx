import { ArrowUpDown, Loader2 } from 'lucide-react';
import { DataTable } from '../components/DataTable';
import { FilterPanel } from '../components/FilterPanel';
import { Pagination } from '../components/Pagination';
import { SearchBar } from '../components/SearchBar';
import { useSalesData } from '../hooks/useSalesData';
import { useSalesFilters } from '../hooks/useSalesFilters';
import '../styles/App.css';

export function Dashboard() {
    const {
        searchParams,
        searchTerm,
        setSearchTerm,
        currentFilters,
        handleSort,
        handlePageChange,
        handleFilterChange,
        clearFilters
    } = useSalesFilters();

    const { sales, meta, filterOptions, loading } = useSalesData(searchParams);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-[1600px] mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-900">Retail Sales Management System</h1>
                    <div className="w-96">
                        <SearchBar val={searchTerm} onSearch={setSearchTerm} />
                    </div>
                </div>

                <div className="bg-white border-t border-gray-100 py-3">
                    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4 items-center justify-between">
                        <FilterPanel
                            options={filterOptions}
                            filters={currentFilters}
                            onFilterChange={handleFilterChange}
                            onClearFilters={clearFilters}
                        />

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Sort by:</span>
                            <select
                                className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 p-1.5"
                                value={searchParams.get('sortBy') || 'date'}
                                onChange={(e) => handleSort(e.target.value)}
                            >
                                <option value="customer_name">Customer Name</option>
                                <option value="date">Date</option>
                                <option value="total_amount">Total Amount</option>
                                <option value="quantity">Quantity</option>
                            </select>
                            <button
                                onClick={() => handleSort(searchParams.get('sortBy') || 'date')}
                                className="p-1.5 hover:bg-gray-100 rounded"
                            >
                                <ArrowUpDown className={`w-4 h-4 text-gray-500 ${searchParams.get('sortOrder') === 'asc' ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                <div className="relative min-w-0">
                    {loading && (
                        <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                        </div>
                    )}

                    <DataTable
                        data={sales}
                        sortColumn={searchParams.get('sortBy') || 'date'}
                        sortDirection={(searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'}
                        onSort={handleSort}
                    />
                </div>

                <Pagination meta={meta} onPageChange={handlePageChange} />
            </main>
        </div>
    );
}
