import { PlatformIcon, type PlatformKey } from '../lib/platformIcons';
import type { PlatformLink } from '../data/games';

// ============================================================================
//  PlatformLinks
//  ----------------------------------------------------------------------------
//  Badges das lojas (Steam, Xbox, PlayStation, Nintendo) exibidos no card.
//  As logos são SVGs embutidos no código — não dependem de URLs externas.
//  Ao clicar, abre a página da loja em nova aba.
//  Se o url estiver vazio (""), o badge aparece mas sem link (não clica).
// ============================================================================

interface PlatformLinksProps {
  platforms: PlatformLink[];
  variant?: 'row' | 'stacked';
}

export function PlatformLinks({ platforms, variant = 'row' }: PlatformLinksProps) {
  if (!platforms || platforms.length === 0) return null;

  const layoutClass =
    variant === 'stacked' ? 'flex-col gap-1.5' : 'flex-row flex-wrap gap-1.5';

  return (
    <div className={`flex ${layoutClass}`}>
      {platforms.map((p) => (
        <PlatformBadge key={p.name} platform={p} />
      ))}
    </div>
  );
}

function PlatformBadge({ platform }: { platform: PlatformLink }) {
  const iconKey = platform.icon as PlatformKey;
  const hasUrl = platform.url && platform.url.trim() !== '';

  const content = (
    <>
      <PlatformIcon platform={iconKey} className="h-full w-full object-contain transition-all duration-200" />
    </>
  );

  const baseClass =
    'group/plat inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border border-line bg-ink-700/70 p-1.5 text-gray-400 transition-all duration-200';

  if (!hasUrl) {
    return (
      <span
        className={`${baseClass} cursor-default opacity-50`}
        title={`${platform.name} (link pendente)`}
        aria-label={`${platform.name} (link pendente)`}
      >
        {content}
      </span>
    );
  }

  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`Ver na ${platform.name}`}
      aria-label={`Ver na ${platform.name}`}
      className={`${baseClass} hover:border-gray-500 hover:bg-ink-750 hover:text-white`}
    >
      {content}
    </a>
  );
}
