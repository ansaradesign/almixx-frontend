import { cookies } from 'next/headers';
import { LogoutButton } from '@albomoni/features/(auth)/logout';
import { getCookie } from 'cookies-next';
import { getUserAsync } from '@albomoni/entities/user/api/get-user';
import { PlaceAdButton } from '@albomoni/features/(ad)/place-ad';
import { ProfileUser } from '@albomoni/entities/user';
import { ProfileMainControls } from './main-controls';
import { ProfileSecondaryControls } from './secondary-controls';

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
        <ProfileMainControls />
        <ProfileSecondaryControls user={user} />
        <div className='w-full flex flex-col md:flex-row justify-between -mt-2 gap-16'>
          <PlaceAdButton />
          <LogoutButton />
        </div>
      </div>
    </main>
  );
};
