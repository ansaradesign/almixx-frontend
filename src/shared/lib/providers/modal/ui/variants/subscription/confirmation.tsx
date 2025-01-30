import { UserAvatar } from '@albomoni/entities/user';
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { Button } from '@nextui-org/button';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { getCookie } from 'cookies-next';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { useState } from 'react';
import { m } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  EModalStates,
  ESubscriptionStates,
} from '../../../model/modal-states.enum';
import { paySubscription } from '../../../api/pay-subscription';
import { useModal } from '../../../lib/use-modal';

type Props = {
  setScreen: (state: ESubscriptionStates) => void;
};

export const ModalSubscriptionConfirmation = ({ setScreen }: Props) => {
  const { setModalState } = useModal();
  const { user } = useSession();
  const token = getCookie('token');
  const router = useRouter();
  const [amount, setAmount] = useState<number | null>(null);

  const handleClickBack = () => {
    setScreen(ESubscriptionStates.ADVANTAGES);
  };

  const handleClickConfirm = async () => {
    try {
      const resp = await paySubscription(token as string);
      if (resp.type === 'money') {
        setAmount(resp.text);
      }
      if (resp.type === 'success') {
        setModalState(EModalStates.NULL);
        router.refresh();
      }
    } catch (e: any) {
      return;
    }
  };

  const handleClickToBilling = () => {
    setModalState(EModalStates.NULL);
    router.push('/profile/wallet/billing');
  };

  return (
    <>
      <ScrollShadow
        hideScrollBar
        className='w-full h-full max-h-[500px] flex flex-col gap-5 items-center p-8'
      >
        <div className='w-32 h-32 flex-shrink-0'>
          <UserAvatar src={user?.avatar as string} isSubscribed isBig />
        </div>
        <div className='flex flex-col gap-2 items-center'>
          <h1 className='text-3xl font-semibold bg-gradient-to-r from-indigo-400 to-red-500 inline-block text-transparent bg-clip-text'>
            Almixx Pro
          </h1>
        </div>
      </ScrollShadow>

      {amount && (
        <m.div layout className='w-full px-6 py-4'>
          <NotificationBubble type='error'>
            На вашем балансе нехватает {amount} € для покупки. <br />
            <button
              type='button'
              className='underline cursor-pointer'
              onClick={handleClickToBilling}
            >
              Пополнить кошелёк
            </button>
          </NotificationBubble>
        </m.div>
      )}

      <m.div
        layout
        className='w-full flex items-center justify-center flex-shrink-0 p-6 pt-0 gap-4'
      >
        <Button
          size='lg'
          className='w-full font-medium '
          onPress={handleClickBack}
        >
          Назад
        </Button>

        <Button
          size='lg'
          color='success'
          className='w-full font-medium'
          onPress={handleClickConfirm}
        >
          Оплатить
        </Button>
      </m.div>
    </>
  );
};
