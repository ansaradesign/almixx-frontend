/* eslint-disable consistent-return */

'use client';

import { getCookie } from 'cookies-next';
import { useLocalStorage } from 'react-use';
import { markAsWatchedAd } from '../api/mark-as-watched-ad';

type Props = {
  adId: number;
};

export const WatchedAd = ({ adId }: Props) => {
  const token = getCookie('token');
  const [watchedAds, setWatchedAds] = useLocalStorage<number[]>('watched', []);

  const isWatchedAlready = watchedAds?.includes(adId);

  if (!isWatchedAlready) {
    setWatchedAds(Array.isArray(watchedAds) ? [...watchedAds, adId] : [adId]);

    const setWatched = async () => {
      if (token) {
        await markAsWatchedAd(adId, token);
      }
    };

    try {
      setWatched();
    } catch {
      return;
    }
  }

  return null;
};
