"use client";

import { ArrowUpDown, RotateCcw } from "lucide-react";

export type SortOption = "id-asc" | "id-desc" | "name-asc" | "name-desc" | "stat-desc";

interface SortControlsProps {
  sortBy: SortOption;
  onChangeSort: (sort: SortOption) => void;
  showOnlyFavorites: boolean;
  onToggleFavorites: () => void;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
  count: number;
  total: number;
}

export function SortControls({
  sortBy,
  onChangeSort,
  showOnlyFavorites,
  onToggleFavorites,
  hasActiveFilters,
  onResetFilters,
  count,
  total,
}: SortControlsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-400">
      <div className="flex items-center gap-2">
        <span className="font-medium">
          Showing <span className="text-white font-bold">{count}</span> of{" "}
          <span className="text-white font-bold">{total}</span> Pokémon
        </span>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 ml-2 px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-rose-300 hover:text-white border border-rose-500/20 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => onChangeSort(e.target.value as SortOption)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 border border-white/10 text-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="id-asc">Number: Low to High</option>
            <option value="id-desc">Number: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
            <option value="stat-desc">Base Stats Total</option>
          </select>
        </div>
      </div>
    </div>
  );
}
