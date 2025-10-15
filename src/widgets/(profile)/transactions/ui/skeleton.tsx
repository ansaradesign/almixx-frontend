import { Skeleton } from '@nextui-org/skeleton';

export const TransactionsSkeleton = () => {
  return (
    <div className='flex flex-col gap-7 w-full max-w-7xl mt-5 md:mt-9'>
      <Skeleton className='w-64 h-6 md:h-8 rounded-lg md:rounded-xl' />
      <Skeleton className='w-full max-w-lg h-[52px] rounded-xl' />
      <Skeleton className='w-full max-w-lg h-[52px] rounded-xl' />
      <Skeleton className='w-full max-w-lg h-[52px] rounded-xl' />
    </div>
  );
};
