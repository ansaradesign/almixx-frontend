import { getUserPublic } from '@albomoni/entities/user/api/get-user-public';
import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { Tabs } from '@albomoni/shared/ui/tabs';
import dynamic from 'next/dynamic';
import { UserRoutes } from '../config/routes';

type Props = {
  lng: string;
  userId: string;
  children: ReactNode;
};

const DynamicUserAside = dynamic(() =>
  import('./aside').then((mod) => mod.UserAside),
);

export const UserPage = async ({ lng, userId, children }: Props) => {
  cookies();
  const user = await getUserPublic(userId);

  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-10 w-full max-w-7xl px-4 mb-40'>
        <div className='w-full flex flex-col lg:flex-row gap-6 lg:gap-10'>
          <DynamicUserAside user={user} />
          <div className='w-full pt-5 flex flex-col gap-4'>
            <h3 className='text-2xl font-semibold'>Объявления</h3>
            <Tabs items={UserRoutes(userId)} />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};
