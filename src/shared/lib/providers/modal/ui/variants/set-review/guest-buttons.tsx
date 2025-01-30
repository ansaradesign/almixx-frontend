import { Button } from '@nextui-org/button';
import { PiSignInBold } from 'react-icons/pi';
import Link from 'next/link';
import { useLocalStorage } from 'react-use';
import { usePathname } from 'next/navigation';
import { useModal } from '../../../lib/use-modal';
import { EModalStates } from '../../../model/modal-states.enum';

export const SetReviewButtonsGuest = () => {
  const { setModalState } = useModal();
  const [, setLoginPage] = useLocalStorage('login-page');
  const pathname = usePathname();

  const closeModal = () => {
    setModalState(EModalStates.NULL);
  };

  const handleToLogin = () => {
    setLoginPage(pathname);
    closeModal();
  };

  return (
    <Button
      as={Link}
      href='/login'
      onPress={handleToLogin}
      size='lg'
      variant='shadow'
      color='primary'
      className='w-full font-semibold gap-2'
      startContent={<PiSignInBold size={18} />}
    >
      Войти или зарегистрироваться
    </Button>
  );
};
