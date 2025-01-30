import { PiPlusCircleBold } from 'react-icons/pi';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';
import { Spacer } from '@nextui-org/spacer';
import { Button } from '@nextui-org/react';
import { WelcomeBlockScreen } from './screen';

export const WelcomeBlock = () => {
  const token = getCookie('token', { cookies });

  if (token) return <Spacer className='h-6' />;

  return (
    <div className='w-full h-[500px] md:h-[280px] lg:h-[410px] bg-gradient-to-bl from-blue-200 to-indigo-200 dark:from-blue-900 dark:to-indigo-500 flex justify-center mb-14 border-b-1 border-black/10'>
      <div className='max-w-7xl w-full pr-4 md:flex pt-8 items-start lg:items-center relative justify-between overflow-hidden'>
        <div className='absolute bottom-4 font-medium right-12 px-4 py-2 bg-rose-500 text-rose-100 rounded-2xl rotate-2 z-20 shadow-rose-500/40 shadow-lg'>
          Дарим 500₽ за регистрацию!
        </div>
        <div className='flex flex-col gap-5 w-full sm:w-1/2 pl-4 lg:pb-8 md:min-w-[390px]'>
          <h2 className='text-3xl lg:text-5xl font-bold !leading-[1.3] subpixel-antialiased text-indigo-900 dark:text-indigo-100'>
            Поиск и размещение объявлений
          </h2>
          <p className='text-md lg:text-lg text-blue-900 dark:text-blue-100 opacity-90 mb-1 font-medium'>
            Совершайте выгодные сделки каждый день
          </p>

          <Button
            as={Link}
            href='/place-ad'
            size='lg'
            className='w-fit flex gap-2 items-center py-3 px-5 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 dark:from-blue-500 dark:to-indigo-400 text-white font-medium'
          >
            <PiPlusCircleBold size={20} />
            Разместить объявление
          </Button>
        </div>
        <div className='relative top-8 w-full h-full md:w-[600px] md:top-0 ml-[-15px] md:ml-1 lg:ml-1'>
          <div className='h-full md:h-[350px] overflow-clip'>
            <WelcomeBlockScreen />
          </div>
        </div>
      </div>
    </div>
  );
};
