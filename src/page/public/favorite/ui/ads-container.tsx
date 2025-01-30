'use client';

import { Ad } from '@albomoni/entities/ad-card/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { AdsInfiniteScroller } from '@albomoni/widgets/infinite-scroller';
import { useEffect, useState } from 'react';
import { useFavorites } from '@albomoni/features/add-to-favorites/lib/use-favorites';
import { NoFavorites } from './no-favorites';

export const AdsContainer = ({
  favoritesArray,
  currencies,
}: {
  favoritesArray: number[];
  currencies: { [key: string]: number };
}) => {
  const [isAds, setIsAds] = useState(true);
  const { favorites } = useFavorites();

  const fetchAds =
    (favoritesIds: number[]) =>
      async ({ queryKey }: { queryKey: [string, number] }) => {
        const [_key, page] = queryKey;
        try {
          return await apiClient.post<Ad[]>(`favorite/${page}`, {
            favorites: favoritesIds,
          });
        } catch (error) {
          throw new Error('Error fetching ads');
        }
      };

  useEffect(() => {
    setIsAds(true);
  }, [favorites]);

  return isAds ? (
    <AdsInfiniteScroller
      currencies={currencies}
      fetchFunc={fetchAds(favorites)}
      setIsAds={setIsAds}
      queryKey='favorite-scroll'
    />
  ) : (
    <NoFavorites />
  );
};
