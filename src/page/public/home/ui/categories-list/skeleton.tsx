import { Skeleton } from '@nextui-org/skeleton';

export const CategoriesListSkeleton = () => {
  const skeletons = Array(7).fill(null);

  return (
    <div className='w-full flex flex-col max-w-7xl gap-8'>
      <h2 className='text-xl md:text-2xl font-bold px-4'>Категории</h2>
      <div className='grid grid-flow-col grid-rows-2 sm:flex sm:flex-row gap-4 py-1 px-4 overflow-y-hidden'>
        {skeletons.map(() => (
          <Skeleton
            key={Math.random()}
            className='w-36 h-48 rounded-2xl flex-shrink-0'
          />
        ))}
      </div>
    </div>
  );
};
