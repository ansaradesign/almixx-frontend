import { normalizePrice } from '@albomoni/shared/lib/utils/normalize-price';
import { Button } from '@nextui-org/button';
import { Rating } from '@albomoni/shared/ui/rating';
import { Ad } from '@albomoni/entities/ad-card/model/ad.type';
import { cookies } from 'next/headers';
import { UserAvatar } from '@albomoni/entities/user';
import { PiPencilSimpleBold } from 'react-icons/pi';
import { MyAdCardChips, MyAdCardStats } from '@albomoni/entities/ad-card';
import { StopAdButton } from '@albomoni/features/(ad)/stop-ad';
import { StartAdButton } from '@albomoni/features/(ad)/start-ad';
import Link from 'next/link';
import { getCurrenciesAsync } from '@albomoni/entities/ad-card/api/get-currencies';
import { useTranslation } from '@albomoni/shared/i18n';
import { PromoteAdButton } from '@albomoni/features/(ad)/promote-ad';
import { MyAdErrorBubble } from './error-bubble';

type Props = {
  data: Ad;
  lng: string;
};

export const MyAdActions = async ({ data, lng }: Props) => {
  const userCurrency = cookies().get('currency');
  const { t } = await useTranslation(lng, 'place-ad');
  const { ad, seller } = data;

  const currencies: any = await getCurrenciesAsync();
  const isStartable = ad.status === 'archived' || ad.status === 'ended';

  return (
    <div className='flex flex-col px-4 lg:px-0'>
      <div className='w-full lg:w-80 lg:sticky top-8 h-min flex flex-col gap-8 flex-shrink-0'>
        <div className='flex flex-col gap-4'>
          {isStartable ? (
            <StartAdButton
              id={ad.id}
              status={ad.status}
              category={ad.category[0]}
              currency={ad.currency}
              price={ad.cost}
            />
          ) : (
            <PromoteAdButton
              id={ad.id}
              plan={ad.plan}
              category={ad.category[0]}
              currency={ad.currency}
              price={ad.cost}
            />
          )}

          <div className='w-full flex gap-4 -mb-1'>
            <Button
              as={Link}
              href={`/profile/my-ads/ad/${ad.id}/edit`}
              size='lg'
              className='w-full font-semibold'
            >
              <PiPencilSimpleBold size={18} />
              Редактировать
            </Button>

            {ad.status !== 'archived' && (
              <StopAdButton id={data.ad.id} status={data.ad.status} />
            )}
          </div>
        </div>

        <div className='w-full flex flex-col gap-4 -my-2'>
          <MyAdErrorBubble status={ad.status_text} />
          <MyAdCardChips status={ad.status} />
          <MyAdCardStats views={ad.views} favorites={ad.favorites} phone_views={ad.phone_views} />
        </div>

        <div className='flex flex-col gap-1 -mt-2'>
          <div className='w-full flex gap-2 justify-start'>
            <h3 className='text-md font-semibold opacity-50'>Цена</h3>
          </div>

          <h4 className='text-2xl font-bold select-text'>
            {normalizePrice({
              price: ad.cost,
              currency: userCurrency?.value,
              adCurrency: data.ad.currency,
              currencies,
            })}
          </h4>
        </div>

        <div className='flex flex-col gap-3'>
          <h3 className='text-md font-semibold opacity-50'>Продавец (Вы)</h3>
          <Link
            href={`/user/${seller.user_id}`}
            className='w-full h-14 flex gap-4 items-center'
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
