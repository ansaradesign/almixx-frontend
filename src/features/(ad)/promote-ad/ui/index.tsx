'use client';

import { useModal } from '@albomoni/shared/lib/providers/modal/lib/use-modal';
import { EModalStates } from '@albomoni/shared/lib/providers/modal/model/modal-states.enum';
import { PromoOptions } from '@albomoni/shared/lib/providers/modal/ui/variants/promote-ad';
import { Button } from '@nextui-org/button';
import { PiTrendUpBold } from 'react-icons/pi';

type Props = {
  id: number;
  plan: PromoOptions;
  category: string;
  currency: string;
  price: number;
};

export const PromoteAdButton = ({
  id,
  plan,
  category,
  currency,
  price,
}: Props) => {
  const { setModalState, setModalData } = useModal();

  const handleClick = () => {
    setModalData({ id, plan, category, currency, price });
    setModalState(EModalStates.PROMOTE_AD);
  };

  return (
    <Button
      onPress={handleClick}
      size='lg'
      color='primary'
      variant='shadow'
      className='w-full flex-shrink-0 font-semibold'
    >
      <PiTrendUpBold size={24} />
      {plan !== 'null' ? `На продвижении (${plan})` : 'Продвинуть объявление'}
    </Button>
  );
};
