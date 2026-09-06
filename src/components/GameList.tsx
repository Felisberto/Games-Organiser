import type { Game } from '../data/games';
import { GameCard } from './GameCard';

interface GameListProps {
  games: Game[];
  page: number;
  pageSize: number;
}

export function GameList({ games, page, pageSize }: GameListProps) {
  if (games.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-ink-800/50 py-20 text-center">
        <p className="text-lg font-bold text-gray-400">Nenhum jogo encontrado</p>
        <p className="mt-1 text-sm text-gray-600">Tente limpar a busca ou trocar o status.</p>
      </div>
    );
  }

  const start = (page - 1) * pageSize;
  const visible = games.slice(start, start + pageSize);

  return (
    <div className="flex flex-col gap-4 sm:gap-5">
      {visible.map((g, i) => (
        <GameCard key={g.id} game={g} index={i} />
      ))}
    </div>
  );
}
