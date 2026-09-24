import { Heart, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-slate-950/80 backdrop-blur-md py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-red-400 to-amber-300 bg-clip-text text-transparent">
                PokéExplorer
              </span>
              <span className="text-[10px] text-slate-500 font-mono">v1.0</span>
            </div>
            <p className="text-xs text-slate-400 text-center md:text-left">
              A responsive, high-performance Pokémon Explorer built with Next.js & PokéAPI.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-white/5">
              Next.js 16 App Router
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-white/5">
              TypeScript
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-white/5">
              Tailwind CSS
            </span>
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-900/30 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-500/20 transition-colors"
            >
              <span>PokéAPI</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Pokémon Explorer. Pokémon and Pokémon character names are trademarks of Nintendo.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Pokémon Trainers
          </p>
        </div>
      </div>
    </footer>
  );
}
