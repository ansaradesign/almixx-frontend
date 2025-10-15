'use client';

import { getLocation } from '@albomoni/shared/lib/utils/get-location';
import { AdsInfiniteScroller } from '@albomoni/widgets/infinite-scroller';
import { useEffect, useState } from 'react';
import { useCurrencies } from '@albomoni/shared/lib/providers/currencies-provider';
import { useRouter } from 'next/navigation';
import { HomeAdsPlaceholder } from '../../home/ui/ads-list/placeholder';
import { getSearchResults } from '../api/get-search-results';

export const SearchList = ({ query }: { query: string }) => {
  const [isAds, setIsAds] = useState(true);
  const { push } = useRouter();

  const location = getLocation();
  const currencies = useCurrencies();

  useEffect(() => {
    if (query) {
      setIsAds(true);
    }
    if (query.length < 3) {
      push('/');
    }
  }, [query]);

  return isAds ? (
    <AdsInfiniteScroller
      setIsAds={setIsAds}
      currencies={currencies}
      fetchFunc={getSearchResults(query)}
      queryKey={`search_${query}_${location.lon}`}
    />
  ) : (
    <HomeAdsPlaceholder />
  );
};
