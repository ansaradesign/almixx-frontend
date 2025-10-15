/* eslint-disable jsx-a11y/no-autofocus */

import { Button } from '@nextui-org/button';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { PiTrashBold } from 'react-icons/pi';
import { useModal } from '../../../../lib/use-modal';
import { ModalScrollableArea } from '../../../scrollable-area';
import { EModalStates } from '../../../../model/modal-states.enum';
import { deletePhone } from '../../../../api/(edit-user)/delete-phone';

export const ModalVariantDeletePhone = () => {
  const { setModalState, modalData } = useModal();
  const token = getCookie('token');
  const router = useRouter();

  const handleDeletePhone = async () => {
    await deletePhone(modalData.id, token as string);
    setModalState(EModalStates.NULL);
    router.refresh();
  };

  return (
    <>
      <ModalScrollableArea>
        <h1 className='text-xl font-semibold mt-4 md:mt-0'>
          Удаление телефона
        </h1>
        <h2 className='text-2xl font-semibold'>{modalData.phone}</h2>
        <p className='font-medium opacity-50'>
          Вы действительно хотите удалить этот телефон со своего аккаунта? Все
          активные объявления будут перенесены в архив.
        </p>
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
          size='lg'
          variant='shadow'
          color='danger'
          onPress={handleDeletePhone}
          className='w-full font-semibold gap-2'
          startContent={<PiTrashBold size={18} />}
        >
          Удалить
        </Button>
      </div>
    </>
  );
};
