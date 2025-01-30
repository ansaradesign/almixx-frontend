import { Skeleton } from '@nextui-org/skeleton';

export const PlaceAdSkeleton = () => {
  return (
    <div className='flex md:grid md:grid-cols-2 gap-3 md:gap-6 flex-wrap pb-20'>
      <Skeleton className='w-full rounded-2xl py-8 justify-between' />
      <Skeleton className='w-full rounded-2xl py-8 justify-between' />
      <Skeleton className='w-full rounded-2xl py-8 justify-between' />
      <Skeleton className='w-full rounded-2xl py-8 justify-between' />
      <Skeleton className='w-full rounded-2xl py-8 justify-between' />
      <Skeleton className='w-full rounded-2xl py-8 justify-between' />
      <Skeleton className='w-full rounded-2xl py-8 justify-between' />
      <Skeleton className='w-full rounded-2xl py-8 justify-between' />
      <Skeleton className='w-full rounded-2xl py-8 justify-between' />
    </div>
  );
};
