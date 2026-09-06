import { useState } from 'react';
import { ImageIcon } from 'lucide-react';

interface GameCoverProps {
  src: string;
  alt: string;
  className?: string;
}

export function GameCover({ src, alt, className = '' }: GameCoverProps) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-ink-700 ${className}`}
    >
      {errored ? (
        <div className="flex h-full w-full items-center justify-center text-line">
          <ImageIcon className="h-8 w-8" strokeWidth={1.5} />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setErrored(true)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      )}
      {/* top vignette only — seats badges without obscuring cover art */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent" />
    </div>
  );
}
