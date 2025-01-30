import { useModal } from '@albomoni/shared/lib/providers/modal/lib/use-modal';
import { Button } from '@nextui-org/button';

type Props = {
  isSubscribed: boolean;
};

export const GetSubscriptionButton = ({ isSubscribed }: Props) => {
  const { setModalState } = useModal();

  const handleClick = () => {
    // setModalState(EModalStates.SUBSCRIPTION);
  };

  return isSubscribed ? (
    <Button
      onPress={handleClick}
      className='w-min h-8 text-sm mt-2 rounded-full font-semibold border-2 bg-[--bg] border-primary text-primary'
    >
      Almixx Pro
    </Button>
  ) : (
    <Button
      onPress={handleClick}
      className='w-min h-8 text-sm mt-2 rounded-full font-semibold border-2 bg-[--bg] border-default-300 text-default-400'
    >
      Стандартный аккаунт
    </Button>
  );
};
