'use client';

import { Ad } from '@albomoni/entities/ad-card/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { getLocation } from '@albomoni/shared/lib/utils/get-location';
import { Placeholder } from '@albomoni/shared/ui/placeholder';
import { AdsInfiniteScroller } from '@albomoni/widgets/infinite-scroller';
import { useState } from 'react';
import { PiMagnifyingGlass } from 'react-icons/pi';

export const AdsContainer = ({
  currencies,
  categoryId,
  normalizedFilters,
}: {
  currencies: { [key: string]: number };
  categoryId: string;
  normalizedFilters: any[] | null;
}) => {
  const [isAds, setIsAds] = useState(true);
  const address = getLocation();

  const fetchAds = async ({ queryKey }: { queryKey: [string, number] }) => {
    const [_key, page] = queryKey;

    try {
      return await apiClient.post<Ad[]>(`ads/${page}`, {
        filters: [categoryId, ...(normalizedFilters || [])],
        address,
      });
    } catch (error) {
      throw new Error('Error fetching ads');
    }
  };

  return isAds ? (
    <div className='w-full h-min flex flex-col gap-6'>
      <h2 className='text-xl md:text-2xl font-bold'>Актуальные объявления</h2>
      <AdsInfiniteScroller
        currencies={currencies}
        fetchFunc={fetchAds}
        setIsAds={setIsAds}
        queryKey={`category-${categoryId}-${normalizedFilters}-scroll`}
      />
    </div>
  ) : (
    <Placeholder
      icon={<PiMagnifyingGlass size={64} className='opacity-50 mt-10' />}
      title='Объявления не найдены'
      desc='Попробуйте выбрать другие фильтры.'
    />
  );
};
