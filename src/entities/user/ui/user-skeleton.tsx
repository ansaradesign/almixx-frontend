import { Skeleton } from '@nextui-org/skeleton';

export const UserProfileSkeleton = () => {
  return (
    <div className='w-full flex flex-row gap-2 md:gap-4'>
      <div className='w-20 h-20 lg:w-28 lg:h-28 flex-shrink-0 p-2'>
        <Skeleton className='w-full h-full rounded-full' />
      </div>
      <div className='w-full flex flex-col justify-center gap-2'>
        <Skeleton className='w-20 h-6 rounded-lg' />
        <Skeleton className='w-36 h-6 rounded-lg' />
      </div>
    </div>
  );
};
