import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  // Build page button list with ellipsis for many pages
  function getPageList(): (number | '...')[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | '...')[] = [1];
    const left = Math.max(2, page - 1);
    const right = Math.min(totalPages - 1, page + 1);
    if (left > 2) pages.push('...');
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push('...');
    pages.push(totalPages);
    return pages;
  }

  const pageList = getPageList();

  const btnBase =
    'flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-sm font-bold transition-all duration-200';

  return (
    <nav className="mt-6 flex flex-col items-center gap-4">
      {/* Page info */}
      <p className="text-xs font-semibold text-gray-500">
        <span className="tabular-nums text-gray-300">{startItem}</span>–
        <span className="tabular-nums text-gray-300">{endItem}</span> de{' '}
        <span className="tabular-nums text-gray-300">{totalItems}</span> jogos
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Página anterior"
          className={`${btnBase} border border-line bg-ink-700/60 text-gray-300 hover:border-accent/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-gray-300`}
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
        </button>

        {pageList.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="px-1 text-sm font-bold text-gray-600">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              aria-label={`Página ${p}`}
              aria-current={p === page ? 'page' : undefined}
              className={`${btnBase} ${
                p === page
                  ? 'border border-accent/50 bg-accent/20 text-accent-glow shadow-[0_0_20px_-6px_rgba(225,29,116,0.6)]'
                  : 'border border-line bg-ink-700/60 text-gray-300 hover:border-accent/40 hover:text-white'
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Próxima página"
          className={`${btnBase} border border-line bg-ink-700/60 text-gray-300 hover:border-accent/50 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-line disabled:hover:text-gray-300`}
        >
          <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
        </button>
      </div>
    </nav>
  );
}
