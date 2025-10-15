import { Skeleton } from '@nextui-org/skeleton';

export default function LoadingAd() {
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='w-full flex flex-col lg:flex-row gap-8 max-w-7xl lg:px-4 lg:pt-2 pb-40'>
        <div className='w-full flex flex-col gap-6 flex-shrink'>
          <div className='w-full overflow-clip lg:rounded-xl flex-shrink'>
            <Skeleton className='w-full h-96 sm:h-[32rem] md:h-[38rem] lg:rounded-xl flex-shrink' />
          </div>

          <div className='px-4 lg:px-0 w-full'>
            <Skeleton className='w-full md:w-96 h-9 rounded-xl' />
          </div>
        </div>

        <div className='flex flex-col px-4 lg:px-0'>
          <div className='w-full lg:w-80 lg:sticky top-8 h-min flex flex-col gap-8 flex-shrink-0'>
            <div className='flex flex-col gap-4'>
              <Skeleton className='w-full h-12 rounded-2xl' />
              <Skeleton className='w-full h-12 rounded-2xl' />
            </div>

            <div className='flex flex-col gap-1'>
              <Skeleton className='w-16 h-5 rounded-lg' />
              <Skeleton className='w-64 h-8 rounded-lg' />
            </div>

            <div className='flex flex-col gap-3'>
              <Skeleton className='w-16 h-5 rounded-lg' />
              <Skeleton className='w-full h-20 rounded-2xl' />
            </div>

            <div className='flex flex-col gap-1'>
              <Skeleton className='w-16 h-5 rounded-lg' />
              <Skeleton className='w-64 h-8 rounded-lg' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
