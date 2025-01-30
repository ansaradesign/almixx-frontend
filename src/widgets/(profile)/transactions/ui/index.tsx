/* eslint-disable sonarjs/no-empty-collection */

import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { parseDate } from '@albomoni/shared/lib/utils/parse-date';
import { normalizePrice } from '@albomoni/shared/lib/utils/normalize-price';
import { clsx } from 'clsx';
import { InfoButton } from '@albomoni/shared/ui/info-button';
import { PiMagnifyingGlass } from 'react-icons/pi';
import { getCurrenciesAsync } from '@albomoni/entities/ad-card/api/get-currencies';
import { getTransactions } from '../api/get-transactions';

export const Transactions = async () => {
  const token = getCookie('token', { cookies });
  const transactions = await getTransactions(token as string);
  const currencies: any = await getCurrenciesAsync();

  return (
    <>
      <h2 className='text-xl md:text-2xl font-bold mt-10 md:mt-10 w-full'>
        История транзакций
      </h2>

      {transactions.length > 0 ? (
        <ul className='w-full md:max-w-lg flex flex-col gap-6'>
          {transactions.map((transaction) => {
            const { date, time } = parseDate(transaction.date);

            const priceStyles = clsx('text-xl font-semibold', {
              'text-success':
                transaction.status === 'succeeded' &&
                transaction.type === 'deposit',
              'opacity-50':
                transaction.status === 'succeeded' &&
                transaction.type === 'withdraw',
              'text-danger': transaction.status === 'canceled',
              'text-warning': transaction.status === 'pending',
            });

            return (
              <li
                key={transaction.id}
                className='w-full flex justify-between items-center'
              >
                <div className='flex flex-col gap-1'>
                  <h5 className='font-semibold'>
                    {transaction.type === 'deposit'
                      ? 'Пополнение счёта'
                      : 'Покупка'}
                  </h5>
                  <p className='opacity-50'>{`${date}, ${time}`}</p>
                </div>
                <div className='flex gap-2 items-center'>
                  {transaction.status !== 'succeeded' && (
                    <InfoButton>
                      {transaction.status === 'pending'
                        ? 'Транзакция в обработке'
                        : `Транзакция отклонена. Причина: ${transaction.description}`}
                    </InfoButton>
                  )}

                  <h6 className={priceStyles}>
                    {transaction.type === 'deposit' ? '+ ' : '- '}

                    {normalizePrice({
                      price: transaction.cost,
                      currency: transaction.currency,
                      adCurrency: transaction.currency,
                      currencies,
                    })}
                  </h6>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className='w-full md:max-w-lg flex flex-col gap-4 items-center mt-10'>
          <PiMagnifyingGlass size={64} className='opacity-50' />
          <h3 className='text-xl font-semibold'>Транзакций не обнаружено</h3>
          <h4 className='opacity-50 font-medium max-w-64 text-center'>
            Начните с пополнения Вашего кошелька Almixx
          </h4>
        </div>
      )}
    </>
  );
};
