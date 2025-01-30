import { Divider } from '@nextui-org/divider';
import { Rating } from '@albomoni/shared/ui/rating';
import { PiFolders, PiMapPin } from 'react-icons/pi';
import Link from 'next/link';
import { normalizePrice } from '@albomoni/shared/lib/utils/normalize-price';
import dynamic from 'next/dynamic';
import { getCookie } from 'cookies-next';
import { Spinner } from '@nextui-org/spinner';
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Ad } from '../../model/ad.type';
import { ImageGallery } from '../image-gallery';
import { getClientAdTitle } from '../../lib/get-client-ad-title';

type Props = {
  data: Ad;
  currencies: { [key: string]: number };
  isDisableCategory?: boolean;
};

const DynamicAdWatchedMessage = dynamic(
  () => import('./watched').then((mod) => mod.AdWatchedMessage),
  { ssr: false },
);

const DynamicAddToFavoritesButton = dynamic(
  () =>
    import('@albomoni/features/add-to-favorites').then(
      (mod) => mod.AddToFavoritesButton,
    ),
  {
    ssr: false,
    loading: () => (
      <div className='w-8 h-8 flex items-center justify-center flex-shrink-0'>
        <Spinner color='default' />
      </div>
    ),
  },
);

export const AdCard = ({
  data,
  currencies,
  isDisableCategory = false,
}: Props) => {
  const userCurrency = getCookie('currency');
  const { t } = useClientTranslation('place-ad');
  const { ad, seller } = data;
  const { title, additional, category } = ad;

  const isUnmatchedCurrencies = userCurrency !== data.ad.currency;

  return (
    <Link
      href={`/ad/${ad.id}`}
      target='_blank'
      className='w-full flex-shrink-0 flex flex-col shadow-base dark:bg-[--element] rounded-2xl overflow-clip cursor-pointer relative border-1 border-white/5'
    >
      <DynamicAdWatchedMessage adId={data.ad.id} />
      <ImageGallery images={ad.images} />
      <Divider />
      <div className='w-full flex flex-col gap-4 p-4 relative'>
        <Rating value={seller.rating} feedback={seller.feedback_count} />
        <div className='absolute top-4 right-4'>
          <DynamicAddToFavoritesButton postId={data.ad.id} />
        </div>

        <div className='flex flex-col gap-2'>
          <h5 className='text-md font-bold line-clamp-1 pb-1'>
            {getClientAdTitle(title, additional, category)}
          </h5>

          <div className='w-fit flex gap-2 opacity-50 items-center'>
            <PiFolders />
            <p className='text-xs font-medium line-clamp-1'>
              {data.ad.category.map((cat, index, categories) => {
                return (
                  (!isDisableCategory || index > 0) && (
                    <span key={cat}>
                      {t(`categories.${cat}`)}{' '}
                      {index < categories.length - 1 && '· '}
                    </span>
                  )
                );
              })}
            </p>
          </div>

          <div className='w-fit flex gap-2 opacity-50 items-center'>
            <PiMapPin />
            <p className='text-xs font-medium line-clamp-1'>
              {data.ad.geoposition.split(', ').slice(0, 2).join(', ')}
            </p>
          </div>
        </div>

        <p className='text-xl font-bold'>
          {isUnmatchedCurrencies && '~ '}
          {normalizePrice({
            price: ad.cost,
            currency: userCurrency,
            adCurrency: data.ad.currency,
            currencies,
          })}
        </p>
      </div>
    </Link>
  );
};
