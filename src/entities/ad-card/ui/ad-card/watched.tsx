'use client';

import { usePathname } from 'next/navigation';
import { useLocalStorage } from 'react-use';

type Props = {
  adId: number;
};

export const AdWatchedMessage = ({ adId }: Props) => {
  const [watchedAds] = useLocalStorage<number[]>('watched', []);
  const isWatched = watchedAds?.includes(adId);
  const pathname = usePathname();
  const normalizedPath = pathname.slice(3) === '' ? '/' : pathname.slice(3);
  const isFavoriteRoute = normalizedPath === '/favorite';

  return isWatched && !isFavoriteRoute ? (
    <div className='absolute top-2 left-2 bg-default/70 z-20 backdrop-blur-xl text-sm font-medium rounded-xl px-2 py-1'>
      Просмотрено
    </div>
  ) : null;
};
