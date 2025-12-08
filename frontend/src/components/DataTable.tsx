import { SalesData } from '../types';
import { cn } from '../utils/utils';
import { ArrowUpDown } from 'lucide-react';

interface DataTableProps {
    data: SalesData[];
    sortColumn: string;
    sortDirection: 'asc' | 'desc';
    onSort: (column: string) => void;
}




export const DataTable = ({ data, sortColumn, sortDirection, onSort }: DataTableProps) => {
    const headers = [
        { key: 'id', label: 'Transaction ID' },
        { key: 'date', label: 'Date' },
        { key: 'customer_id', label: 'Customer ID' },
        { key: 'customer_name', label: 'Customer Name' },
        { key: 'phone_number', label: 'Phone Number' },
        { key: 'gender', label: 'Gender' },
        { key: 'age', label: 'Age' },
        { key: 'product_category', label: 'Product Category' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'total_amount', label: 'Total Amount' },
        { key: 'customer_region', label: 'Customer Region' },
        { key: 'product_id', label: 'Product ID' },
        { key: 'employee_name', label: 'Employee Name' }
    ];

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg shadow-sm border border-gray-200">

                <h3 className="text-lg font-medium text-gray-900">No results found</h3>
                <p className="text-gray-500">Try adjusting your search or filters.</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm ring-1 ring-black ring-opacity-5">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {headers.map((header) => (
                                <th
                                    key={header.key}
                                    scope="col"
                                    className={cn(
                                        "px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors whitespace-nowrap",
                                        sortColumn === header.key && "text-indigo-600 bg-indigo-50"
                                    )}
                                    onClick={() => onSort(header.key)}
                                >
                                    <div className="flex items-center space-x-2">
                                        <span>{header.label}</span>
                                        {sortColumn === header.key && (
                                            <ArrowUpDown className={cn("h-4 w-4", sortDirection === 'asc' ? "rotate-0" : "rotate-180")} />
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item, idx) => (
                            <tr key={item.id} className={cn("hover:bg-gray-50 transition-colors", idx % 2 === 0 ? "bg-white" : "bg-gray-50/50")}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{item.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{item.customer_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{item.customer_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.phone_number}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.gender}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.age}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.product_category}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">{item.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 text-right">${item.total_amount.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.customer_region}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{item.product_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.employee_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
