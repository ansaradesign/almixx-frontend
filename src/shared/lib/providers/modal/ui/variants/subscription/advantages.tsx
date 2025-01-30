import { UserAvatar } from '@albomoni/entities/user';
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { Button } from '@nextui-org/button';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  EModalStates,
  ESubscriptionStates,
} from '../../../model/modal-states.enum';
import { cancelSubscription } from '../../../api/cancel-subscription';
import { useModal } from '../../../lib/use-modal';
import { ModalScrollableArea } from '../../scrollable-area';

type Props = {
  setScreen: (state: ESubscriptionStates) => void;
};

export const ModalSubscriptionAdvantages = ({ setScreen }: Props) => {
  const { user } = useSession();
  const token = getCookie('token');
  const router = useRouter();
  const { setModalState } = useModal();

  const handleClickConfirm = () => {
    setScreen(ESubscriptionStates.CONFIRMATION);
  };

  const handleClickCancel = async () => {
    await cancelSubscription(token as string);
    setModalState(EModalStates.NULL);
    router.refresh();
  };

  return (
    <>
      <ModalScrollableArea>
        <div className='w-32 h-32 flex-shrink-0'>
          <UserAvatar src={user?.avatar as string} isSubscribed isBig />
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <h1 className='text-3xl font-semibold bg-gradient-to-r from-indigo-400 to-red-500 inline-block text-transparent bg-clip-text'>
            Almixx Pro
          </h1>
          <h2 className='text-lg opacity-50 font-medium text-center'>
            Получите больше с единой подпиской.
          </h2>
        </div>
        <div className='w-1 h-[700px] flex-shrink-0' />
      </ModalScrollableArea>

      <div className='w-full flex items-center justify-center flex-shrink-0 p-6 pt-0'>
        {user?.subscription && (
          <Button
            size='lg'
            className='w-full font-medium'
            onPress={handleClickCancel}
          >
            Отменить подписку
          </Button>
        )}

        {!user?.subscription && user && (
          <Button
            size='lg'
            onPress={handleClickConfirm}
            className='w-full bg-gradient-to-r to-indigo-700 from-red-500 font-medium text-white'
          >
            Оформить за 50 € в месяц
          </Button>
        )}

        {!user?.subscription && !user && (
          <Button
            size='lg'
            as={Link}
            onPress={() => setModalState(EModalStates.NULL)}
            href='/login'
            className='w-full bg-gradient-to-r to-indigo-700 from-red-500 font-semibold text-white'
          >
            Войти и оформить
          </Button>
        )}
      </div>
    </>
  );
};
