import { useMemo, useState } from 'react';
import { Gamepad2, Palette } from 'lucide-react';
import { GAMES } from './data/games';
import {
  collectGenres,
  computeCounts,
  filterAndSort,
  type SortKey,
} from './lib/gameUtils';
import { Counters } from './components/Counters';
import { FilterBar } from './components/FilterBar';
import { CurrentGameBanner } from './components/CurrentGameBanner';
import { GameList } from './components/GameList';
import { Pagination } from './components/Pagination';
import { StatsPanel } from './components/StatsPanel';
import { TopGames } from './components/TopGames';

const PAGE_SIZE = 8;

function App() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [genre, setGenre] = useState('all');
  const [sort, setSort] = useState<SortKey>('playDateDesc');
  const [page, setPage] = useState(1);

  const genres = useMemo(() => collectGenres(GAMES), []);
  const counts = useMemo(() => computeCounts(GAMES), []);
  const currentGame = useMemo(
    () => GAMES.find((g) => g.status === 'jogando') ?? null,
    []
  );

  const filtered = useMemo(
    () => filterAndSort(GAMES, { search, status, genre, sort }),
    [search, status, genre, sort]
  );

  function reset() {
    setSearch('');
    setStatus('all');
    setGenre('all');
    setSort('playDateDesc');
    setPage(1);
  }

  function wrap<T>(fn: (v: T) => void) {
    return (v: T) => {
      fn(v);
      setPage(1);
    };
  }

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const safePage = Math.min(page, Math.max(totalPages, 1));

  return (
    <div className="min-h-screen text-gray-100">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        {/* ---------- Header ---------- */}
        <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 shadow-[0_0_30px_-8px_rgba(225,29,116,0.6)]">
              <Gamepad2 className="h-6 w-6 text-accent-glow" strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold leading-none tracking-tight text-white sm:text-3xl">
                Backlog
              </h1>
            </div>
          </div>
        </header>

        {/* ---------- Counters ---------- */}
        <Counters counts={counts} />

        {/* ---------- Current game ---------- */}
        <div className="mt-5 sm:mt-6">
          <CurrentGameBanner game={currentGame} />
        </div>

        {/* ---------- Filters ---------- */}
        <div className="mt-6 sm:mt-7">
          <FilterBar
            search={search}
            status={status}
            genre={genre}
            sort={sort}
            genres={genres}
            resultCount={filtered.length}
            onSearch={wrap(setSearch)}
            onStatus={wrap(setStatus)}
            onGenre={wrap(setGenre)}
            onSort={wrap(setSort)}
            onReset={reset}
          />
        </div>

        {/* ---------- Game list ---------- */}
        <main className="mt-6 sm:mt-7">
          <GameList
            games={filtered}
            page={safePage}
            pageSize={PAGE_SIZE}
          />
          <Pagination
            page={safePage}
            totalPages={totalPages}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </main>

        {/* ---------- Top 10 ---------- */}
        <TopGames games={GAMES} />

        {/* ---------- Stats ---------- */}
        <div className="mt-8 sm:mt-10">
          <StatsPanel games={GAMES} />
        </div>

        {/* ---------- Art gallery link ---------- */}
        <a
          href="https://martes.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex w-full max-w-72 items-center gap-3 rounded-2xl border border-accent/40 bg-ink-800/90 px-4 py-3 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8),0_0_25px_-10px_rgba(225,29,116,0.5)] backdrop-blur-md transition-all hover:border-accent/60 hover:bg-ink-700/90 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.8),0_0_35px_-8px_rgba(225,29,116,0.7)] hover:-translate-y-0.5"
          title="Galeria de Artes"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/15 shadow-[0_0_20px_-8px_rgba(225,29,116,0.6)]">
            <Palette className="h-5 w-5 text-accent-glow" strokeWidth={2.2} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold leading-tight text-white">Artes</span>
            <span className="text-[11px] font-medium leading-tight text-gray-500">Galeria</span>
          </div>
        </a>

      </div>
    </div>
  );
}

export default App;
