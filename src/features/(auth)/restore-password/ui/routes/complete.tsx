import { Button } from '@nextui-org/button';
import { m } from 'framer-motion';
import Link from 'next/link';
import { PiCheckCircle } from 'react-icons/pi';

export const RestorePasswordComplete = () => {
  return (
    <div className='flex flex-col gap-10 px-6 pb-6 pt-2 items-center'>
      <div className='flex flex-col items-center gap-4 '>
        <m.div
          initial={{ rotate: 90, opacity: 0, filter: 'blur(20px)' }}
          animate={{ rotate: 0, opacity: 1, filter: 'blur(0px)' }}
        >
          <PiCheckCircle size={100} className='text-green-600' />
        </m.div>
        <h3 className='text-xl font-semibold text-green-600'>Пароль изменен успешно</h3>
        <p className='text-sm opacity-60 text-center font-medium'>
          Чтобы продолжить работу, авторизуйтесь в аккаунт Almixx, используя
          новый пароль
        </p>
      </div>

      <div className='flex flex-col gap-4'>
        <Button
          as={Link}
          href='/login'
          size='md'
          variant='shadow'
          color='primary'
        >
          Войти в аккаунт
        </Button>
      </div>
    </div>
  );
};
