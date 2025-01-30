'use client';

import { Filter } from '@albomoni/widgets/category-filter/lib/render-filter-state';
import { Button } from '@nextui-org/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  selectedFilters: { [key: string]: Filter };
};

export const ShowFilteredAdsButton = ({ selectedFilters }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (disabled) {
      setDisabled(false);
    }
  }, [selectedFilters]);

  const handleClick = async () => {
    const jsonData = JSON.stringify(selectedFilters);
    const encodedData = Buffer.from(jsonData).toString('base64');

    const initPath = pathname.split('?')[0];
    const newPath = `${initPath}?filters=${encodedData}`;

    setDisabled(true);
    router.replace(newPath);
  };

  return (
    <Button
      isDisabled={disabled}
      size='lg'
      className='bg-gradient-to-tr from-blue-500 to-indigo-400 text-white font-medium'
      onPress={handleClick}
    >
      {disabled ? 'Показаны похожие объявления' : 'Показать объявления'}
    </Button>
  );
};
