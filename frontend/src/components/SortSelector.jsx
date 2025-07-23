import { ChevronDownIcon } from "@heroicons/react/24/outline";

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-low', label: 'Price (Low to High)' },
  { value: 'price-high', label: 'Price (High to Low)' },
];

function SortSelector({ sortBy, onSortChange, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="appearance-none bg-white border-2 border-gray-200 rounded-full px-4 py-3 pr-10 text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
      >
        <option value="">Sort by...</option>
        {SORT_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
    </div>
  );
}

export default SortSelector;