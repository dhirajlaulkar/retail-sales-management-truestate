import { SalesResponse, FilterOptions } from '../types';

const API_URL = 'http://localhost:5000/api/sales';

export const fetchSales = async (params: URLSearchParams): Promise<SalesResponse> => {
    const response = await fetch(`${API_URL}?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch sales data');
    }
    return response.json();
};

export const fetchFilterOptions = async (): Promise<FilterOptions> => {
    const response = await fetch(`${API_URL}/meta`);
    if (!response.ok) {
        throw new Error('Failed to fetch filter options');
    }
    return response.json();
};
