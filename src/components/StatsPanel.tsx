import { useMemo, useState } from 'react';
import { BarChart3, Clock, Gamepad2, CalendarRange, TrendingUp, PieChart } from 'lucide-react';
import type { Game } from '../data/games';
import { computeYearlyStats, getGameYear, type YearStat } from '../lib/gameUtils';
import { STATUS_INFO, STATUS_ORDER } from '../lib/statusStyles';

const CHART_STATUSES = STATUS_ORDER.filter((s) => s !== 'jogando');
import { StatsCharts } from './StatsCharts';

interface StatsPanelProps {
  games: Game[];
}

type ViewMode = 'count' | 'hours';
type YearFilter = number | 'all';
type Tab = 'timeline' | 'detailed';

const CURRENT_YEAR = new Date().getFullYear();

export function StatsPanel({ games }: StatsPanelProps) {
  const stats = useMemo(() => computeYearlyStats(games), [games]);
  const [mode, setMode] = useState<ViewMode>('count');
  const [tab, setTab] = useState<Tab>('timeline');

  const years = useMemo(
    () => stats.map((s) => s.year).sort((a, b) => a - b),
    [stats]
  );

  // Default to current year if it has data, otherwise "all"
  const [yearFilter, setYearFilter] = useState<YearFilter>(
    years.includes(CURRENT_YEAR) ? CURRENT_YEAR : 'all'
  );

  if (stats.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-ink-800/70 p-6 text-center backdrop-blur-sm">
        <BarChart3 className="mx-auto mb-2 h-8 w-8 text-gray-600" />
        <p className="text-sm font-semibold text-gray-500">
          Adicione datas nos jogos para ver as estatísticas por ano.
        </p>
      </div>
    );
  }

  const totalGames = stats.reduce((sum, s) => sum + s.total, 0);
  const totalHours = stats.reduce((sum, s) => sum + s.hours, 0);
  const yearData = yearFilter !== 'all' ? stats.find((s) => s.year === yearFilter) ?? null : null;

  const detailedGames = useMemo(() => {
    if (yearFilter === 'all') return games;
    return games.filter((g) => getGameYear(g) === yearFilter);
  }, [games, yearFilter]);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-ink-800/70 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-line p-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10">
          <BarChart3 className="h-5 w-5 text-accent-glow" strokeWidth={2.2} />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-white">Estatísticas</h2>
          <p className="text-xs font-medium text-gray-500">
            {totalGames} jogos • {totalHours.toLocaleString('pt-BR')} horas registradas
          </p>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-2 border-b border-line px-5 py-3">
        <button
          onClick={() => setTab('timeline')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
            tab === 'timeline'
              ? 'bg-accent/20 text-accent-glow'
              : 'text-gray-400 hover:bg-ink-700 hover:text-white'
          }`}
        >
          <CalendarRange className="h-3.5 w-3.5" /> Por Ano
        </button>
        <button
          onClick={() => setTab('detailed')}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
            tab === 'detailed'
              ? 'bg-accent/20 text-accent-glow'
              : 'text-gray-400 hover:bg-ink-700 hover:text-white'
          }`}
        >
          <PieChart className="h-3.5 w-3.5" /> Detalhado
        </button>
      </div>

      {tab === 'detailed' ? (
        <div className="p-5">
          {/* Year selector for detailed view */}
          <div className="mb-4 flex items-center gap-2 overflow-x-auto border-b border-line/60 pb-3">
            <CalendarRange className="h-4 w-4 shrink-0 text-gray-500" strokeWidth={2} />
            <button
              onClick={() => setYearFilter('all')}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                yearFilter === 'all'
                  ? 'bg-accent/20 text-accent-glow'
                  : 'text-gray-400 hover:bg-ink-700 hover:text-white'
              }`}
            >
              Todos os Anos
            </button>
            {years.map((y) => (
              <button
                key={y}
                onClick={() => setYearFilter(y)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  yearFilter === y
                    ? 'bg-accent/20 text-accent-glow'
                    : 'text-gray-400 hover:bg-ink-700 hover:text-white'
                }`}
              >
                {y}
              </button>
            ))}
          </div>
          <StatsCharts games={detailedGames} />
        </div>
      ) : (
        <>
      {/* Year selector + mode toggle */}
      <div className="flex flex-col gap-3 border-b border-line px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto">
          <CalendarRange className="h-4 w-4 shrink-0 text-gray-500" strokeWidth={2} />
          <button
            onClick={() => setYearFilter('all')}
            className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              yearFilter === 'all'
                ? 'bg-accent/20 text-accent-glow'
                : 'text-gray-400 hover:bg-ink-700 hover:text-white'
            }`}
          >
            Todos os Anos
          </button>
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setYearFilter(y)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                yearFilter === y
                  ? 'bg-accent/20 text-accent-glow'
                  : 'text-gray-400 hover:bg-ink-700 hover:text-white'
              }`}
            >
              {y}
            </button>
          ))}
        </div>

        {/* Toggle count/hours */}
        <div className="flex shrink-0 rounded-xl border border-line bg-ink-700/60 p-0.5">
          <button
            onClick={() => setMode('count')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              mode === 'count' ? 'bg-accent/20 text-accent-glow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Gamepad2 className="h-3.5 w-3.5" /> Jogos
          </button>
          <button
            onClick={() => setMode('hours')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
              mode === 'hours' ? 'bg-accent/20 text-accent-glow' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Clock className="h-3.5 w-3.5" /> Horas
          </button>
        </div>
      </div>

      {/* Chart body */}
      <div className="p-5">
        {yearData ? (
          <SingleYearChart data={yearData} mode={mode} />
        ) : (
          <AllYearsChart stats={stats} mode={mode} />
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line/60 px-5 py-4">
        {STATUS_ORDER.map((s) => (
          <div key={s} className="flex items-center gap-1.5">
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: STATUS_INFO[s].hex }}
            />
            <span className="text-xs font-semibold text-gray-400">{STATUS_INFO[s].label}</span>
          </div>
        ))}
      </div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
//  Single-year view: horizontal bars per status
// ---------------------------------------------------------------------------

function SingleYearChart({ data, mode }: { data: YearStat; mode: ViewMode }) {
  const values = CHART_STATUSES.map((s) =>
    mode === 'count' ? data.byStatus[s].count : data.byStatus[s].hours
  );
  const maxValue = Math.max(...values, 1);
  const hasData = values.some((v) => v > 0);

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <TrendingUp className="mb-2 h-8 w-8 text-gray-600" />
        <p className="text-sm font-semibold text-gray-500">
          Ainda não há jogos registrados em {data.year}.
        </p>
        <p className="mt-0.5 text-xs text-gray-600">
          Experimente selecionar outro ano ou visualizar tudo de uma vez.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="mb-1 flex items-baseline gap-2">
        <span className="text-2xl font-extrabold text-white">{data.year}</span>
        <span className="text-xs font-medium text-gray-500">
          {data.total} jogo{data.total === 1 ? '' : 's'} • {data.hours.toLocaleString('pt-BR')} hrs
        </span>
      </div>
      {CHART_STATUSES.map((s) => {
        const val = mode === 'count' ? data.byStatus[s].count : data.byStatus[s].hours;
        const info = STATUS_INFO[s];
        const widthPct = (val / maxValue) * 100;

        return (
          <div key={s} className="flex items-center gap-3">
            <div className="flex w-24 shrink-0 items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: info.hex }} />
              <span className="text-xs font-semibold text-gray-400">{info.label}</span>
            </div>
            <div className="relative h-7 flex-1 overflow-hidden rounded-lg bg-ink-700/50">
              <div
                className="flex h-full items-center justify-end rounded-lg px-2 transition-all duration-500"
                style={{
                  width: `${Math.max(widthPct, val > 0 ? 8 : 0)}%`,
                  backgroundColor: info.hex,
                  opacity: 0.85,
                }}
              >
                {val > 0 && (
                  <span className="text-[11px] font-bold text-black/70">
                    {mode === 'hours' ? val.toLocaleString('pt-BR') : val}
                  </span>
                )}
              </div>
            </div>
            <span className="w-16 shrink-0 text-right text-sm font-bold tabular-nums text-white">
              {val > 0 ? (mode === 'hours' ? val.toLocaleString('pt-BR') : val) : '—'}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
//  All-years view: stacked vertical bar chart (existing design)
// ---------------------------------------------------------------------------

function AllYearsChart({ stats, mode }: { stats: YearStat[]; mode: ViewMode }) {
  const maxValue = Math.max(...stats.map((s) => (mode === 'count' ? s.total : s.hours)), 1);

  return (
    <div className="flex flex-col gap-3">
      <div className="mb-1 flex items-baseline gap-2">
        <span className="text-2xl font-extrabold text-white">Visão Geral</span>
        <span className="text-xs font-medium text-gray-500">todos os anos</span>
      </div>
      <div className="flex items-end gap-2 sm:gap-3" style={{ height: '200px' }}>
        {stats.map((s) => {
          const total = mode === 'count' ? s.total : s.hours;
          const heightPct = (total / maxValue) * 100;

          return (
            <div
              key={s.year}
              className="group flex flex-1 flex-col items-center justify-end gap-2 self-stretch"
              style={{ height: '100%' }}
            >
              <span className="text-xs font-bold tabular-nums text-gray-500 group-hover:text-gray-300">
                {mode === 'hours' ? total.toLocaleString('pt-BR') : total}
              </span>

              <div
                className="flex w-full max-w-[60px] flex-col-reverse overflow-hidden rounded-t-lg transition-all duration-300 group-hover:opacity-90"
                style={{ height: `${Math.max(heightPct, 3)}%` }}
              >
                {CHART_STATUSES.map((status) => {
                  const val = mode === 'count'
                    ? s.byStatus[status].count
                    : s.byStatus[status].hours;
                  if (val === 0) return null;
                  const segPct = total > 0 ? (val / total) * 100 : 0;
                  return (
                    <div
                      key={status}
                      className="w-full transition-all duration-300"
                      style={{
                        height: `${segPct}%`,
                        backgroundColor: STATUS_INFO[status].hex,
                      }}
                      title={`${STATUS_INFO[status].label}: ${val}${mode === 'hours' ? ' hrs' : ''}`}
                    />
                  );
                })}
              </div>

              <span className="text-xs font-bold text-gray-500 group-hover:text-gray-300">
                {s.year}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
