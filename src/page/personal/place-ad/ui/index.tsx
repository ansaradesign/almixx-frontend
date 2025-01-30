import { PlaceAd, PlaceAdSkeleton } from '@albomoni/features/(ad)/place-ad';
import { GetPlaceCategoriesQueries } from '@albomoni/features/(ad)/place-ad/api';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

export const PlaceAdPage = async () => {
  const queryClient = new QueryClient();
  const cookie = cookies();
  const token = cookie.get('token');
  await queryClient.prefetchQuery(
    GetPlaceCategoriesQueries(token?.value as string),
  );

  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-10 w-full max-w-7xl px-4 mb-40'>
        <h2 className='text-2xl md:text-3xl font-bold mt-5 md:mt-10 w-full'>
          Новое объявление
        </h2>
        <Suspense fallback={<PlaceAdSkeleton />}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <PlaceAd />
          </HydrationBoundary>
        </Suspense>
      </div>
    </main>
  );
};
