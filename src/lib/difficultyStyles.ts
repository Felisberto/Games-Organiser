import type { GameDifficulty } from '../data/games';

export const DIFFICULTY_INFO: Record<
  GameDifficulty,
  { label: string; short: string; chip: string; dot: string; hex: string; level: number }
> = {
  'muito-facil': {
    label: 'Muito Fácil',
    short: 'Mto Fácil',
    chip: 'bg-teal-500/15 border-teal-400/30 text-teal-300',
    dot: 'bg-teal-400',
    hex: '#2dd4bf',
    level: 1,
  },
  facil: {
    label: 'Fácil',
    short: 'Fácil',
    chip: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300',
    dot: 'bg-emerald-400',
    hex: '#34d399',
    level: 2,
  },
  medio: {
    label: 'Médio',
    short: 'Médio',
    chip: 'bg-amber-500/15 border-amber-400/30 text-amber-300',
    dot: 'bg-amber-400',
    hex: '#fbbf24',
    level: 3,
  },
  dificil: {
    label: 'Difícil',
    short: 'Difícil',
    chip: 'bg-orange-500/15 border-orange-400/30 text-orange-300',
    dot: 'bg-orange-400',
    hex: '#fb923c',
    level: 4,
  },
  'muito-dificil': {
    label: 'Muito Difícil',
    short: 'Mto Difícil',
    chip: 'bg-rose-500/15 border-rose-400/30 text-rose-300',
    dot: 'bg-rose-400',
    hex: '#fb7185',
    level: 5,
  },
  repetitivo: {
    label: 'Repetitivo',
    short: 'Repetitivo',
    chip: 'bg-fuchsia-500/15 border-fuchsia-400/30 text-fuchsia-300',
    dot: 'bg-fuchsia-400',
    hex: '#e879f9',
    level: 6,
  },
  grinding: {
    label: 'Grinding',
    short: 'Grinding',
    chip: 'bg-lime-500/15 border-lime-400/30 text-lime-300',
    dot: 'bg-lime-400',
    hex: '#a3e635',
    level: 7,
  },
  relaxante: {
    label: 'Relaxante',
    short: 'Relaxante',
    chip: 'bg-cyan-500/15 border-cyan-400/30 text-cyan-300',
    dot: 'bg-cyan-400',
    hex: '#22d3ee',
    level: 8,
  },
  estrategico: {
    label: 'Estratégico',
    short: 'Estratégico',
    chip: 'bg-indigo-500/15 border-indigo-400/30 text-indigo-300',
    dot: 'bg-indigo-400',
    hex: '#818cf8',
    level: 9,
  },
  caotico: {
    label: 'Caótico',
    short: 'Caótico',
    chip: 'bg-red-500/15 border-red-400/30 text-red-300',
    dot: 'bg-red-400',
    hex: '#f87171',
    level: 10,
  },
};

export const DIFFICULTY_ORDER: GameDifficulty[] = [
  'muito-facil',
  'facil',
  'medio',
  'dificil',
  'muito-dificil',
];
