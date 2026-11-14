import { useState } from 'react';
import { Building2 } from 'lucide-react';

interface StudioAvatarProps {
  logo: string;
  name: string;
  size?: number;
}

export function StudioAvatar({ logo, name, size = 44 }: StudioAvatarProps) {
  const [errored, setErrored] = useState(false);
  const showFallback = errored || logo === '';

  return (
    <div
      className="shrink-0 overflow-hidden rounded-xl border border-line bg-ink-700"
      style={{ width: size, height: size }}
    >
      {showFallback ? (
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          <Building2 className="h-5 w-5" strokeWidth={1.5} />
        </div>
      ) : (
        <img
          src={logo}
          alt={name}
          loading="lazy"
          onError={() => setErrored(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
