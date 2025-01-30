'use client';

import { AdsInfiniteScroller } from '@albomoni/widgets/infinite-scroller';
import { useEffect, useState } from 'react';
import { useLocation } from '@albomoni/shared/lib/providers/location-provider';
import { fetchAds } from '../../api/get-ads/fetch-ads';
import { HomeAdsPlaceholder } from './placeholder';

export const AdsContainer = ({
  currencies,
}: {
  currencies: { [key: string]: number };
}) => {
  const [isAds, setIsAds] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsAds(true);
  }, [location]);

  return isAds ? (
    <AdsInfiniteScroller
      setIsAds={setIsAds}
      currencies={currencies}
      fetchFunc={fetchAds(location)}
      queryKey={`home-scroll_${location.address}_${location.lon}`}
    />
  ) : (
    <HomeAdsPlaceholder />
  );
};
