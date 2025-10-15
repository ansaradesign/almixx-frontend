import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';
import { PiArrowCircleRightBold } from 'react-icons/pi';
import { getCookie } from 'cookies-next';
import { useModal } from '../../../lib/use-modal';
import { EModalStates } from '../../../model/modal-states.enum';
import { setReview } from '../../../api/(reviews)/set-review/set-review-stats';

type Props = {
  rating: number;
  data: { rate: number | null } | undefined;
};

export const SetReviewButtonsUser = ({ rating, data }: Props) => {
  const { setModalState, modalData } = useModal();
  const router = useRouter();
  const token = getCookie('token');

  const closeModal = () => {
    setModalState(EModalStates.NULL);
  };

  const handleSetRating = async () => {
    await setReview(modalData.user_id, rating, token as string);
    setModalState(EModalStates.NULL);
    router.refresh();
  };

  return (
    <div className='w-full flex gap-4'>
      <Button
        size='lg'
        onPress={closeModal}
        className='w-full font-semibold gap-2'
      >
        Отмена
      </Button>
      <Button
        isDisabled={rating < 1 || rating === data?.rate}
        size='lg'
        variant='shadow'
        color='primary'
        onPress={handleSetRating}
        className='w-full font-semibold gap-2'
        startContent={<PiArrowCircleRightBold size={18} />}
      >
        Отправить
      </Button>
    </div>
  );
};
