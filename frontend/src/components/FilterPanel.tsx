import { FilterOptions } from '../types';


interface FilterPanelProps {
    options: FilterOptions | null;
    filters: {
        region: string[];
        category: string[];
        method: string[];
        gender: string[];
    };
    onFilterChange: (key: string, value: string) => void;
    onClearFilters: () => void;
}

export const FilterPanel = ({ options, filters, onFilterChange, onClearFilters }: FilterPanelProps) => {
    if (!options) return <div className="animate-pulse h-64 bg-gray-100 rounded-lg"></div>;

    const sections = [
        { key: 'region', label: 'Region', items: options.regions },
        { key: 'category', label: 'Category', items: options.categories },
        { key: 'method', label: 'Payment Method', items: options.methods },
        { key: 'gender', label: 'Gender', items: options.genders },
    ];

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                    onClick={onClearFilters}
                    className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                    Clear All
                </button>
            </div>

            <div className="space-y-6">
                {sections.map((section) => (
                    <div key={section.key}>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">{section.label}</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                            {section.items.map((item) => (
                                <label key={item} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        checked={
                                            // @ts-ignore
                                            filters[section.key]?.includes(item)
                                        }
                                        onChange={() => onFilterChange(section.key, item)}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
