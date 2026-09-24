"use client";

import { calculateTypeMatchups, getTypeStyle } from "@/lib/pokemon";
import { ShieldAlert, ShieldCheck, ShieldOff } from "lucide-react";

interface WeaknessMatrixProps {
  types: string[];
}

export function WeaknessMatrix({ types }: WeaknessMatrixProps) {
  const matchups = calculateTypeMatchups(types);

  const allWeaknesses = [
    ...matchups.quadrupleWeakness.map((t) => ({ type: t, mult: "4x" })),
    ...matchups.doubleWeakness.map((t) => ({ type: t, mult: "2x" })),
  ];

  const allResistances = [
    ...matchups.halfResistance.map((t) => ({ type: t, mult: "0.5x" })),
    ...matchups.quarterResistance.map((t) => ({ type: t, mult: "0.25x" })),
  ];

  const allImmunities = matchups.immune.map((t) => ({ type: t, mult: "0x" }));

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-rose-400">
          <ShieldAlert className="w-4 h-4" />
          <span>Vulnerable To (Takes 2x - 4x Damage)</span>
        </div>
        {allWeaknesses.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {allWeaknesses.map(({ type, mult }) => {
              const style = getTypeStyle(type);
              return (
                <div
                  key={type}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium border ${style.badgeBg}`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: style.accent }}
                  />
                  <span>{style.name}</span>
                  <span className="font-mono text-[10px] font-bold px-1 rounded bg-black/30">
                    {mult}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">No special weaknesses</p>
        )}
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>Resistant To (Takes 0.5x - 0.25x Damage)</span>
        </div>
        {allResistances.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {allResistances.map(({ type, mult }) => {
              const style = getTypeStyle(type);
              return (
                <div
                  key={type}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium border ${style.badgeBg}`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: style.accent }}
                  />
                  <span>{style.name}</span>
                  <span className="font-mono text-[10px] font-bold px-1 rounded bg-black/30">
                    {mult}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic">No type resistances</p>
        )}
      </div>

      {allImmunities.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-purple-400">
            <ShieldOff className="w-4 h-4" />
            <span>Immune To (Takes 0x Damage)</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allImmunities.map(({ type, mult }) => {
              const style = getTypeStyle(type);
              return (
                <div
                  key={type}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium border ${style.badgeBg}`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: style.accent }}
                  />
                  <span>{style.name}</span>
                  <span className="font-mono text-[10px] font-bold px-1 rounded bg-black/30">
                    {mult}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
