import type { Game, GameStatus, GameDifficulty } from '../data/games';
import { STATUS_ORDER, STATUS_INFO } from './statusStyles';
import { DIFFICULTY_ORDER, DIFFICULTY_INFO } from './difficultyStyles';

export type SortKey =
  | 'playDateDesc'
  | 'playDateAsc'
  | 'releaseDesc'
  | 'releaseAsc'
  | 'ratingDesc'
  | 'ratingAsc';

export { STATUS_ORDER, STATUS_INFO };

export function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short', day: 'numeric' });
}

/**
 * Converte horas + minutos + segundos em texto "Xh Ym Zs".
 * Ex: 142h 30m 15s, 4h 0m 0s, 0h 45m 30s
 */
export function formatPlayTime(hours: number, minutes = 0, seconds = 0): string {
  const h = Math.max(0, Math.floor(hours));
  const m = Math.max(0, Math.floor(minutes));
  const s = Math.max(0, Math.floor(seconds));
  return `${h}h ${m}m ${s}s`;
}

export const SUPREME_SCORE = 15; // "Perpétuo" — god-tier, jogaria de novo fácil
export const MAX_SCORE = 10;

export function isSupreme(rating: number): boolean {
  return rating >= SUPREME_SCORE;
}

export function isUnrated(rating: number): boolean {
  return rating <= 0;
}

export function collectGenres(games: Game[]): string[] {
  const set = new Set<string>();
  games.forEach((g) => g.genres.forEach((x) => set.add(x)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function filterAndSort(
  games: Game[],
  opts: { search: string; status: string; genre: string; sort: SortKey }
): Game[] {
  const q = opts.search.trim().toLowerCase();
  let out = games.filter((g) => {
    if (q && !g.title.toLowerCase().includes(q)) return false;
    if (opts.status !== 'all' && g.status !== opts.status) return false;
    if (opts.genre !== 'all' && !g.genres.includes(opts.genre)) return false;
    return true;
  });

  out = out.sort((a, b) => {
    // Games with no start date always float to the top, in file order
    const aHasDate = Boolean(a.startDate);
    const bHasDate = Boolean(b.startDate);
    if (!aHasDate && !bHasDate) return 0; // keep file order
    if (!aHasDate) return -1;
    if (!bHasDate) return 1;

    switch (opts.sort) {
      case 'playDateDesc': {
        // Most recently played first (by endDate, fallback to startDate)
        const aDate = a.endDate || a.startDate;
        const bDate = b.endDate || b.startDate;
        return bDate.localeCompare(aDate);
      }
      case 'playDateAsc': {
        // Oldest played first
        const aDate = a.endDate || a.startDate;
        const bDate = b.endDate || b.startDate;
        return aDate.localeCompare(bDate);
      }
      case 'releaseDesc':
        return b.releaseDate.localeCompare(a.releaseDate);
      case 'releaseAsc':
        return a.releaseDate.localeCompare(b.releaseDate);
      case 'ratingDesc':
        return b.rating - a.rating;
      case 'ratingAsc':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });
  return out;
}

export interface GameCounts {
  total: number;
  jogando: number;
  finalizado: number;
  visitado: number;
  estocado: number;
  adiado: number;
}

export function computeCounts(games: Game[]): GameCounts {
  const counts: GameCounts = {
    total: games.length,
    jogando: 0,
    finalizado: 0,
    visitado: 0,
    estocado: 0,
    adiado: 0,
  };
  for (const g of games) {
    counts[g.status] += 1;
  }
  return counts;
}

// ---------------------------------------------------------------------------
//  Estatísticas por ano
//  ----------------------------------------------------------------------------
//  Agrupa os jogos pelo ano em que você os jogou (campo endDate se finalizado,
//  startDate caso contrário). Para cada ano, conta quantos jogos por status e
//  soma as horas jogadas. Usado pelo painel de gráficos.
// ---------------------------------------------------------------------------

export interface YearStat {
  year: number;
  total: number;
  hours: number;
  byStatus: Record<GameStatus, { count: number; hours: number }>;
}

export function getGameYear(game: Game): number | null {
  const ref = game.endDate || game.startDate;
  if (!ref) return null;
  const y = Number(ref.slice(0, 4));
  return Number.isNaN(y) ? null : y;
}

export function computeYearlyStats(games: Game[]): YearStat[] {
  const map = new Map<number, YearStat>();

  for (const g of games) {
    const year = getGameYear(g);
    if (year === null) continue;

    let entry = map.get(year);
    if (!entry) {
      entry = {
        year,
        total: 0,
        hours: 0,
        byStatus: {
          jogando: { count: 0, hours: 0 },
          finalizado: { count: 0, hours: 0 },
          visitado: { count: 0, hours: 0 },
          estocado: { count: 0, hours: 0 },
          adiado: { count: 0, hours: 0 },
        },
      };
      map.set(year, entry);
    }

    entry.total += 1;
    entry.hours += g.hoursPlayed;
    entry.byStatus[g.status].count += 1;
    entry.byStatus[g.status].hours += g.hoursPlayed;
  }

  return Array.from(map.values()).sort((a, b) => a.year - b.year);
}

// ---------------------------------------------------------------------------
//  ESTATÍSTICAS DETALHADAS
//  ----------------------------------------------------------------------------
//  Funções auxiliares para os gráficos detalhados: quem mais recomendou,
//  empresas mais jogadas, gêneros mais jogados e distribuição de dificuldade.
// ---------------------------------------------------------------------------

export interface NameCount {
  name: string;
  count: number;
  hours: number;
}

export interface DifficultyStat {
  difficulty: GameDifficulty;
  count: number;
  games: Game[];
}

/** Conta recomendações por pessoa, excluindo "felis" (você mesmo). */
export function computeRecommenderStats(games: Game[]): NameCount[] {
  const map = new Map<string, NameCount>();
  for (const g of games) {
    const who = g.recomendadoPor?.trim();
    if (!who || who.toLowerCase() === 'felis') continue;
    let entry = map.get(who);
    if (!entry) {
      entry = { name: who, count: 0, hours: 0 };
      map.set(who, entry);
    }
    entry.count += 1;
    entry.hours += g.hoursPlayed;
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count || b.hours - a.hours);
}

/** Conta jogos e horas por desenvolvedora. */
export function computeStudioStats(games: Game[]): NameCount[] {
  const map = new Map<string, NameCount>();
  for (const g of games) {
    let entry = map.get(g.studio);
    if (!entry) {
      entry = { name: g.studio, count: 0, hours: 0 };
      map.set(g.studio, entry);
    }
    entry.count += 1;
    entry.hours += g.hoursPlayed;
  }
  return Array.from(map.values()).sort((a, b) => b.hours - a.hours || b.count - a.count);
}

/** Conta jogos e horas por gênero. */
export function computeGenreStats(games: Game[]): NameCount[] {
  const map = new Map<string, NameCount>();
  for (const g of games) {
    for (const genre of g.genres) {
      let entry = map.get(genre);
      if (!entry) {
        entry = { name: genre, count: 0, hours: 0 };
        map.set(genre, entry);
      }
      entry.count += 1;
      entry.hours += g.hoursPlayed;
    }
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count || b.hours - a.hours);
}

/** Agrupa jogos por dificuldade. */
export function computeDifficultyStats(games: Game[]): DifficultyStat[] {
  const result: DifficultyStat[] = DIFFICULTY_ORDER.map((d) => ({
    difficulty: d,
    count: 0,
    games: [],
  }));
  for (const g of games) {
    if (!g.difficulty) continue;
    const idx = result.findIndex((r) => r.difficulty === g.difficulty);
    if (idx >= 0) {
      result[idx].count += 1;
      result[idx].games.push(g);
    }
  }
  return result;
}

/** Retorna os jogos mais difíceis (ordenados por dificuldade decrescente). */
export function getHardestGames(games: Game[], limit = 5): Game[] {
  return games
    .filter((g) => g.difficulty)
    .sort((a, b) => {
      const la = a.difficulty ? DIFFICULTY_INFO[a.difficulty].level : 0;
      const lb = b.difficulty ? DIFFICULTY_INFO[b.difficulty].level : 0;
      return lb - la;
    })
    .slice(0, limit);
}

/** Retorna os jogos mais fáceis (ordenados por dificuldade crescente). */
export function getEasiestGames(games: Game[], limit = 5): Game[] {
  return games
    .filter((g) => g.difficulty)
    .sort((a, b) => {
      const la = a.difficulty ? DIFFICULTY_INFO[a.difficulty].level : 0;
      const lb = b.difficulty ? DIFFICULTY_INFO[b.difficulty].level : 0;
      return la - lb;
    })
    .slice(0, limit);
}

/** Retorna o jogo mais longo (mais horas jogadas). */
export function getLongestGames(games: Game[], limit = 5): Game[] {
  return games
    .filter((g) => g.hoursPlayed > 0)
    .sort((a, b) => b.hoursPlayed - a.hoursPlayed)
    .slice(0, limit);
}

/** Retorna o jogo mais curto (menos horas jogadas, maior que 0). */
export function getShortestGames(games: Game[], limit = 5): Game[] {
  return games
    .filter((g) => g.hoursPlayed > 0)
    .sort((a, b) => a.hoursPlayed - b.hoursPlayed)
    .slice(0, limit);
}

/** Retorna o Top 10 manual (ordenado por topRank crescente). */
export function getTopGames(games: Game[], limit = 10): Game[] {
  return games
    .filter((g) => g.topRank && g.topRank > 0)
    .sort((a, b) => (a.topRank ?? 0) - (b.topRank ?? 0))
    .slice(0, limit);
}
