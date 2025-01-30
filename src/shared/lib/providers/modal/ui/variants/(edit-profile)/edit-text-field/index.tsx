/* eslint-disable jsx-a11y/no-autofocus */

import { Button } from '@nextui-org/button';
import { PiFloppyDiskBackBold } from 'react-icons/pi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { useModal } from '../../../../lib/use-modal';
import { EModalStates } from '../../../../model/modal-states.enum';
import { ModalScrollableArea } from '../../../scrollable-area';
import { editUserField } from '../../../../api/(edit-user)/edit-user-field';

export const ModalVariantEditTextField = () => {
  const { setModalState, modalData } = useModal();
  const router = useRouter();
  const token = getCookie('token');

  const [textValue, setTextValue] = useState(modalData.text);

  const handleEditField = async () => {
    await editUserField({ [modalData.type]: textValue }, token as string);
    setModalState(EModalStates.NULL);
    router.refresh();
  };

  return (
    <>
      <ModalScrollableArea>
        <h1 className='text-xl font-semibold mt-4 md:mt-0'>Изменить имя</h1>
        <input
          type='text'
          autoFocus
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          className='text-3xl font-medium ring-0 outline-none text-center my-8 bg-[--bg]'
        />
      </ModalScrollableArea>

      <div className='w-full px-6 pb-6 pt-1 flex gap-4'>
        <Button
          size='lg'
          onPress={() => setModalState(EModalStates.NULL)}
          className='w-full font-semibold gap-2'
        >
          Отмена
        </Button>
        <Button
          isDisabled={textValue.length < 2}
          size='lg'
          variant='shadow'
          color='success'
          onPress={handleEditField}
          className='w-full font-semibold gap-2'
          startContent={<PiFloppyDiskBackBold size={18} />}
        >
          Сохранить
        </Button>
      </div>
    </>
  );
};
