import { useState } from 'react';
import { Search, ChevronDown, SlidersHorizontal, X, ChevronUp } from 'lucide-react';
import type { SortKey } from '../lib/gameUtils';
import { STATUS_OPTIONS } from '../lib/statusStyles';

interface FilterBarProps {
  search: string;
  status: string;
  genre: string;
  sort: SortKey;
  genres: string[];
  resultCount: number;
  onSearch: (v: string) => void;
  onStatus: (v: string) => void;
  onGenre: (v: string) => void;
  onSort: (v: SortKey) => void;
  onReset: () => void;
}

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'playDateDesc', label: 'Jogado (mais recente)' },
  { value: 'playDateAsc', label: 'Jogado (mais antigo)' },
  { value: 'releaseDesc', label: 'Lançamento (mais recente)' },
  { value: 'releaseAsc', label: 'Lançamento (mais antigo)' },
  { value: 'ratingDesc', label: 'Nota (15/10 primeiro)' },
  { value: 'ratingAsc', label: 'Nota (mais baixa)' },
];

export function FilterBar(props: FilterBarProps) {
  const [open, setOpen] = useState(false);
  const {
    search, status, genre, sort, genres, resultCount,
    onSearch, onStatus, onGenre, onSort, onReset,
  } = props;

  const hasFilters =
    search.trim() !== '' || status !== 'all' || genre !== 'all' || sort !== 'releaseDesc';

  const selectClass =
    'appearance-none w-full rounded-xl border border-line bg-ink-700/80 px-3.5 py-2.5 text-sm font-semibold text-gray-200 transition-colors hover:border-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40 cursor-pointer';

  return (
    <div className="sticky top-0 z-30 -mx-4 border-b border-line/60 bg-ink-850/90 px-4 py-3 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border">
      {/* Discreet toggle row — always visible */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setOpen((v) => !v)}
          className="group flex items-center gap-2 text-sm font-bold text-gray-300 transition-colors hover:text-white"
        >
          <SlidersHorizontal className="h-4 w-4 text-gray-500 group-hover:text-accent" strokeWidth={2.2} />
          Filtros
          {hasFilters && (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent/20 px-1.5 text-[10px] font-bold text-accent-glow">
              Ativos
            </span>
          )}
          {open ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </button>

        <div className="flex items-center gap-3">
          <p className="text-xs font-semibold text-gray-500">
            <span className="tabular-nums text-gray-300">{resultCount}</span> jogo{resultCount === 1 ? '' : 's'}
          </p>
          {hasFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs font-semibold text-accent transition-colors hover:text-accent-glow"
            >
              <X className="h-3.5 w-3.5" /> Limpar
            </button>
          )}
        </div>
      </div>

      {/* Collapsible content */}
      {open && (
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" strokeWidth={2} />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Buscar por título…"
              className="w-full rounded-xl border border-line bg-ink-700/80 py-2.5 pl-9 pr-9 text-sm font-medium text-white placeholder-gray-500 transition-colors hover:border-gray-600 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/40"
            />
            {search && (
              <button
                onClick={() => onSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-gray-500 transition-colors hover:text-white"
                aria-label="Limpar busca"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Dropdowns */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex">
            <div className="relative">
              <select className={selectClass} value={status} onChange={(e) => onStatus(e.target.value)}>
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>

            <div className="relative">
              <select className={selectClass} value={genre} onChange={(e) => onGenre(e.target.value)}>
                <option value="all">Todos os Gêneros</option>
                {genres.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>

            <div className="relative col-span-2 sm:col-span-1">
              <select className={selectClass} value={sort} onChange={(e) => onSort(e.target.value as SortKey)}>
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
