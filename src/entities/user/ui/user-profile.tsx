'use client';

import { UserType } from '@albomoni/entities/user/model/user.type';
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { useEffect } from 'react';
import { GetSubscriptionButton } from '@albomoni/features/get-subscription';
import { UserAvatar } from './user-avatar';

type Props = {
  user: UserType;
};

export const ProfileUser = ({ user }: Props) => {
  const { setUser } = useSession();

  useEffect(() => {
    setUser(user);
  }, [user]);

  return (
    <div className='w-full flex flex-col md:flex-row gap-2 md:gap-4 text-start items-center'>
      <div className='w-36 h-36 lg:w-28 lg:h-28 flex-shrink-0 p-2'>
        <UserAvatar src={user.avatar} isSubscribed={user.subscription} />
      </div>
      <div className='w-full flex flex-col md:gap-0 justify-center items-center md:items-start'>
        <h3 className='text-2xl font-semibold'>{user.first_name}</h3>
        <GetSubscriptionButton isSubscribed={user.subscription} />
      </div>
    </div>
  );
};
