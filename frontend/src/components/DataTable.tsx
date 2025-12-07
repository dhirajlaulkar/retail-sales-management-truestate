import { SalesData } from '../types';
import { cn } from '../lib/utils';
import { ArrowUpDown } from 'lucide-react';

interface DataTableProps {
    data: SalesData[];
    sortColumn: string;
    sortDirection: 'asc' | 'desc';
    onSort: (column: string) => void;
}

export const DataTable = ({ data, sortColumn, sortDirection, onSort }: DataTableProps) => {
    const headers = [
        { key: 'date', label: 'Date' },
        { key: 'customer_name', label: 'Customer' },
        { key: 'phone_number', label: 'Phone' },
        { key: 'customer_region', label: 'Region' },
        { key: 'product_category', label: 'Category' },
        { key: 'product_name', label: 'Product' },
        { key: 'quantity', label: 'Qty' },
        { key: 'final_amount', label: 'Amount' },
        { key: 'payment_method', label: 'Payment' },
    ];

    if (data.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                No results found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {headers.map((header) => (
                            <th
                                key={header.key}
                                scope="col"
                                className={cn(
                                    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors",
                                    sortColumn === header.key && "font-bold text-gray-700"
                                )}
                                onClick={() => onSort(header.key)}
                            >
                                <div className="flex items-center space-x-1">
                                    <span>{header.label}</span>
                                    {sortColumn === header.key && (
                                        <ArrowUpDown className={cn("h-3 w-3", sortDirection === 'asc' ? "rotate-0" : "rotate-180")} />
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(item.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {item.customer_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.phone_number}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.customer_region}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.product_category}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate" title={item.product_name}>
                                {item.product_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                {item.quantity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 text-right">
                                ${item.final_amount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {item.payment_method}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
