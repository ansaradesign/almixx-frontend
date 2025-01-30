'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from '@nextui-org/skeleton';
import { useCookies } from 'react-cookie';
import { getCurrencyByLocale } from '@albomoni/shared/lib/utils/get-currency-by-locale';
import { useLangContext } from '@albomoni/shared/lib/providers';

const DynamicFixedBars = dynamic(
  () => import('./fixed-bars').then((mod) => mod.FixedBars),
  { ssr: false },
);

const DynamicStaticHeader = dynamic(
  () => import('./static-header').then((mod) => mod.StaticHeader),
  {
    loading: () => (
      <div className='w-full h-20 max-w-7xl mx-auto flex items-center gap-4 lg:gap-8 px-4'>
        <Skeleton className='w-28 h-12 rounded-2xl hidden md:flex flex-shrink-0' />
        <Skeleton className='w-full h-12 rounded-[14px] ' />
        <Skeleton className='w-12 md:w-[126px] h-12 rounded-[14px] flex-shrink-0' />
      </div>
    ),
  },
);

export const Header = () => {
  const [cookies, setCookie] = useCookies();
  const locale = useLangContext();

  if (!cookies.currency) {
    setCookie('currency', getCurrencyByLocale(locale as string));
  }

  return (
    <header className='w-full h-20 flex flex-row justify-center z-30'>
      <DynamicStaticHeader />
      <DynamicFixedBars />
    </header>
  );
};
