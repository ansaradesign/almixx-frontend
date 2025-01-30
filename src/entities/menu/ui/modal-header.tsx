import { Search } from '@albomoni/features/search';
import { getLocation } from '@albomoni/shared/lib/utils/get-location';
import { AlbomoniSvg } from '@albomoni/shared/ui/logo';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PiMapPinBold, PiSquaresFourBold } from 'react-icons/pi';
import { useLocalStorage } from 'react-use';

type Props = {
  onClose: () => void;
};

export const ModalHeader = ({ onClose }: Props) => {
  const pathname = usePathname();
  const [, setBackPage] = useLocalStorage<string>('back-page');
  const { city } = getLocation();

  const handleClickLocation = () => {
    setBackPage(pathname);
    onClose();
  };

  return (
    <header className='w-full h-20 flex flex-row justify-center z-30'>
      <div className='flex flex-row gap-4 lg:gap-8 max-w-7xl px-4 w-full items-center justify-between'>
        <div className='w-28 flex flex-col gap-2 pt-1 flex-shrink-0'>
          <Link href='/' onClick={onClose}>
            <AlbomoniSvg />
          </Link>

          <Link
            href='/location'
            onClick={handleClickLocation}
            type='button'
            className='flex gap-1 justify-start items-center opacity-50 hover:opacity-100 active:scale-95 transition-transform-opacity origin-left text-left'
          >
            <PiMapPinBold size={14} />
            <p className='text-xs font-medium line-clamp-1'>{city}</p>
          </Link>
        </div>

        <button
          type='button'
          aria-label='close modal'
          onClick={() => onClose()}
          className='hidden md:flex w-full h-fit'
        >
          <Search />
        </button>

        <Button
          size='lg'
          isIconOnly
          className='flex md:hidden flex-shrink-0 rounded-2xl'
          onPress={onClose}
        >
          <PiSquaresFourBold size={20} className='flex-shrink-0' />
        </Button>
        <Button
          size='lg'
          onPress={onClose}
          className='hidden md:flex text-md font-medium flex-shrink-0'
        >
          <PiSquaresFourBold size={20} className='flex-shrink-0' />
          Меню
        </Button>
      </div>
    </header>
  );
};
