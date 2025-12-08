import { FilterOptions } from '../types';
import { ChevronDown, RotateCcw } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface FilterPanelProps {
    options: FilterOptions | null;
    filters: {
        region: string[];
        category: string[];
        method: string[];
        gender: string[];
        minAge: string;
        maxAge: string;
        startDate: string;
        endDate: string;
        tags: string;
    };
    onFilterChange: (key: string, value: string) => void;
    onClearFilters: () => void;
}

const Dropdown = ({ label, children }: { label: string; children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
                {label}
                <ChevronDown className="w-4 h-4" />
            </button>
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-4">
                    {children}
                </div>
            )}
        </div>
    );
};

export const FilterPanel = ({ options, filters, onFilterChange, onClearFilters }: FilterPanelProps) => {
    if (!options) return <div className="animate-pulse h-10 w-full bg-gray-100 rounded-lg"></div>;



    return (
        <div className="flex flex-wrap items-center gap-3">
            <button
                onClick={onClearFilters}
                className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 hover:text-indigo-600 transition-colors"
                title="Reset Filters"
            >
                <RotateCcw className="w-5 h-5" />
            </button>


            <Dropdown label="Customer Region">
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                    {options.regions.map((item) => (
                        <label key={item} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="rounded text-indigo-600 focus:ring-indigo-500"
                                checked={filters.region.includes(item)}
                                onChange={() => onFilterChange('region', item)}
                            />
                            <span className="text-sm text-gray-700">{item}</span>
                        </label>
                    ))}
                </div>
            </Dropdown>


            <Dropdown label="Gender">
                <div className="space-y-2">
                    {options.genders.map((item) => (
                        <label key={item} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="rounded text-indigo-600 focus:ring-indigo-500"
                                checked={filters.gender.includes(item)}
                                onChange={() => onFilterChange('gender', item)}
                            />
                            <span className="text-sm text-gray-700">{item}</span>
                        </label>
                    ))}
                </div>
            </Dropdown>


            <Dropdown label="Age Range">
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        min="0"
                        max="120"
                        placeholder="Min"
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        value={filters.minAge}
                        onChange={(e) => onFilterChange('minAge', e.target.value)}
                    />
                    <span className="text-gray-400">-</span>
                    <input
                        type="number"
                        min="0"
                        max="120"
                        placeholder="Max"
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        value={filters.maxAge}
                        onChange={(e) => onFilterChange('maxAge', e.target.value)}
                    />
                </div>
            </Dropdown>

            {/* Product Category */}
            <Dropdown label="Product Category">
                <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                    {options.categories.map((item) => (
                        <label key={item} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="rounded text-indigo-600 focus:ring-indigo-500"
                                checked={filters.category.includes(item)}
                                onChange={() => onFilterChange('category', item)}
                            />
                            <span className="text-sm text-gray-700">{item}</span>
                        </label>
                    ))}
                </div>
            </Dropdown>

            {/* Tags */}
            <Dropdown label="Tags">
                <input
                    type="text"
                    placeholder="Search tags..."
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                    value={filters.tags}
                    onChange={(e) => onFilterChange('tags', e.target.value)}
                />
            </Dropdown>


            <Dropdown label="Payment Method">
                <div className="space-y-2">
                    {options.methods.map((item) => (
                        <label key={item} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="rounded text-indigo-600 focus:ring-indigo-500"
                                checked={filters.method.includes(item)}
                                onChange={() => onFilterChange('method', item)}
                            />
                            <span className="text-sm text-gray-700">{item}</span>
                        </label>
                    ))}
                </div>
            </Dropdown>


            <Dropdown label="Date">
                <div className="space-y-3">
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">From</label>
                        <input
                            type="date"
                            className="block w-full mt-1 border border-gray-300 rounded text-sm px-2 py-1"
                            value={filters.startDate}
                            onChange={(e) => onFilterChange('startDate', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase">To</label>
                        <input
                            type="date"
                            className="block w-full mt-1 border border-gray-300 rounded text-sm px-2 py-1"
                            value={filters.endDate}
                            onChange={(e) => onFilterChange('endDate', e.target.value)}
                        />
                    </div>
                </div>
            </Dropdown>
        </div>
    );
};
