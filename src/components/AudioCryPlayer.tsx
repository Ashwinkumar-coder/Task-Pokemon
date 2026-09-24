"use client";

import { useState, useRef } from "react";
import { Volume2 } from "lucide-react";

interface AudioCryPlayerProps {
  cryUrl?: string;
  pokemonName: string;
}

export function AudioCryPlayer({ cryUrl, pokemonName }: AudioCryPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (!cryUrl) return null;

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(cryUrl);
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.onerror = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    } else {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <button
      onClick={togglePlay}
      className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
        isPlaying
          ? "bg-indigo-600/30 text-indigo-200 border-indigo-500/50 shadow-lg shadow-indigo-500/20"
          : "bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border-white/10 hover:border-white/20"
      }`}
      title={`Listen to ${pokemonName}'s cry`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <Volume2
          className={`w-4 h-4 transition-colors ${
            isPlaying ? "text-indigo-400 animate-pulse" : "text-slate-400 group-hover:text-white"
          }`}
        />
      </div>

      <span className="font-medium">
        {isPlaying ? "Playing Cry..." : "Play Cry"}
      </span>

      <div className="flex items-center gap-0.5 h-3 px-1">
        <span
          className={`w-0.5 bg-indigo-400 rounded-full ${
            isPlaying ? "wave-bar-1" : "h-1"
          }`}
        />
        <span
          className={`w-0.5 bg-indigo-400 rounded-full ${
            isPlaying ? "wave-bar-2" : "h-2"
          }`}
        />
        <span
          className={`w-0.5 bg-indigo-400 rounded-full ${
            isPlaying ? "wave-bar-3" : "h-1.5"
          }`}
        />
        <span
          className={`w-0.5 bg-indigo-400 rounded-full ${
            isPlaying ? "wave-bar-4" : "h-0.5"
          }`}
        />
      </div>
    </button>
  );
}
