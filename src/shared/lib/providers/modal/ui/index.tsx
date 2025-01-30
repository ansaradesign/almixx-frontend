import { useEffect, useState } from 'react';
import { useMedia } from 'react-use';
import { createContainer } from '../lib/create-container';
import { Portal } from './portal';
import { ModalMobile } from './mobile';
import { ModalDesktop } from './desktop';

const MODAL_CONTAINER_ID = 'modal-container-id';

export const Modal = () => {
  const isMobile = useMedia('(max-width: 768px)', false);
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    createContainer({ id: MODAL_CONTAINER_ID });
    setMounted(true);
  }, []);

  return isMounted ? (
    <Portal id={MODAL_CONTAINER_ID}>
      {isMobile ? <ModalMobile /> : <ModalDesktop />}
    </Portal>
  ) : null;
};
