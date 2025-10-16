import { cookies } from 'next/headers';
import { LogoutButton } from '@albomoni/features/(auth)/logout';
import { getCookie } from 'cookies-next';
import { getUserAsync } from '@albomoni/entities/user/api/get-user';
import { PlaceAdButton } from '@albomoni/features/(ad)/place-ad';
import { ProfileUser } from '@albomoni/entities/user';
import { ProfileMainControls } from './main-controls';
import { ProfileSecondaryControls } from './secondary-controls';
import Link from 'next/link';
import { PiCaretRightBold, PiUsersThreeBold } from 'react-icons/pi';

export const ProfilePage = async () => {
  const token = getCookie('token', { cookies });
  const user = await getUserAsync(token as string);

  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-7 w-full max-w-7xl px-4 mb-40'>
        <h2 className='text-2xl md:text-3xl font-bold mt-5 md:mt-10 w-full hidden md:block'>
          Профиль
        </h2>
        <ProfileUser user={user} />
        <div className='w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
          <div className='hidden md:block'></div>
          <div className='hidden md:block'></div>
          <div className='col-span-2 md:col-span-1'>
            <PlaceAdButton />
          </div>
        </div>
        <ProfileMainControls />
        <ProfileSecondaryControls user={user} />
        <div className='w-full grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 -mt-[11px]'>
          <Link href='/profile/referral'>
            <button
              type='button'
              className='w-full shadow-base px-5 py-4 dark:bg-default-100 rounded-2xl font-medium flex justify-between items-center hover:scale-[1.02] active:scale-[0.98] transition-transform'
            >
              <div className='flex gap-3 items-center'>
                <PiUsersThreeBold size={18} />
                Реферальная программа
              </div>
              <PiCaretRightBold size={18} className='opacity-50' />
            </button>
          </Link>
          <div className='hidden md:block'></div>
          <div className='col-span-2 md:col-span-1'>
            <LogoutButton />
          </div>
        </div>
      </div>
    </main>
  );
};
