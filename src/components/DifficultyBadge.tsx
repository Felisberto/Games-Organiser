import { Gauge } from 'lucide-react';
import type { GameDifficulty } from '../data/games';
import { DIFFICULTY_INFO } from '../lib/difficultyStyles';

interface DifficultyBadgeProps {
  difficulty: GameDifficulty;
  variant?: 'chip' | 'overlay';
}

export function DifficultyBadge({ difficulty, variant = 'chip' }: DifficultyBadgeProps) {
  const info = DIFFICULTY_INFO[difficulty];

  if (variant === 'overlay') {
    return (
      <span
        className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-bold backdrop-blur-sm"
        style={{
          backgroundColor: `${info.hex}22`,
          borderColor: `${info.hex}55`,
          color: info.hex,
        }}
      >
        <Gauge className="h-3 w-3" strokeWidth={2.5} />
        {info.short}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-bold ${info.chip}`}
    >
      <Gauge className="h-3.5 w-3.5" strokeWidth={2.5} />
      {info.label}
    </span>
  );
}
