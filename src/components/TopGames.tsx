import { Trophy, ExternalLink, ShoppingBag, Star } from 'lucide-react';
import type { Game } from '../data/games';
import { getTopGames } from '../lib/gameUtils';

interface TopGamesProps {
  games: Game[];
}

export function TopGames({ games }: TopGamesProps) {
  const topGames = getTopGames(games, 10);

  if (topGames.length === 0) return null;

  return (
    <section className="mt-6 sm:mt-7">
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-amber-400/30 bg-amber-400/10 shadow-[0_0_24px_-8px_rgba(251,191,36,0.5)]">
          <Trophy className="h-5 w-5 text-amber-300" strokeWidth={2.2} />
        </div>
        <div>
          <h2 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
            Top 10 Pessoal
          </h2>
          <p className="text-xs font-medium text-gray-500">
            Minha seleção pessoal, independente da nota.
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-ink-800/70 backdrop-blur-sm">
        {/* Header row (desktop only) */}
        <div className="hidden grid-cols-[40px_56px_1fr_100px_120px] items-center gap-3 border-b border-line px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-gray-600 sm:grid">
          <span>#</span>
          <span></span>
          <span>Jogo</span>
          <span>Nota</span>
          <span className="text-right">Comprar</span>
        </div>

        {topGames.map((game, idx) => (
          <TopGameRow key={game.title} game={game} rank={game.topRank ?? idx + 1} />
        ))}
      </div>
    </section>
  );
}

function TopGameRow({ game, rank }: { game: Game; rank: number }) {
  const medalColor =
    rank === 1
      ? 'text-amber-300'
      : rank === 2
        ? 'text-gray-300'
        : rank === 3
          ? 'text-orange-400'
          : 'text-gray-600';

  return (
    <div className="flex items-center gap-3 border-b border-line/60 px-4 py-2.5 transition-colors last:border-0 hover:bg-ink-700/40 sm:grid sm:grid-cols-[40px_56px_1fr_100px_120px] sm:px-4">
      {/* Rank */}
      <div className="flex w-6 shrink-0 items-center sm:w-auto">
        <span className={`text-base font-extrabold tabular-nums ${medalColor} sm:text-lg`}>
          {rank <= 3 ? (
            <span className="flex items-center gap-0.5">
              {rank === 1 && <Trophy className="h-3.5 w-3.5 text-amber-300" strokeWidth={2.5} />}
              {rank === 2 && <Trophy className="h-3.5 w-3.5 text-gray-300" strokeWidth={2.5} />}
              {rank === 3 && <Trophy className="h-3.5 w-3.5 text-orange-400" strokeWidth={2.5} />}
              {rank}
            </span>
          ) : (
            rank
          )}
        </span>
      </div>

      {/* Cover */}
      <img
        src={game.cover}
        alt={game.title}
        loading="lazy"
        className="h-14 w-10 shrink-0 rounded-md object-cover sm:h-16 sm:w-11"
      />

      {/* Title + studio */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-extrabold text-white">{game.title}</p>
        <p className="truncate text-xs font-medium text-gray-500">{game.studio}</p>
      </div>

      {/* Rating */}
      <div className="flex shrink-0 items-center gap-1 sm:justify-start">
        {game.rating === 15 ? (
          <span className="inline-flex items-center gap-1 rounded-md border border-amber-400/40 bg-amber-400/15 px-1.5 py-0.5 text-[11px] font-extrabold text-amber-300">
            <Star className="h-3 w-3 fill-amber-300" strokeWidth={0} /> Perpétuo
          </span>
        ) : game.rating > 0 ? (
          <span className="inline-flex items-center gap-1 text-sm font-extrabold tabular-nums text-gray-200">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" strokeWidth={0} />
            {game.rating.toFixed(1)}
          </span>
        ) : (
          <span className="text-xs font-medium text-gray-600">sem avaliação</span>
        )}
      </div>

      {/* Buy links */}
      <div className="flex shrink-0 flex-wrap items-center gap-1 sm:justify-end">
        {game.platforms.length > 0 ? (
          game.platforms.map((p) => (
            <a
              key={p.name}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-line bg-ink-700/60 px-2 py-1 text-[11px] font-bold text-gray-300 transition-all hover:border-accent/40 hover:bg-accent/10 hover:text-white"
            >
              <ShoppingBag className="h-3 w-3 text-gray-500" strokeWidth={2.5} />
              {p.name}
              <ExternalLink className="h-2.5 w-2.5 text-gray-600" strokeWidth={2.5} />
            </a>
          ))
        ) : (
          <span className="text-xs font-medium text-gray-600">—</span>
        )}
      </div>
    </div>
  );
}
