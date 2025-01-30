'use client';

import { useModal } from '@albomoni/shared/lib/providers/modal/lib/use-modal';
import { EModalStates } from '@albomoni/shared/lib/providers/modal/model/modal-states.enum';
import { Button } from '@nextui-org/button';
import { PiPlayCircleBold } from 'react-icons/pi';

type Props = {
  id: number;
  status: 'active' | 'moderating' | 'archived' | 'ended';
  category: string;
  currency: string;
  price: number;
};

export const StartAdButton = ({
  id,
  status,
  category,
  currency,
  price,
}: Props) => {
  const { setModalState, setModalData } = useModal();

  const handleClick = () => {
    setModalData({ id, status, category, currency, price });
    setModalState(EModalStates.START_AD);
  };

  return (
    <Button
      onPress={handleClick}
      size='lg'
      color='success'
      variant='shadow'
      className='w-full flex-shrink-0 font-semibold'
    >
      <PiPlayCircleBold size={24} />
      Запустить объявление
    </Button>
  );
};
