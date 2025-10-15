'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function FavoriteLayout({ children }: Props) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  return children;
}
