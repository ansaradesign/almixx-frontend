'use client';

import { Ad } from '@albomoni/entities/ad-card/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { AdsInfiniteScroller } from '@albomoni/widgets/infinite-scroller';
import { useState } from 'react';
import { NoFavorites } from './no-favorites';

export const AdsContainer = ({
  favoritesArray,
  currencies,
}: {
  favoritesArray: number[];
  currencies: { [key: string]: number };
}) => {
  const [isAds, setIsAds] = useState(true);
  const fetchAds = async ({ queryKey }: { queryKey: [string, number] }) => {
    const [_key, page] = queryKey;
    try {
      return await apiClient.post<Ad[]>(`favorite/${page}`, {
        favorites: favoritesArray,
      });
    } catch (error) {
      throw new Error('Error fetching ads');
    }
  };
  return isAds ? (
    <AdsInfiniteScroller
      queryKey='fav'
      currencies={currencies}
      fetchFunc={fetchAds}
      setIsAds={setIsAds}
    />
  ) : (
    <NoFavorites />
  );
};
