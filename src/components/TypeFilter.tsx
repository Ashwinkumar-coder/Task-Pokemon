"use client";

import { TYPE_STYLES } from "@/lib/pokemon";

interface TypeFilterProps {
  selectedType: string | null;
  onSelectType: (type: string | null) => void;
  typeCounts?: Record<string, number>;
}

export function TypeFilter({
  selectedType,
  onSelectType,
  typeCounts = {},
}: TypeFilterProps) {
  const typeKeys = Object.keys(TYPE_STYLES);

  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div className="flex items-center gap-2 min-w-max">
        <button
          onClick={() => onSelectType(null)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all border ${
            selectedType === null
              ? "bg-white text-slate-900 border-white shadow-md shadow-white/10"
              : "bg-slate-800/60 hover:bg-slate-800 text-slate-300 border-white/5"
          }`}
        >
          All Types
        </button>

        {typeKeys.map((typeKey) => {
          const style = TYPE_STYLES[typeKey];
          const isSelected = selectedType === typeKey;
          const count = typeCounts[typeKey];

          return (
            <button
              key={typeKey}
              onClick={() => onSelectType(isSelected ? null : typeKey)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all border ${
                isSelected
                  ? "bg-slate-800 text-white border-white/30 shadow-lg scale-105"
                  : "bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-white/5"
              }`}
              style={{
                borderColor: isSelected ? style.accent : undefined,
                boxShadow: isSelected ? `0 0 16px ${style.glow}` : undefined,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: style.accent }}
              />
              <span>{style.name}</span>
              {typeof count === "number" && count > 0 && (
                <span className="text-[10px] opacity-60">({count})</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
