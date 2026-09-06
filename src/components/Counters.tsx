import { Library, PlayCircle, CheckCircle2, Eye, Archive, Clock3 } from 'lucide-react';
import type { GameCounts } from '../lib/gameUtils';
import { STATUS_INFO, STATUS_ORDER } from '../lib/statusStyles';

const ICONS = {
  jogando: PlayCircle,
  finalizado: CheckCircle2,
  visitado: Eye,
  estocado: Archive,
  adiado: Clock3,
} as const;

const DOT_CLASSES: Record<string, string> = {
  jogando: 'bg-emerald-400',
  finalizado: 'bg-sky-400',
  visitado: 'bg-violet-400',
  estocado: 'bg-amber-400',
  adiado: 'bg-rose-400',
};

interface CountersProps {
  counts: GameCounts;
}

export function Counters({ counts }: CountersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
      {/* Total */}
      <Pill
        icon={<Library className="h-4 w-4 text-white" strokeWidth={2.2} />}
        label="Coleção"
        value={counts.total}
      />

      <div className="h-5 w-px bg-line" />

      {STATUS_ORDER.map((s) => {
        const info = STATUS_INFO[s];
        const Icon = ICONS[s];
        return (
          <Pill
            key={s}
            icon={<Icon className={`h-4 w-4 ${info.color}`} strokeWidth={2.2} />}
            dot={<span className={`h-2 w-2 rounded-full ${DOT_CLASSES[s]}`} />}
            label={info.label}
            value={counts[s]}
          />
        );
      })}
    </div>
  );
}

interface PillProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  dot?: React.ReactNode;
}

function Pill({ icon, label, value, dot }: PillProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-line bg-ink-800/70 px-3 py-1.5 backdrop-blur-sm transition-colors duration-200 hover:border-gray-600">
      {icon}
      {dot}
      <span className="text-base font-extrabold tabular-nums text-white sm:text-lg">
        {value.toLocaleString('pt-BR')}
      </span>
      <span className="hidden text-[11px] font-semibold uppercase tracking-wider text-gray-500 sm:inline">
        {label}
      </span>
    </div>
  );
}
