import Script from 'next/script';
import { BillingForm } from './billing-form';

export const BillingPage = () => {
  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-6 w-full max-w-7xl px-4 mb-40'>
        <h2 className='text-2xl md:text-3xl font-bold mt-5 md:mt-10 w-full'>
          Пополнение баланса
        </h2>
        <BillingForm />
      </div>
      <Script src='https://checkout.cloudpayments.ru/checkout.js' />
    </main>
  );
};
