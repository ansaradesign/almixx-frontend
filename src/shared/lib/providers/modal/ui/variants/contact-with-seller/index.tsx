/* eslint-disable jsx-a11y/no-autofocus */

import { getCookie } from 'cookies-next';
import { Button } from '@nextui-org/button';
import { ModalScrollableArea } from '../../scrollable-area';
import { useModal } from '../../../lib/use-modal';
import { ContactWithSellerUserContent } from './user/user-content';
import { EModalStates } from '../../../model/modal-states.enum';
import { ContactWithSellerGuestContent } from './guest/guest-content';
import { ContactWithSellerButtonsGuest } from './guest/guest-buttons';

export const ModalVariantContactWithSeller = () => {
  const { setModalState } = useModal();
  const token = getCookie('token');

  return (
    <>
      <ModalScrollableArea>
        <h1 className='text-xl font-semibold mt-4 md:mt-0'>
          Связаться с продавцом
        </h1>
        {token ? (
          <ContactWithSellerUserContent />
        ) : (
          <ContactWithSellerGuestContent />
        )}
      </ModalScrollableArea>

      <div className='w-full px-6 pb-6 pt-1 flex gap-4'>
        {token ? (
          <Button
            onPress={() => setModalState(EModalStates.NULL)}
            size='lg'
            className='w-full font-medium'
          >
            Закрыть
          </Button>
        ) : (
          <ContactWithSellerButtonsGuest />
        )}
      </div>
    </>
  );
};
