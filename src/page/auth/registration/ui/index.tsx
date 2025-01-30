import { RegistrationWidget } from '@albomoni/features/(auth)/registration';
import { AlbomoniSvg } from '@albomoni/shared/ui/logo';
import Link from 'next/link';
import { Suspense } from 'react';
import { PiXBold } from 'react-icons/pi';

export const RegistrationPage = () => {
  return (
    <main className='flex flex-col gap-6 items-center px-4 md:justify-center min-h-dvh bg-[--element] dark:bg-[--bg] pb-4'>
      <div className='w-full md:absolute top-0 flex justify-between items-center p-1 pt-6 md:p-10'>
        <Link href='/'>
          <button
            type='button'
            aria-label='Logo'
            className='w-[132px] flex items-center justify-center'
          >
            <AlbomoniSvg />
          </button>
        </Link>

        <Link href='/'>
          <button
            type='button'
            aria-label='Back'
            className='w-10 h-10 rounded-full bg-[--bg] dark:bg-[--element] flex items-center justify-center'
          >
            <PiXBold size={20} />
          </button>
        </Link>
      </div>

      <Suspense>
        <RegistrationWidget />
      </Suspense>
    </main>
  );
};
