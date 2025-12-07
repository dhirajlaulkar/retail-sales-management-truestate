export interface SalesData {
    id: number;
    customer_id: string;
    customer_name: string;
    phone_number: string;
    gender: string;
    age: number;
    customer_region: string;
    customer_type: string;
    product_id: string;
    product_name: string;
    brand: string;
    product_category: string;
    tags: string;
    quantity: number;
    price_per_unit: number;
    discount_percentage: number;
    total_amount: number;
    final_amount: number;
    date: string;
    payment_method: string;
    order_status: string;
    delivery_type: string;
    store_id: string;
    store_location: string;
    salesperson_id: string;
    employee_name: string;
}

export interface SalesMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface SalesResponse {
    data: SalesData[];
    meta: SalesMeta;
}

export interface FilterOptions {
    regions: string[];
    categories: string[];
    methods: string[];
    genders: string[];
}
