'use client';

import { useModal } from '@albomoni/shared/lib/providers/modal/lib/use-modal';
import { EModalStates } from '@albomoni/shared/lib/providers/modal/model/modal-states.enum';
import { Button } from '@nextui-org/button';
import { PiPencilSimpleBold } from 'react-icons/pi';

type Props = {
  name: string;
};

export const EditName = ({ name }: Props) => {
  const { setModalState, setModalData } = useModal();

  const handleEditName = () => {
    setModalData({ text: name, type: 'name' });
    setModalState(EModalStates.EDIT_CHANGE_TEXT);
  };

  return (
    <div className='w-full flex flex-col gap-2'>
      <h3 className='opacity-50 font-medium'>Имя</h3>

      <div className='w-full flex gap-4 items-center'>
        <h4 className='text-2xl font-semibold'>{name}</h4>
        <Button
          size='sm'
          isIconOnly
          className='w-fit'
          radius='full'
          onPress={handleEditName}
          startContent={<PiPencilSimpleBold size={18} />}
        />
      </div>
    </div>
  );
};
