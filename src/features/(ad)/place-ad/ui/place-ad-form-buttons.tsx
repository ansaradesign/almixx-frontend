import { useModal } from '@albomoni/shared/lib/providers/modal/lib/use-modal';
import { EModalStates } from '@albomoni/shared/lib/providers/modal/model/modal-states.enum';
import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LuArchive } from 'react-icons/lu';
import { PiPlayCircleBold } from 'react-icons/pi';

type Props = {
  saveAd: () => Promise<any>;
};

export const PlaceAdFormButtons = ({ saveAd }: Props) => {
  const { setModalState, setModalData } = useModal();
  const router = useRouter();

  const [isLoadingArchive, setIsLoadingArchive] = useState(false);
  const [isLoadingStart, setIsLoadingStart] = useState(false);

  const handleSubmitArchive = async () => {
    setIsLoadingArchive(true);
    const response = await saveAd();

    if (!response) {
      setIsLoadingArchive(false);
      return;
    }

    router.push(`/profile/my-ads/ad/${response.id}`);
  };

  const handleSubmitStart = async () => {
    setIsLoadingStart(true);
    const response = await saveAd();

    if (!response) {
      setIsLoadingStart(false);
      return;
    }

    setModalData({
      id: response.id,
      status: response.status,
      category: response.category,
      currency: response.currency,
      price: response.cost,
    });

    setModalState(EModalStates.START_AD);

    router.push(`/profile/my-ads/ad/${response.id}`);
  };

  return (
    <div className='flex flex-col-reverse md:flex-row gap-4 mb-4'>
      <Button
        size='lg'
        onPress={handleSubmitArchive}
        isLoading={isLoadingArchive}
        className='w-full md:w-min font-medium'
      >
        <LuArchive size={20} />
        Сохранить в архив
      </Button>
      <Button
        size='lg'
        color='primary'
        variant='shadow'
        onPress={handleSubmitStart}
        isLoading={isLoadingStart}
        className='w-full md:w-min font-medium'
      >
        <PiPlayCircleBold size={20} />
        Сохранить и разместить
      </Button>
    </div>
  );
};
