'use client';

import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Tabs as NativeTabs, Tab } from '@nextui-org/tabs';
import { usePathname, useRouter } from 'next/navigation';
import { Key, useEffect } from 'react';

type Props = {
  items: { id: number; name: string; href: string }[];
};

export const Tabs = ({ items }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useClientTranslation();

  useEffect(() => {
    items.forEach(({ href }) => {
      router.prefetch(href);
    });
  }, []);

  const pathWithoutLocation = pathname.slice(3);
  const truePath = pathWithoutLocation === '' ? '/' : pathWithoutLocation;

  const handleChange = (value: Key) => {
    router.replace(value as string);
  };

  return (
    <NativeTabs
      radius='lg'
      size='lg'
      color='primary'
      aria-label='Tabs'
      variant='light'
      selectedKey={truePath}
      onSelectionChange={handleChange}
      classNames={{
        base: '-ml-4 w-[calc(100%+32px)]',
        tabList: 'px-4 rounded-none',
        cursor: 'rounded-[14px]',
        tabContent: 'font-medium',
      }}
    >
      {items.map(({ name, href }) => (
        <Tab key={href} title={t(`tabs.${name}`)} />
      ))}
    </NativeTabs>
  );
};
