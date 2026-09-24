# Pokémon Explorer

A responsive Pokémon Explorer web application built with Next.js (App Router), TypeScript, and Tailwind CSS, fetching live data from the PokéAPI.

## Features

- **Pokedex Homepage**: Displays all original 151 Pokémon with high-resolution official artwork, elemental types, and base stats snapshot.
- **Search & Filtering**:
  - Live instant search by Pokémon name or Pokédex number (`#025` or `pikachu`).
  - Elemental type filter pills (Fire, Water, Grass, Electric, Psychic, Dragon, etc.).
  - Sort by Pokédex ID (Low/High), Alphabetical (A-Z/Z-A), or Base Stat Total (BST).
  - Favorites filter with persistent `localStorage` bookmarking.
- **Dynamic Detail Page (`/pokemon/[id]`)**:
  - Official high-resolution artwork with Shiny variant switcher and animated battle sprite.
  - Authentic Pokémon audio cries fetched directly from PokéAPI.
  - Interactive Base Stats matrix with visual bars, qualitative tiers, and total stat score.
  - Defensive type matchup analysis (calculates 2x/4x weaknesses, resistances, and immunities).
  - Special abilities with hidden ability badges.
  - Searchable known moves list with learn methods and levels.
  - Next / Previous Pokémon sequential navigation.
- **Performance & Optimization**:
  - Hybrid rendering: Static Site Generation (SSG) for popular Pokémon via `generateStaticParams` combined with Server-Side Rendering (SSR) and HTTP caching.
  - Optimized images using `next/image` with domain security configuration.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**: [PokéAPI](https://pokeapi.co/)

## Project Structure

```text
├── src/
│   ├── app/
│   │   ├── globals.css           # Global theme styles & animations
│   │   ├── layout.tsx            # Root application layout & metadata
│   │   ├── page.tsx              # Homepage server component
│   │   └── pokemon/
│   │       └── [id]/
│   │           └── page.tsx      # Dynamic detail route (SSG / SSR)
│   ├── components/
│   │   ├── AudioCryPlayer.tsx    # Audio cry playback component
│   │   ├── Footer.tsx            # Application footer
│   │   ├── Navbar.tsx            # Sticky navigation & favorites toggle
│   │   ├── PokemonCard.tsx       # Interactive Pokémon card with shiny preview
│   │   ├── PokemonDetailView.tsx # Detail page client tabs & view
│   │   ├── PokemonExplorerHome.tsx # Homepage client filter/search engine
│   │   ├── SearchBar.tsx         # Search input with keyboard shortcut
│   │   ├── SortControls.tsx      # Sorting dropdown and reset triggers
│   │   ├── StatBar.tsx           # Animated base stat bar
│   │   ├── TypeFilter.tsx        # Type filter pills bar
│   │   └── WeaknessMatrix.tsx    # Elemental damage multipliers matrix
│   ├── data/
│   │   └── pokemon-catalog.json  # Cached Generation I index
│   ├── hooks/
│   │   └── useFavorites.ts       # Hook for localStorage favorites
│   ├── lib/
│   │   └── pokemon.ts            # API helpers, type styles & calculators
│   └── types/
│       └── pokemon.ts            # TypeScript interfaces
├── next.config.ts                # Next.js image configuration
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js 18+ (tested on Node v20+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Ashwinkumar-coder/Task-Pokemon.git

# Navigate into the project directory
cd Task-Pokemon

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Build the production bundle
npm run build

# Start the production server
npm start
```
