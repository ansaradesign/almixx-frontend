'use client';

import { GetSubscriptionButton } from '@albomoni/features/get-subscription';
import { UserAvatar } from './user-avatar';
import { PublicUserType } from '../model/user.type';

type Props = {
  user: PublicUserType;
};

export const User = ({ user }: Props) => {
  const { avatar, subscription, first_name } = user;

  return (
    <div className='w-full flex flex-col md:flex-row gap-2 md:gap-4 text-start items-center'>
      <div className='w-36 h-36 lg:w-28 lg:h-28 flex-shrink-0 p-2'>
        <UserAvatar src={avatar} isSubscribed={subscription} />
      </div>
      <div className='w-full flex flex-col justify-center items-center md:items-start pb-2 md:pb-0'>
        <h3 className='text-2xl font-semibold'>{first_name}</h3>
        <GetSubscriptionButton isSubscribed={subscription} />
      </div>
    </div>
  );
};
