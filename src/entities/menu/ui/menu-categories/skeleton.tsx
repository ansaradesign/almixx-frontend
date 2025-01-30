import { Skeleton } from '@nextui-org/skeleton';

export const MenuCategoriesSkeleton = () => {
  return (
    <div className='w-full flex flex-col gap-8 py-4 tablet:py-0'>
      <h4 className='text-xl font-bold flex tablet:hidden'>Все категории</h4>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
        <Skeleton className='w-full h-48 rounded-2xl' />
        <Skeleton className='w-full h-48 rounded-2xl' />
        <Skeleton className='w-full h-48 rounded-2xl' />
        <Skeleton className='w-full h-48 rounded-2xl' />
        <Skeleton className='w-full h-48 rounded-2xl' />
        <Skeleton className='w-full h-48 rounded-2xl' />
        <Skeleton className='w-full h-48 rounded-2xl' />
        <Skeleton className='w-full h-48 rounded-2xl' />
        <Skeleton className='w-full h-48 rounded-2xl' />
      </div>
    </div>
  );
};
