import { getCurrenciesAsync } from '@albomoni/entities/ad-card/api/get-currencies';
import { MyAd } from '@albomoni/entities/ad-card/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { Placeholder } from '@albomoni/shared/ui/placeholder';
import { MyAdsInfiniteScroller } from '@albomoni/widgets/infinite-scroller';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { PiMagnifyingGlass } from 'react-icons/pi';

type Props = {
  lng: string;
};

export const MyAdsModeratingPage = async ({ lng }: Props) => {
  const token = getCookie('token', { cookies });
  const currencies = await getCurrenciesAsync();

  const myAds = await apiClient.get<MyAd[]>(
    'my-ads/moderating/1',
    {},
    { Authorization: `Bearer ${token}` },
  );

  return myAds.length > 0 ? (
    <MyAdsInfiniteScroller
      initialData={myAds}
      currencies={currencies}
      status='moderating'
    />
  ) : (
    <Placeholder
      icon={<PiMagnifyingGlass size={60} className='opacity-50 mt-6' />}
      title='Ничего не найдено'
      desc='Попробуйте создать и запустить новое объявление'
    />
  );
};
