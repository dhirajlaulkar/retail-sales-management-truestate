import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useSalesFilters() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            const current = searchParams.get('search') || '';
            if (searchTerm !== current) {
                setSearchParams(prev => {
                    const next = new URLSearchParams(prev);
                    if (searchTerm) next.set('search', searchTerm);
                    else next.delete('search');
                    next.set('page', '1');
                    return next;
                });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, searchParams, setSearchParams]);

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
        const safePage = Math.max(1, page);
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            next.set('page', String(safePage));
            return next;
        });
    };

    const handleFilterChange = (key: string, value: string) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);

            const simpleKeys = ['minAge', 'maxAge', 'startDate', 'endDate', 'tags'];

            if (simpleKeys.includes(key)) {
                if (value) {
                    // Validate numeric inputs
                    if ((key === 'minAge' || key === 'maxAge') && Number(value) < 0) {
                        return next; // Ignore negative numbers
                    }
                    next.set(key, value);
                } else {
                    next.delete(key);
                }
            } else {
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
            }
            next.set('page', '1');
            return next;
        });
    };

    const clearFilters = () => {
        setSearchParams(new URLSearchParams());
        setSearchTerm('');
    };

    const currentFilters = useMemo(() => {
        return {
            region: searchParams.get('region')?.split(',') || [],
            category: searchParams.get('category')?.split(',') || [],
            method: searchParams.get('paymentMethod')?.split(',') || [],
            gender: searchParams.get('gender')?.split(',') || [],
            minAge: searchParams.get('minAge') || '',
            maxAge: searchParams.get('maxAge') || '',
            startDate: searchParams.get('startDate') || '',
            endDate: searchParams.get('endDate') || '',
            tags: searchParams.get('tags') || '',
        };
    }, [searchParams]);

    return {
        searchParams,
        searchTerm,
        setSearchTerm,
        currentFilters,
        handleSort,
        handlePageChange,
        handleFilterChange,
        clearFilters
    };
}
