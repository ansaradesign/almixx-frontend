import { Button } from '@nextui-org/button';
import Link from 'next/link';
import { PiPlusCircleBold } from 'react-icons/pi';

export const PlaceAdButton = () => {
  return (
    <Button
      as={Link}
      href='/place-ad'
      size='lg'
      color='primary'
      variant='shadow'
      startContent={<PiPlusCircleBold size={20} />}
      className='h-14 rounded-2xl font-semibold text-md px-10'
    >
     
      Разместить объявление
    </Button>
  );
};
