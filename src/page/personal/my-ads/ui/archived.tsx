import { getCurrenciesAsync } from '@albomoni/entities/ad-card/api/get-currencies';
import { MyAd } from '@albomoni/entities/ad-card/model/ad.type';
import { apiClient } from '@albomoni/shared/api/base';
import { Placeholder } from '@albomoni/shared/ui/placeholder';
import { MyAdsInfiniteScroller } from '@albomoni/widgets/infinite-scroller';
import { Chip } from '@nextui-org/chip';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { PiEyeSlashBold, PiMagnifyingGlass } from 'react-icons/pi';

type Props = {
  lng: string;
};

export const MyAdsArchivedPage = async ({ lng }: Props) => {
  const token = getCookie('token', { cookies });
  const currencies = await getCurrenciesAsync();

  const myAds = await apiClient.get<MyAd[]>(
    'my-ads/archived/1',
    {},
    { Authorization: `Bearer ${token}` },
  );

  console.log(myAds)

  return myAds.length > 0 ? (
    <>
      <div className='w-full flex gap-2'>
        <Chip
          classNames={{ base: 'gap-1 px-2 py-1 -my-2' }}
          startContent={<PiEyeSlashBold size={20} />}
        >
          Архивные объявления видны только Вам
        </Chip>
      </div>
      <MyAdsInfiniteScroller
        initialData={myAds}
        currencies={currencies}
        status='archived'
      />
    </>
  ) : (
    <Placeholder
      icon={<PiMagnifyingGlass size={60} className='opacity-50 mt-6' />}
      title='Ничего не найдено'
      desc='У вас пока нет завершённых объявлений.'
    />
  );
};
