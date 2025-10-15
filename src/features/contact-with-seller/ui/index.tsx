'use client';

import { Ad } from '@albomoni/entities/ad-card/model/ad.type';
import { useModal } from '@albomoni/shared/lib/providers/modal/lib/use-modal';
import { EModalStates } from '@albomoni/shared/lib/providers/modal/model/modal-states.enum';
import { Button } from '@nextui-org/button';

type Props = {
  ad: Ad;
};

export const ContactWithSellerButton = ({ ad }: Props) => {
  const { setModalState, setModalData } = useModal();

  const handleOpenContactModal = () => {
    setModalData({ user_id: ad.seller.user_id, ad_id: ad.ad.id });
    setModalState(EModalStates.CONTACT_WITH_SELLER);
  };

  return (
    <Button
      onPress={handleOpenContactModal}
      className='w-full h-12 bg-gradient-to-r rounded-2xl from-blue-300 to-indigo-400 dark:from-blue-500 dark:to-indigo-400 text-white shadow-lg shadow-blue-400/40 font-semibold text-md'
    >
      Связаться с продавцом
    </Button>
  );
};
