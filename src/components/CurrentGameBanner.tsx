import { PlayCircle, Clock } from 'lucide-react';
import type { Game } from '../data/games';
import { GameCover } from './GameCover';
import { Rating } from './Rating';
import { formatPlayTime } from '../lib/gameUtils';

interface CurrentGameBannerProps {
  game: Game | null;
}

export function CurrentGameBanner({ game }: CurrentGameBannerProps) {
  if (!game) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 via-ink-800/80 to-ink-800/90 shadow-[0_0_40px_-12px_rgba(52,211,153,0.35)]">
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="relative flex items-center gap-4 p-3.5 sm:gap-5 sm:p-4">
        {/* Cover */}
        <div className="relative h-24 w-[72px] shrink-0 overflow-hidden rounded-lg border border-line/50 shadow-lg sm:h-28 sm:w-[84px]">
          <GameCover src={game.cover} alt={game.title} />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Jogando Agora
            </span>
          </div>
          <h2 className="truncate text-lg font-extrabold leading-tight text-white sm:text-xl">
            {game.title}
          </h2>
          <p className="mt-0.5 truncate text-xs font-medium text-gray-400">
            {game.studio}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-300">
              <Clock className="h-3.5 w-3.5 text-emerald-400" strokeWidth={2.2} />
              {formatPlayTime(game.hoursPlayed, game.playMinutes ?? 0, game.playSeconds ?? 0)} jogadas
            </span>
            {game.rating > 0 && (
              <span className="flex items-center gap-1.5">
                <Rating rating={game.rating} size="sm" />
              </span>
            )}
          </div>
        </div>

        {/* Pulse icon on the right (decorative) */}
        <div className="hidden shrink-0 items-center justify-center sm:flex">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-500/10">
            <PlayCircle className="h-6 w-6 text-emerald-400" strokeWidth={2.2} />
          </div>
        </div>
      </div>
    </div>
  );
}
