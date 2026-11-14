import type { Studio } from '../data/studios';
import { StudioAvatar } from './StudioAvatar';

interface StudioCreditProps {
  name: string;
  studio: Studio | undefined;
}

export function StudioCredit({ name, studio }: StudioCreditProps) {
  if (!studio) {
    return <span className="text-sm font-bold text-gray-200">{name}</span>;
  }

  const content = (
    <>
      <StudioAvatar logo={studio.logo} name={studio.name} size={36} />
      <span className="truncate text-sm font-bold text-gray-200 transition-colors group-hover/studio:text-white">
        {name}
      </span>
    </>
  );

  if (!studio.url) {
    return <span className="inline-flex min-w-0 items-center gap-2.5">{content}</span>;
  }

  return (
    <a
      href={studio.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/studio inline-flex min-w-0 items-center gap-2.5 rounded-lg transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
    >
      {content}
    </a>
  );
}
