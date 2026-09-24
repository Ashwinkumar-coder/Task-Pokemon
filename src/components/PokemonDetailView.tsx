"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PokemonDetail, PokemonSpecies } from "@/types/pokemon";
import {
  formatPokemonId,
  formatPokemonName,
  getTypeStyle,
  getOfficialArtworkUrl,
  getShowdownSpriteUrl,
} from "@/lib/pokemon";
import { useFavorites } from "@/hooks/useFavorites";
import { AudioCryPlayer } from "@/components/AudioCryPlayer";
import { StatBar } from "@/components/StatBar";
import { WeaknessMatrix } from "@/components/WeaknessMatrix";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  Sparkles,
  Zap,
  Shield,
  Swords,
  Activity,
  Info,
  Scale,
  Ruler,
  Award,
  Search,
} from "lucide-react";

interface PokemonDetailViewProps {
  pokemon: PokemonDetail;
  species: PokemonSpecies | null;
  prevPokemon: { id: number; name: string } | null;
  nextPokemon: { id: number; name: string } | null;
}

type TabType = "stats" | "defense" | "abilities" | "moves";

export function PokemonDetailView({
  pokemon,
  species,
  prevPokemon,
  nextPokemon,
}: PokemonDetailViewProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState<TabType>("stats");
  const [spriteMode, setSpriteMode] = useState<"normal" | "shiny" | "animated">("normal");
  const [moveSearch, setMoveSearch] = useState("");

  const primaryType = pokemon.types[0]?.type.name || "normal";
  const typeStyle = getTypeStyle(primaryType);

  const flavorText =
    species?.flavor_text_entries
      ?.find((f) => f.language.name === "en")
      ?.flavor_text.replace(/[\n\f]/g, " ") ||
    "A mysterious and wondrous creature native to the Pokémon world.";

  const genus =
    species?.genera?.find((g) => g.language.name === "en")?.genus ||
    `${formatPokemonName(primaryType)} Pokémon`;

  const totalStats = pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0);

  const heightM = (pokemon.height / 10).toFixed(1);
  const heightFt = (pokemon.height * 0.328084).toFixed(1);
  const weightKg = (pokemon.weight / 10).toFixed(1);
  const weightLbs = (pokemon.weight * 0.220462).toFixed(1);

  let currentSpriteUrl = getOfficialArtworkUrl(pokemon.id, false);
  if (spriteMode === "shiny") {
    currentSpriteUrl = getOfficialArtworkUrl(pokemon.id, true);
  } else if (spriteMode === "animated") {
    currentSpriteUrl = getShowdownSpriteUrl(pokemon.id, false);
  }

  const filteredMoves = pokemon.moves.filter((m) =>
    m.move.name.toLowerCase().includes(moveSearch.toLowerCase().trim())
  );

  const isFav = isFavorite(pokemon.id);

  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100">
      <header className="sticky top-0 z-40 glass-panel border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 border border-white/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Pokédex</span>
          </Link>

          <div className="flex items-center gap-2">
            {prevPokemon && (
              <Link
                href={`/pokemon/${prevPokemon.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all"
                title={`Previous: #${prevPokemon.id} ${formatPokemonName(prevPokemon.name)}`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">
                  {formatPokemonId(prevPokemon.id)} {formatPokemonName(prevPokemon.name)}
                </span>
              </Link>
            )}

            {nextPokemon && (
              <Link
                href={`/pokemon/${nextPokemon.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 border border-white/10 text-xs font-medium text-slate-300 hover:text-white transition-all"
                title={`Next: #${nextPokemon.id} ${formatPokemonName(nextPokemon.name)}`}
              >
                <span className="hidden sm:inline">
                  {formatPokemonId(nextPokemon.id)} {formatPokemonName(nextPokemon.name)}
                </span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        <section className="relative rounded-3xl p-6 sm:p-10 border border-white/10 overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950 shadow-2xl">
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-35 blur-3xl pointer-events-none"
            style={{ backgroundColor: typeStyle.accent }}
          />
          <div
            className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ backgroundColor: typeStyle.accent }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
                <div
                  className="absolute inset-4 rounded-full opacity-40 blur-2xl pointer-events-none"
                  style={{ backgroundColor: typeStyle.accent }}
                />

                <div className="relative w-full h-full flex items-center justify-center animate-float">
                  <Image
                    src={currentSpriteUrl}
                    alt={formatPokemonName(pokemon.name)}
                    width={280}
                    height={280}
                    priority
                    unoptimized={spriteMode === "animated"}
                    className="object-contain max-h-72 drop-shadow-[0_16px_24px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-800/80 border border-white/10 mt-4 backdrop-blur-md">
                <button
                  onClick={() => setSpriteMode("normal")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    spriteMode === "normal"
                      ? "bg-white text-slate-900 shadow-md"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={() => setSpriteMode("shiny")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    spriteMode === "shiny"
                      ? "bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20"
                      : "text-slate-400 hover:text-amber-300"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Shiny</span>
                </button>
                <button
                  onClick={() => setSpriteMode("animated")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    spriteMode === "animated"
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-400 hover:text-indigo-300"
                  }`}
                >
                  Animated
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="font-mono text-sm sm:text-base font-extrabold tracking-wider text-slate-400">
                    {formatPokemonId(pokemon.id)}
                  </span>

                  <div className="flex items-center gap-2">
                    <AudioCryPlayer
                      cryUrl={pokemon.cries?.latest}
                      pokemonName={formatPokemonName(pokemon.name)}
                    />

                    <button
                      onClick={() => toggleFavorite(pokemon.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                        isFav
                          ? "bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/30"
                          : "bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border-white/10"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? "fill-white" : ""}`} />
                      <span>{isFav ? "Favorited" : "Favorite"}</span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-baseline gap-3">
                  <h1 className="text-3xl sm:text-5xl font-black text-white capitalize tracking-tight">
                    {formatPokemonName(pokemon.name)}
                  </h1>
                  <span className="text-sm font-semibold text-slate-400 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    {genus}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {pokemon.types.map(({ type }) => {
                    const style = getTypeStyle(type.name);
                    return (
                      <span
                        key={type.name}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border shadow-md ${style.badgeBg}`}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: style.accent }}
                        />
                        <span>{style.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/40 border border-white/5 backdrop-blur-sm">
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  &ldquo;{flavorText}&rdquo;
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Ruler className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Height</span>
                  </div>
                  <p className="text-base font-bold text-white">
                    {heightM} m <span className="text-xs text-slate-400 font-normal">({heightFt} ft)</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Scale className="w-3.5 h-3.5 text-amber-400" />
                    <span>Weight</span>
                  </div>
                  <p className="text-base font-bold text-white">
                    {weightKg} kg <span className="text-xs text-slate-400 font-normal">({weightLbs} lbs)</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Base XP</span>
                  </div>
                  <p className="text-base font-bold text-white">
                    {pokemon.base_experience ?? "—"} <span className="text-xs text-slate-400 font-normal">exp</span>
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-white/5 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Activity className="w-3.5 h-3.5 text-rose-400" />
                    <span>Catch Rate</span>
                  </div>
                  <p className="text-base font-bold text-white">
                    {species?.capture_rate ?? "—"}{" "}
                    <span className="text-xs text-slate-400 font-normal">/ 255</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-md overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "stats"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Base Stats</span>
              <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-white/20 text-white">
                {totalStats} BST
              </span>
            </button>

            <button
              onClick={() => setActiveTab("defense")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "defense"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Type Defenses</span>
            </button>

            <button
              onClick={() => setActiveTab("abilities")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "abilities"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Abilities</span>
              <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-white/20 text-white">
                {pokemon.abilities.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("moves")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "moves"
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Swords className="w-4 h-4" />
              <span>Moves</span>
              <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-white/20 text-white">
                {pokemon.moves.length}
              </span>
            </button>
          </div>

          {activeTab === "stats" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Base Stats Matrix</h3>
                  <p className="text-xs text-slate-400">
                    Individual stat ratings scaled against maximum possible base stats (255)
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-medium">Base Stat Total</span>
                  <p className="text-2xl font-black text-indigo-400">{totalStats}</p>
                </div>
              </div>

              <div className="space-y-4">
                {pokemon.stats.map((s) => (
                  <StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat} />
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/40 border border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-indigo-400" />
                  <span>Higher stats denote greater competitive viability in battle.</span>
                </span>
                <span>
                  Average Stat:{" "}
                  <strong className="text-white font-mono">
                    {Math.round(totalStats / pokemon.stats.length)}
                  </strong>
                </span>
              </div>
            </div>
          )}

          {activeTab === "defense" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h3 className="text-lg font-bold text-white">Type Effectiveness & Defense</h3>
                <p className="text-xs text-slate-400">
                  Damage multipliers received by {formatPokemonName(pokemon.name)} against all 18 elemental attack types.
                </p>
              </div>

              <WeaknessMatrix types={pokemon.types.map((t) => t.type.name)} />
            </div>
          )}

          {activeTab === "abilities" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl space-y-6">
              <div className="border-b border-white/5 pb-4">
                <h3 className="text-lg font-bold text-white">Special Abilities</h3>
                <p className="text-xs text-slate-400">
                  Passive powers and tactical advantages active during battle or exploration.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pokemon.abilities.map(({ ability, is_hidden, slot }) => (
                  <div
                    key={ability.name}
                    className="p-5 rounded-2xl bg-slate-800/60 border border-white/10 hover:border-white/20 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-white capitalize">
                        {formatPokemonName(ability.name)}
                      </h4>
                      {is_hidden ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Hidden Ability
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-700/60 text-slate-300">
                          Slot {slot}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      Standard battle ability of {formatPokemonName(pokemon.name)}. Triggers in combat or upon field conditions.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "moves" && (
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-white/10 backdrop-blur-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Known Moves</h3>
                  <p className="text-xs text-slate-400">
                    Showing {filteredMoves.length} of {pokemon.moves.length} combat moves
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={moveSearch}
                    onChange={(e) => setMoveSearch(e.target.value)}
                    placeholder="Search moves..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {filteredMoves.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[480px] overflow-y-auto pr-2">
                  {filteredMoves.map(({ move, version_group_details }) => {
                    const method = version_group_details[0]?.move_learn_method?.name;
                    const level = version_group_details[0]?.level_learned_at;

                    return (
                      <div
                        key={move.name}
                        className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-white/5 hover:border-white/15 transition-all space-y-1"
                      >
                        <p className="text-xs font-bold text-slate-200 capitalize truncate">
                          {formatPokemonName(move.name)}
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                          <span className="capitalize">{method?.replace("-", " ") || "Learn"}</span>
                          {level > 0 && (
                            <span className="font-mono font-semibold text-indigo-400">
                              Lv. {level}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic py-8 text-center">
                  No moves found matching &quot;{moveSearch}&quot;
                </p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
