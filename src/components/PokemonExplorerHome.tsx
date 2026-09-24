"use client";

import { useState, useMemo } from "react";
import { CatalogPokemon } from "@/lib/pokemon";
import { useFavorites } from "@/hooks/useFavorites";
import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { TypeFilter } from "@/components/TypeFilter";
import { SortControls, SortOption } from "@/components/SortControls";
import { PokemonCard } from "@/components/PokemonCard";
import { Footer } from "@/components/Footer";
import { Sparkles, SlidersHorizontal, ArrowUp } from "lucide-react";

interface PokemonExplorerHomeProps {
  initialPokemon: CatalogPokemon[];
}

const ITEMS_PER_PAGE = 24;

export function PokemonExplorerHome({ initialPokemon }: PokemonExplorerHomeProps) {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("id-asc");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialPokemon.forEach((p) => {
      p.types.forEach((t) => {
        counts[t] = (counts[t] || 0) + 1;
      });
    });
    return counts;
  }, [initialPokemon]);

  const filteredAndSorted = useMemo(() => {
    let result = [...initialPokemon];

    if (showOnlyFavorites) {
      result = result.filter((p) => favorites.includes(p.id));
    }

    if (selectedType) {
      result = result.filter((p) => p.types.includes(selectedType));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const idStr = p.id.toString();
        const paddedId = p.id.toString().padStart(3, "0");
        return (
          p.name.toLowerCase().includes(q) ||
          idStr === q ||
          paddedId.includes(q) ||
          `#${paddedId}`.includes(q)
        );
      });
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "id-asc":
          return a.id - b.id;
        case "id-desc":
          return b.id - a.id;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "stat-desc": {
          const totalA = a.stats.reduce((acc, s) => acc + s.value, 0);
          const totalB = b.stats.reduce((acc, s) => acc + s.value, 0);
          return totalB - totalA;
        }
        default:
          return a.id - b.id;
      }
    });

    return result;
  }, [initialPokemon, searchQuery, selectedType, sortBy, showOnlyFavorites, favorites]);

  const hasActiveFilters = Boolean(
    searchQuery.trim() || selectedType !== null || showOnlyFavorites
  );

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedType(null);
    setShowOnlyFavorites(false);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const visiblePokemon = filteredAndSorted.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSorted.length;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <Navbar
        favoritesCount={favorites.length}
        showOnlyFavorites={showOnlyFavorites}
        onToggleFavoritesFilter={() => {
          setShowOnlyFavorites(!showOnlyFavorites);
          setVisibleCount(ITEMS_PER_PAGE);
        }}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        <section className="relative rounded-3xl p-6 sm:p-10 overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90 shadow-2xl backdrop-blur-xl">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Explore Generation I • Kanto Pokedex</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Discover, Search & Inspect Every{" "}
              <span className="bg-gradient-to-r from-red-400 via-amber-300 to-indigo-400 bg-clip-text text-transparent">
                Pokémon
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
              Browse through all original 151 Pokémon with real-time stats, type
              effectiveness, official artwork, audio cries, abilities, and move sets.
            </p>

            <div className="pt-2">
              <SearchBar
                value={searchQuery}
                onChange={(q) => {
                  setSearchQuery(q);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                totalResults={filteredAndSorted.length}
              />
            </div>
          </div>
        </section>

        <section id="catalog" className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
              <span>Filter by Type</span>
            </div>
            {favorites.length > 0 && (
              <button
                onClick={() => {
                  setShowOnlyFavorites(!showOnlyFavorites);
                  setVisibleCount(ITEMS_PER_PAGE);
                }}
                className={`text-xs font-medium px-3 py-1 rounded-lg border transition-all ${
                  showOnlyFavorites
                    ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                    : "text-slate-400 hover:text-white border-white/10"
                }`}
              >
                {showOnlyFavorites ? "Show All Pokémon" : `View Bookmarked (${favorites.length})`}
              </button>
            )}
          </div>

          <TypeFilter
            selectedType={selectedType}
            onSelectType={(type) => {
              setSelectedType(type);
              setVisibleCount(ITEMS_PER_PAGE);
            }}
            typeCounts={typeCounts}
          />

          <SortControls
            sortBy={sortBy}
            onChangeSort={setSortBy}
            showOnlyFavorites={showOnlyFavorites}
            onToggleFavorites={() => {
              setShowOnlyFavorites(!showOnlyFavorites);
              setVisibleCount(ITEMS_PER_PAGE);
            }}
            hasActiveFilters={hasActiveFilters}
            onResetFilters={resetFilters}
            count={filteredAndSorted.length}
            total={initialPokemon.length}
          />
        </section>

        <section>
          {visiblePokemon.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {visiblePokemon.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  types={pokemon.types}
                  stats={pokemon.stats}
                  isFavorite={isFavorite(pokemon.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center rounded-3xl border border-white/5 bg-slate-900/50 backdrop-blur-md">
              <div className="w-20 h-20 rounded-full bg-slate-800/80 border border-white/10 flex items-center justify-center mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No Pokémon Found
              </h3>
              <p className="text-sm text-slate-400 max-w-md mb-6">
                No Pokémon matched your search query &quot;{searchQuery}&quot;{" "}
                {selectedType ? `with type &quot;${selectedType}&quot;` : ""}. Try
                clearing your filters or searching by a different name or #ID.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-lg shadow-indigo-600/30"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {hasMore && (
            <div className="flex flex-col items-center justify-center pt-10 gap-2">
              <button
                onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                className="px-8 py-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 text-white font-semibold text-sm border border-white/10 hover:border-white/20 shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Load More Pokémon ({filteredAndSorted.length - visibleCount} remaining)
              </button>
              <span className="text-xs text-slate-500">
                Displaying {visiblePokemon.length} of {filteredAndSorted.length}
              </span>
            </div>
          )}
        </section>
      </main>

      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-slate-800/90 hover:bg-indigo-600 text-slate-300 hover:text-white border border-white/10 shadow-2xl transition-all duration-300 hover:scale-110 z-40 backdrop-blur-md cursor-pointer"
        title="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <Footer />
    </div>
  );
}
