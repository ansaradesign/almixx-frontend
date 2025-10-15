'use client';

import { getCookie } from 'cookies-next';
import { permanentRedirect } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function GuestTempalate({ children }: Props) {
  const token = getCookie('token');

  return !token ? children : permanentRedirect('/');
}
