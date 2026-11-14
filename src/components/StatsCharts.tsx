import { useMemo } from 'react';
import { Users, Building2, Gamepad2, Gauge, Clock } from 'lucide-react';
import type { Game } from '../data/games';
import {
  computeRecommenderStats,
  computeStudioStats,
  computeGenreStats,
  computeDifficultyStats,
  getLongestGames,
  getShortestGames,
  formatPlayTime,
  type NameCount,
} from '../lib/gameUtils';
import { DIFFICULTY_INFO } from '../lib/difficultyStyles';

interface StatsChartsProps {
  games: Game[];
}

export function StatsCharts({ games }: StatsChartsProps) {
  const recommenders = useMemo(() => computeRecommenderStats(games), [games]);
  const studios = useMemo(() => computeStudioStats(games).slice(0, 10), [games]);
  const genres = useMemo(() => computeGenreStats(games).slice(0, 10), [games]);
  const difficulty = useMemo(() => computeDifficultyStats(games), [games]);
  const longest = useMemo(() => getLongestGames(games, 5), [games]);
  const shortest = useMemo(() => getShortestGames(games, 5), [games]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Quem mais recomendou */}
      <ChartCard
        icon={<Users className="h-4 w-4 text-sky-400" strokeWidth={2.2} />}
        title="Quem Mais Recomendou"
        subtitle="pessoas que indicaram jogos (sem contar você)"
      >
        {recommenders.length === 0 ? (
          <EmptyState text="Nenhuma recomendação externa ainda." />
        ) : (
          <RankingList items={recommenders} colorHex="#38bdf8" />
        )}
      </ChartCard>

      {/* Empresas mais jogadas */}
      <ChartCard
        icon={<Building2 className="h-4 w-4 text-violet-400" strokeWidth={2.2} />}
        title="Empresas Mais Jogadas"
        subtitle="quantidade de jogos por desenvolvedora"
      >
        {studios.length === 0 ? (
          <EmptyState text="Nenhum jogo registrado." />
        ) : (
          <RankingList items={studios} colorHex="#a78bfa" />
        )}
      </ChartCard>

      {/* Gêneros mais jogados */}
      <ChartCard
        icon={<Gamepad2 className="h-4 w-4 text-emerald-400" strokeWidth={2.2} />}
        title="Gêneros Mais Jogados"
        subtitle="quantidade de jogos por estilo"
      >
        {genres.length === 0 ? (
          <EmptyState text="Nenhum gênero registrado." />
        ) : (
          <RankingList items={genres} colorHex="#34d399" />
        )}
      </ChartCard>

      {/* Distribuição de dificuldade */}
      <ChartCard
        icon={<Gauge className="h-4 w-4 text-amber-400" strokeWidth={2.2} />}
        title="Distribuição de Dificuldade"
        subtitle="quantos jogos em cada nível"
      >
        <DifficultyBarChart stats={difficulty} />
      </ChartCard>

      {/* Jogo mais longo */}
      <ChartCard
        icon={<Clock className="h-4 w-4 text-rose-400" strokeWidth={2.2} />}
        title="Jogos Mais Longos"
        subtitle="top 5 com mais horas jogadas"
      >
        {longest.length === 0 ? (
          <EmptyState text="Nenhuma hora registrada." />
        ) : (
          <HoursGameList games={longest} />
        )}
      </ChartCard>

      {/* Jogo mais curto */}
      <ChartCard
        icon={<Clock className="h-4 w-4 text-teal-400" strokeWidth={2.2} />}
        title="Jogos Mais Curtos"
        subtitle="top 5 com menos horas jogadas"
      >
        {shortest.length === 0 ? (
          <EmptyState text="Nenhuma hora registrada." />
        ) : (
          <HoursGameList games={shortest} />
        )}
      </ChartCard>
    </div>
  );
}

// ---------------------------------------------------------------------------
//  Sub-components
// ---------------------------------------------------------------------------

function ChartCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-ink-800/70 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink-700/60">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-white">{title}</h3>
          <p className="text-[11px] font-medium text-gray-500">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <p className="py-6 text-center text-xs font-semibold text-gray-600">{text}</p>;
}

function RankingList({
  items,
  colorHex,
}: {
  items: NameCount[];
  colorHex: string;
}) {
  const maxCount = Math.max(...items.map((i) => i.count), 1);

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, idx) => {
        const widthPct = (item.count / maxCount) * 100;
        return (
          <div key={item.name} className="group flex items-center gap-2.5">
            <span className="w-4 shrink-0 text-right text-xs font-bold tabular-nums text-gray-600">
              {idx + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 flex items-baseline justify-between gap-2">
                <span className="truncate text-xs font-bold text-gray-200">{item.name}</span>
                <span className="shrink-0 text-xs font-bold tabular-nums text-white">
                  {item.count}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-ink-700/50">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.max(widthPct, 4)}%`,
                    backgroundColor: colorHex,
                    opacity: 0.8,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DifficultyBarChart({
  stats,
}: {
  stats: { difficulty: Game['difficulty'] & {}; count: number; games: Game[] }[];
}) {
  const maxCount = Math.max(...stats.map((s) => s.count), 1);
  const total = stats.reduce((sum, s) => sum + s.count, 0);

  if (total === 0) {
    return <EmptyState text="Nenhuma dificuldade registrada." />;
  }

  return (
    <div className="flex flex-col gap-2">
      {stats.map((s) => {
        const info = DIFFICULTY_INFO[s.difficulty];
        const widthPct = (s.count / maxCount) * 100;
        return (
          <div key={s.difficulty} className="flex items-center gap-2">
            <div className="flex w-20 shrink-0 items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-sm"
                style={{ backgroundColor: info.hex }}
              />
              <span className="text-[11px] font-semibold text-gray-400">{info.short}</span>
            </div>
            <div className="relative h-5 flex-1 overflow-hidden rounded-md bg-ink-700/50">
              <div
                className="flex h-full items-center justify-end rounded-md px-1.5 transition-all duration-500"
                style={{
                  width: `${Math.max(widthPct, s.count > 0 ? 10 : 0)}%`,
                  backgroundColor: info.hex,
                  opacity: 0.85,
                }}
              >
                {s.count > 0 && (
                  <span className="text-[10px] font-bold text-black/70">{s.count}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function HoursGameList({ games }: { games: Game[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {games.map((g, idx) => (
        <div
          key={g.title}
          className="flex items-center gap-2.5 rounded-lg border border-line/60 bg-ink-700/30 px-2.5 py-1.5 transition-colors hover:border-line"
        >
          <span className="w-4 shrink-0 text-right text-xs font-bold tabular-nums text-gray-600">
            {idx + 1}
          </span>
          <span className="min-w-0 flex-1 truncate text-xs font-bold text-gray-200">
            {g.title}
          </span>
          <span className="shrink-0 text-xs font-bold tabular-nums text-gray-300">
            {formatPlayTime(g.hoursPlayed, g.playMinutes ?? 0, g.playSeconds ?? 0)}
          </span>
        </div>
      ))}
    </div>
  );
}
