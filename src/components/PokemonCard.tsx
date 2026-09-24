"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import {
  formatPokemonId,
  formatPokemonName,
  getTypeStyle,
  getOfficialArtworkUrl,
} from "@/lib/pokemon";

interface PokemonCardProps {
  id: number;
  name: string;
  types?: string[];
  stats?: { name: string; value: number }[];
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function PokemonCard({
  id,
  name,
  types = [],
  stats = [],
  isFavorite,
  onToggleFavorite,
}: PokemonCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showShinyPreview, setShowShinyPreview] = useState(false);

  const primaryType = types[0] || "normal";
  const typeStyle = getTypeStyle(primaryType);

  const hpStat = stats.find((s) => s.name === "hp")?.value;
  const atkStat = stats.find((s) => s.name === "attack")?.value;
  const defStat = stats.find((s) => s.name === "defense")?.value;

  const artworkUrl = getOfficialArtworkUrl(id, showShinyPreview);

  return (
    <div className="group relative rounded-2xl p-[1px] transition-all duration-300 hover:-translate-y-1.5">
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"
        style={{ background: typeStyle.glow }}
      />

      <div className="relative flex flex-col h-full rounded-2xl bg-slate-900/90 border border-white/10 overflow-hidden group-hover:border-white/20">
        <div className="flex items-center justify-between px-4 pt-3.5 z-10">
          <span className="font-mono text-xs font-bold text-slate-400 tracking-wider">
            {formatPokemonId(id)}
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowShinyPreview(!showShinyPreview);
              }}
              title={showShinyPreview ? "View Normal" : "View Shiny"}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                showShinyPreview
                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                  : "bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-amber-300"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite(id);
              }}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                isFavorite
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  : "bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-rose-400"
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`}
              />
            </button>
          </div>
        </div>

        <Link
          href={`/pokemon/${id}`}
          className="relative flex flex-col items-center pt-2 pb-4 px-4 flex-1 focus:outline-none"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full opacity-30 blur-2xl pointer-events-none group-hover:opacity-50 transition-opacity"
            style={{ backgroundColor: typeStyle.accent }}
          />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity pointer-events-none select-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-white">
              <path d="M 50 0 A 50 50 0 0 0 5 45 L 35 45 A 16 16 0 0 1 65 45 L 95 45 A 50 50 0 0 0 50 0 Z" />
              <path d="M 50 100 A 50 50 0 0 0 95 55 L 65 55 A 16 16 0 0 1 35 55 L 5 55 A 50 50 0 0 0 50 100 Z" />
              <circle cx="50" cy="50" r="10" />
            </svg>
          </div>

          <div className="relative w-36 h-36 my-1 flex items-center justify-center">
            {!imgLoaded && (
              <div className="w-28 h-28 rounded-full bg-slate-800 animate-shimmer" />
            )}
            <Image
              src={artworkUrl}
              alt={formatPokemonName(name)}
              width={144}
              height={144}
              priority={id <= 12}
              onLoad={() => setImgLoaded(true)}
              className={`object-contain transition-all duration-300 drop-shadow-md group-hover:scale-110 group-hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>

          <h3 className="font-bold text-lg text-slate-100 tracking-tight capitalize group-hover:text-white transition-colors">
            {formatPokemonName(name)}
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-2.5">
            {types.map((type) => {
              const currentStyle = getTypeStyle(type);
              return (
                <span
                  key={type}
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border shadow-sm ${currentStyle.badgeBg}`}
                >
                  {currentStyle.name}
                </span>
              );
            })}
          </div>

          {(hpStat || atkStat || defStat) && (
            <div className="w-full grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/5 text-[10px] text-slate-400 text-center">
              <div>
                <span className="block font-medium text-slate-500">HP</span>
                <span className="font-semibold text-slate-200">{hpStat ?? "—"}</span>
              </div>
              <div>
                <span className="block font-medium text-slate-500">ATK</span>
                <span className="font-semibold text-slate-200">{atkStat ?? "—"}</span>
              </div>
              <div>
                <span className="block font-medium text-slate-500">DEF</span>
                <span className="font-semibold text-slate-200">{defStat ?? "—"}</span>
              </div>
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}
