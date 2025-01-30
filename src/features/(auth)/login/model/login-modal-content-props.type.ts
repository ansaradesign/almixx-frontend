import { ELoginModalScreens } from './login-modal-screens.enum';

export type LoginModalContentProps = {
  onClose: VoidFunction;
  setModal: (screen: ELoginModalScreens) => void;
  registrationEmail: string;
  setRegistrationEmail: (email: string) => void;
};
