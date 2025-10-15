import { cookies } from 'next/headers';
import { WatchedAd } from '@albomoni/entities/ad-card';
import { AdInfo } from '@albomoni/widgets/(ad)/ad-info';
import { AdGallery } from '@albomoni/widgets/(ad)/ad-gallery/ui';
import { getAdAsync } from '../api/get-ad';
import { AdActions } from './actions';

type Props = {
  lng: string;
  adId: string;
};

export const AdPage = async ({ lng, adId }: Props) => {
  cookies();
  const data = await getAdAsync(adId);

  console.log(data)

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <WatchedAd adId={Number(adId)} />
      <div className='w-full flex flex-col lg:flex-row gap-8 max-w-7xl lg:px-4 lg:pt-2 pb-40'>
        <AdGallery data={data} lng={lng} />
        <AdActions data={data} lng={lng} />

        <div className='flex lg:hidden px-4'>
          <AdInfo data={data} lng={lng} />
        </div>
      </div>
    </div>
  );
};
