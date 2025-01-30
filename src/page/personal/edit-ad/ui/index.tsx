import { getAdAsync } from '@albomoni/entities/ad-card/api/get-ad';
import { getAdTitle } from '@albomoni/entities/ad-card/lib/get-ad-title';
import { EditAdForm } from '@albomoni/features/(ad)/place-ad';
import { placeFormAsync } from '@albomoni/features/(ad)/place-ad/api/place-form/place-form';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

type Props = {
  lng: string;
  adId: string;
};

export const EditAdPage = async ({ lng, adId }: Props) => {
  cookies();
  const adData = await getAdAsync(adId);
  const { category, title, additional } = adData.ad;
  const token = getCookie('token', { cookies });

  const formData = await placeFormAsync({
    filters: category,
    token: token as string,
  });

  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-7 w-full max-w-7xl px-4 mb-40'>
        <h2 className='text-2xl md:text-3xl font-bold mt-5 md:mt-10 w-full'>
          Редактирование объявления
        </h2>
        <p className='text-lg font-medium opacity-50 -mt-4 mb-10'>
          {getAdTitle(lng, title, additional, category)}
        </p>
        <EditAdForm formData={formData} ad={adData} />
      </div>
    </main>
  );
};
