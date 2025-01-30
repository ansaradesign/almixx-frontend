import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { PiUserBold } from 'react-icons/pi';
import { getUserAsync } from '@albomoni/entities/user/api/get-user';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { EditAvatar } from './avatar';
import { EditPhoneNumbers } from './phone-numbers';
import { EditName } from './name';
import { EditDescription } from './description';

export const EditProfilePage = async () => {
  const token = getCookie('token', { cookies });
  const user = await getUserAsync(token as string);

  const { user_id, first_name, avatar, phones, description } = user;

  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-10 w-full max-w-7xl px-4 mb-40'>
        <h2 className='text-2xl md:text-3xl font-bold mt-5 md:mt-10 w-full'>
          Управление профилем
        </h2>
        <div className='w-full lg:w-1/2 flex flex-col gap-12'>
          <div className='w-full flex gap-4 -mt-2 -mb-3'>
            {/* <Button
              size='lg'
              as={Link}
              href={`/user/${user_id}`}
              color='warning'
              variant='faded'
              className='font-medium'
              startContent={<PiStarFill className='flex-shrink-0' />}
            >
              Мои отзывы
            </Button> */}
            <Button
              size='lg'
              as={Link}
              href={`/user/${user_id}`}
              className='font-medium'
              startContent={<PiUserBold className='flex-shrink-0' />}
            >
              Посмотреть мой профиль
            </Button>
          </div>

          <EditAvatar url={avatar} />
          <EditName name={first_name} />
          <EditPhoneNumbers numbers={phones} />
          <EditDescription description={description} />
        </div>
      </div>
    </main>
  );
};
