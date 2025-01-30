import { normalizePrice } from '@albomoni/shared/lib/utils/normalize-price';
import { PiFolders, PiMapPin } from 'react-icons/pi';
import Link from 'next/link';
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { MyAd } from '../../model/ad.type';
import { ImageGallery } from '../image-gallery';
import { MyAdCardChips } from './chips';
import { MyAdCardStats } from './stats';
import { getClientAdTitle } from '../../lib/get-client-ad-title';

type Props = {
  ad: MyAd;
  lng: string;
  currencies: { [key: string]: number };
};

export const MyAdCard = ({ ad, lng, currencies }: Props) => {
  const { t } = useClientTranslation('place-ad');

  const {
    id,
    title,
    additional,
    category,
    cost,
    currency: adCurrency,
    geoposition,
    views,
    status,
    favorites,
    phone_views,
  } = ad;

  console.log(ad);

  return (
    <div className='w-full flex-shrink-0 flex flex-col shadow-base dark:bg-[--element] rounded-2xl overflow-clip cursor-pointer relative border-1 border-white/5'>
      <ImageGallery images={ad.images} />

      <Link
        href={`/profile/my-ads/ad/${id}`}
        target='_blank'
        className='w-full flex flex-col gap-5 p-4'
      >
        <div className='w-full flex flex-col gap-2'>
          <h5 className='text-md font-bold line-clamp-1'>
            {getClientAdTitle(title, additional, category)}
          </h5>
          <h6 className='text-xl font-semibold line-clamp-1'>
            {normalizePrice({
              price: cost,
              currency: adCurrency,
              adCurrency,
              currencies,
            })}
          </h6>
        </div>

        <MyAdCardChips status={status} />

        <div className='w-fit flex gap-2 opacity-50 items-center'>
          <PiFolders />
          <p className='text-xs font-medium line-clamp-1'>
            {category.map((cat, index, categories) => (
              <span key={cat}>
                {t(`categories.${cat}`)} {index < categories.length - 1 && '· '}
              </span>
            ))}
          </p>
        </div>

        <div className='w-full flex gap-2 items-center opacity-50 -mt-2'>
          <PiMapPin />
          <p className='text-xs font-medium line-clamp-1'>{geoposition}</p>
        </div>
      </Link>
      <div className='w-full flex flex-col gap-5 px-4 pt-2 pb-4'>
        <MyAdCardStats
          views={views}
          favorites={favorites}
          phone_views={phone_views}
        />
      </div>
    </div>
  );
};
