import { getAdAsync } from '@albomoni/entities/ad-card/api/get-ad';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

type Props = {
  children: ReactNode;
  params: {
    adId: string;
  };
};

export default async function MyAdLayout({
  children,
  params: { adId },
}: Props) {
  const token = getCookie('token', { cookies });
  const decoded = jwtDecode(token as string) as any;

  const data = await getAdAsync(adId);

  if (data.seller.user_id !== decoded.user_id) {
    redirect(`/ad/${adId}`);
  }

  return children;
}
