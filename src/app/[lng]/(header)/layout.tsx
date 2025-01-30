'use client';

import { Header } from '@albomoni/widgets/header';

type Props = {
  children: React.ReactNode;
};

export default function HeaderLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
