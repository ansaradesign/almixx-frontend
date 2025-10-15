import { Tabs } from '@albomoni/shared/ui/tabs';
import { ReactNode } from 'react';
import { MyAdsRoutes } from '../config/routes';

type Props = {
  lng: string;
  children: ReactNode;
};

export const MyAdsPage = async ({ lng, children }: Props) => {
  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-10 w-full max-w-7xl px-4 mb-40'>
        <h2 className='text-2xl md:text-3xl font-bold mt-5 md:mt-10 w-full'>
          Мои объявления
        </h2>
        <Tabs items={MyAdsRoutes} />
        {children}
      </div>
    </main>
  );
};
