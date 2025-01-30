import { Button } from '@nextui-org/button';

import { LuArchive } from 'react-icons/lu';
import { getCookie } from 'cookies-next';
import { useState } from 'react';
import revalidateRoute from '@albomoni/shared/lib/utils/server/revalidate';
import { PiStopCircleBold } from 'react-icons/pi';
import { useModal } from '../../../lib/use-modal';
import { EModalStates } from '../../../model/modal-states.enum';
import { stopAd } from '../../../api/stop-ad';

export const ModalVariantStopAd = () => {
  const { setModalState, modalData } = useModal();
  const [isLoadingArchive, setIsLoadingArchive] = useState(false);
  const [isLoadingEnded, setIsLoadingEnded] = useState(false);
  const token = getCookie('token');

  const isActive = modalData.status === 'active';
  const isEnded = modalData.status === 'ended';

  const handleClickToArchive = async () => {
    setIsLoadingArchive(true);
    const handleStatus = 'archived';
    await stopAd(modalData.id, handleStatus, token as string);

    setModalState(EModalStates.NULL);
    revalidateRoute('/profile/my-ads');
    revalidateRoute(`/profile/my-ads/ad/${modalData.id}`);
  };

  const handleClickToEnded = async () => {
    setIsLoadingEnded(true);
    const handleStatus = 'ended';
    await stopAd(modalData.id, handleStatus, token as string);

    setModalState(EModalStates.NULL);
    revalidateRoute('/profile/my-ads');
    revalidateRoute(`/profile/my-ads/ad/${modalData.id}`);
  };

  return (
    <div className='p-6 flex flex-col gap-6 items-center'>
      <h1 className='text-xl font-semibold  mt-2'>
        {!isEnded ? 'Остановка объявления' : 'Перенос в архив'}
      </h1>
      <p className='font-medium opacity-50  text-center'>
        {isActive
          ? 'Выберите, куда Вы хотите перенести объявление: в Ваши завершённые сделки или личный архив. Повторно запустить запись можно будет в любой момент времени.'
          : 'Вы уверены, что хотите убрать это объявление из общего доступа и перенести его в личный архив? Запустить запись повторно можно будет в любой момент.'}
      </p>

      <div className='w-full flex gap-4'>
        <Button
          isLoading={isLoadingArchive}
          onPress={handleClickToArchive}
          size='lg'
          variant='solid'
          className='w-full font-semibold gap-2 mt-2 '
        >
          <LuArchive size={22} />В архив
        </Button>

        {isActive && (
          <Button
            isLoading={isLoadingEnded}
            onPress={handleClickToEnded}
            size='lg'
            className='w-full font-semibold gap-2 mt-2 bg-default-900 text-default'
          >
            <PiStopCircleBold size={22} />
            Завершить
          </Button>
        )}
      </div>
    </div>
  );
};
