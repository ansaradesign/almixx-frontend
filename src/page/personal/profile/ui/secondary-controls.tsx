import { UserType } from '@albomoni/entities/user/model/user.type';
import Link from 'next/link';
import { PiBell, PiCurrencyCircleDollar, PiUserList } from 'react-icons/pi';

type Props = {
  user: UserType;
};

export const ProfileSecondaryControls = ({ user }: Props) => {
  return (
    <div className='w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 -mt-[11px]'>
      <Link href='/profile/my-ads'>
        <button
          type='button'
          aria-label='my-ads'
          className='w-full h-36 rounded-[20px] flex flex-col shadow-base dark:bg-default text-start font-medium p-4 relative overflow-clip justify-between hover:scale-[1.02] active:scale-[0.98] transition-transform'
        >
          Мои объявления
          <div className='bg-default dark:bg-default-200  w-min h-7 min-w-7 px-2 rounded-full dark:shadow-base flex items-center justify-center'>
            {user.products}
          </div>
          <PiUserList className='absolute w-auto h-full -bottom-8 -right-6 opacity-10' />
        </button>
      </Link>

      {/* <Link href='/profile/notifications'> */}
      <button
        type='button'
        aria-label='my-ads'
        className='w-full h-36 rounded-[20px] flex flex-col shadow-base dark:bg-default text-start font-medium p-4 relative overflow-clip justify-between hover:scale-[1.02] active:scale-[0.98] transition-transform opacity-50'
      >
        Уведомления
        {user.notifications > 0 && (
          <div className='bg-danger w-min h-7 min-w-7 px-2 rounded-full dark:shadow-base flex items-center justify-center text-white'>
            {user.notifications}
          </div>
        )}
        <PiBell className='absolute w-auto h-[75%] -bottom-4 -right-3 opacity-10' />
      </button>
      {/* </Link> */}

      {/* <Link href='/profile/subscriptions' className='col-span-2 md:col-span-1'> */}
      <button
        type='button'
        aria-label='my-ads'
        className='w-full h-24 md:h-36 rounded-[20px] flex flex-col shadow-base dark:bg-default text-start font-medium p-4 relative overflow-clip justify-between hover:scale-[1.02] active:scale-[0.98] transition-transform opacity-50 col-span-2 md:col-span-1'
      >
        Активные платные услуги
        <div className='bg-default dark:bg-default-200 w-min h-7 min-w-7 px-2 rounded-full dark:shadow-base flex items-center justify-center'>
          {user.plans}
        </div>
        <PiCurrencyCircleDollar className='w-auto h-full md:h-[80%] absolute -bottom-2 -right-2 md:-bottom-5 opacity-10' />
      </button>
      {/* </Link> */}
    </div>
  );
};
