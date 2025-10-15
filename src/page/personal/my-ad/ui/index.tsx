import { WatchedAd } from '@albomoni/entities/ad-card';
import { AdInfo } from '@albomoni/widgets/(ad)/ad-info';
import { AdGallery } from '@albomoni/widgets/(ad)/ad-gallery/ui';
import { getAdAsync } from '@albomoni/entities/ad-card/api/get-ad';
import { MyAdActions } from './actions';

type Props = {
  lng: string;
  adId: string;
};

export const MyAdPage = async ({ lng, adId }: Props) => {
  const data = await getAdAsync(adId);

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <WatchedAd adId={Number(adId)} />
      <div className='w-full flex flex-col lg:flex-row gap-8 max-w-7xl lg:px-4 lg:pt-2 pb-40'>
        <AdGallery data={data} lng={lng} />
        <MyAdActions data={data} lng={lng} />

        <div className='flex lg:hidden px-4'>
          <AdInfo data={data} lng={lng} />
        </div>
      </div>
    </div>
  );
};
