'use client';

import { MyAd } from '@albomoni/entities/ad-card/model/ad.type';
import { MyAdCard } from '@albomoni/entities/ad-card/ui/my-ad-card';
import { apiClient } from '@albomoni/shared/api/base';
import { useLangContext } from '@albomoni/shared/lib/providers';
import { getCookie } from 'cookies-next';
import { useEffect, useRef, useState } from 'react';
import { useIntersection } from 'react-use';
import { AdsSkeleton } from './ads-skeleton';

type Props = {
  initialData: MyAd[];
  currencies: { [key: string]: number };
  status: string;
};

export const MyAdsInfiniteScroller = ({
  initialData,
  currencies,
  status,
}: Props) => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(1);
  const [loadedPages, setLoadedPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isEnded, setIsEnded] = useState(initialData.length < 12);
  const token = getCookie('token');
  const lng = useLangContext();
  const intersectionRef = useRef(null);

  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '300px',
    threshold: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const newAds = await apiClient.get<MyAd[]>(
        `my-ads/${status}/${page}`,
        {},
        { Authorization: `Bearer ${token}` },
      );

      if (newAds.length === 0) {
        setIsEnded(true);
      }

      setData([...data, ...newAds]);
      setIsLoading(false);
    };

    if (page > loadedPages) {
      try {
        fetchData();
        setLoadedPages(loadedPages + 1);
      } catch {
        setIsLoading(false);
      }
    }
  }, [page]);

  useEffect(() => {
    if (intersection && intersection.intersectionRatio === 1) {
      setPage(page + 1);
    }
  }, [intersection]);

  return (
    <>
      <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {data.map((ad) => {
          return (
            <MyAdCard
              key={ad.id}
              ad={ad}
              lng={lng as string}
              currencies={currencies}
            />
          );
        })}

        {isLoading && <AdsSkeleton />}
      </div>

      {!isEnded && <div ref={intersectionRef} />}
    </>
  );
};
