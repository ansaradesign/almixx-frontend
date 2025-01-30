import { Divider } from '@nextui-org/divider';
import { PiFolders, PiMapPin } from 'react-icons/pi';
import Link from 'next/link';
import { normalizePrice } from '@albomoni/shared/lib/utils/normalize-price';
import dynamic from 'next/dynamic';
import { getCookie } from 'cookies-next';
import { MEDIA_URL } from '@albomoni/shared/config';
import { Spinner } from '@nextui-org/spinner';
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { PublicAdType } from '../../model/ad.type';
import { ImageGallery } from '../image-gallery';
import { getClientAdTitle } from '../../lib/get-client-ad-title';

type Props = {
  ad: PublicAdType;
  lng: string;
  currencies: { [key: string]: number };
};

const DynamicAdWatchedMessage = dynamic(
  () => import('../ad-card/watched').then((mod) => mod.AdWatchedMessage),
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

export const UserAdCard = ({ ad, lng, currencies }: Props) => {
  const userCurrency = getCookie('currency');
  const { t } = useClientTranslation('place-ad');

  const {
    title,
    additional,
    category,
    id,
    image,
    geoposition,
    cost,
    currency,
  } = ad;

  const isUnmatchedCurrencies = userCurrency !== currency;
  const images = image.map((img) => ({
    full: `${MEDIA_URL}/${img.file}`,
    preview: `${MEDIA_URL}/${img.file_preview}`,
  }));

  return (
    <Link
      href={`/ad/${id}`}
      target='_blank'
      className='w-full flex-shrink-0 flex flex-col shadow-base dark:bg-[--element] rounded-2xl overflow-clip cursor-pointer relative border-1 border-white/5'
    >
      <DynamicAdWatchedMessage adId={id} />
      <ImageGallery images={images} />
      <Divider />
      <div className='w-full flex flex-col gap-4 p-4 relative'>
        <div className='absolute top-4 right-4'>
          <DynamicAddToFavoritesButton postId={id} />
        </div>

        <div className='flex flex-col gap-2'>
          <h5 className='text-md font-bold line-clamp-1 pr-10 pb-1'>
            {getClientAdTitle(title, additional, category)}
          </h5>
          <div className='w-fit flex gap-2 opacity-50 items-center'>
            <PiFolders />
            <p className='text-xs font-medium line-clamp-1'>
              {category.map((cat, index, categories) => (
                <span key={cat}>
                  {t(`categories.${cat}`)}{' '}
                  {index < categories.length - 1 && '· '}
                </span>
              ))}
            </p>
          </div>
          <div className='flex gap-1 opacity-50 items-center'>
            <PiMapPin />
            <p className='text-xs font-medium'>
              {geoposition.split(', ').slice(0, 2).join(', ')}
            </p>
          </div>
        </div>

        <p className='text-xl font-bold'>
          {isUnmatchedCurrencies && '~ '}
          {normalizePrice({
            price: cost,
            currency: userCurrency,
            adCurrency: currency,
            currencies,
          })}
        </p>
      </div>
    </Link>
  );
};
