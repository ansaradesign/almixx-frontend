import { MenuButton } from '@albomoni/entities/menu';
import { Search } from '@albomoni/features/search';
import { getLocation } from '@albomoni/shared/lib/utils/get-location';
import { AlbomoniSvg } from '@albomoni/shared/ui/logo';
import { Skeleton } from '@nextui-org/skeleton';
import Link from 'next/link';
import { PiMapPinBold } from 'react-icons/pi';

export const StaticHeader = () => {
  const { city } = getLocation();

  return (
    <div className='flex flex-row gap-4 lg:gap-8 max-w-7xl px-4 w-full items-center'>
      <div className='w-28 hidden md:flex flex-col gap-2 pt-1 flex-shrink-0'>
        <Link href='/'>
          <AlbomoniSvg />
        </Link>

        <Link
          href='/location'
          className='flex gap-1 justify-start items-center opacity-50 hover:opacity-100 active:scale-95 transition-transform-opacity origin-left'
        >
          <PiMapPinBold size={14} />
          {city === 'Весь мир' ? (
            <Skeleton className='w-12 h-4 rounded-md' />
          ) : (
            <p className='text-xs font-medium line-clamp-1'>{city}</p>
          )}
        </Link>
      </div>

      <Search />

      <MenuButton />
    </div>
  );
};
