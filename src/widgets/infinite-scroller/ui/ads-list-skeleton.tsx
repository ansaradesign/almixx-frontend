import { AdsSkeleton } from './ads-skeleton';

export const AdsListSkeleton = () => {
  return (
    <div className='w-full h-min flex flex-col gap-6'>
      <h2 className='text-xl md:text-2xl font-bold'>Актуальные объявления</h2>
      <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        <AdsSkeleton height={355} />
      </div>
    </div>
  );
};
