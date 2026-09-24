import { Metadata } from "next";
import { getLocalCatalog } from "@/lib/pokemon";
import { PokemonExplorerHome } from "@/components/PokemonExplorerHome";

export const metadata: Metadata = {
  title: "PokéExplorer | Complete Generation I Pokédex",
  description:
    "Explore, search, and analyze all 151 Pokémon from Generation I. View stats, elemental type matchups, abilities, moves, and hear official audio cries.",
  keywords: ["Pokemon", "Pokedex", "PokeAPI", "Next.js", "Pokemon Explorer", "Generation 1"],
  openGraph: {
    title: "PokéExplorer | Complete Generation I Pokédex",
    description: "Explore all 151 Pokémon with live stats, type matchups, moves, and audio cries.",
    type: "website",
  },
};

export default async function HomePage() {
  const catalog = getLocalCatalog();

  return <PokemonExplorerHome initialPokemon={catalog} />;
}
