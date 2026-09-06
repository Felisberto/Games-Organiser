import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface StudioAvatarProps {
  src: string;
  name: string;
  size?: number;
}

export function StudioAvatar({ src, name, size = 44 }: StudioAvatarProps) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      className="shrink-0 overflow-hidden rounded-xl border border-line bg-ink-700"
      style={{ width: size, height: size }}
    >
      {errored ? (
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          <Building2 className="h-5 w-5" strokeWidth={1.5} />
        </div>
      ) : (
        <img
          src={src}
          alt={name}
          loading="lazy"
          onError={() => setErrored(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
