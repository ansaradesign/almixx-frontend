'use client';

import { Modal, ModalContent } from '@nextui-org/modal';
import { useEffect, useState } from 'react';
import { ELoginModalScreens } from '../../model/login-modal-screens.enum';
import { ModalLogin } from './login';
import { ModalRegistrationEmail } from './registration/email-form';
import { ModalRegistrarionConfimEmail } from './registration/confirm-email-form';
import { ModalRegistrationUserData } from './registration/user-data-form';
import { ModalRegistrationComplete } from './registration/registration-complete';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

export const LoginModal = ({ isOpen, onOpenChange }: Props) => {
  const [modal, setModal] = useState<ELoginModalScreens>(
    ELoginModalScreens.LOGIN,
  );
  const [registrationEmail, setRegistrationEmail] = useState('');

  const renderModalContent = (onClose: VoidFunction) => {
    const content = {
      [ELoginModalScreens.LOGIN]: ModalLogin,
      [ELoginModalScreens.REGISTRATION_EMAIL]: ModalRegistrationEmail,
      [ELoginModalScreens.REGISTRATION_EMAIL_CONFIRM]:
        ModalRegistrarionConfimEmail,
      [ELoginModalScreens.REGISTRATION_USER_DATA]: ModalRegistrationUserData,
      [ELoginModalScreens.REGISTRATION_COMPLETE]: ModalRegistrationComplete,
    };

    const Component = content[modal];

    return (
      <Component
        onClose={onClose}
        setModal={setModal}
        registrationEmail={registrationEmail}
        setRegistrationEmail={setRegistrationEmail}
      />
    );
  };

  useEffect(
    () => () => {
      setModal(ELoginModalScreens.LOGIN);
    },
    [onOpenChange],
  );

  return (
    <Modal
      placement='center'
      backdrop='blur'
      classNames={{
        closeButton:
          'rounded-xl bg-[--element] hover:bg-[--element-hover] transition-colors top-4 right-4',
        header: 'pr-12 pt-5',
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>{(onClose) => renderModalContent(onClose)}</ModalContent>
    </Modal>
  );
};
