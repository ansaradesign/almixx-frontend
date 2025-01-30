/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/jsx-props-no-spreading */

'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AnimatePresence, m } from 'framer-motion';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { normalizePrice } from '@albomoni/shared/lib/utils/normalize-price';
import { useEffect, useState } from 'react';
import { PiWalletBold } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import { PaymentWidget } from '@albomoni/widgets/payment-widget';
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { Spinner } from '@nextui-org/spinner';
import { useCurrencies } from '@albomoni/shared/lib/providers/currencies-provider';
import { getCookie } from 'cookies-next';
import { BillingSchema } from '../model/schema';
import { sendPaymentRequest } from '../api/send-payment-request';

declare global {
  interface Window {
    cp: any;
  }
}

export const BillingForm = () => {
  const router = useRouter();
  const { user } = useSession();
  const currencies = useCurrencies();
  const token = getCookie('token');

  const [isSave, setIsSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(BillingSchema),
  });

  useEffect(() => {
    if (user) {
      setValue('email', user.email);

      if (user.phones[0]) {
        const initialPhone = user.phones[0].phone.replace(/[^\d+]/g, '');
        setValue('tel', initialPhone);
      }
    }
  }, [user]);

  const [normSum] = useState(
    normalizePrice({
      price: 100,
      currency: 'RUB',
      adCurrency: 'RUB',
      currencies,
    }),
  );

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);

      const fieldValues = {
        cvv: data.cvv,
        cardNumber: data['card-number'],
        expDateMonth: data['card-date'].slice(0, 2),
        expDateYear: data['card-date'].slice(3),
        name: data.cardholder,
      };

      if (window.cp) {
        const checkout = new window.cp.Checkout({
          publicId: 'pk_96b8fadfcdfac511e6ef7015016e3',
        });
        const cryptogram = await checkout.createPaymentCryptogram(fieldValues);
        const response = await sendPaymentRequest(
          data.sum,
          cryptogram,
          data.email,
          data.cardholder,
          data.tel,
          isSave,
          token as string,
        );

        router.push(response as string);
      }
    } catch {
      setIsLoading(false);
    }

    // const { sum } = data;
    // const body = { sum, currency };

    // const response = await fetch(
    //   'https://ansaratracker.store/pay-service/bill/',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${cookies.token}`,
    //     },
    //     body: JSON.stringify(body),
    //   },
    // );

    // const paymentData = await response.json();
    // const {
    //   confirmation: { confirmation_url },
    // } = paymentData;

    // router.push(confirmation_url);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-6 relative'
    >
      <input
        min='1'
        step='any'
        type='text'
        className='w-full max-w-[500px] text-5xl md:text-7xl bg-transparent outline-none font-semibold'
        placeholder={normSum}
        inputMode='numeric'
        {...register('sum')}
      />

      <PaymentWidget
        register={register}
        isSave={isSave}
        setIsSave={setIsSave}
        control={control}
      />

      <AnimatePresence>
        {Object.entries(errors).map(([key, error]) => (
          <m.div key={key} layout className='w-full md:max-w-[600px]'>
            <NotificationBubble type='error'>
              {error.message}
            </NotificationBubble>
          </m.div>
        ))}
      </AnimatePresence>

      <m.button
        type='submit'
        disabled={isLoading}
        layout
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='w-full md:w-fit h-12 px-6 bg-gradient-to-r rounded-2xl from-blue-300 to-indigo-400 dark:from-blue-500 dark:to-indigo-400 text-white shadow-lg shadow-blue-400/40 font-semibold  flex items-center gap-3 justify-center mt-4'
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <PiWalletBold size={20} />
            Оплатить
          </>
        )}
      </m.button>
    </form>
  );
};
