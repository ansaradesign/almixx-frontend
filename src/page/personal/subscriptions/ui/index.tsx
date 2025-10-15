import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export const SubscriptionsPage = async () => {
  const token = getCookie('token', { cookies });

  // const response = await getSubscriptionsInfo(token as string);

  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-7 w-full max-w-7xl px-4 mb-40'>
        <h2 className='text-2xl md:text-3xl font-bold mt-5 md:mt-10 w-full'>
          Активные платные услуги
        </h2>
      </div>
    </main>
  );
};
