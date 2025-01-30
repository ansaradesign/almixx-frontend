/* eslint-disable sonarjs/cognitive-complexity */

'use client';

import { Ad } from '@albomoni/entities/ad-card/model/ad.type';
import { AdCard } from '@albomoni/entities/ad-card/ui/ad-card';
import { useEffect, useRef, useState } from 'react';
import { useIntersection } from 'react-use';
import { useQuery } from '@tanstack/react-query';
import { getLocation } from '@albomoni/shared/lib/utils/get-location';
import { Placeholder } from '@albomoni/shared/ui/placeholder';
import { PiCompass } from 'react-icons/pi';
import { AdsSkeleton } from './ads-skeleton';

type Props = {
  currencies: { [key: string]: number };
  isDisableCategory?: boolean;
  fetchFunc: ({ queryKey }: { queryKey: [string, number] }) => Promise<Ad[]>;
  setIsAds?: (isAds: boolean) => void;
  queryKey: string;
};

export const AdsInfiniteScroller = ({
  currencies,
  isDisableCategory,
  fetchFunc,
  setIsAds,
  queryKey,
}: Props) => {
  const [page, setPage] = useState(1);
  const [loadedPages, setLoadedPages] = useState(1);
  const [ads, setAds] = useState<Ad[]>([]);
  const [isEnded, setIsEnded] = useState(true);
  const intersectionRef = useRef(null);
  const location = getLocation();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [queryKey, page],
    queryFn: fetchFunc,
    refetchOnMount: true,
  });

  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '300px',
    threshold: 1,
  });

  useEffect(() => {
    if (page > loadedPages) {
      refetch();
    }
  }, [page]);

  useEffect(() => {
    if (data) {
      if (data.length < 12) {
        setIsEnded(true);
      } else {
        setIsEnded(false);
      }
      if (data.length === 0 && setIsAds) {
        setIsAds(false);
      } else if (page > 1) {
        setAds((prev) => [...prev, ...data]);
      } else {
        setAds(data);
      }
    }
    setLoadedPages(loadedPages + 1);
  }, [data]);

  useEffect(() => {
    if (intersection && intersection.intersectionRatio === 1) {
      setPage(page + 1);
    }
  }, [intersection]);

  return location.address !== 'Весь мир' ? (
    <>
      <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {ads.map((ad) => {
          return (
            <AdCard
              key={ad.ad.id}
              data={ad}
              currencies={currencies}
              isDisableCategory={isDisableCategory}
            />
          );
        })}
        {isLoading && <AdsSkeleton height={355} />}
      </div>

      {!isEnded && <div ref={intersectionRef} />}
    </>
  ) : (
    <Placeholder
      icon={<PiCompass size={60} className='mt-10' />}
      title='Не выбран регион'
      desc='Перейдите в выбор региона для уточнения зоны поиска объявлений'
    />
  );
};
