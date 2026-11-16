import { Timer } from 'lucide-react';

interface HowLongToBeatBoxProps {
  hours: number;
}

export function HowLongToBeatBox({ hours }: HowLongToBeatBoxProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-line bg-ink-900/60 px-2.5 py-1.5">
      <Timer className="h-3.5 w-3.5 text-cyan-300" strokeWidth={2.5} />
      <span className="text-[9px] font-extrabold uppercase tracking-widest text-gray-500">
        HowLongToBeat
      </span>
      <span className="text-sm font-extrabold tabular-nums text-cyan-300">{hours}h</span>
    </div>
  );
}
