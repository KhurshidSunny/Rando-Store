import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchInput({
  searchTerm,
  onSearchChange,
  placeholder = "Search products...",
  className = "",
}) {
  return (
    <div className={`relative max-w-md mx-auto ${className}`}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 text-gray-700 bg-white border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 shadow-sm hover:shadow-md placeholder-gray-400"
      />
      <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
    </div>
  );
}

export default SearchInput;
