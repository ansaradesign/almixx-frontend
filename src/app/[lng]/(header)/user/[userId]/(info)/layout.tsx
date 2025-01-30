import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';
import { Spinner } from '@nextui-org/spinner';
import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

type Props = {
  params: I18nLangParam & { userId: string };
  children: ReactNode;
};

const DynamicUserPage = dynamic(
  () => import('@albomoni/page/public/user').then((mod) => mod.UserPage),
  {
    loading: () => (
      <div className='absolute h-dvh top-0 bottom-0 left-0 right-0 flex items-center justify-center'>
        <Spinner />
      </div>
    ),
  },
);

export default async function UserLayout({
  params: { lng, userId },
  children,
}: Props) {
  return (
    <DynamicUserPage userId={userId} lng={lng}>
      {children}
    </DynamicUserPage>
  );
}
