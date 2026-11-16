import { CalendarClock } from 'lucide-react';
import type { Game } from '../data/games';
import { GameCover } from './GameCover';

interface UpcomingShelfProps {
  games: Game[];
}

export function UpcomingShelf({ games }: UpcomingShelfProps) {
  if (games.length === 0) return null;

  return (
    <section className="relative overflow-hidden rounded-2xl border border-cyan-400/20 bg-ink-800/80 p-4 shadow-[0_0_40px_-14px_rgba(34,211,238,0.35)] sm:p-5">
      <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

      <header className="relative mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/15">
            <CalendarClock className="h-5 w-5 text-cyan-300" strokeWidth={2.2} />
          </div>
          <h2 className="text-lg font-extrabold leading-tight text-white">Próximos jogos</h2>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
          {games.length} {games.length === 1 ? 'jogo' : 'jogos'}
        </span>
      </header>

      <div className="no-scrollbar relative -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1">
        {games.map((game) => (
          <article
            key={game.id}
            title={game.title}
            className="group flex w-28 shrink-0 snap-start flex-col rounded-xl border border-line/60 bg-ink-900/60 p-1.5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_10px_30px_-12px_rgba(34,211,238,0.5)] sm:w-32"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-line/50 shadow-md">
              <GameCover src={game.cover} alt={game.title} />
            </div>
            <h3 className="mt-2 truncate px-0.5 pb-0.5 text-xs font-semibold text-gray-200 transition-colors group-hover:text-cyan-300">
              {game.title}
            </h3>
          </article>
        ))}
      </div>
    </section>
  );
}
