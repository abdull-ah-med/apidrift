import { Search, MapPin, X, BookOpen, ArrowUpDown, Filter } from "lucide-react";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";

interface FilterState {
  search: string;
  city: string;
  program: string;
  sortBy: string;
}

interface DashboardFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  onClearFilters: () => void;
  className?: string;
}

export function DashboardFilters({
  filters,
  onFilterChange,
  onClearFilters,
  className,
}: DashboardFiltersProps) {
  const cities = [
    { label: "All Cities", value: "" },
    { label: "Islamabad", value: "Islamabad" },
    { label: "Lahore", value: "Lahore" },
    { label: "Karachi", value: "Karachi" },
    { label: "Rawalpindi", value: "Rawalpindi" },
    { label: "Peshawar", value: "Peshawar" },
  ];

  const programs = [
    { label: "All Programs", value: "" },
    { label: "Computer Science & IT", value: "Computer Science" },
    { label: "Engineering", value: "Engineering" },
    { label: "Business & Management", value: "Business" },
    { label: "Medical & Health", value: "Medical" },
    { label: "Social Sciences", value: "Social Sciences" },
  ];

  const sortOptions = [
    { label: "Recommended", value: "" },
    { label: "Fee: Low to High", value: "fee_asc" },
    { label: "Fee: High to Low", value: "fee_desc" },
    { label: "Ranking: Top Rated", value: "rank_asc" },
  ];

  const hasActiveFilters = filters.search || filters.city || filters.program || filters.sortBy;

  return (
    <div className={`bg-white p-4 rounded-2xl border border-slate-200 shadow-sm ${className}`}>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input - Larger width */}
        <div className="relative flex-[2]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input
            placeholder="Search universities..."
            value={filters.search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange("search", e.target.value)}
            classname="pl-11 h-11 bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all w-full"
          />
        </div>
        
        {/* Filters Group */}
        <div className="flex flex-col sm:flex-row gap-3 flex-[3]">
            {/* City Filter */}
            <div className="relative flex-1">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" size={16} />
              <Select
                options={cities}
                value={filters.city}
                onChange={(e) => onFilterChange("city", e.target.value)}
                className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all w-full text-sm"
              />
            </div>

            {/* Program Filter */}
            <div className="relative flex-1">
              <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" size={16} />
              <Select
                options={programs}
                value={filters.program}
                onChange={(e) => onFilterChange("program", e.target.value)}
                className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all w-full text-sm"
              />
            </div>

            {/* Sort Filter */}
            <div className="relative flex-1">
              <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" size={16} />
              <Select
                options={sortOptions}
                value={filters.sortBy}
                onChange={(e) => onFilterChange("sortBy", e.target.value)}
                className="pl-10 h-11 bg-slate-50 border-slate-200 rounded-xl focus:bg-white transition-all w-full text-sm"
              />
            </div>
        </div>

        {/* Clear Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="h-11 px-4 rounded-xl text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <X size={16} /> <span className="hidden lg:inline">Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}
