"use client";

import Link from "next/link";
import { Sparkles, Heart } from "lucide-react";

interface NavbarProps {
  favoritesCount?: number;
  showOnlyFavorites?: boolean;
  onToggleFavoritesFilter?: () => void;
}

export function Navbar({
  favoritesCount = 0,
  showOnlyFavorites = false,
  onToggleFavoritesFilter,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3 transition-transform hover:scale-105"
        >
          <div className="relative w-10 h-10 rounded-full border-2 border-white/80 overflow-hidden shadow-lg shadow-red-500/20 group-hover:rotate-45 transition-transform duration-500">
            <div className="w-full h-1/2 bg-red-600" />
            <div className="w-full h-1/2 bg-white" />
            <div className="absolute top-1/2 left-0 w-full h-[3px] bg-slate-900 -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-3.5 h-3.5 bg-white border-2 border-slate-900 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-1 h-1 bg-slate-700 rounded-full" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-red-400 via-amber-300 to-indigo-300 bg-clip-text text-transparent">
                PokéExplorer
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
                Kanto
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Interactive Pokédex powered by PokéAPI
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {onToggleFavoritesFilter && (
            <button
              onClick={onToggleFavoritesFilter}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                showOnlyFavorites
                  ? "bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/30"
                  : "bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border-white/10"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  showOnlyFavorites ? "fill-white text-white" : "text-rose-400"
                }`}
              />
              <span className="hidden sm:inline">Favorites</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  showOnlyFavorites
                    ? "bg-white/20 text-white"
                    : "bg-rose-500/20 text-rose-300"
                }`}
              >
                {favoritesCount}
              </span>
            </button>
          )}

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/40 border border-white/5 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>PokéAPI v2</span>
          </div>

          <Link
            href="/#catalog"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span className="hidden sm:inline">Browse</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
