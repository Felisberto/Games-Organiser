import { Calendar, Clock, Flag, Gamepad2, User, FlaskConical } from 'lucide-react';
import type { Game } from '../data/games';
import { formatDate, formatPlayTime } from '../lib/gameUtils';
import { GameCover } from './GameCover';
import { StudioAvatar } from './StudioAvatar';
import { StatusBadge } from './StatusBadge';
import { Rating } from './Rating';
import { PlatformLinks } from './PlatformLinks';
import { DifficultyBadge } from './DifficultyBadge';

interface GameCardProps {
  game: Game;
  index: number;
}

export function GameCard({ game, index }: GameCardProps) {
  // Only "jogando" shows Em Andamento. "adiado"/"estocado"/"visitado" show
  // their natural end state (Pausado / Não começou / Sem data final).
  const isActive = game.status === 'jogando';
  const notStarted = !game.startDate;

  function renderEndState() {
    if (isActive && !game.endDate) {
      return (
        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-300">
          Jogando agora
        </span>
      );
    }
    if (game.status === 'adiado') {
      return (
        <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-rose-300">
          Em pausa
        </span>
      );
    }
    if (game.status === 'estocado' && notStarted) {
      return (
        <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-300">
          Ainda não comecei
        </span>
      );
    }
    if (game.endDate) {
      return <span className="font-semibold text-gray-300">{formatDate(game.endDate)}</span>;
    }
    return <span className="text-gray-600">—</span>;
  }

  return (
    <article
      className="group animate-floatIn relative flex flex-row overflow-hidden rounded-2xl border border-line bg-ink-800/80 backdrop-blur-sm transition-all duration-300 hover:border-gray-600 hover:shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8)]"
      style={{ animationDelay: `${Math.min(index, 12) * 45}ms` }}
    >
      {/* hover sheen sweep */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-y-0 -left-1/3 w-1/3 animate-sheen bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      {/* ---------- LEFT: box art (SteamGridDB 600x900 = 2:3 portrait) ---------- */}
      <div className="relative w-[112px] shrink-0 overflow-hidden border-r border-line sm:w-[176px]">
        <GameCover src={game.cover} alt={game.title} />
        {game.isDemo && (
          <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-amber-950/90 to-transparent px-2 py-1.5">
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-300">Demo</span>
          </div>
        )}
      </div>

      {/* ---------- RIGHT: content ---------- */}
      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        {/* TOP: title (left) + time played (top-right) */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl">
                {game.title}
              </h2>
              {game.isDemo && (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-amber-400/40 bg-amber-400/15 px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                  <FlaskConical className="h-3 w-3" strokeWidth={2.5} />
                  Demo
                </span>
              )}
            </div>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-gray-400">
              <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">Lançamento</span>
              {formatDate(game.releaseDate)}
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-1.5 text-right">
            <div className="flex items-center justify-end gap-1.5 text-gray-300">
              <Clock className="h-4 w-4 text-gray-500" strokeWidth={2} />
              <span className="text-sm font-semibold tabular-nums">
                {formatPlayTime(game.hoursPlayed, game.playMinutes ?? 0, game.playSeconds ?? 0)}
              </span>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">
              Tempo de Jogo
            </p>
            <StatusBadge status={game.status} />
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-4 h-px w-full bg-gradient-to-r from-line via-line/60 to-transparent" />

        {/* MIDDLE: studio */}
        <div className="flex items-center gap-3">
          <StudioAvatar src={game.studioAvatar} name={game.studio} size={40} />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-600">
              Desenvolvido por
            </p>
            <p className="truncate text-sm font-bold text-gray-200">{game.studio}</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            {game.genres.slice(0, 6).map((g) => (
              <span
                key={g}
                className="inline-flex items-center gap-1 rounded-md border border-line bg-ink-700/60 px-2 py-0.5 text-[11px] font-semibold text-gray-400"
              >
                <Gamepad2 className="h-3 w-3 text-gray-500" strokeWidth={2} />
                {g}
              </span>
            ))}
            {game.difficulty && (
              <DifficultyBadge difficulty={game.difficulty} />
            )}
          </div>
        </div>

        {/* RECOMMENDED BY */}
        {game.recomendadoPor && game.recomendadoPor.trim() !== '' && (
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 ${
                game.recomendadoPor.toLowerCase() === 'felis'
                  ? 'border-amber-400/40 bg-amber-400/10'
                  : 'border-sky-400/30 bg-sky-400/10'
              }`}
            >
              <User
                className={`h-3.5 w-3.5 ${game.recomendadoPor.toLowerCase() === 'felis' ? 'text-amber-300' : 'text-sky-300'}`}
                strokeWidth={2.5}
              />
              <span className="text-xs font-semibold text-gray-400">Indicado por</span>
              <span
                className={`text-sm font-extrabold ${
                  game.recomendadoPor.toLowerCase() === 'felis' ? 'text-amber-200' : 'text-sky-200'
                }`}
              >
                {game.recomendadoPor}
              </span>
            </span>
          </div>
        )}

        {/* PLAYED ON: consoles */}
        {game.playedOn.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-gray-500">
              <Gamepad2 className="h-3 w-3 text-gray-600" strokeWidth={2.5} /> Joguei no:
            </span>
            {game.playedOn.map((console) => (
              <span
                key={console}
                className="inline-flex items-center rounded-md border border-accent/20 bg-accent/5 px-2 py-0.5 text-[11px] font-bold text-gray-300 transition-colors hover:border-accent/40 hover:text-white"
              >
                {console}
              </span>
            ))}
          </div>
        )}

        {/* BOTTOM: sessions (left) + rating & platforms (right) */}
        <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-600">
              <Flag className="h-3 w-3" strokeWidth={2.5} /> Período jogado
            </p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
              <span className="font-semibold text-gray-300">
                {game.startDate ? formatDate(game.startDate) : 'Ainda não comecei'}
              </span>
              <span className="text-gray-600">→</span>
              {renderEndState()}
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 sm:items-end">
            <div className="text-left sm:text-right">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-600">
                Minha Avaliação
              </p>
              <Rating rating={game.rating} />
            </div>
            {game.platforms.length > 0 && (
              <PlatformLinks platforms={game.platforms} variant="row" />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
