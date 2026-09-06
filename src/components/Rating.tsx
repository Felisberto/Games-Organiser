import { Crown } from 'lucide-react';
import { SUPREME_SCORE, MAX_SCORE, isSupreme, isUnrated } from '../lib/gameUtils';

interface RatingProps {
  rating: number;
  size?: 'sm' | 'lg';
}

export function Rating({ rating, size = 'lg' }: RatingProps) {
  if (isUnrated(rating)) {
    return (
      <span className={`font-mono font-bold text-gray-600 ${size === 'lg' ? 'text-2xl' : 'text-base'}`}>
        — / 10
      </span>
    );
  }

  if (isSupreme(rating)) {
    return (
      <div className="relative inline-flex animate-crownPulse items-center gap-1.5 rounded-xl border border-accent/60 bg-accent/15 px-3 py-1.5">
        <Crown className="h-4 w-4 fill-accent-glow text-accent-glow drop-shadow-[0_0_6px_rgba(255,45,154,0.9)]" strokeWidth={2} />
        <span className={`font-mono font-extrabold text-accent-glow drop-shadow-[0_0_8px_rgba(255,45,154,0.7)] ${size === 'lg' ? 'text-2xl' : 'text-base'}`}>
          {rating} / 10
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-accent-glow/80">Perpétuo</span>
      </div>
    );
  }

  // Standard score: red (low) -> green (high) colour ramp
  const color =
    rating >= 10 ? 'text-emerald-400' :
    rating >= 8 ? 'text-lime-400' :
    rating >= 6 ? 'text-amber-400' :
    rating >= 4 ? 'text-orange-400' :
    'text-red-500';

  return (
    <span className={`font-mono font-extrabold ${color} ${size === 'lg' ? 'text-2xl' : 'text-base'}`}>
      {rating} <span className="text-gray-600">/ {MAX_SCORE}</span>
      {rating > MAX_SCORE && (
        <span className="ml-1 text-[10px] font-bold uppercase tracking-widest text-accent-glow">
          ★
        </span>
      )}
    </span>
  );
}

export { SUPREME_SCORE };
