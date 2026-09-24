import { Metadata } from "next";
import Link from "next/link";
import {
  fetchPokemonById,
  fetchPokemonSpecies,
  formatPokemonId,
  formatPokemonName,
  getOfficialArtworkUrl,
  getLocalCatalog,
} from "@/lib/pokemon";
import { PokemonDetailView } from "@/components/PokemonDetailView";
import { ArrowLeft } from "lucide-react";

interface PokemonPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const catalog = getLocalCatalog();
  return catalog.slice(0, 30).map((p) => ({
    id: p.id.toString(),
  }));
}

export async function generateMetadata({ params }: PokemonPageProps): Promise<Metadata> {
  const { id } = await params;
  const pokemon = await fetchPokemonById(id);

  if (!pokemon) {
    return {
      title: "Pokémon Not Found | PokéExplorer",
    };
  }

  const formattedName = formatPokemonName(pokemon.name);
  const formattedId = formatPokemonId(pokemon.id);
  const artwork = getOfficialArtworkUrl(pokemon.id);

  return {
    title: `${formattedId} ${formattedName} | PokéExplorer`,
    description: `Inspect ${formattedName}'s base stats, abilities, moves, elemental type defenses, and official audio cries on PokéExplorer.`,
    openGraph: {
      title: `${formattedId} ${formattedName} - Pokémon Explorer`,
      description: `Complete battle stats and details for ${formattedName}.`,
      images: [{ url: artwork, width: 475, height: 475, alt: formattedName }],
    },
  };
}

export default async function PokemonDetailPage({ params }: PokemonPageProps) {
  const { id } = await params;
  const pokemon = await fetchPokemonById(id);

  if (!pokemon) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#090d16] text-white p-6 text-center">
        <div className="p-8 rounded-3xl bg-slate-900 border border-white/10 max-w-md w-full space-y-4 shadow-2xl">
          <div className="text-5xl">⚡</div>
          <h1 className="text-2xl font-bold">Pokémon Not Found</h1>
          <p className="text-sm text-slate-400">
            Could not find any Pokémon matching &ldquo;{id}&rdquo;. It might be out of range or misspelled.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Pokédex</span>
          </Link>
        </div>
      </div>
    );
  }

  const species = await fetchPokemonSpecies(pokemon.id);

  const catalog = getLocalCatalog();
  const currentIndex = catalog.findIndex((p) => p.id === pokemon.id);

  const prevPokemon =
    currentIndex > 0
      ? { id: catalog[currentIndex - 1].id, name: catalog[currentIndex - 1].name }
      : pokemon.id > 1
      ? { id: pokemon.id - 1, name: `Pokemon #${pokemon.id - 1}` }
      : null;

  const nextPokemon =
    currentIndex >= 0 && currentIndex < catalog.length - 1
      ? { id: catalog[currentIndex + 1].id, name: catalog[currentIndex + 1].name }
      : pokemon.id < 151
      ? { id: pokemon.id + 1, name: `Pokemon #${pokemon.id + 1}` }
      : null;

  return (
    <PokemonDetailView
      pokemon={pokemon}
      species={species}
      prevPokemon={prevPokemon}
      nextPokemon={nextPokemon}
    />
  );
}
