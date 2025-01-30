import { Button } from '@nextui-org/button';

import { getCookie } from 'cookies-next';
import { useState } from 'react';
import { PiPlayCircleBold } from 'react-icons/pi';
import revalidateRoute from '@albomoni/shared/lib/utils/server/revalidate';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@nextui-org/spinner';
import { useModal } from '../../../lib/use-modal';
import { EModalStates } from '../../../model/modal-states.enum';
import { PromotionVariants } from '../../../config/promotion-variants';
import { PromoteOption } from '../promote-ad/promote-option';
import { PromoOptions } from '../promote-ad';
import { getPromotionPlans } from '../../../api/get-promotion-plans';
import { StartAdPeriodVariants } from '../../../config/start-ad-period-variants';
import { calcStartAdPrice } from '../../../lib/calc-start-ad-price';
import { startAd } from '../../../api/start-ad';
import { ModalScrollableArea } from '../../scrollable-area';

export const ModalVariantStartAd = () => {
  const { setModalState, modalData } = useModal();
  const [isStartLoading, setIsStartLoading] = useState(false);
  const token = getCookie('token');
  const [paymentPeriod, setPaymentPeriod] = useState(
    StartAdPeriodVariants[0].id,
  );

  const [activeOption, setActiveOption] = useState<PromoOptions>(
    PromotionVariants[0].id,
  );

  const { data, isLoading } = useQuery({
    queryKey: ['promotion-options'],
    queryFn: () =>
      getPromotionPlans(
        {
          category: modalData.category,
          currency: modalData.currency,
          price: modalData.price,
        },
        token as string,
      ),
  });

  const handleClick = async () => {
    setIsStartLoading(true);

    const handleStatus = 'moderating';

    await startAd(
      modalData.id,
      handleStatus,
      activeOption,
      paymentPeriod as 'daily' | 'weekly' | 'monthly',
      token as string,
    );

    setModalState(EModalStates.NULL);
    revalidateRoute('/profile/my-ads');
    revalidateRoute(`/profile/my-ads/ad/${modalData.id}`);
  };

  if (isLoading) {
    return (
      <div className='w-full h-dvh flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  const findPrice = (title: PromoOptions) =>
    data?.plans.find(({ name }) => name === title)?.cost;

  const activeOptionData = data?.plans.find(
    ({ name }) => activeOption === name,
  );

  return (
    <>
      <ModalScrollableArea>
        <h1 className='text-xl font-semibold mt-2'>Запуск объявления</h1>

        <p className='text-sm opacity-50 text-start'>
          Отправляя объявление на модерацию, вы подтверждаете, что ознакомились
          с правилами платформы. Проверка объявления может занимать от пары
          часов до нескольких суток.
        </p>

        <div className='w-full flex flex-col gap-1'>
          <h2 className='font-medium text-neutral-500'>
            Стоимость размещения объявления
          </h2>
          <p className='text-xl font-semibold'>{data?.price} ₽ / сутки</p>
        </div>

        <div className='w-full flex flex-col gap-2'>
          <h2 className='font-medium text-neutral-500'>Период оплаты</h2>
          <div className='w-full flex gap-2 flex-wrap'>
            {StartAdPeriodVariants.map(({ id, title, sale }) => (
              <Button
                key={id}
                id={id}
                radius='full'
                color={paymentPeriod === id ? 'primary' : 'default'}
                className='h-8 font-medium'
                onClick={() => setPaymentPeriod(id)}
              >
                <p>
                  {title} {sale && <span className='font-bold'>{sale}</span>}
                </p>
              </Button>
            ))}
          </div>
        </div>

        <div className='w-full flex flex-col gap-2'>
          <h2 className='font-medium text-neutral-500'>Продвижение</h2>
          <div className='w-full flex gap-4 flex-wrap'>
            {PromotionVariants.map(({ id, title, properties }) => (
              <PromoteOption
                id={id}
                key={id}
                title={title}
                activeOption={activeOption}
                setActiveOption={setActiveOption}
                price={findPrice(id) as number}
                properties={properties}
              />
            ))}
          </div>
          <p className='text-sm opacity-50 text-start pt-4'>
            Вы можете отменить продвижение или поменять тариф в любой момент
            времени.
          </p>
        </div>
      </ModalScrollableArea>

      <div className='w-full px-6 pb-6 pt-1 flex flex-col gap-4'>
        <div className='w-full flex flex-col flex-shrink-0'>
          <h2 className='font-medium text-neutral-500'>
            Итоговая стоимость размещения
          </h2>
          <p className='text-xl font-semibold'>
            {calcStartAdPrice(
              data?.price as number,
              'daily',
              paymentPeriod as 'daily' | 'weekly' | 'monthly',
              activeOptionData?.cost as number,
            )}{' '}
            ₽ / сутки
          </p>
        </div>

        <Button
          isLoading={isStartLoading}
          onPress={handleClick}
          size='lg'
          variant='shadow'
          color='success'
          className='w-full font-semibold gap-2 flex-shrink-0'
        >
          <PiPlayCircleBold size={22} />
          Оплатить{' '}
          {calcStartAdPrice(
            data?.price as number,
            paymentPeriod as 'daily' | 'weekly' | 'monthly',
            paymentPeriod as 'daily' | 'weekly' | 'monthly',
            activeOptionData?.cost as number,
          )}{' '}
          ₽ и запустить
        </Button>
      </div>
    </>
  );
};
