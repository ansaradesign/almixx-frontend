'use client';

import { useModal } from '@albomoni/shared/lib/providers/modal/lib/use-modal';
import { EModalStates } from '@albomoni/shared/lib/providers/modal/model/modal-states.enum';
import { Button } from '@nextui-org/button';
import { LuArchive } from 'react-icons/lu';
import { PiStopCircleBold } from 'react-icons/pi';

type Props = {
  id: number;
  status: 'active' | 'moderating' | 'archived' | 'ended';
};

export const StopAdButton = ({ id, status }: Props) => {
  const { setModalState, setModalData } = useModal();

  const handleClick = () => {
    setModalState(EModalStates.STOP_AD);
    setModalData({ id, status });
  };

  return (
    <Button
      onPress={handleClick}
      size='lg'
      color='default'
      isIconOnly
      className='w-min flex-shrink-0 font-semibold'
    >
      {status === 'ended' ? (
        <LuArchive size={24} />
      ) : (
        <PiStopCircleBold size={28} />
      )}
    </Button>
  );
};
