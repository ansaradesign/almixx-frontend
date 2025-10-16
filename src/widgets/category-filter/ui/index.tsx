'use client';

import { ShowFilteredAdsButton } from '@albomoni/features/(category)/show-filtered-ads';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@albomoni/shared/api/base';
import { Skeleton } from '@nextui-org/skeleton';
import { Filter, renderFilterState } from '../lib/render-filter-state';
import { Attribute } from './attribute';
import { FiltersContext } from '../lib/use-filters';
import { FiltersStateContext } from '../lib/use-filters-state';

type Props = {
  categoryId: string;
  searchParams: { [key: string]: string | string[] | undefined };
};

export const CategoryFilter = ({ categoryId, searchParams }: Props) => {
  const { data, isLoading, isPending } = useQuery<any>({
    queryKey: ['category-filter'],
    queryFn: () => apiClient.get('place-filters/'),
  });

  const [filterState, setFilterState] = useState<{
    [key: string]: Filter;
  } | null>(null);

  useEffect(() => {
    if (searchParams.filters) {
      const parsedData = JSON.parse(atob(searchParams.filters as string));
      setFilterState(parsedData);
    } else if (data) {
      setFilterState(renderFilterState(data[categoryId]));
    }
  }, [data]);

  if (isLoading || isPending)
    return (
      <>
        <div className='flex gap-4 flex-wrap'>
          <Skeleton className='w-36 h-10 rounded-xl !bg-default-300' />
          <Skeleton className='w-36 h-10 rounded-xl !bg-default-300' />
          <Skeleton className='w-36 h-10 rounded-xl !bg-default-300' />
          <Skeleton className='w-36 h-10 rounded-xl !bg-default-300' />
        </div>
        <div className='flex gap-4'>
          <Skeleton className='w-56 h-12 rounded-2xl !bg-default-300' />
        </div>
      </>
    );

  return (
    filterState && (
      <FiltersContext.Provider value={data[categoryId]}>
        <FiltersStateContext.Provider value={filterState}>
          <div className='flex gap-4 flex-wrap'>
            {Object.entries(filterState)
              .sort((a: any, b: any) => Math.sign(a[1].order - b[1].order))
              .map(([filterKey, filterParams]) => {
                const { type, variants, selected } = filterParams as Filter;
                return (
                  <Attribute
                    key={filterKey}
                    setFilterState={setFilterState}
                    filterKey={filterKey}
                    type={type}
                    variants={variants}
                    selected={selected}
                  />
                );
              })}
          </div>
          <div className='flex gap-4'>
            <ShowFilteredAdsButton selectedFilters={filterState} />
          </div>
        </FiltersStateContext.Provider>
      </FiltersContext.Provider>
    )
  );
};
