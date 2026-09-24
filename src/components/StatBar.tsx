"use client";

import { formatStatName, getStatColor } from "@/lib/pokemon";

interface StatBarProps {
  name: string;
  value: number;
  max?: number;
}

export function StatBar({ name, value, max = 255 }: StatBarProps) {
  const { label, short } = formatStatName(name);
  const color = getStatColor(name);
  const percentage = Math.min(100, Math.round((value / max) * 100));

  let tierLabel = "Average";
  if (value < 50) tierLabel = "Low";
  else if (value >= 120) tierLabel = "Legendary";
  else if (value >= 95) tierLabel = "Excellent";
  else if (value >= 75) tierLabel = "Good";

  return (
    <div className="space-y-1.5 py-1">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-slate-400 w-16">{short}</span>
          <span className="text-slate-300 font-medium hidden sm:inline">{label}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-500 font-medium hidden md:inline">
            {tierLabel}
          </span>
          <span className="font-mono font-bold text-white text-sm w-10 text-right">
            {value}
          </span>
        </div>
      </div>

      <div className="relative w-full h-2.5 rounded-full bg-slate-800/80 overflow-hidden border border-white/5">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${color.fill}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
