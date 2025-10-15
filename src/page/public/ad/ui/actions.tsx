import { normalizePrice } from '@albomoni/shared/lib/utils/normalize-price';
import { Button } from '@nextui-org/button';
import { Rating } from '@albomoni/shared/ui/rating';
import { Ad } from '@albomoni/entities/ad-card/model/ad.type';
import { cookies } from 'next/headers';
import { InfoButton } from '@albomoni/shared/ui/info-button';
import { UserAvatar } from '@albomoni/entities/user';
import Link from 'next/link';
import { CopyLinkButton } from '@albomoni/features/copy-link';
import { getCurrenciesAsync } from '@albomoni/entities/ad-card/api/get-currencies';
import dynamic from 'next/dynamic';
import { Skeleton } from '@nextui-org/skeleton';
import { useTranslation } from '@albomoni/shared/i18n';
import { ContactWithSellerButton } from '@albomoni/features/contact-with-seller';

type Props = {
  data: Ad;
  lng: string;
};

const DynamicAddToFavoritesButton = dynamic(
  () =>
    import('@albomoni/features/add-to-favorites').then(
      (mod) => mod.AddToFavoritesButton,
    ),
  {
    ssr: false,
    loading: () => (
      <Skeleton className='w-12 h-12 flex items-center justify-center flex-shrink-0 bg-default rounded-2xl' />
    ),
  },
);

export const AdActions = async ({ data, lng }: Props) => {
  const userCurrency = cookies().get('currency');
  const { t } = await useTranslation(lng, 'place-ad');
  const { ad, seller } = data;
  const isUnmatchedCurrencies = userCurrency?.value !== data.ad.currency;
  const currencies: any = await getCurrenciesAsync();

  return (
    <div className='flex flex-col px-4 lg:px-0'>
      <div className='w-full lg:w-80 lg:sticky top-8 h-min flex flex-col gap-8 flex-shrink-0'>
        <div className='flex flex-col gap-4'>
          <ContactWithSellerButton ad={data} />

          <div className='w-full flex gap-4'>
            <CopyLinkButton />
            <DynamicAddToFavoritesButton isBig postId={data.ad.id} />
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <div className='w-full flex gap-2 justify-start'>
            <h3 className='text-md font-semibold opacity-50'>Цена</h3>
            <InfoButton>
              {isUnmatchedCurrencies ? (
                <p className='font-medium'>
                  Продавец указал стоимость в валюте {data.ad.currency},
                  отличной от вашей. Верхняя цена указана приблизительно, исходя
                  из актуального курса. Фактическая цена в валюте продавца
                  указана ниже.
                </p>
              ) : (
                <p className='font-medium'>
                  Валюта продавца соответствует вашей. Указана точная цена.
                </p>
              )}
            </InfoButton>
          </div>

          <h4 className='text-2xl font-bold select-text'>
            {isUnmatchedCurrencies && '~ '}
            {normalizePrice({
              price: ad.cost,
              currency: userCurrency?.value,
              adCurrency: data.ad.currency,
              currencies,
            })}
          </h4>

          {isUnmatchedCurrencies && (
            <h5 className='text-lg font-semibold opacity-50 select-text'>
              {normalizePrice({
                price: ad.cost,
                currency: data.ad.currency,
                adCurrency: data.ad.currency,
                currencies,
              })}
            </h5>
          )}
        </div>

        <div className='flex flex-col gap-3'>
          <h3 className='text-md font-semibold opacity-50'>Продавец</h3>
          <Link
            href={`/user/${data.seller.user_id}`}
            className='w-full h-14 flex gap-4 items-center active:scale-95 transition-transform'
          >
            <div className='w-14 h-14 flex-shrink-0'>
              <UserAvatar
                src={seller.avatar}
                isSubscribed={seller.subscription}
              />
            </div>
            <div className='flex flex-col gap-1 justify-between w-full h-full'>
              <p className='text-lg font-bold'>{seller.name}</p>
              <Rating value={seller.rating} feedback={seller.feedback_count} />
            </div>
          </Link>
        </div>

        <div className='flex flex-col gap-1'>
          <h3 className='text-md font-semibold opacity-50'>Адрес</h3>
          <h4 className='text-lg font-semibold select-text'>
            {ad.geoposition}
          </h4>
        </div>

        <div className='w-full flex flex-col gap-2'>
          <h3 className='text-md font-semibold opacity-50'>Категории</h3>
          <div className='w-full flex-wrap flex gap-2 items-center'>
            {ad.category.map((cat) => (
              <Button
                key={cat}
                as={Link}
                href={`/categories/${ad.category[0]}`}
                size='sm'
                radius='full'
                className='text-sm font-medium'
              >
                {t(`categories.${cat}`)}{' '}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
