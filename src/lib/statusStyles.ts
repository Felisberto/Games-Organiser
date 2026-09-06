import type { GameStatus } from '../data/games';

// ============================================================================
//  CONFIGURAÇÃO DE STATUS
//  ----------------------------------------------------------------------------
//  Centraliza o visual e os rótulos dos 5 status. Para trocar o nome exibido
//  de um status, basta editar o objeto STATUS_INFO abaixo.
// ============================================================================

export const STATUS_INFO: Record<
  GameStatus,
  { label: string; short: string; color: string; chip: string; icon: string; hex: string }
> = {
  jogando: {
    label: 'Jogando',
    short: 'Jogando',
    color: 'text-emerald-300',
    chip: 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300',
    icon: 'emerald',
    hex: '#34d399',
  },
  finalizado: {
    label: 'Finalizado',
    short: 'Finalizado',
    color: 'text-sky-300',
    chip: 'bg-sky-500/15 border-sky-400/30 text-sky-300',
    icon: 'sky',
    hex: '#38bdf8',
  },
  visitado: {
    label: 'Visitado',
    short: 'Visitado',
    color: 'text-violet-300',
    chip: 'bg-violet-500/15 border-violet-400/30 text-violet-300',
    icon: 'violet',
    hex: '#a78bfa',
  },
  estocado: {
    label: 'Estocado',
    short: 'Estocado',
    color: 'text-amber-300',
    chip: 'bg-amber-500/15 border-amber-400/30 text-amber-300',
    icon: 'amber',
    hex: '#fbbf24',
  },
  adiado: {
    label: 'Adiado',
    short: 'Adiado',
    color: 'text-rose-300',
    chip: 'bg-rose-500/15 border-rose-400/30 text-rose-300',
    icon: 'rose',
    hex: '#fb7185',
  },
};

export const STATUS_ORDER: GameStatus[] = ['jogando', 'finalizado', 'visitado', 'estocado', 'adiado'];

export const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos os Status' },
  ...STATUS_ORDER.map((s) => ({ value: s, label: STATUS_INFO[s].label })),
];
