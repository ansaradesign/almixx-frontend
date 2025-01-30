import { getCurrenciesAsync } from '@albomoni/entities/ad-card/api/get-currencies';
import dynamic from 'next/dynamic';

const DynamicAdsContainer = dynamic(
  () => import('./ads-container').then((mod) => mod.AdsContainer),
  { ssr: false },
);

export const HomeAdsList = async ({ lng }: { lng: string }) => {
  const currencies = await getCurrenciesAsync();

  return (
    <div className='w-full h-min flex flex-col gap-6'>
      <h2 className='text-xl md:text-2xl font-bold'>Актуальные объявления</h2>
      <DynamicAdsContainer currencies={currencies} />
    </div>
  );
};
