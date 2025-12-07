import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchSales, fetchFilterOptions } from './services/api';
import { SalesData, SalesMeta, FilterOptions } from './types';
import { DataTable } from './components/DataTable';
import { Pagination } from './components/Pagination';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { Loader2 } from 'lucide-react';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sales, setSales] = useState<SalesData[]>([]);
  const [meta, setMeta] = useState<SalesMeta>({ total: 0, page: 1, limit: 10, totalPages: 1 });
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [loading, setLoading] = useState(false);

  // Local state for search input to handle debounce
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

  // Fetch Filter Options on Mount
  useEffect(() => {
    fetchFilterOptions().then(setFilterOptions).catch(console.error);
  }, []);

  // Fetch Sales Data when URL params change
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetchSales(searchParams);
        setSales(response.data);
        setMeta(response.meta);
      } catch (error) {
        console.error('Failed to load sales data', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [searchParams]);

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      const current = searchParams.get('search') || '';
      if (searchTerm !== current) {
        setSearchParams(prev => {
          const next = new URLSearchParams(prev);
          if (searchTerm) next.set('search', searchTerm);
          else next.delete('search');
          next.set('page', '1'); // Reset to page 1 on search
          return next;
        });
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, searchParams, setSearchParams]);

  // Handlers
  const handleSort = (column: string) => {
    const currentSort = searchParams.get('sortBy');
    const currentOrder = searchParams.get('sortOrder');

    let newOrder = 'asc';
    if (currentSort === column && currentOrder === 'asc') {
      newOrder = 'desc';
    }

    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('sortBy', column);
      next.set('sortOrder', newOrder);
      return next;
    });
  };

  const handlePageChange = (page: number) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('page', String(page));
      return next;
    });
  };

  const handleFilterChange = (key: string, value: string) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      // Logic for multi-select: toggle value in comma-separated list
      // Key mapping: component key -> url param key
      const paramKey = key === 'region' ? 'region' :
        key === 'category' ? 'category' :
          key === 'method' ? 'paymentMethod' :
            'gender';

      const current = next.get(paramKey) ? next.get(paramKey)!.split(',') : [];
      let updated = [];
      if (current.includes(value)) {
        updated = current.filter(item => item !== value);
      } else {
        updated = [...current, value];
      }

      if (updated.length > 0) {
        next.set(paramKey, updated.join(','));
      } else {
        next.delete(paramKey);
      }
      next.set('page', '1'); // Reset pagination on filter
      return next;
    });
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setSearchTerm('');
  };

  // Derived state for filters to pass to component
  const currentFilters = useMemo(() => {
    return {
      region: searchParams.get('region')?.split(',') || [],
      category: searchParams.get('category')?.split(',') || [],
      method: searchParams.get('paymentMethod')?.split(',') || [],
      gender: searchParams.get('gender')?.split(',') || [],
    };
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Retail Sales Dashboard</h1>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar / Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <FilterPanel
              options={filterOptions}
              filters={currentFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
            />
          </aside>

          {/* Main Content */}
          <section className="flex-1 flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <SearchBar val={searchTerm} onSearch={setSearchTerm} />
            </div>

            <div className="relative">
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
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
