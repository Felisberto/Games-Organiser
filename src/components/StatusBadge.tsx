import { PlayCircle, CheckCircle2, Eye, Archive, Clock3 } from 'lucide-react';
import type { GameStatus } from '../data/games';
import { STATUS_INFO } from '../lib/statusStyles';

const ICONS: Record<GameStatus, typeof PlayCircle> = {
  jogando: PlayCircle,
  finalizado: CheckCircle2,
  visitado: Eye,
  estocado: Archive,
  adiado: Clock3,
};

interface StatusBadgeProps {
  status: GameStatus;
  variant?: 'overlay' | 'chip';
}

export function StatusBadge({ status, variant = 'overlay' }: StatusBadgeProps) {
  const info = STATUS_INFO[status];
  const Icon = ICONS[status];

  if (variant === 'chip') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${info.chip}`}
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={2.5} />
        {info.label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md ${info.chip}`}
    >
      <Icon className="h-3 w-3" strokeWidth={2.5} />
      {info.label}
    </span>
  );
}
