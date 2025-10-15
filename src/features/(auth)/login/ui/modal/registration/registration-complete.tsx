import { Button } from '@nextui-org/react';
import { PiCheckCircle } from 'react-icons/pi';
import { m } from 'framer-motion';
import { LoginModalContentProps } from '../../../model/login-modal-content-props.type';

export const ModalRegistrationComplete = ({
  onClose,
}: LoginModalContentProps) => (
  <div className='flex flex-col gap-10 p-6 items-center'>
    <div className='flex flex-col items-center gap-4 '>
      <m.div
        initial={{ rotate: 90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
      >
        <PiCheckCircle size={90} className='text-green-600' />
      </m.div>
      <h3 className='font-semibold text-green-600'>
        Регистрация прошла успешно!
      </h3>
      <p className='text-sm opacity-60 text-center'>
        Вы можете в любой момент заполнить дополнительную информацию о себе в
        Вашем личном кабинете
      </p>
    </div>

    <div className='flex flex-col gap-4'>
      <Button size='md' variant='shadow' color='primary'>
        Перейти в личный кабинет
      </Button>
      <Button size='md' onPress={onClose}>
        Закрыть это окно
      </Button>
    </div>
  </div>
);
