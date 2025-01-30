import { Button } from '@nextui-org/button';
import { PiCheckBold, PiMapPinBold, PiPencilSimpleBold } from 'react-icons/pi';
import Link from 'next/link';
import { getLocation } from '@albomoni/shared/lib/utils/get-location';
import { ModalScrollableArea } from '../../scrollable-area';
import { useModal } from '../../../lib/use-modal';
import { EModalStates } from '../../../model/modal-states.enum';

export const ModalVariantLocation = () => {
  const { setModalState } = useModal();
  const location = getLocation();

  return (
    <>
      <ModalScrollableArea>
        <h1 className='text-xl font-semibold mt-4 md:mt-0'>
          Регион объявлений
        </h1>
        <div className='w-full h-12 rounded-2xl bg-default px-4 flex gap-2 items-center'>
          <PiMapPinBold size={22} className='opacity-50' />
          <p className='font-semibold opacity-60'>{location.address}</p>
        </div>
        <p className='font-medium'>
          <span className='opacity-50'>
            Регион объявлений, которые будут отображаться в Ваших подборках.
            Нажмите
          </span>{' '}
          <span>Изменить</span>
          <span className='opacity-50'>
            , если хотите поменять местоположение.
          </span>
        </p>
      </ModalScrollableArea>

      <div className='w-full px-6 pb-6 pt-1 flex gap-4'>
        <Button
          as={Link}
          href='/location'
          onPress={() => setModalState(EModalStates.NULL)}
          size='lg'
          className='w-full font-medium'
        >
          <PiPencilSimpleBold size={20} />
          Изменить
        </Button>
        <Button
          onPress={() => setModalState(EModalStates.NULL)}
          size='lg'
          variant='shadow'
          color='primary'
          className='w-full font-medium'
        >
          <PiCheckBold size={20} className='flex-shrink-0' />
          Подтвердить
        </Button>
      </div>
    </>
  );
};
