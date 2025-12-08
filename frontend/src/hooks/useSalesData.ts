import { useState, useEffect } from 'react';
import { fetchSales, fetchFilterOptions } from '../services/api';
import { SalesData, SalesMeta, FilterOptions } from '../types';

export function useSalesData(searchParams: URLSearchParams) {
    const [sales, setSales] = useState<SalesData[]>([]);
    const [meta, setMeta] = useState<SalesMeta>({ total: 0, page: 1, limit: 10, totalPages: 1 });
    const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchFilterOptions().then(setFilterOptions).catch(console.error);
    }, []);

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

    return { sales, meta, filterOptions, loading };
}
