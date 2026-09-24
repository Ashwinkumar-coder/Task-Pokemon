"use client";

import { useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  totalResults?: number;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search Pokémon by name or #ID...",
  totalResults,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-slate-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-24 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 focus:bg-slate-900 border border-white/10 focus:border-indigo-500/80 focus:ring-4 focus:ring-indigo-500/10 text-white placeholder-slate-400 text-sm font-medium transition-all outline-none backdrop-blur-md shadow-inner"
        />
        <div className="absolute right-3 flex items-center gap-1.5">
          {value ? (
            <button
              onClick={() => onChange("")}
              className="p-1 rounded-lg hover:bg-slate-700/60 text-slate-400 hover:text-white transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono text-slate-400 bg-slate-700/60 border border-slate-600/50">
              /
            </kbd>
          )}
          {typeof totalResults === "number" && (
            <span className="hidden md:inline-block text-[11px] font-medium text-slate-400 px-2 py-0.5 rounded-full bg-slate-700/40">
              {totalResults}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
