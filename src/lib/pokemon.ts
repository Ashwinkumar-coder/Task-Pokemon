import { PokemonDetail, PokemonListItem, PokemonSpecies } from "@/types/pokemon";
import rawCatalog from "@/data/pokemon-catalog.json";

export interface TypeStyle {
  name: string;
  badgeBg: string;
  badgeText: string;
  gradient: string;
  glow: string;
  accent: string;
  iconBg: string;
}

export interface CatalogPokemon {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  baseExperience: number;
  stats: { name: string; value: number }[];
}

export interface TypeDefenses {
  quadrupleWeakness: string[];
  doubleWeakness: string[];
  halfResistance: string[];
  quarterResistance: string[];
  immune: string[];
}

const API_BASE = "https://pokeapi.co/api/v2";

export const TYPE_STYLES: Record<string, TypeStyle> = {
  normal: {
    name: "Normal",
    badgeBg: "bg-neutral-500/20 text-neutral-300 border-neutral-500/40",
    badgeText: "text-neutral-200",
    gradient: "from-neutral-700/60 to-neutral-900/90",
    glow: "rgba(168, 168, 120, 0.35)",
    accent: "#9CA3AF",
    iconBg: "bg-neutral-500",
  },
  fire: {
    name: "Fire",
    badgeBg: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    badgeText: "text-orange-200",
    gradient: "from-orange-600/60 via-amber-600/40 to-neutral-950",
    glow: "rgba(249, 115, 22, 0.4)",
    accent: "#F97316",
    iconBg: "bg-orange-500",
  },
  water: {
    name: "Water",
    badgeBg: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    badgeText: "text-sky-200",
    gradient: "from-blue-600/60 via-cyan-600/40 to-neutral-950",
    glow: "rgba(14, 165, 233, 0.4)",
    accent: "#0EA5E9",
    iconBg: "bg-sky-500",
  },
  grass: {
    name: "Grass",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    badgeText: "text-emerald-200",
    gradient: "from-emerald-600/60 via-teal-700/40 to-neutral-950",
    glow: "rgba(16, 185, 129, 0.4)",
    accent: "#10B981",
    iconBg: "bg-emerald-500",
  },
  electric: {
    name: "Electric",
    badgeBg: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    badgeText: "text-yellow-200",
    gradient: "from-yellow-500/50 via-amber-600/30 to-neutral-950",
    glow: "rgba(234, 179, 8, 0.45)",
    accent: "#EAB308",
    iconBg: "bg-yellow-500",
  },
  ice: {
    name: "Ice",
    badgeBg: "bg-cyan-400/20 text-cyan-200 border-cyan-400/40",
    badgeText: "text-cyan-100",
    gradient: "from-cyan-500/50 via-teal-500/30 to-neutral-950",
    glow: "rgba(6, 182, 212, 0.4)",
    accent: "#06B6D4",
    iconBg: "bg-cyan-400",
  },
  fighting: {
    name: "Fighting",
    badgeBg: "bg-red-700/25 text-red-300 border-red-600/40",
    badgeText: "text-red-200",
    gradient: "from-red-800/60 via-rose-900/40 to-neutral-950",
    glow: "rgba(190, 18, 60, 0.4)",
    accent: "#E11D48",
    iconBg: "bg-red-700",
  },
  poison: {
    name: "Poison",
    badgeBg: "bg-purple-600/20 text-purple-300 border-purple-500/40",
    badgeText: "text-purple-200",
    gradient: "from-purple-700/60 via-fuchsia-800/40 to-neutral-950",
    glow: "rgba(168, 85, 247, 0.4)",
    accent: "#A855F7",
    iconBg: "bg-purple-600",
  },
  ground: {
    name: "Ground",
    badgeBg: "bg-amber-700/25 text-amber-300 border-amber-600/40",
    badgeText: "text-amber-200",
    gradient: "from-amber-700/60 via-yellow-800/40 to-neutral-950",
    glow: "rgba(217, 119, 6, 0.4)",
    accent: "#D97706",
    iconBg: "bg-amber-700",
  },
  flying: {
    name: "Flying",
    badgeBg: "bg-indigo-400/20 text-indigo-300 border-indigo-400/40",
    badgeText: "text-indigo-200",
    gradient: "from-indigo-600/50 via-sky-600/30 to-neutral-950",
    glow: "rgba(99, 102, 241, 0.4)",
    accent: "#818CF8",
    iconBg: "bg-indigo-500",
  },
  psychic: {
    name: "Psychic",
    badgeBg: "bg-pink-600/20 text-pink-300 border-pink-500/40",
    badgeText: "text-pink-200",
    gradient: "from-pink-600/60 via-rose-700/40 to-neutral-950",
    glow: "rgba(236, 72, 153, 0.4)",
    accent: "#EC4899",
    iconBg: "bg-pink-600",
  },
  bug: {
    name: "Bug",
    badgeBg: "bg-lime-600/20 text-lime-300 border-lime-500/40",
    badgeText: "text-lime-200",
    gradient: "from-lime-600/60 via-emerald-800/40 to-neutral-950",
    glow: "rgba(132, 204, 22, 0.4)",
    accent: "#84CC16",
    iconBg: "bg-lime-600",
  },
  rock: {
    name: "Rock",
    badgeBg: "bg-yellow-800/30 text-amber-200 border-yellow-700/40",
    badgeText: "text-amber-100",
    gradient: "from-stone-700/70 via-amber-900/50 to-neutral-950",
    glow: "rgba(180, 83, 9, 0.4)",
    accent: "#B45309",
    iconBg: "bg-stone-600",
  },
  ghost: {
    name: "Ghost",
    badgeBg: "bg-violet-900/35 text-violet-300 border-violet-600/50",
    badgeText: "text-violet-200",
    gradient: "from-violet-900/70 via-indigo-950/70 to-neutral-950",
    glow: "rgba(139, 92, 246, 0.45)",
    accent: "#8B5CF6",
    iconBg: "bg-violet-800",
  },
  dragon: {
    name: "Dragon",
    badgeBg: "bg-blue-700/30 text-blue-200 border-blue-600/50",
    badgeText: "text-blue-100",
    gradient: "from-indigo-800/70 via-purple-900/50 to-neutral-950",
    glow: "rgba(79, 70, 229, 0.5)",
    accent: "#6366F1",
    iconBg: "bg-indigo-700",
  },
  steel: {
    name: "Steel",
    badgeBg: "bg-slate-500/25 text-slate-300 border-slate-400/40",
    badgeText: "text-slate-200",
    gradient: "from-slate-600/50 via-zinc-700/40 to-neutral-950",
    glow: "rgba(148, 163, 184, 0.35)",
    accent: "#94A3B8",
    iconBg: "bg-slate-500",
  },
  dark: {
    name: "Dark",
    badgeBg: "bg-neutral-800/70 text-neutral-300 border-neutral-700",
    badgeText: "text-neutral-200",
    gradient: "from-neutral-800/80 via-neutral-900/90 to-neutral-950",
    glow: "rgba(82, 82, 82, 0.35)",
    accent: "#525252",
    iconBg: "bg-neutral-700",
  },
  fairy: {
    name: "Fairy",
    badgeBg: "bg-rose-400/20 text-rose-300 border-rose-400/40",
    badgeText: "text-rose-200",
    gradient: "from-rose-500/50 via-pink-600/30 to-neutral-950",
    glow: "rgba(244, 114, 182, 0.4)",
    accent: "#F472B6",
    iconBg: "bg-rose-400",
  },
};

const TYPE_CHART: Record<string, { weaknesses: string[]; resistances: string[]; immunities: string[] }> = {
  normal: {
    weaknesses: ["fighting"],
    resistances: [],
    immunities: ["ghost"],
  },
  fire: {
    weaknesses: ["water", "ground", "rock"],
    resistances: ["fire", "grass", "ice", "bug", "steel", "fairy"],
    immunities: [],
  },
  water: {
    weaknesses: ["electric", "grass"],
    resistances: ["fire", "water", "ice", "steel"],
    immunities: [],
  },
  grass: {
    weaknesses: ["fire", "ice", "poison", "flying", "bug"],
    resistances: ["water", "grass", "electric", "ground"],
    immunities: [],
  },
  electric: {
    weaknesses: ["ground"],
    resistances: ["electric", "flying", "steel"],
    immunities: [],
  },
  ice: {
    weaknesses: ["fire", "fighting", "rock", "steel"],
    resistances: ["ice"],
    immunities: [],
  },
  fighting: {
    weaknesses: ["flying", "psychic", "fairy"],
    resistances: ["bug", "rock", "dark"],
    immunities: [],
  },
  poison: {
    weaknesses: ["ground", "psychic"],
    resistances: ["grass", "fighting", "poison", "bug", "fairy"],
    immunities: [],
  },
  ground: {
    weaknesses: ["water", "grass", "ice"],
    resistances: ["poison", "rock"],
    immunities: ["electric"],
  },
  flying: {
    weaknesses: ["electric", "ice", "rock"],
    resistances: ["grass", "fighting", "bug"],
    immunities: ["ground"],
  },
  psychic: {
    weaknesses: ["bug", "ghost", "dark"],
    resistances: ["fighting", "psychic"],
    immunities: [],
  },
  bug: {
    weaknesses: ["fire", "flying", "rock"],
    resistances: ["grass", "fighting", "ground"],
    immunities: [],
  },
  rock: {
    weaknesses: ["water", "grass", "fighting", "ground", "steel"],
    resistances: ["normal", "fire", "poison", "flying"],
    immunities: [],
  },
  ghost: {
    weaknesses: ["ghost", "dark"],
    resistances: ["poison", "bug"],
    immunities: ["normal", "fighting"],
  },
  dragon: {
    weaknesses: ["ice", "dragon", "fairy"],
    resistances: ["fire", "water", "grass", "electric"],
    immunities: [],
  },
  steel: {
    weaknesses: ["fire", "fighting", "ground"],
    resistances: [
      "normal",
      "grass",
      "ice",
      "flying",
      "psychic",
      "bug",
      "rock",
      "dragon",
      "steel",
      "fairy",
    ],
    immunities: ["poison"],
  },
  dark: {
    weaknesses: ["fighting", "bug", "fairy"],
    resistances: ["ghost", "dark"],
    immunities: ["psychic"],
  },
  fairy: {
    weaknesses: ["poison", "steel"],
    resistances: ["fighting", "bug", "dark"],
    immunities: ["dragon"],
  },
};

export function getTypeStyle(type: string): TypeStyle {
  const normalized = type.toLowerCase();
  return (
    TYPE_STYLES[normalized] || {
      name: formatPokemonName(type),
      badgeBg: "bg-neutral-500/20 text-neutral-300 border-neutral-500/40",
      badgeText: "text-neutral-200",
      gradient: "from-neutral-800/60 to-neutral-950",
      glow: "rgba(120, 120, 120, 0.3)",
      accent: "#737373",
      iconBg: "bg-neutral-600",
    }
  );
}

export function formatPokemonId(id: number): string {
  return `#${id.toString().padStart(3, "0")}`;
}

export function formatPokemonName(name: string): string {
  if (!name) return "";
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatStatName(statName: string): { label: string; short: string } {
  switch (statName.toLowerCase()) {
    case "hp":
      return { label: "Hit Points", short: "HP" };
    case "attack":
      return { label: "Attack", short: "ATK" };
    case "defense":
      return { label: "Defense", short: "DEF" };
    case "special-attack":
      return { label: "Special Attack", short: "SP. ATK" };
    case "special-defense":
      return { label: "Special Defense", short: "SP. DEF" };
    case "speed":
      return { label: "Speed", short: "SPD" };
    default:
      return { label: formatPokemonName(statName), short: statName.toUpperCase().slice(0, 4) };
  }
}

export function getStatColor(statName: string): { bg: string; fill: string; text: string } {
  switch (statName.toLowerCase()) {
    case "hp":
      return { bg: "bg-emerald-500/15", fill: "bg-emerald-500", text: "text-emerald-400" };
    case "attack":
      return { bg: "bg-red-500/15", fill: "bg-red-500", text: "text-red-400" };
    case "defense":
      return { bg: "bg-amber-500/15", fill: "bg-amber-500", text: "text-amber-400" };
    case "special-attack":
      return { bg: "bg-cyan-500/15", fill: "bg-cyan-500", text: "text-cyan-400" };
    case "special-defense":
      return { bg: "bg-indigo-500/15", fill: "bg-indigo-500", text: "text-indigo-400" };
    case "speed":
      return { bg: "bg-fuchsia-500/15", fill: "bg-fuchsia-500", text: "text-fuchsia-400" };
    default:
      return { bg: "bg-blue-500/15", fill: "bg-blue-500", text: "text-blue-400" };
  }
}

export function extractIdFromUrl(url: string): number {
  const parts = url.split("/").filter(Boolean);
  return parseInt(parts[parts.length - 1], 10);
}

export function getOfficialArtworkUrl(id: number, shiny = false): string {
  if (shiny) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${id}.png`;
  }
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function getShowdownSpriteUrl(id: number, shiny = false): string {
  if (shiny) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/shiny/${id}.gif`;
  }
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${id}.gif`;
}

export function getLocalCatalog(): CatalogPokemon[] {
  return rawCatalog as CatalogPokemon[];
}

export async function fetchPokemonList(limit = 151, offset = 0): Promise<PokemonListItem[]> {
  try {
    if (offset === 0 && limit <= 151) {
      return (rawCatalog as CatalogPokemon[]).slice(0, limit).map((p) => ({
        name: p.name,
        url: `${API_BASE}/pokemon/${p.id}/`,
        id: p.id,
        image: getOfficialArtworkUrl(p.id),
        types: p.types,
      }));
    }

    const res = await fetch(`${API_BASE}/pokemon?limit=${limit}&offset=${offset}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error(`Failed to fetch pokemon list: ${res.statusText}`);
    const data = await res.json();

    return data.results.map((p: { name: string; url: string }) => {
      const id = extractIdFromUrl(p.url);
      return {
        name: p.name,
        url: p.url,
        id,
        image: getOfficialArtworkUrl(id),
      };
    });
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
    return [];
  }
}

export async function fetchPokemonById(idOrName: string | number): Promise<PokemonDetail | null> {
  try {
    const res = await fetch(`${API_BASE}/pokemon/${idOrName.toString().toLowerCase()}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Error fetching pokemon ${idOrName}:`, error);
    return null;
  }
}

export async function fetchPokemonSpecies(idOrName: string | number): Promise<PokemonSpecies | null> {
  try {
    const res = await fetch(`${API_BASE}/pokemon-species/${idOrName.toString().toLowerCase()}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Error fetching species ${idOrName}:`, error);
    return null;
  }
}

export function calculateTypeMatchups(types: string[]): TypeDefenses {
  const allTypes = Object.keys(TYPE_STYLES);
  const multipliers: Record<string, number> = {};

  allTypes.forEach((t) => {
    multipliers[t] = 1.0;
  });

  types.forEach((pokemonType) => {
    const defense = TYPE_CHART[pokemonType.toLowerCase()];
    if (!defense) return;

    defense.weaknesses.forEach((atk) => {
      multipliers[atk] = (multipliers[atk] ?? 1.0) * 2;
    });

    defense.resistances.forEach((atk) => {
      multipliers[atk] = (multipliers[atk] ?? 1.0) * 0.5;
    });

    defense.immunities.forEach((atk) => {
      multipliers[atk] = 0;
    });
  });

  const defenses: TypeDefenses = {
    quadrupleWeakness: [],
    doubleWeakness: [],
    halfResistance: [],
    quarterResistance: [],
    immune: [],
  };

  Object.entries(multipliers).forEach(([type, mult]) => {
    if (mult >= 4) defenses.quadrupleWeakness.push(type);
    else if (mult >= 2) defenses.doubleWeakness.push(type);
    else if (mult === 0) defenses.immune.push(type);
    else if (mult <= 0.25) defenses.quarterResistance.push(type);
    else if (mult <= 0.5) defenses.halfResistance.push(type);
  });

  return defenses;
}
