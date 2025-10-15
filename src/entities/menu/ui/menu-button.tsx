import { Button } from '@nextui-org/button';
import { useDisclosure } from '@nextui-org/modal';
import { PiSquaresFourBold } from 'react-icons/pi';
import { Menu } from './menu';

export const MenuButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        size='lg'
        color='primary'
        variant='shadow'
        isIconOnly
        className='flex md:hidden flex-shrink-0 rounded-2xl'
        onPress={onOpen}
      >
        <PiSquaresFourBold size={20} className='flex-shrink-0' />
      </Button>
      <Button
        size='lg'
        color='primary'
        variant='shadow'
        onPress={onOpen}
        className='hidden md:flex text-md font-medium flex-shrink-0'
      >
        <PiSquaresFourBold size={20} className='flex-shrink-0' />
        Меню
      </Button>
      <Menu isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
